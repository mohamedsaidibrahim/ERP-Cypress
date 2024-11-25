export class AddingCategoryScreen {
  static clickAddNewButton() {
    cy.get('button[class="btn_tree_item btn_add pi pi-plus"]').should(
      "be.visible"
    );
    cy.get('button[class="btn_tree_item btn_add pi pi-plus"]').click();
  }
  static verifyCodeFieldISReadOnly() {
    cy.verifyDimmidInput("code");
  }
  static clearNameEn() {
    cy.getByTestAttribute("nameEn").invoke("removeAttr", "disabled").scrollIntoView().clear();
  }
  static inputNameEn(txt: string) {
    cy.getByTestAttribute("nameEn").invoke("removeAttr", "disabled").scrollIntoView().clear().type(txt);
  }
  static clearNameAr() {
    cy.getByTestAttribute("nameAr").invoke("removeAttr", "disabled").scrollIntoView().clear();
  }
  static inputNameAr(txt: string) {
    cy.getByTestAttribute("nameAr").invoke("removeAttr", "disabled").scrollIntoView().clear().type(txt);
  }
  static clickInputSwitch() {
    cy.getByTestAttribute("input-switch").click();
  }

  static selectParentCategory() {
    cy.getFirstItemInDropDownList("parentCategoryId").then(($parentCategoryId) => {
      if ($parentCategoryId != null) {
        cy.wrap($parentCategoryId)
          .invoke("text")
          .then((parentCategoryIdTxt) => {
            cy.log("parentCategoryIdTxt::: " + parentCategoryIdTxt);
            cy.wrap(parentCategoryIdTxt).as("parentCategoryIdTxt");
          });
      } else {
        cy.wrap("").as("parentCategoryIdTxt");
      }
    });
  }
  static selectParentCategoryEdit() {
    cy.getLastItemInDropDownList("parentCategoryId").then(($parentCategoryId) => {
      if ($parentCategoryId != null) {
        cy.wrap($parentCategoryId)
          .invoke("text")
          .then((parentCategoryIdTxt) => {
            cy.log("parentCategoryIdTxt::: " + parentCategoryIdTxt);
            cy.wrap(parentCategoryIdTxt).as("parentCategoryIdTxt");
          });
      } else {
        cy.wrap("").as("parentCategoryIdTxt");
      }
    });
  }
  static selectCategoryType() {
    cy.getFirstItemInDropDownList("categoryType").then(($categoryType) => {
      if ($categoryType != null) {
        cy.wrap($categoryType)
          .invoke("text")
          .then((categoryTypeTxt) => {
            cy.log("categoryTypeTxt::: " + categoryTypeTxt);
            cy.wrap(categoryTypeTxt).as("categoryTypeTxt");
          });
      } else {
        cy.wrap("").as("categoryTypeTxt");
      }
    });
  }

  static selectCategoryTypeEdit() {
    cy.getLastItemInDropDownList("categoryType").then(($categoryType) => {
      if ($categoryType != null) {
        cy.wrap($categoryType)
          .invoke("text")
          .then((categoryTypeTxt) => {
            cy.log("categoryTypeTxt::: " + categoryTypeTxt);
            cy.wrap(categoryTypeTxt).as("categoryTypeTxt");
          });
      } else {
        cy.wrap("").as("categoryTypeTxt");
      }
    });
  }

  static selectpurchaseAccount() {
    cy.getFirstItemInDropDownList("purchaseAccountId").then(($purchaseAccountId) => {
      if ($purchaseAccountId != null) {
        cy.wrap($purchaseAccountId)
          .invoke("text")
          .then((purchaseAccountIdTxt) => {
            cy.log("purchaseAccountIdTxt::: " + purchaseAccountIdTxt);
            cy.wrap(purchaseAccountIdTxt).as("purchaseAccountIdTxt");
          });
      } else {
        cy.wrap("").as("purchaseAccountIdTxt");
      }
    });
  }

  static selectpurchaseAccountEdit() {
    cy.getLastItemInDropDownList("purchaseAccountId").then(($purchaseAccountId) => {
      if ($purchaseAccountId != null) {
        cy.wrap($purchaseAccountId)
          .invoke("text")
          .then((purchaseAccountIdTxt) => {
            cy.log("purchaseAccountIdTxt::: " + purchaseAccountIdTxt);
            cy.wrap(purchaseAccountIdTxt).as("purchaseAccountIdTxt");
          });
      } else {
        cy.wrap("").as("purchaseAccountIdTxt");
      }
    });
  }

  static selectCostOfGoodSoldAccount() {
    cy.getFirstItemInDropDownList("costOfGoodSoldAccountId").then(($costOfGoodSoldAccountId) => {
      if ($costOfGoodSoldAccountId != null) {
        cy.wrap($costOfGoodSoldAccountId)
          .invoke("text")
          .then((costOfGoodSoldAccountIdTxt) => {
            cy.log("costOfGoodSoldAccountIdTxt::: " + costOfGoodSoldAccountIdTxt);
            cy.wrap(costOfGoodSoldAccountIdTxt).as("costOfGoodSoldAccountIdTxt");
          });
      } else {
        cy.wrap("").as("costOfGoodSoldAccountIdTxt");
      }
    });
  }

  static selectCostOfGoodSoldAccountEdit() {
    cy.getLastItemInDropDownList("costOfGoodSoldAccountId").then(($costOfGoodSoldAccountId) => {
      if ($costOfGoodSoldAccountId != null) {
        cy.wrap($costOfGoodSoldAccountId)
          .invoke("text")
          .then((costOfGoodSoldAccountIdTxt) => {
            cy.log("costOfGoodSoldAccountIdTxt::: " + costOfGoodSoldAccountIdTxt);
            cy.wrap(costOfGoodSoldAccountIdTxt).as("costOfGoodSoldAccountIdTxt");
          });
      } else {
        cy.wrap("").as("costOfGoodSoldAccountIdTxt");
      }
    });
  }


  static clickSaveButton() {
    cy.getByTestAttribute("save").contains(/save/i).scrollIntoView().click();
  }
  static verifyCancelButton() {
    cy.getByTestAttribute("cancel")
      .contains(/cancel/i)
      .scrollIntoView()
      .should("be.visible");
  }
  static clickCancelButton() {
    cy.getByTestAttribute("cancel").contains(/save/i).scrollIntoView().click();
  }
}
