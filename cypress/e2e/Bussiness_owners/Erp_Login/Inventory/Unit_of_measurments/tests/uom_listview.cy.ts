import { InventoryData } from "../../data/inventory_data";
import { UnitOfMeasurements } from "../pages/unit_of_measurments";

describe("Item Definition (Delete)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.UnitOfMeasurementsUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    UnitOfMeasurements.landing();
    cy.verifyDimmidInput("code");

    cy.zoomOut();
    cy.get("table")
      .then((table) => {
        cy.wrap(table)
          .find("th")
          .eq(0)
          .contains(/UOM Code/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(1)
          .contains(/UOM Name/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(2)
          .contains(/Short Name/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(3)
          .contains(/UOM category/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(4)
          .contains(/uom factor/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(5)
          .contains(/actions/i)
          .should("be.visible");
      });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    UnitOfMeasurements.landing();
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify Deleting An Existing Item Definition (All fields are filled)", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    cy.assertItemDeletedFromListView();
  });



});
