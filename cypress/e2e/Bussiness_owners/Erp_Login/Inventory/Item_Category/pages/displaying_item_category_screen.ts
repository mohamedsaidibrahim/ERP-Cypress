export class DisplayingCategoryScreen {
  static verifyDisplayingTheCorrectLabelViewMode() {
    cy.contains("span", /main/i);
    cy.contains("label", /code/i);
    cy.contains("label", /nameEn/i);
    cy.contains("label", /nameAr/i);
    cy.contains("label", /is Detail/i);
    cy.contains("label", /category Type/i);
    cy.contains("span", /account/i);
    cy.contains("label", /GL Account/i);
    cy.contains("label", /Cash Sales Account/i);
    cy.contains("label", /credit Sales Account/i);
    cy.contains("label", /sales Return Account/i);
    cy.contains("label", /purchase Account/i);
    cy.contains("label", /sales Cost Account/i);
    cy.contains("label", /discount Account/i);
    cy.contains("label", /evaluation Account/i);
    cy.contains("label", /adjustment Account/i);
    cy.contains("label", /goods In Transit/i);
  }
  static verifyDisplayingTheCorrectLabelEditMode() {
    cy.contains("span", /main/i);
    cy.contains("label", /code/i);
    cy.contains("label", /nameEn/i);
    cy.contains("label", /nameAr/i);
    cy.contains("label", /is Detail/i);
    cy.contains("label", /category Type/i);
    cy.contains("span", /account/i);
    cy.contains("label", /GL Account/i);
    cy.contains("label", /Cash Sales Account/i);
    cy.contains("label", /credit Sales Account/i);
    cy.contains("label", /sales Return Account/i);
    cy.contains("label", /purchase Account/i);
    cy.contains("label", /sales Cost Account/i);
    cy.contains("label", /discount Account/i);
    cy.contains("label", /evaluation Account/i);
    cy.contains("label", /adjustment Account/i);
    cy.contains("label", /goods In Transit/i);
  }
}
