import { CostCenter } from "../pages/cost_center";
import { trimText } from "../../../../../../support/utils";
import { AccountingData } from "../../data/accounting_data";

describe("Displaying Cost Center", () => {
  beforeEach("Navigates to Cost Center", () => {
    cy.visit(AccountingData.CostCenterLink);
  });

  it("1.verify all components are visibe in Cost Center Screen", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.verifyMenuHeaders();
    // Verift The List Mode Is not exist
    CostCenter.verifyListModeIsNotExist();
    // verify Pi Bars Button
    CostCenter.verifyPiBarsButton();
    // verify sitemap Button
    CostCenter.verifySiteMapButton();
    CostCenter.verifyTreeAddButton();
    CostCenter.verifyTreeFilter();
    CostCenter.verifySideBarButton();
  });

  it("2.Verify that User Can Shify between Tree to List Mode", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    // Verify sitemap Button Is Active
    cy.get(".active > .pi").should("be.visible");
    // Verift The List Mode Is not exist
    cy.get("table").should("not.exist");
    // click Pi Bars Button
    cy.get('i[class="pi pi-bars"]').click();
    // Verift The List Mode Is  exist
    
    // click sitemap Button
    cy.get('i[class="pi pi-sitemap"]').click();
    // Verift The List Mode Is not exist
    cy.get("table").should("not.exist");
  });

  it("3.Verify Tree and List views have the same data", () => {
    CostCenter.landing();
    CostCenter.clickEditButton();
    cy.wait(2000);
    cy.get('lib-text-input input').eq(0).should('be.visible');
    cy.get('lib-text-input input').eq(0).invoke('removeAttr', 'readonly').invoke('removeAttr', 'disabled');
    cy.get('lib-text-input input').eq(0)
      .then(($codeEl) => {
        cy.wrap($codeEl).invoke('attr', 'placeholder').then(cCCode1 => {
          cy.log("-*/ cCCode1: " + cCCode1);
          cy.wrap(cCCode1).as(`cCCode1`);
        });
      });
    cy.get('lib-text-input input').eq(1).then(($cCName1) => {
      cy.wrap($cCName1).invoke('val').then(cCName1 => {
        cy.log("-*/ cCName1: " + cCName1);
        cy.wrap(cCName1).as(`cCName1`);
      });
    });
    cy.get('span[role="combobox"]').then(($elParent) => {
      cy.wrap($elParent).invoke('val').then((cCParent1) => {
        cy.log("-*/ parent1: " + cCParent1);
        cy.wrap(cCParent1).as('parent1');
      });
    });
    CostCenter.switchingToListView();
    cy.wait(2000);
    cy.get('@cCName1').then((cCName1) => {
      CostCenter.inputSearchList(trimText(cCName1.toString().trim()).substring(2).toString());
    });
    cy.get('@cCCode1').then((cCCode1) => {
      cy.verifyFirstCellInTable(0, trimText(cCCode1.toString().trim()).substring(2).toString());
    });
    cy.get('@cCName1').then((cCName1) => {
      cy.verifyFirstCellInTable(1, trimText(cCName1.toString().trim()).substring(2).toString());
    });
    cy.get('@parent1').then((parent1) => {
      cy.verifyFirstCellInTable(2, trimText(parent1.toString().trim()).substring(2).toString());
    });
  });
});
