import { PurchaseData } from "../../data/purchase_data";
import { VendorDefinition } from "../pages/vendor_Definition";

describe("Vendor Definition (Delete)", () => {
  beforeEach(() => {
    cy.visit(PurchaseData.VendorDefinitionUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    VendorDefinition.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/vendor code/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/vendor name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/vendor category/i)
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
    VendorDefinition.landing();
    cy.wait(500);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing Vendor Definition (All fields are filled)", () => {
    VendorDefinition.landing();
    cy.wait(500);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    
    cy.assertItemDeletedFromListView();
  });
});
