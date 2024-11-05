export class CompanyList {
  static clickToNavigateCompanyEdit() {
    cy.get("span.pi.pi-pencil.p-button-icon.ng-star-inserted")
      .eq(0)
      .scrollIntoView()
      .click();
    cy.wait(500);
    cy.url().should("contains", "edit");
  }
  static clickTheDeActivateSlider(row: number) {
    cy.get(
      ":nth-child(4) > :nth-child(7) > .checked > .p-element > .p-inputswitch > .p-inputswitch-slider"
    ).click();
  }
  static confirmInactivePopUp() {
    cy.get(".swal2-confirm").click({ force: true });
    cy.get(".inactive").should("be.visible");
    cy.get(".inactive").should("be.visible");
  }
  static CheckPaginator() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").length > 1) {
        cy.get(".p-paginator").should("be.visible");
        cy.get(".p-paginator-current").should("be.visible");
        cy.get(".p-dropdown-trigger").should("be.visible");
      }
    });
  }
  static clickLastActivationSliderListView() {
    cy.get('span[class="p-inputswitch-slider"]')
      .last()
      .scrollIntoView()
      .should("be.visible");
    cy.get('span[class="p-inputswitch-slider"]').last().click({ force: true });
  }
  static confirmChangeStatusPopUp() {
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).should("be.visible");
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).click();
  }
}
