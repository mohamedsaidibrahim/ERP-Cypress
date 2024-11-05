// cypress/support/index.ts

import "./commands";
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')

// beforeEach(() => {
//   cy.loginSession();
// });
// Use beforeEach to conditionally run the loginSession command
beforeEach(function () {
  // Only run the loginSession command if the test file is not in the "Authentication/Login/tests" directory
  if (!this.test?.file?.includes("Authentication")) {
    cy.loginSession();
  }
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});
