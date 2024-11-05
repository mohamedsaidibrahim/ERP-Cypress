export class ChartOfAccountsConfigurations {
  static clickConfigurationButtonOnDisplayScreen() {
    cy.contains("button", /configuration/i)
      .should("be.visible")
      .should("be.enabled")
      .click();
  }
  static clickAddNewLine() {
    cy.get(".add_line > .icon").scrollIntoView();
    // Scroll the element into view
    cy.get(".add_line > .icon").scrollIntoView().should("be.visible").click();
  }

  static clickSaveButton() {
    cy.get("div[role='dialog']").find("[data-testid='save']").last().scrollIntoView().click();
  }

  static clickcancelButton() {
    cy.get(".pop_up_footer").invoke("css", "display", "block");
    // Wait for overlay to disappear
    // Ensure the button is visible and enabled
    cy.getByTestAttribute("cancel").click();
  }

  static clickCancelButton() {
    cy.get("div[role='dialog']").find("[data-testid='cancel']").last().scrollIntoView().click();
  }
}
