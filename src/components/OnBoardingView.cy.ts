import { ref, nextTick } from 'vue'
import OnBoardingView from './OnBoardingView.vue'
import { AuthContext } from '../types/auth'

function createAuth(user: { id: number; role: string } | null): AuthContext {
  return {
    user: ref(user),
    mode: undefined,
    email: undefined,
    password: undefined,
    showPassword: undefined,
    errorMessage: undefined,
    successMessage: undefined,
    session: undefined,
    guestSessionId: undefined,
    guestSessionExpiry: undefined,
    handleAuth: async () => {},
    handleResetPassword: async () => {},
    signInWithProvider: async () => {},
    resetForm: () => {},
  }
}

describe('<OnBoardingView />', () => {
  beforeEach(() => {
    window.location.hash = ''
  })

  it('renders hero content for guests', () => {
    const auth = createAuth(null)

    cy.mount(OnBoardingView, {
      global: { provide: { auth } },
    })

    cy.contains('CatchyWatch').should('exist')
    cy.contains('Vast Movie Library').should('exist')
    cy.contains('Get Started').should('have.attr', 'href', '#/recommendation')
  })

  it('redirects immediately if already authenticated on mount', () => {
    const auth = createAuth({ id: 1, role: 'authenticated' })

    cy.mount(OnBoardingView, {
      global: { provide: { auth } },
    })

    cy.wrap(null).should(() => {
      expect(window.location.hash).to.eq('#/recommendation')
    })
  })

  it('redirects when user logs in after mount', () => {
    const auth = createAuth(null)

    cy.mount(OnBoardingView, {
      global: { provide: { auth } },
    })

    // Initially no redirect
    cy.wrap(null).should(() => {
      expect(window.location.hash).to.eq('')
    })

    // Simulate login and flush Vue reactivity
    cy.then(async () => {
      auth.user.value = { id: 1, role: 'authenticated' }
      await nextTick()
    })

    // Now expect redirect
    cy.wrap(null).should(() => {
      expect(window.location.hash).to.eq('#/recommendation')
    })
  })
})
