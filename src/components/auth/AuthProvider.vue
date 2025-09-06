<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../../lib/supabase-auth'

type Mode = 'signin' | 'signup' | 'reset'

// Reactive state
const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const user = ref<any>(null)
const session = ref<any>(null)

// Reset form
function resetForm() {
  email.value = ''
  password.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  showPassword.value = false
}

// Handle signin / signup
async function handleAuth(action: 'signin' | 'signup') {
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
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      session.value = data.session
      user.value = data.user
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

  const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession
    user.value = newSession?.user ?? null
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
  handleAuth,
  handleResetPassword,
  signInWithProvider,
  resetForm,
})
</script>

<template>
  <slot />
</template>
