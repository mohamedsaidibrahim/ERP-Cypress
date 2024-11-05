import { FinanceData } from "../../data/finance_data";
import { PaymentMethods } from "../pages/payment_methods";

describe("payment method List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(FinanceData.PaymentMethodsUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    PaymentMethods.landing();
    cy.wait(1500);
    cy.get("span")
      .should("be.visible")
      .should("include", /payment method/i);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/payment place/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/payment method type/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/actions/i)
        .should("be.visible");
    });
  });
  it("2.Verify Deleting A payment method", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    PaymentMethods.confirmDeleteDialog();
    // Assertion
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });
  it("3.should filter the table based on search input in the first two columns", () => {
    PaymentMethods.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
