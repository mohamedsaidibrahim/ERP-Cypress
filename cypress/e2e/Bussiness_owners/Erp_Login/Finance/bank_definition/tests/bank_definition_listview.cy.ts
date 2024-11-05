import { FinanceData } from "../../data/finance_data";
import { BankDefinition } from "../pages/bank_definition";

describe("bank definition List View", () => {
  beforeEach("Navigate", () => {
    cy.visit(FinanceData.BankDefinitionUrl);
  });

  it("1.Verify all the Column Headers are displayed on the Listview", () => {
    BankDefinition.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/short name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.Verify Deleting A bank definition", () => {
    BankDefinition.landing();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    BankDefinition.confirmDeleteDialog();
    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });

  it("3.should filter the table based on search input in the first two columns", () => {
    BankDefinition.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
