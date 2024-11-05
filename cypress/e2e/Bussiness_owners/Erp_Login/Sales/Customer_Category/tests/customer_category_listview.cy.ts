import { SalesData } from "../../data/sales_data";
import { CustomerCategory } from "../pages/Customer_category";

describe("Customer Category List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(SalesData.customerCategoryUrl);
  });
  it("1.Verify all the Column Headers are displayed on the Listview", () => {
    CustomerCategory.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/category code/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/category name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/recievable gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/sales gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/sales return gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/discount gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(6)
        .scrollIntoView()
        .contains(/price policy/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(7)
        .scrollIntoView()
        .contains(/payment terms/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(8)
        .scrollIntoView()
        .contains(/market type/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(9)
        .scrollIntoView()
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.Verify Deleting A Customer Category", () => {
    CustomerCategory.landing();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    // Assertion
    cy.wait(500);
    
    cy.assertItemDeletedFromListView();
  });

  it("3.should filter the table based on search input in the first two columns", () => {
    CustomerCategory.landing();
    cy.wait(500);
    cy.verifySearchFunctionalityDots();
  });
});
