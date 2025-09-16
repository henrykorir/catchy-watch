<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../../lib/supabase-auth'

type Mode = 'signin' | 'signup' | 'reset'

// ✅ Read env variables
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_URL || 'https://api.themoviedb.org/3'

// Reactive state
const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const user = ref<any>(null)
const session = ref<any>(null)
const guestSessionId = ref<string | null>(null)
const guestSessionExpiry = ref<string | null>(null)

// Reset form
function resetForm() {
  email.value = ''
  password.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  showPassword.value = false
}

// Create a TMDB guest session
async function createGuestSession() {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/authentication/guest_session/new?api_key=${TMDB_API_KEY}`,
    )
    const json = await res.json()
    if (!json.success) throw new Error('Failed to create TMDB guest session')
    guestSessionId.value = json.guest_session_id
    guestSessionExpiry.value = json.expires_at

    // Optional: persist in Supabase for cross-device use
    if (user.value?.id) {
      await supabase.from('user_sessions').insert({
        user_id: user.value.id,
        session_token: guestSessionId.value,
      })
    }
  } catch (err: any) {
    console.error('TMDB guest session error:', err)
  }
}

// Handle signin / signup
async function handleAuth(action: 'signin' | 'signup' | 'signout') {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (action === 'signin') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      session.value = data.session
      user.value = data.user
      await createGuestSession()
    } else if (action === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      session.value = data.session
      user.value = data.user
      await createGuestSession()
    } else {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      resetForm()
      user.value = null
      session.value = null
      guestSessionId.value = null
      guestSessionExpiry.value = null
      window.location.hash = '#/recommendation'
    }
    resetForm()
  } catch (err: any) {
    errorMessage.value = err.message
  }
}

// Handle reset password request
async function handleResetPassword() {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: window.location.origin + '/#/update-password',
    })
    if (error) throw error
    successMessage.value = 'Password reset email sent! Check your inbox.'
    resetForm()
  } catch (err: any) {
    errorMessage.value = err.message
  }
}

// OAuth providers
async function signInWithProvider(provider: 'google' | 'facebook') {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/#/account',
      },
    })
    if (error) throw error
    resetForm()
    // After redirect, Supabase will set user/session. Call createGuestSession then.
  } catch (err: any) {
    errorMessage.value = err.message
  }
}

// Track auth state changes
let unsubscribe: () => void

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  user.value = data.session?.user ?? null

  if (user.value) {
    await createGuestSession()
  }

  const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession
    user.value = newSession?.user ?? null
    if (user.value) {
      createGuestSession()
    }
  })
  unsubscribe = listener.subscription.unsubscribe
})

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe()
})

// Expose context
provide('auth', {
  mode,
  email,
  password,
  showPassword,
  errorMessage,
  successMessage,
  user,
  session,
  guestSessionId,
  guestSessionExpiry,
  handleAuth,
  handleResetPassword,
  signInWithProvider,
  resetForm,
})
</script>

<template>
  <slot />
</template>
