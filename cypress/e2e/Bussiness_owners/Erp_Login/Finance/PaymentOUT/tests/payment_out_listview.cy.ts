import { FinanceData } from "../../data/finance_data";
import { PaymentOUT } from "../pages/payment_out";

describe("Payment OUt List View", () => {
  beforeEach("Navigate", () => {
    cy.visit(FinanceData.PaymentOUTUrl);
  });
  it("1.Verify all the Column Headers are displayed on the Listview", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      // Verify Table Column Headers
        cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
        cy.wrap(table).find("th").eq(1).contains(/date/i).should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(2)
          .contains(/payment hub/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(3)
          .contains(/payment hub detail/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(4)
          .contains(/branch/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(5)
          .contains(/bank account/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(6)
          .contains(/source document/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(7)
          .contains(/related source journal/i)
          .should("be.visible");
     
    });
  });
  it("2.Verify Deleting A Payment OUt", () => {
    PaymentOUT.landing();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    // Assertion
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    
    cy.assertAfterItemEditedInListView();
  });
  it("3.should filter the table based on search input in the first two columns", () => {
    PaymentOUT.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
