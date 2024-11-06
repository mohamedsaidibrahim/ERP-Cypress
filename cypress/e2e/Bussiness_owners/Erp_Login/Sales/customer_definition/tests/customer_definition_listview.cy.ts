import { SalesData } from "../../data/sales_data";
import { CustomerDefinition } from "../pages/customer_Definition";

describe("Customer Definition (Delete)", () => {
  beforeEach(() => {
    cy.visit(SalesData.CustomerDefinitionUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    CustomerDefinition.landing();
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/Customer code/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/Customer name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/Customer category/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(3).contains(/email/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/country/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/payment term/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(6)
        .scrollIntoView()
        .contains(/credit limit/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(7)
        .scrollIntoView()
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    CustomerDefinition.landing();
    cy.wait(1000);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing Customer Definition (All fields are filled)", () => {
    CustomerDefinition.landing();
    cy.clickFirstDeleteActionButton();
    cy.wait(2000);
    cy.confirmDeletePopUp();
    CustomerDefinition.assertSuccessfulDeletion();
  });
});
