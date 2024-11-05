import { getWrappedString } from "../../../../../../support/utils";
import { InventoryData } from "../../data/inventory_data";
import { AddingCategoryScreen } from "../pages/adding_item_category_screen";
import { ItemCategory } from "../pages/item_category";

describe("Editting Item of Category", () => {
  beforeEach("Navigates to Item of Category", () => {
    cy.visit(InventoryData.ItemCategoryUrl);
  });

  it("Verify Editting an Item of Category", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.getFirstCellInTableValue(0).then((codeTxt1) => {
      cy.wrap(codeTxt1).as("codeTxt1");
    });
    cy.getFirstCellInTableValue(1).then((nameTextEn1) => {
      cy.wrap(nameTextEn1).as("nameTextEn1");
    });
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    cy.get("@nameTextEn1").then((nameTextEn1) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(nameTextEn1));
    });
    cy.wait(1000);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1000);
    AddingCategoryScreen.verifyCodeFieldISReadOnly();
    AddingCategoryScreen.selectCategoryTypeEdit();
    AddingCategoryScreen.inputNameEn(InventoryData.itemCategoryNameEn);
    AddingCategoryScreen.selectGLAccountd();
    AddingCategoryScreen.inputNameAr(InventoryData.itemCategoryNameAr);
    AddingCategoryScreen.selectCashSalesAccountId();
    AddingCategoryScreen.selectCreditSalesAccountId();
    AddingCategoryScreen.selectSalesReturnAccountId();
    AddingCategoryScreen.dePurchaseAccountId();
    AddingCategoryScreen.selectSalesCostAccountId();
    AddingCategoryScreen.clickDiscountAccountId();
    AddingCategoryScreen.selectEvaluationAccountId();
    AddingCategoryScreen.selectAdjustmentAccountId();
    AddingCategoryScreen.selectGoodsInTransitAccountId();
    AddingCategoryScreen.verifyCancelButton();
    AddingCategoryScreen.clickSaveButton();
    cy.logMsg(
      "<<<<<***** Viewing ***** Viewing ***** Viewing ***** Viewing *****>>>"
    );
    cy.wait(2000);
    cy.logMsg("<<<<<***** Verification in Tree View *****>>>>>>");
    ItemCategory.SearchAnTreeAccount(InventoryData.itemCategoryNameEn);
    cy.wait(1000);
    ItemCategory.displaytheLastCategoryViewMode();
    cy.wait(1000);
    cy.get("@codeTxt1").then((codeTxt1) => {
      cy.verifyDisabledPlaceholderValue(0, getWrappedString(codeTxt1));
    });
    cy.verifyDisabledPlaceholderValue(1, InventoryData.itemCategoryNameEn);
    cy.verifyDisabledPlaceholderValue(2, InventoryData.itemCategoryNameAr);
    cy.get("@categoryTypeTxt").then((categoryTypeTxt) => {
      cy.verifyDisabledPlaceholderValue(5, getWrappedString(categoryTypeTxt));
    });
  });
});
