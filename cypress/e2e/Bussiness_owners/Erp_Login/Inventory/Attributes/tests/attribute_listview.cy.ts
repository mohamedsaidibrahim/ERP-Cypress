import { InventoryData } from "../../data/inventory_data";
import { Attribute } from "../pages/attribute";

describe("Attribute (Listview)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.AttributeUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/name ar/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/Name en/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/status/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/action/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.verifySearchFunctionalityDots();
  });
  it("3.Verify Deleting An Existing Attribute (All fields are filled)", () => {
    Attribute.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    
    cy.assertItemDeletedFromListView();
  });
});
