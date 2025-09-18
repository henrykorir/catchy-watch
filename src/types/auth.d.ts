import { Session, User } from '@supabase/supabase-js'

// Example usage in your AuthContext
export interface AuthContext {
  mode: Ref<'signin' | 'signup' | 'reset'>
  email: Ref<string>
  password: Ref<string>
  showPassword: Ref<boolean>
  errorMessage: Ref<string>
  successMessage: Ref<string>
  user: Ref<User | null>
  session: Ref<Session | null>
  guestSessionId: ref<string | null>
  guestSessionExpiry: ref<string | null>
  handleAuth: (action: 'signin' | 'signup' | 'signout') => Promise<void>
  handleResetPassword: () => Promise<void>
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>
  resetForm: () => void
}
