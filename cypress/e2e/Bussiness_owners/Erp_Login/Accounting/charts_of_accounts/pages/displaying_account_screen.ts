export class DisplayingAccountScreen {
  static verifyDisplayingTheCorrectDataInAccountView() {
    // Verify Account Code Label
    cy.contains("label", /Account Code/i).should("be.visible");
    // Verify Name Label
    cy.contains("label", /Name/i).should("be.visible");
    // Verify Level Label
    cy.contains("label", /Level/i).should("be.visible");
    // Verify  Account Nature Label
    cy.contains("label", /Account Nature/i).should("be.visible");
    // verify Account Section Label
    cy.contains("label", /Account Section/i).should("be.visible");
    // Verify Account Type Label
    cy.contains("label", /Account Type/i).should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /Main/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /Account/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /detail/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /Account Activation/i)
      .scrollIntoView()
      .should("be.visible");
  }
  static verifyDisplayingTheCorrectDataInAccountEditting() {
    // Verify Account Code Label
    cy.contains("label", /Account Code/i).should("be.visible");
    // Verify Name Label
    cy.contains("label", /Name/i).should("be.visible");
    // Verify Level Label
    cy.contains("label", /Level/i).should("be.visible");
    cy.contains("label", /parent name/i).should("be.visible");
    cy.contains("label", /parent account code/i).should("be.visible");
    // Verify  Account Nature Label
    cy.contains("label", /Account Nature/i).should("be.visible");
    // verify Account Section Label
    cy.contains("label", /Account Section/i).should("be.visible");
    // Verify Account Type Label
    cy.contains("label", /Account Type/i).should("be.visible");
    cy.contains("label", /tags/i).should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /account code/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /parent account/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /Account/i)
      .scrollIntoView()
      .should("be.visible");

    cy.contains(
      'span[data-pc-section="legendtitle"]',
      /Cost Center Configuration/i
    )
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /detail/i)
      .scrollIntoView()
      .should("be.visible");
    cy.contains('span[data-pc-section="legendtitle"]', /Account Activation/i)
      .scrollIntoView()
      .should("be.visible");
  }
}
