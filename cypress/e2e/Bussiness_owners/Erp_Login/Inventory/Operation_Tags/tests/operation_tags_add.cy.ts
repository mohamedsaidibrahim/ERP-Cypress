import { InventoryData } from "../../data/inventory_data";
import { OperationTags } from "../pages/operation_tags";

describe("Add Operation Tags", () => {
  it("1.Verify All Labels", () => {
    OperationTags.landing();
    cy.wait(2000);
    cy.clickAddNewButton();
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
    cy.clickAddNewButton();
    cy.wait(1000);
    OperationTags.verifyDimmedCode();
    OperationTags.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    OperationTags.inputName();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    OperationTags.selectOperationType("in");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    OperationTags.selectwarehouse(InventoryData.warehouseAdd);
    cy.verifyNotExistanceTheRequiredValidation();
  });
  it("3. Verify Saving new Operation Tag", () => {
    OperationTags.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    cy.wait(1000);
    OperationTags.verifyDimmedCode();
    OperationTags.clickSaveButton();
    OperationTags.inputName();
    OperationTags.selectOperationType("in");
    OperationTags.selectwarehouse(InventoryData.warehouseAdd);
    OperationTags.selectglAccountAdd();
    OperationTags.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });
});
