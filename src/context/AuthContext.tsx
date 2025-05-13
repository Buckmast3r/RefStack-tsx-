import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthState, SignInInput, SignUpInput, User, UserProfile } from '@/types/user'
import { insertProfile } from '@/utils/insertProfile'

interface AuthContextType extends AuthState {
  signUp: (input: SignUpInput) => Promise<void>
  signIn: (input: SignInInput) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setState(prev => ({ ...prev, user: session.user as User }))
        fetchProfile(session.user.id)
      } else {
        setState(prev => ({ ...prev, isLoading: false }))
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setState(prev => ({ ...prev, user: session.user as User }))
          await fetchProfile(session.user.id)
        } else {
          setState({ user: null, profile: null, isLoading: false, error: null })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      setState(prev => ({
        ...prev,
        profile,
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error fetching profile:', error)
      setState(prev => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }))
    }
  }

  const signUp = async ({ email, password, username, fullName }: SignUpInput) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError
      if (!user) throw new Error('No user returned from sign up')

      // Create profile
      await insertProfile({
        id: user.id,
        email: user.email!,
        username,
        fullName,
        role: 'user',
        subscriptionStatus: 'inactive',
      })

      router.push('/confirm-email')
    } catch (error) {
      console.error('Error signing up:', error)
      setState(prev => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }))
    }
  }

  const signIn = async ({ email, password }: SignInInput) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (error) {
      console.error('Error signing in:', error)
      setState(prev => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }))
    }
  }

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      setState(prev => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }))
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', state.user?.id)

      if (error) throw error

      setState(prev => ({
        ...prev,
        profile: prev.profile ? { ...prev.profile, ...updates } : null,
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error updating profile:', error)
      setState(prev => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 