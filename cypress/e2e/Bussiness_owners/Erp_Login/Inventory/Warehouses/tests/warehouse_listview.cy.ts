import { InventoryData } from "../../data/inventory_data";
import { Warehouse } from "../pages/warehouse";

describe("Warehouse (Delete)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.WarehouseUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/Warehouse Type/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/action/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing Warehouse (All fields are filled)", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    cy.assertItemDeletedFromListView();
  });
});
