<script setup lang="ts">
import { ref, provide } from 'vue'
import { supabase } from '../../lib/supabase-auth'

type Mode = 'signin' | 'signup'

// Reactive state
const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

// Reset form
function resetForm() {
  email.value = ''
  password.value = ''
  errorMessage.value = ''
  showPassword.value = false
}

// Handle signin / signup
async function handleAuth(action: Mode) {
  errorMessage.value = ''
  try {
    if (action === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
    }
    resetForm()
  } catch (err: any) {
    errorMessage.value = err.message
  }
}

// OAuth providers (Google, Facebook, etc.)
async function signInWithProvider(provider: 'google' | 'facebook') {
  errorMessage.value = ''
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/#/account',
      },
    })
    if (error) throw error
  } catch (err: any) {
    errorMessage.value = err.message
  }
}

// Expose context
provide('auth', {
  mode,
  email,
  password,
  showPassword,
  errorMessage,
  handleAuth,
  signInWithProvider,
  resetForm,
})
</script>

<template>
  <slot />
</template>
