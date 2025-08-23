<<<<<<< HEAD
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
=======
describe('Home Page', () => {
  it('should display welcome text', () => {
    cy.visit('/')
    cy.contains('Welcome') // Adjust this based on actual content
>>>>>>> e8ebcd690173106c03f6d62e3b5038750e813dd6
  })
})
