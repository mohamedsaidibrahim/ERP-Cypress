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
        .scrollIntoView()
        .should("include", /status/i);
      cy.wrap(table)
        .find("th")
        .eq(5)
        .scrollIntoView()
        .should("include", /actions/i);
    });
  });

  it("2. Verify Shiftting between Tree and List view", () => {
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    ItemCategory.switchingToTreeView();
  });

  it("3. Verify Tree and List views have the same data (Parent Category)", () => {
    cy.wait(2000);
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getFirstParentCategoryInTheListView();
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAListAccount(getWrappedString(parentCategory));
    });
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
    cy.get("@parentCategory").then((parentCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(parentCategory));
    });
    cy.wait(1000);
    ItemCategory.displaytheLastCategoryViewMode();
    cy.wait(1000);
    cy.get("@codeT").then((codeT) => {
      cy.get('input[data-testid="input-text"]').eq(0)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist; // // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(codeT)); // // Wrap and return the placeholder text
        });
    });
    cy.get("@nameTextEn").then((nameTextEn) => {
      cy.get('input[data-testid="input-text"]').eq(1)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist; // // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(nameTextEn)); // // Wrap and return the placeholder text
        });
    });
    cy.get("@parentCategoryTxt").then((parentCategoryTxt) => {
      cy.get('input[data-testid="input-text"]').eq(3)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist; // // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(parentCategoryTxt)); // // Wrap and return the placeholder text
        });
    });
    cy.get('input[data-testid="input-text"]').should("have.length", 4);

  });

  it("4. Verify Tree and List views have the same data (Detailed Category)", () => {
    cy.wait(2000);
    ItemCategory.landing();
    cy.wait(2000);
    ItemCategory.switchingToListView();
    cy.wait(1000);
    ItemCategory.getDetailedCategoryInTheListViewMissing();
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.SearchAListAccount(getWrappedString(detailedCategory));
    });
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
    cy.get("@detailedCategory").then((detailedCategory) => {
      ItemCategory.SearchAnTreeAccount(getWrappedString(detailedCategory));
    });
    cy.wait(1000);
    ItemCategory.displaytheLastCategoryViewMode();
    cy.wait(1000);
    cy.get("@codeT").then((codeT) => {
      cy.get('input[data-testid="input-text"]').eq(0)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist;  // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(codeT));  // Wrap and return the placeholder text
        });
    });
    cy.get("@nameTextEn").then((nameTextEn) => {
      cy.get('input[data-testid="input-text"]').eq(1)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist;  //// Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(nameTextEn));  // Wrap and return the placeholder text
        });
    });
    cy.get("@parentCategoryTxt").then((parentCategoryTxt) => {
      cy.get('input[data-testid="input-text"]').eq(3)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist;  // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(parentCategoryTxt));  // Wrap and return the placeholder text
        });
    });
    cy.get("@categoryTypeTxt").then((categoryTypeTxt) => {
      cy.get('input[data-testid="input-text"]').eq(4)
        .scrollIntoView()
        .should("exist")
        .invoke("attr", "placeholder")
        .then((placeholderText) => {
          expect(placeholderText).to.exist;  // Check if the placeholder exists
          expect(placeholderText).to.include(getWrappedString(categoryTypeTxt));  // Wrap and return the placeholder text
        });
    });
    cy.get('input[data-testid="input-text"]').should("have.length", 7);

  });
});
