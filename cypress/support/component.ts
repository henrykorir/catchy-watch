import { mount } from 'cypress/vue'

// Tell TypeScript about the custom command
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Register it as a Cypress command
Cypress.Commands.add('mount', mount)
