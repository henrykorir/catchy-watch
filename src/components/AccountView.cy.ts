import AccountView from './AccountView.vue'
import { ref } from 'vue'
import type { AuthContext } from '../types/auth'

describe('<AccountView />', () => {
  let auth: AuthContext

  beforeEach(() => {
    // Build fake auth context
    auth = {
      user: ref({ id: 'user1', role: 'authenticated' }),
      handleAuth: cy.stub().as('handleAuth'), // ✅ inside beforeEach
      handleResetPassword: cy.stub().as('handleResetPassword'),
      signInWithProvider: cy.stub().as('signInWithProvider'),
      resetForm: cy.stub().as('resetForm'),
      mode: undefined,
      email: undefined,
      password: undefined,
      showPassword: undefined,
      errorMessage: undefined,
      successMessage: undefined,
      session: undefined,
      guestSessionId: undefined,
      guestSessionExpiry: undefined,
    }
  })

  it('renders AccountView with Watchlist as default', () => {
    cy.mount(AccountView, {
      global: { provide: { auth } },
    })

    cy.contains('Watchlist').should('exist')
  })

  it('calls handleAuth when logout is clicked', () => {
    cy.mount(AccountView, {
      global: { provide: { auth } },
    })

    // Switch to settings tab
    cy.contains('Settings').click()
    cy.contains('Logout').click()

    cy.get('@handleAuth').should('have.been.calledWith', 'signout')
  })
})
