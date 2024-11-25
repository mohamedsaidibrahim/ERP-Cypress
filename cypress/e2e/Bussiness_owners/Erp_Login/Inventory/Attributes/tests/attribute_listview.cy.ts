import { InventoryData } from "../../data/inventory_data";
import { Attribute } from "../pages/attribute";

describe("Attribute (Listview)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.AttributeUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    cy.wait(2000);
    Attribute.landing();
    cy.wait(1000);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/Attribute/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/value/i)
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
    cy.wait(3000);
    Attribute.verifySearchFunctionality();
  });

  it("3.Verify Deleting An Existing Attribute (All fields are filled)", () => {
    Attribute.landing();
    cy.wait(3000);
    cy.getInitItemsCountInListView();
    Attribute.clickFirstListViewDeleteButton();
    cy.confirmDeletePopUp();
    cy.assertItemDeletedFromListView();
  });
});
