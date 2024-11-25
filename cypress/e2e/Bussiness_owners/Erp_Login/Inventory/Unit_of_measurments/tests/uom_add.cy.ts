import { InventoryData } from "../../data/inventory_data";
import { UnitOfMeasurements } from "../pages/unit_of_measurments";

describe("Unit Of Measurements (Add )", () => {

  it("1.Verify Labels", () => {
    UnitOfMeasurements.landing();
    cy.wait(3000);
    cy.clickAddNewButton();
    cy.wait(2000);
    cy.contains("p", /Category/i).should("be.visible");
    cy.contains("label", /Code/i).should("be.visible");
    cy.verifyLabelText("nameEn", /Name En/i);
    cy.verifyLabelText("nameAr", /Name Ar/i);
    cy.verifyLabelText("baseUomEn", /Name En/i);
    cy.verifyLabelText("baseUomAr", /Name Ar/i);
    cy.contains("p", /Base UOM/i).should("be.visible");
    cy.contains("label", /system Unit Base/i).should("be.visible");
    cy.contains("label", /Short Name/i).should("be.visible");
    cy.zoomOut();
    cy.get("table").then((table) => {
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/system Unit Base/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/Name En/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/Name Ar/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/Short Name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/factor/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(5).contains(/from/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(6)
        .contains(/Calculation/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(7)
        .contains(/reversal/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(8)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.Verify Cancelling new UnitOf Measurements (Cancel Button) ", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    cy.wait(2000);
    UnitOfMeasurements.inputEnNameM();
    UnitOfMeasurements.inputARNameM();
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    UnitOfMeasurements.inputEnNameB();
    UnitOfMeasurements.inputARNameB();
    UnitOfMeasurements.inputShortNameB();
    UnitOfMeasurements.clickAddNewLine();
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    UnitOfMeasurements.inputLineShortName(InventoryData.shortName);
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.CancelSubmission();
    cy.assertAfterItemEditedInListView();
  });

  it("3.Verify Adding new UnitOf Measurements --ONLY-- Required Data(Save Button) ", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    cy.wait(2000);
    UnitOfMeasurements.inputEnNameM();
    UnitOfMeasurements.inputARNameM();
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    UnitOfMeasurements.inputEnNameB();
    UnitOfMeasurements.inputARNameB();
    UnitOfMeasurements.inputShortNameB();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertnewItemAddedToListView();
  });

  it("4.Verify Adding new UnitOf Measurements (All Data) ", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    cy.wait(2000);
    UnitOfMeasurements.inputEnNameM();
    UnitOfMeasurements.inputARNameM();
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    UnitOfMeasurements.inputEnNameB();
    UnitOfMeasurements.inputARNameB();
    UnitOfMeasurements.inputShortNameB();
    UnitOfMeasurements.clickAddNewLine();
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    UnitOfMeasurements.inputLineShortName(InventoryData.shortName);
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertnewItemAddedToListView();
  });

  it("5. Verify Required Validations", () => {
    UnitOfMeasurements.landing();
    cy.clickAddNewButton();
    cy.wait(2000);
    UnitOfMeasurements.SaveTheSubmission();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(6);
    UnitOfMeasurements.inputEnNameM();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(5);
    UnitOfMeasurements.inputARNameM();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    UnitOfMeasurements.inputShortNameB();
    cy.verifyNotExistanceTheRequiredValidation();
    UnitOfMeasurements.clickAddNewLine();
    UnitOfMeasurements.SaveTheSubmission();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
