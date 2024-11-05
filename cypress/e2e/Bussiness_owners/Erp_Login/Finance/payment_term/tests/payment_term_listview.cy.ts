import { FinanceData } from "../../data/finance_data";
import { PaymentTerm } from "../pages/payment_term";

describe("payment term List View", () => {
  beforeEach("Navigate", () => {
    cy.visit(FinanceData.paymentTermUrl);
  });
  
  it("1.Verify all the Colmn Headers are displayed on the Listview", () => {
    PaymentTerm.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.Verify Deleting A payment term", () => {
    PaymentTerm.landing();
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    PaymentTerm.confirmDeleteDialog();
    cy.wait(1000);
    cy.assertItemDeletedFromListView();
  });
  
  it("3.should filter the table based on search input in the first two columns", () => {
    PaymentTerm.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
