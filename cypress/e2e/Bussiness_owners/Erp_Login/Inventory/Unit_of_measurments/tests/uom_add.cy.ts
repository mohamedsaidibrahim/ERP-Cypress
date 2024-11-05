import { InventoryData } from "../../data/inventory_data";
import { UnitOfMeasurements } from "../pages/unit_of_measurments";

describe("Unit Of Measurements (Add )", () => {
  beforeEach(() => {
    cy.visit(InventoryData.UnitOfMeasurementsUrl);
  });
  it("1.Verify Labels", () => {
    UnitOfMeasurements.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1000);
    cy.contains("label", /Category Code/i).should("be.visible");
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/UOM Code/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/Name Ar/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/Name En/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/Short Name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/UOM Type/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/conversion UOM/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(6)
        .contains(/Conversion Ratio	/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(7)
        .contains(/actions/i)
        .should("be.visible");
    });
  });
  
  it("2.Verify Adding new UnitOf Measurements (Save Button) ", () => {
    UnitOfMeasurements.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1000);
    UnitOfMeasurements.verifyDimmedAddNewButton();
    UnitOfMeasurements.selectUomCodeCategory();
    UnitOfMeasurements.clickAddNewButton();
    UnitOfMeasurements.inputuomCode();
    UnitOfMeasurements.inputNameEn();
    UnitOfMeasurements.inputNameAr();
    UnitOfMeasurements.inputShortName();
    UnitOfMeasurements.selectUomType();
    // Verify Required Validation
    UnitOfMeasurements.verifyMissingSaveLineButton();
    UnitOfMeasurements.selectConversionUOM();
    UnitOfMeasurements.verifyVisibilitySaveLineButton();
    UnitOfMeasurements.inputUomRatio();
    UnitOfMeasurements.clickSaveLineButton();
  });
});
