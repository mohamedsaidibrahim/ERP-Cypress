import { getWrappedString } from "../../../../../../support/utils";
import { InventoryData } from "../../data/inventory_data";
import { ItemCategory } from "../pages/item_category";

describe("Displaying Item of Category", () => {
  beforeEach("Navigates to Item of Category", () => {
    cy.visit(InventoryData.ItemCategoryUrl);
  });

  it("1. Verify All Column headers are displayed in List view", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/parent category/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/detail/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/status/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });
  
  it("2. Verify Shiftting between Tree and List view", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    ItemCategory.switchingToTreeView();
  });

  it("3. Verify Tree and List views have the same data", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    cy.getFirstCellInTableValue(0).then((codeT) => {
      cy.wrap(codeT).as("codeT");
    });
    cy.getFirstCellInTableValue(1).then((nameTextEn) => {
      cy.wrap(nameTextEn).as("nameTextEn");
    });
    cy.getFirstCellInTableValue(2).then((parentCategoryTxt) => {
      cy.wrap(parentCategoryTxt).as("parentCategoryTxt");
    });
    cy.getFirstCellInTableValue(5).then((categoryTypeTxt) => {
      cy.wrap(categoryTypeTxt).as("categoryTypeTxt");
    });
    ItemCategory.switchingToTreeView();
    cy.wait(1000);
    cy.get("@nameTextEn").then((nameText1) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(nameText1));
    });
    cy.wait(1000);
    ItemCategory.displaytheLastCategoryViewMode();
    cy.wait(1000);
    cy.get("@codeT").then((codeT) => {
      cy.verifyDisabledPlaceholderValue(0, getWrappedString(codeT));
    });
    cy.get("@nameTextEn").then((nameTextEn) => {
      cy.verifyDisabledPlaceholderValue(1, getWrappedString(nameTextEn));
    });
    cy.get("@parentCategoryTxt").then((parentCategoryTxt) => {
      cy.verifyDisabledPlaceholderValue(3, getWrappedString(parentCategoryTxt));
    });
    cy.get("@categoryTypeTxt").then((categoryTypeTxt) => {
      cy.verifyDisabledPlaceholderValue(5, getWrappedString(categoryTypeTxt));
    });
  });
});
