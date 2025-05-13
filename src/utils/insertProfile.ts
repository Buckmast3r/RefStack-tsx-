import { supabase } from '@/lib/supabaseClient'
import { UserProfile } from '@/types/user'

interface InsertProfileInput {
  id: string
  email: string
  username: string
  fullName?: string
  role?: UserProfile['role']
  subscriptionStatus?: UserProfile['subscriptionStatus']
}

export async function insertProfile({
  id,
  email,
  username,
  fullName,
  role = 'user',
  subscriptionStatus = 'inactive',
}: InsertProfileInput): Promise<void> {
  const { error } = await supabase.from('profiles').insert({
    id,
    email,
    username,
    fullName,
    role,
    subscriptionStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  if (error) {
    console.error('Error inserting profile:', error)
    throw error
  }
} 