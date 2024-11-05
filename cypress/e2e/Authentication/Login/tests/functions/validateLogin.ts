let _accessToken = "";
export function getAccessToken() {
  return _accessToken;
}

export function validateLogin() {
  cy.url().should("include", "bussiness-owners");
  cy.logOut();
}
