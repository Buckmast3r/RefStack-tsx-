import { Database } from './supabase'
import { User } from './user'

export type Team = Database['public']['Tables']['teams']['Row']
export type TeamInsert = Database['public']['Tables']['teams']['Insert']
export type TeamUpdate = Database['public']['Tables']['teams']['Update']

export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type TeamMemberInsert = Database['public']['Tables']['team_members']['Insert']
export type TeamMemberUpdate = Database['public']['Tables']['team_members']['Update']

export type TeamRole = 'owner' | 'admin' | 'member'

export interface TeamWithMembers extends Team {
  members: (TeamMember & { user: User })[]
}

export interface TeamFormData {
  name: string
  description?: string
  logo_url?: string
  website?: string
}

export interface TeamValidationError {
  name?: string
  description?: string
  logo_url?: string
  website?: string
}

export function validateTeam(data: TeamFormData): TeamValidationError {
  const errors: TeamValidationError = {}

  if (!data.name) {
    errors.name = 'Team name is required'
  } else if (data.name.length < 3) {
    errors.name = 'Team name must be at least 3 characters'
  } else if (data.name.length > 50) {
    errors.name = 'Team name must be less than 50 characters'
  }

  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
  }

  if (data.logo_url) {
    try {
      new URL(data.logo_url)
    } catch {
      errors.logo_url = 'Logo URL must be valid'
    }
  }

  if (data.website) {
    try {
      new URL(data.website)
    } catch {
      errors.website = 'Website must be a valid URL'
    }
  }

  return errors
}

export function canManageTeam(user: User, team: Team): boolean {
  return user.id === team.owner_id || user.role === 'admin'
}

export function canInviteMembers(user: User, team: Team): boolean {
  return canManageTeam(user, team)
}

export function canRemoveMember(user: User, team: Team, member: TeamMember): boolean {
  if (!canManageTeam(user, team)) {
    return false
  }

  // Owners cannot be removed
  if (member.role === 'owner') {
    return false
  }

  // Admins can only be removed by owners
  if (member.role === 'admin' && user.id !== team.owner_id) {
    return false
  }

  return true
}

export function canUpdateMemberRole(user: User, team: Team, member: TeamMember): boolean {
  if (!canManageTeam(user, team)) {
    return false
  }

  // Only owners can update admin roles
  if (member.role === 'admin' && user.id !== team.owner_id) {
    return false
  }

  return true
}

export function getTeamMemberCount(team: TeamWithMembers): number {
  return team.members.length
}

export function getTeamAdminCount(team: TeamWithMembers): number {
  return team.members.filter(member => member.role === 'admin').length
}

export function getTeamOwner(team: TeamWithMembers): User | undefined {
  return team.members.find(member => member.role === 'owner')?.user
}

export function getTeamAdmins(team: TeamWithMembers): User[] {
  return team.members
    .filter(member => member.role === 'admin')
    .map(member => member.user)
}

export function getTeamMembers(team: TeamWithMembers): User[] {
  return team.members
    .filter(member => member.role === 'member')
    .map(member => member.user)
} 