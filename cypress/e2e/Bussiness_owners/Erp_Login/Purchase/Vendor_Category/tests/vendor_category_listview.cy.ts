import { PurchaseData } from "../../data/purchase_data";
import { VendorCategory } from "../pages/Vendor_category";

describe("Vendor Category List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(PurchaseData.VendorCategoryUrl);
  });
  it("1.Verify all the components are displayed on the Listview", () => {
    VendorCategory.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.zoomOut();
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
        .contains(/payable gl account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/purchase gl account /i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/purchase return gl account/i)
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
        .contains(/price list/i)
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

  it("2.should filter the table based on search input in the first two columns", () => {
    VendorCategory.landing();
    cy.wait(3000);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting A Vendor Category", () => {
    VendorCategory.landing();
    cy.zoomOut();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    // Assertion
    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });
});
