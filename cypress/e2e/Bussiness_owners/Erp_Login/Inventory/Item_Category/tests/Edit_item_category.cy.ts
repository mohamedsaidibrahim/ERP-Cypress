import { InventoryData } from "../../data/inventory_data";
import { AddingCategoryScreen } from "../pages/adding_item_category_screen";
import { ItemCategory } from "../pages/item_category";
import { getWrappedString } from "../../../../../../support/utils";

describe("Editting Item of Category", () => {
  beforeEach("Navigates to Item of Category", () => {
    cy.visit(InventoryData.ItemCategoryUrl);
  });

  it("1.Verify All Labels in Detailed Category", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getDetailedCategoryInTheListViewMissing();
    ItemCategory.switchingToTreeView();
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(detailedCategory));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1500);
    cy.contains("span", /Main/i).should("be.visible");
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("nameEn", /nameEn/i);
    cy.verifyLabelText("nameAr", /nameAr/i);
    cy.verifyLabelText("isDetailed", /is Detailed/i);
    cy.contains("span", /Parent Category/i).should("be.visible");
    cy.verifyLabelText("parentCategoryId", /Parent Category/i);
    cy.contains("span", /Activation/i).should("be.visible");
    cy.verifyLabelText("categoryType", /Category Type/i);
    cy.contains("span", /account/i).should("be.visible");
    // Deactivate
    ItemCategory.clickActivationStatus();
    cy.verifyLabelText("purchaseAccountId", /Purchase Account/i);
    // Activate Again
    ItemCategory.clickActivationStatus();
    cy.verifyLabelText("costOfGoodSoldAccountId", /Cost Of Goods Sold/i);
  });

  it("2.Verify All Labels in Parent Category", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getFirstParentCategoryInTheListView();
    ItemCategory.switchingToTreeView();
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(parentCategory));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1500);
    cy.contains("span", /Main/i).should("be.visible");
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("nameEn", /nameEn/i);
    cy.verifyLabelText("nameAr", /nameAr/i);
    cy.verifyLabelText("isDetailed", /is Detailed/i);
    cy.contains("span", /Parent Category/i).should("be.visible");
    cy.verifyLabelText("parentCategoryId", /Parent Category/i);
    cy.contains("span", /Activation/i).should("be.visible");
  });

  it("3. Verify Editting an Detailed Item of Category", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getDetailedCategoryInTheListViewMissing();
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.SearchAListAccount(getWrappedString(detailedCategory));
    });
    cy.getFirstCellInTableValue(0).then((codeTxt1) => {
      cy.wrap(codeTxt1).as("codeTxt1");
    });
    cy.getFirstCellInTableValue(1).then((nameTextEn1) => {
      cy.wrap(nameTextEn1).as("nameTextEn1");
    });
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(detailedCategory));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectParentCategoryEdit();
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    cy.get("@detailedCategory").then((detailedCategory) => {
      AddingCategoryScreen.inputNameEn(
        getWrappedString(detailedCategory) + "_En"
      );
      AddingCategoryScreen.inputNameAr(
        getWrappedString(detailedCategory) + "_Ar"
      );
    });
    ItemCategory.clickISDetailedSwitch();
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.verifyTheListViewHasTheParentCategory(
        getWrappedString(detailedCategory) + "_En"
      );
    });
  });

  it("4. Verify Editting an Parent Item of Category", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getFirstParentCategoryInTheListView();
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAListAccount(getWrappedString(parentCategory));
    });
    cy.getFirstCellInTableValue(0).then((codeTxt1) => {
      cy.wrap(codeTxt1).as("codeTxt1");
    });
    cy.getFirstCellInTableValue(1).then((nameTextEn1) => {
      cy.wrap(nameTextEn1).as("nameTextEn1");
    });
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(parentCategory));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectParentCategory();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn);
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr);
    ItemCategory.clickISDetailedSwitch();
    AddingCategoryScreen.selectCostOfGoodSoldAccount();
    AddingCategoryScreen.selectCategoryType();
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.selectpurchaseAccount();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    ItemCategory.verifyTheListViewHasTheDetailedCategory(
      InventoryData.itemCategoryNameEn
    );
  });

  it("5. Verify The Required Validation", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getFirstParentCategoryInTheListView();
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAListAccount(getWrappedString(parentCategory));
    });
    cy.getFirstCellInTableValue(0).then((codeTxt1) => {
      cy.wrap(codeTxt1).as("codeTxt1");
    });
    cy.getFirstCellInTableValue(1).then((nameTextEn1) => {
      cy.wrap(nameTextEn1).as("nameTextEn1");
    });
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(parentCategory));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectParentCategory();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn);
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr);
    ItemCategory.clickISDetailedSwitch();
    AddingCategoryScreen.selectCostOfGoodSoldAccount();
    AddingCategoryScreen.selectCategoryType();
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.selectpurchaseAccount();
    AddingCategoryScreen.clickSaveButton();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    ItemCategory.verifyTheListViewHasTheDetailedCategory(
      InventoryData.itemCategoryNameEn
    );
  });
});
