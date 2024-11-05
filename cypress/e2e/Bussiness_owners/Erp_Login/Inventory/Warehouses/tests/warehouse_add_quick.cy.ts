import { InventoryData } from "../../data/inventory_data";
import { Warehouse } from "../pages/warehouse";

describe("Warehouse (Add Quick)", () => {
  beforeEach(() => {
    Warehouse.landing();
  });

  it("1.Verify Labels", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.contains("label", /name/i).should("be.visible");
    cy.contains("label", /default Branch /i).should("be.visible");
    cy.contains("label", /Warehouse Type/i).should("be.visible");
  });

  it("2.Verify Required Validation", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1500);
    Warehouse.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);

    Warehouse.selectWarehouseTypeTxt(InventoryData.physicalType);;
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);

    Warehouse.selectBranchWarehousesTxt();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);

    Warehouse.setName(InventoryData.itemName);
    cy.verifyNotExistanceTheRequiredValidation();

    Warehouse.clickSaveButton();
    cy.InvisiblityofAddEditDialoge();
  });

  it("3.Verify Adding new Warehouse (Save Button) ", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    cy.wait(1500);
    Warehouse.selectWarehouseTypeTxt(InventoryData.physicalType);;
    Warehouse.selectBranchWarehousesTxt();
    Warehouse.setName(InventoryData.itemName);
    Warehouse.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });

  it("4.Verify Adding new Warehouse (Save & Continue Button) ", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1500);
    Warehouse.selectWarehouseTypeTxt(InventoryData.physicalType);;
    Warehouse.selectBranchWarehousesTxt();
    Warehouse.setName(InventoryData.itemName);
    Warehouse.clickSaveContinueButton();
    cy.wait(1500);
    cy.get('li[role="presentation"]').should("be.visible");
  });
});
