// NotFound.cy.ts
import NotFound from './NotFound.vue'

describe('<NotFound />', () => {
  beforeEach(() => {
    cy.mount(NotFound)
  })

  it('renders the not found message', () => {
    cy.contains("Oops! We can't find the page you're looking for").should('exist')
    cy.contains('The page may have been moved or deleted.').should('exist')
  })

  it('has a link back to home', () => {
    cy.get('a').should('have.attr', 'href', '#/recommendation').and('contain.text', 'Go Home')
  })

  it('navigates home when link is clicked', () => {
    cy.get('a').click()
    cy.wrap(null).then(() => {
      expect(window.location.hash).to.eq('#/recommendation')
    })
  })
})
