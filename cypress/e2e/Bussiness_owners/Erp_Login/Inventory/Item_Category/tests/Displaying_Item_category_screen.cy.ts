import { InventoryData } from "../../data/inventory_data";
import { DisplayingCategoryScreen } from "../pages/displaying_item_category_screen";
import { ItemCategory } from "../pages/item_category";

describe("Displaying Item of Category", () => {
  beforeEach("Navigates to Item of Category", () => {
    cy.visit(InventoryData.ItemCategoryUrl);
  });
  it("1. Verify All Components are displaying in their correct states (View Mode)", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.displaytheLastCategoryViewMode();
    cy.wait(1000);
    DisplayingCategoryScreen.verifyDisplayingTheCorrectLabelViewMode();
  });
  it("2. Verify All Components are displaying in their correct states (Edit Mode)", () => {
    ItemCategory.landing();
    cy.wait(1500);
    ItemCategory.clickEditButtonDetailAccount();
    cy.wait(1000);
    DisplayingCategoryScreen.verifyDisplayingTheCorrectLabelEditMode();
  });
});
