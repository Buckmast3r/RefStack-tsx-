import { createClient, AuthError, PostgrestError } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
)

// Helper to get the current user's session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

// Helper to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Helper to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error signing out:', error)
    return false
  }
}

// Helper to handle Supabase errors
export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message)
    this.name = 'SupabaseError'
  }
}

// Function to check if it's a PostgrestError (has a 'details' property)
function isPostgrestError(error: unknown): error is PostgrestError {
  return error && typeof (error as PostgrestError).details !== 'undefined' && typeof (error as PostgrestError).message === 'string' && typeof (error as PostgrestError).code === 'string';
}

// Function to check if it's an AuthError (often has a 'status' property)
function isAuthError(error: unknown): error is AuthError {
    return error && typeof (error as AuthError).message === 'string' && (typeof (error as AuthError).status === 'number' /*|| typeof (error as AuthError).code === 'string'*/); // AuthError might not always have a string code property
}

export function handleSupabaseError(error: unknown): never {
  console.error('Supabase error:', error)
  
  if (isPostgrestError(error)) {
    throw new SupabaseError(
      error.message,
      error.code,
      error.details
    )
  }
  
  if (isAuthError(error)) {
    throw new SupabaseError(
      error.message,
      String(error.status) // Using status as code for example
    )
  }
  
  if (error instanceof Error) {
    throw new SupabaseError(
      error.message
    )
  }
  
  throw new SupabaseError('An unexpected error occurred')
}

// Type-safe database queries
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
    
  if (error) handleSupabaseError(error)
  return data
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Database['public']['Tables']['profiles']['Update']>
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
    
  if (error) handleSupabaseError(error)
  return data
}

export async function getUserReferrals(userId: string) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) handleSupabaseError(error)
  return data
}

export async function getPublicProfile(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      full_name,
      avatar_url,
      bio,
      referrals (
        id,
        title,
        description,
        url,
        image_url,
        clicks,
        views
      )
    `)
    .eq('username', username)
    .single()
    
  if (error) handleSupabaseError(error)
  return data
} 