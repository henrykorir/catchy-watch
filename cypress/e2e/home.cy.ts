describe('Home Page', () => {
  it('should display welcome text', () => {
    cy.visit('/')
    cy.contains('Welcome') // Adjust this based on actual content
  })
})
