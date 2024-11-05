import { InventoryData } from "../../data/inventory_data";
import { OperationTags } from "../pages/operation_tags";

describe("OperationTags (Delete)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.operationalTag);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    OperationTags.landing();
    cy.wait(1500);
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table).find("th").eq(2).contains(/type/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/category/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(4).contains(/uom/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    OperationTags.landing();
    cy.wait(1500);
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing OperationTags (All fields are filled)", () => {
    OperationTags.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    cy.assertItemDeletedFromListView();
  });
});
