import { InventoryData } from "../../data/inventory_data";
import { ItemDefinition } from "../pages/item_definition";

describe("Vendor Definition (Add Quick)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.ItemDefinitionUrl);
  });
  it("1.Verify Labels", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    cy.contains("label", /name/i).should("be.visible");
    cy.contains("label", /item category/i).should("be.visible");
    cy.contains("label", /unit of measure category/i).should("be.visible");
    cy.contains("label", /main Item Unit/i).should("be.visible");
  });

  it("2.Verify Required Validation", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1500);
    ItemDefinition.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    ItemDefinition.selectMainItemUnit();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    ItemDefinition.setName(InventoryData.itemName);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    ItemDefinition.selectUnitOfMeasureCategory();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    ItemDefinition.selectItemCategory();
    cy.verifyNotExistanceTheRequiredValidation();
    ItemDefinition.clickSaveButton();
    cy.InvisiblityofAddEditDialoge();
  });

  it("3.Verify Adding new Item Definition (Save Button) ", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    ItemDefinition.setName(InventoryData.itemName);
    ItemDefinition.selectItemCategory();
    ItemDefinition.selectUnitOfMeasureCategory();
    ItemDefinition.selectMainItemUnit();
    ItemDefinition.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });
  
  it("4.Verify Adding new Item Definition (Save & Continue Button) ", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    ItemDefinition.setName(InventoryData.itemName);
    ItemDefinition.selectItemCategory();
    ItemDefinition.selectUnitOfMeasureCategory();
    ItemDefinition.selectMainItemUnit();
    ItemDefinition.clickSaveContinueButton();
    cy.wait(1500);
    cy.get('li[role="presentation"]').should("be.visible");
  });
});
