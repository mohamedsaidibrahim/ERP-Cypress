import { FinanceData } from "../../data/finance_data";
import { TreasuryDefinition } from "../pages/treasury_definition";

describe("Treasury definition List View", () => {
  beforeEach("Navigate", () => {
    cy.visit(FinanceData.TreasuryDefinitionUrl);
  });

  it("1.Verify all the Column Headers are displayed on the Listview", () => {
    TreasuryDefinition.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/treasury code/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/treasury name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/currency/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/balance/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    TreasuryDefinition.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });

  it("3.Verify Deleting A Treasury definition", () => {
    TreasuryDefinition.landing();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });
});
