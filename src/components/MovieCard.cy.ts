// MovieCard.cy.ts
import MovieCard from './MovieCard.vue'

describe('<MovieCard />', () => {
  it('renders the movie title and thumbnail', () => {
    cy.mount(MovieCard, {
      props: {
        id: 123,
        title: 'Inception',
        thumbnail: 'inception.jpg',
      },
    })

    cy.get('h2').should('contain.text', 'Inception')
    cy.get('img').should('have.attr', 'src', 'inception.jpg').and('have.attr', 'alt', 'Inception')
  })

  it('navigates on click', () => {
    cy.mount(MovieCard, {
      props: {
        id: 123,
        title: 'Inception',
        thumbnail: 'inception.jpg',
      },
    })

    cy.get('.movie-card').click()

    cy.wrap(null).then(() => {
      expect(window.location.hash).to.eq('#/movie/123')
    })
  })
})
