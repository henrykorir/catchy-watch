import SearchResultsView from './SearchResultsView.vue'

describe('<SearchResultsView />', () => {
  it('renders results when TMDB returns movies', () => {
    cy.intercept('GET', '**/search/movie*', {
      statusCode: 200,
      body: {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [
          {
            id: 101,
            title: 'Inception',
            overview: 'A mind-bending thriller.',
            release_date: '2010-07-16',
            poster_path: '/inception.jpg',
          },
        ],
      },
    }).as('search')

    cy.mount(SearchResultsView, {
      props: { queryParams: new URLSearchParams({ query: 'inception' }) },
    })

    cy.wait('@search')
    cy.contains('Results for').should('contain.text', 'inception')
    cy.contains('Inception').should('exist')
  })
})
