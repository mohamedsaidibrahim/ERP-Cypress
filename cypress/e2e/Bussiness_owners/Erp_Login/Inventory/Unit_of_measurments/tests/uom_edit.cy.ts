import { generateRandomString } from "../../../../../../support/utils";
import { InventoryData } from "../../data/inventory_data";
import { UnitOfMeasurements } from "../pages/unit_of_measurments";

describe("Unit Of Measurements (Add )", () => {

  it("1.Verify Labels", () => {
    UnitOfMeasurements.landing();
    cy.wait(3000);
    cy.clickFirstEditActionButton();
    cy.wait(1500);
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
    UnitOfMeasurements.editPreCondition();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    UnitOfMeasurements.inputEnNameM();
    UnitOfMeasurements.inputARNameM();
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    UnitOfMeasurements.inputEnNameB();
    UnitOfMeasurements.inputARNameB();
    UnitOfMeasurements.inputShortNameB();
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    UnitOfMeasurements.inputLineShortName(InventoryData.shortName);
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.CancelSubmission();
    cy.assertAfterItemEditedInListView();
    UnitOfMeasurements.assertNotEditting();
  });

  it("3.Verify Adding new UnitOf Measurements Base UOM --ONLY-- Required Data(Save Button) ", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    UnitOfMeasurements.editPreCondition();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    UnitOfMeasurements.inputEnNameM();
    UnitOfMeasurements.inputARNameM();
    UnitOfMeasurements.selectSystemUnitOfMeasure("k");
    UnitOfMeasurements.inputEnNameB();
    UnitOfMeasurements.inputARNameB();
    UnitOfMeasurements.inputShortNameB();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertAfterItemEditedInListView();
    UnitOfMeasurements.assertSubmitEdittingTheBaseUOM();
  });

  it("4.Verify Adding new UnitOf Measurements Adding New Lines (All Data) ", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    UnitOfMeasurements.editPreCondition();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    UnitOfMeasurements.clickAddNewLine();
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(generateRandomString(9));
    UnitOfMeasurements.inputLineNameAr(generateRandomString(10));
    UnitOfMeasurements.inputLineShortName(generateRandomString(3));
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio2);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.clickAddNewLine();
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    UnitOfMeasurements.inputLineShortName(InventoryData.shortName);
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertAfterItemEditedInListView();
    UnitOfMeasurements.assertSubmitEdittingSystemUnitBaseLine();
  });

  it("5.Verify Deleting All Existing Lines", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    UnitOfMeasurements.editPreCondition();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    UnitOfMeasurements.deleteAllLines();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertAfterItemEditedInListView();
    UnitOfMeasurements.assertSubmitEdittingTheBaseUOM();
  });

  it("6.Editing Existing Lines", () => {
    UnitOfMeasurements.landing();
    cy.getInitItemsCountInListView();
    UnitOfMeasurements.editPreCondition();
    cy.clickAddNewButton();
    cy.wait(2000);
    UnitOfMeasurements.selectSystemUnitOfMeasureLine();
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    UnitOfMeasurements.inputLineShortName(InventoryData.shortName);
    UnitOfMeasurements.inputLineUomFactor(InventoryData.ratio);
    UnitOfMeasurements.selectFromUnitOfMeasureId();
    UnitOfMeasurements.SaveTheSubmission();
    UnitOfMeasurements.confirmTheSubmissionSuccessMessage();
    cy.assertAfterItemEditedInListView();
    UnitOfMeasurements.assertSubmitEdittingSystemUnitBaseLine();
  });

  it("7. Verify Required Validations", () => {
    UnitOfMeasurements.landing();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    UnitOfMeasurements.clearEnNameM();
    UnitOfMeasurements.clearARNameM();
    UnitOfMeasurements.clearARNameB();
    UnitOfMeasurements.clearEnNameB();
    UnitOfMeasurements.clearShortNameB();
    UnitOfMeasurements.clearLineNameEn();
    UnitOfMeasurements.clearLineNameAr();
    UnitOfMeasurements.SaveTheSubmission();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(7);
    UnitOfMeasurements.inputEnNameM();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(6);
    UnitOfMeasurements.inputARNameM();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(5);
    UnitOfMeasurements.inputARNameB();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    UnitOfMeasurements.inputEnNameB();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    UnitOfMeasurements.inputShortNameB();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    UnitOfMeasurements.inputLineNameEn(InventoryData.nameEn);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    UnitOfMeasurements.inputLineNameAr(InventoryData.nameAr);
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
