export class DisplayingMainScreen {
  static verifyAllElementsOnTheTop() {
    cy.get(".p-menuitem-icon").should("be.visible");
    cy.get(".p-menuitem-text").should("be.visible");
    cy.get(".p-menuitem-text").should("include", /Chart of Account/i);

    cy.get(".ng-star-inserted > .btn").should("be.visible");
    cy.get(".ng-star-inserted > .btn").should("be.enabled");
    cy.get(".ng-star-inserted > .btn").should("include", /Configuration/i);

    cy.get(".import").should("be.visible");
    cy.get(".import").should("be.enabled");
    cy.get(".import").should("include", /import/i);

    cy.get(":nth-child(3) > .pi").should("have.class", "pi-bars");
    cy.get(".actions > :nth-child(3)").should("be.visible");

    cy.get(".active > .pi").should("be.visible");
    cy.get(".active > .pi").should("have.class", "pi");
    cy.get(".active > .pi").should("have.class", "pi-sitemap");
  }

  static verifyEmptyViewPanal() {
    cy.get(".md\\:col-8").should("be.visible");
  }

 

}
