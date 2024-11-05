import { getWrappedNumber } from "../../../../../../support/utils";
import { InventoryData } from "../../data/inventory_data";
import { ItemDefinition } from "../pages/item_definition";

describe("Item Definition (Delete)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.ItemDefinitionUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/name/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/type/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/category/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(3).contains(/uom/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/barcode/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    ItemDefinition.landing();
    cy.wait(500);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing Item Definition (All fields are filled)", () => {
    ItemDefinition.landing();
    cy.wait(500);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    
    cy.assertItemDeletedFromListView();
  });
});
