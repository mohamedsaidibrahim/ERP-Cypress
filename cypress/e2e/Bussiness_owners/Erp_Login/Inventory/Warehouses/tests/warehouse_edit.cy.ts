import { InventoryData } from "../../data/inventory_data";
import { Warehouse } from "../pages/warehouse";

describe("Warehouse(Edit)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.WarehouseUrl);
  });

  it("1.Verify Editting exist Warehouse(All fields are filled)", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    // Essential Header Data
    cy.logMsg("(Edit) Essential Header Data");
    Warehouse.setName(InventoryData.vName);
    cy.wait(750);
    Warehouse.selectWarehouseTypeTxt(InventoryData.physicalType);
    cy.wait(750);
    Warehouse.checkAllRelatedBranch();
    cy.wait(750);
    Warehouse.setGlAccountId("edit");
    Warehouse.setCashSalesAccountId("edit");
    Warehouse.setCreditSalesAccountId("edit");
    Warehouse.setSalesReturnAccountId("edit");
    Warehouse.setPurchaseAccountId("edit");
    Warehouse.setSalesCostAccountId("edit");
    Warehouse.setDiscountAccountId("edit");
    Warehouse.setEvaluationAccountId("edit");
    Warehouse.setAdjustmentAccountId("edit");
    Warehouse.setGoodsInTransitAccountId("edit");
    // Address Tab
    cy.logMsg("(Add) Address Tab");
    Warehouse.switchToAddressTab();
    Warehouse.selectCountryCode();
    Warehouse.inputPhone();
    Warehouse.setCity("edit");
    Warehouse.inputAddressLine();
    Warehouse.inputEmail();
    Warehouse.inputFax();
    Warehouse.inputPostalCode();
    Warehouse.inputLongitude();
    Warehouse.inputLatitude();
    Warehouse.inputRadius();

    Warehouse.clickSaveButton();
    
    cy.assertnewItemAddedToListView();
  });

  it("2.Verify Requird Validation", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.verifyNotExistanceTheRequiredValidation();
    Warehouse.clearName();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    Warehouse.setName(InventoryData.vName);
    cy.verifyNotExistanceTheRequiredValidation();
    Warehouse.clickSaveButton();
    cy.url().should("not.include", "edit");
  });

  it("3.Verify Labels", () => {
    Warehouse.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    Warehouse.selectWarehouseTypeTxt(InventoryData.physicalType);
    // Headers
    cy.logMsg("Labels Headers");
    cy.contains("label", /Code/i);
    cy.contains("label", /Name/i);
    cy.contains("label", /Related Branch/i);
    cy.contains("label", /Warehouse Type/i);

    // Account Tab
    cy.logMsg("Labels Account Tab");
    cy.contains("label", /GL Account/i);
    cy.contains("label", /Cash Sales Account/i);
    cy.contains("label", /Credit Sales Account/i);
    cy.contains("label", /Sales Return Account/i);
    cy.contains("label", /Purchase Account/i);
    cy.contains("label", /Sales Cost Center/i);
    cy.contains("label", /Discount Account/i);
    cy.contains("label", /Evaluation Account/i);
    cy.contains("label", /Adjustment Account/i);
    cy.contains("label", /Goods In Transit/i);

    Warehouse.switchToAddressTab();
    cy.contains("label", /company Phone Number/i);
    cy.contains("label", /address Line/i);
    cy.contains("label", /city/i);
    cy.contains("label", /email/i);
    cy.contains("label", /fax/i);
    cy.contains("label", /postal Code/i);
    cy.contains("label", /longitude/i);
    cy.contains("label", /latitude/i);
    cy.contains("label", /radius/i);
  });
});
