import { InventoryData } from "../../data/inventory_data";
import { OperationTags } from "../pages/operation_tags";

describe("Edit Operation Tags", () => {
  it("1.Verify All Labels", () => {
    OperationTags.landing();
    cy.wait(2000);
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
    cy.verifyLabelText("operationType", /Operation Type/i);
    cy.verifyLabelText("warehouseId", /Warehouse Name/i);
    cy.verifyLabelText("glAccountId", /GL Account/i);
  });
  
  it("2. Verify Required Validation", () => {
    OperationTags.landing();
    cy.wait(2000);
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    OperationTags.verifyDimmedCode();
    OperationTags.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    OperationTags.inputName();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    OperationTags.selectOperationType("out");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    OperationTags.selectwarehouse(InventoryData.warehouseEdit);
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("3. Verify Saving Editing Existing Operation Tag", () => {
    OperationTags.landing();
    cy.wait(2000);
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    OperationTags.verifyDimmedCode();
    OperationTags.clickSaveButton();
    OperationTags.inputName();
    OperationTags.selectOperationType("out");
    OperationTags.selectwarehouse(InventoryData.warehouseEdit);
    OperationTags.selectglAccountEdit();
    OperationTags.clickSaveButton();
    OperationTags.assertEditting();
  });
});
