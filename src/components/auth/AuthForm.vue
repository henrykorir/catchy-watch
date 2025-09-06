<script setup lang="ts">
import { inject, Ref } from 'vue'

type Mode = 'signin' | 'signup'
type AuthContext = {
  mode: Ref<Mode>
  email: Ref<string>
  password: Ref<string>
  showPassword: Ref<boolean>
  errorMessage: Ref<string>
  handleAuth: (action: Mode) => Promise<void>
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>
  resetForm: () => void
}

const auth = inject<AuthContext>('auth')
if (!auth) throw new Error('Auth context not found')
</script>

<template>
  <div class="container">
    <div class="auth-container">
      <div class="auth-header">
        <h2>{{ auth.mode.value === 'signin' ? 'Welcome Back' : 'Create Account' }}</h2>
        <p>{{ auth.mode.value === 'signin' ? 'Sign in to continue' : 'Sign up to get started' }}</p>
      </div>

      <div class="auth-content">
        <!-- Error Message -->
        <div v-if="auth.errorMessage.value" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ auth.errorMessage.value }}
        </div>

        <!-- Auth Form -->
        <form class="auth-form" @submit.prevent="auth.handleAuth(auth.mode.value)">
          <div class="form-group">
            <label :for="`${auth.mode}-email`">Email</label>
            <input
              :id="`${auth.mode}-email`"
              v-model="auth.email.value"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div class="form-group">
            <label :for="`${auth.mode}-password`">Password</label>
            <div class="input-container">
              <input
                :id="`${auth.mode}-password`"
                v-model="auth.password.value"
                :type="auth.showPassword.value ? 'text' : 'password'"
                required
                :placeholder="auth.mode.value === 'signin' ? 'Enter your password' : 'Choose a password'"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                @click="auth.showPassword.value = !auth.showPassword.value"
              >
                <i :class="auth.showPassword.value ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <a v-if="auth.mode.value === 'signin'" href="#">Forgot password?</a>

          <button type="submit" class="btn" :class="auth.mode.value === 'signin' ? 'btn-primary' : 'btn-signup'">
            {{ auth.mode.value === 'signin' ? 'Sign In' : 'Create Account' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="divider"><span>OR</span></div>

        <!-- OAuth Buttons -->
        <div class="oauth-buttons">
          <button class="btn btn-oauth" @click="auth.signInWithProvider('google')">
            <img class="oauth-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Continue with Google
          </button>

          <button class="btn btn-oauth" @click="auth.signInWithProvider('facebook')">
            <img class="oauth-icon" src="https://www.svgrepo.com/show/475664/facebook-color.svg" alt="Facebook" />
            Continue with Facebook
          </button>
        </div>

        <!-- Footer Links -->
        <div class="auth-footer">
          <button type="button" @click="auth.mode.value = auth.mode.value === 'signin' ? 'signup' : 'signin'">
            {{ auth.mode.value === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  background: white;
  border-radius: 16px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.05),
    0 5px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.auth-header {
  padding: 32px 32px 24px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.auth-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.auth-header p {
  color: #666;
  font-size: 14px;
}

.auth-content {
  padding: 24px 32px 32px;
}

.error-message {
  background-color: #fef2f2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: 8px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input-container {
  position: relative;
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background-color: white;
}

input::placeholder {
  color: #9ca3af;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
}

.password-toggle:hover {
  color: #374151;
}

.btn {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #6b7280;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #e5e7eb;
}

.divider span {
  padding: 0 16px;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-oauth {
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.btn-oauth:hover {
  background-color: #f9fafb;
}

.btn-oauth:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.3);
}

.oauth-icon {
  width: 18px;
  height: 18px;
}

.auth-footer {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.auth-footer a,
.auth-footer button {
  color: #2563eb;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.auth-footer a:hover,
.auth-footer button:hover {
  text-decoration: underline;
}

.btn-signup {
  background-color: #059669;
}

.btn-signup:hover {
  background-color: #047857;
}

.btn-signup:focus {
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.3);
}
</style>
