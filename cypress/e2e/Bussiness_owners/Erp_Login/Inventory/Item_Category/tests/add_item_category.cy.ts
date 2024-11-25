import { InventoryData } from "../../data/inventory_data";
import { AddingCategoryScreen } from "../pages/adding_item_category_screen";
import { ItemCategory } from "../pages/item_category";

describe("Adding Item of Category", () => {
  beforeEach("Navigates to Item of Category", () => {
    cy.visit(InventoryData.ItemCategoryUrl);
  });
  it("1.Verify All Labels ", () => {
    ItemCategory.landing();
    cy.wait(1500);
    AddingCategoryScreen.clickAddNewButton();
    cy.wait(1000);
    cy.contains("span", /Main/i).should("be.visible");
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("nameEn", /nameEn/i);
    cy.verifyLabelText("nameAr", /nameAr/i);
    cy.verifyLabelText("isDetailed", /is Detailed/i);
    cy.contains("span", /Parent Category/i).should("be.visible");
    cy.verifyLabelText("parentCategoryId", /Parent Category/i);
    cy.contains("span", /Activation/i).should("be.visible");
    ItemCategory.clickISDetailedSwitch();
    cy.verifyLabelText("categoryType", /Category Type/i);
    cy.contains("span", /account/i).should("be.visible");
    // Deactivate
    ItemCategory.clickActivationStatus();
    cy.verifyLabelText("purchaseAccountId", /Purchase Account/i);
    // Activate Again
    ItemCategory.clickActivationStatus();
    cy.verifyLabelText("costOfGoodSoldAccountId", /Cost Of Goods Sold/i);
  });

  it("2.Verify Adding new Parent Item of Category WITHOUT PARENT", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.getInitItemsCountInListView();
    cy.wait(1000);
    ItemCategory.verifyTheListViewMissingTheParentCategory(InventoryData.itemCategoryNameEn);
    ItemCategory.switchingToTreeView();
    cy.wait(2000);
    AddingCategoryScreen.clickAddNewButton();
    cy.wait(2000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn);
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr);
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.assertnewItemAddedToListView();
    ItemCategory.verifyTheListViewHasTheParentCategory(InventoryData.itemCategoryNameEn);
  });

  it("3.Verify Adding new Parent Item of Category HAS PARENT", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.getInitItemsCountInListView();
    cy.wait(1500);
    ItemCategory.verifyTheListViewMissingTheParentCategory(InventoryData.itemCategoryNameEn + "TC3");
    ItemCategory.switchingToTreeView();
    cy.wait(2500);
    AddingCategoryScreen.clickAddNewButton();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectParentCategory();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn + "TC3");
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr + "TC3");
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.assertnewItemAddedToListView();
    ItemCategory.verifyTheListViewHasTheParentCategory(InventoryData.itemCategoryNameEn + "TC3");
  });

  it("4.Verify Adding new Detail Item of Category", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.getInitItemsCountInListView();
    cy.wait(1000);
    ItemCategory.verifyTheListViewMissingTheDetailedCategory(InventoryData.itemCategoryNameEn+ "TC4");
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    AddingCategoryScreen.clickAddNewButton();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectParentCategory();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn + "TC4");
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr + "TC4");
    ItemCategory.clickISDetailedSwitch();
    AddingCategoryScreen.selectCostOfGoodSoldAccount();
    AddingCategoryScreen.selectCategoryType();
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.selectpurchaseAccount();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.assertnewItemAddedToListView();
    ItemCategory.verifyTheListViewHasTheDetailedCategory(InventoryData.itemCategoryNameEn+ "TC4");
  });

  it("5. Verify Required Validation", () => {
    ItemCategory.landing();
    cy.wait(1500);
    AddingCategoryScreen.clickAddNewButton();
    cy.wait(1000);
    cy.verifyNotExistanceTheRequiredValidation();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1000);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr);
    cy.verifyNotExistanceTheRequiredValidation();
    ItemCategory.clickISDetailedSwitch();
    cy.wait(1000);
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1000);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    AddingCategoryScreen.selectCostOfGoodSoldAccount();
    AddingCategoryScreen.selectCategoryType();
    AddingCategoryScreen.verifyCancelButton();
    cy.wait(1000);
    AddingCategoryScreen.selectCategoryType();
    cy.wait(1000);
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
