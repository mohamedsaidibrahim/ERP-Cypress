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
  static inputNameEn(txt: string) {
    cy.getByTestAttribute("nameEn").scrollIntoView().clear().type(txt);
  }
  static inputNameAr(txt: string) {
    cy.getByTestAttribute("nameAr").scrollIntoView().clear().type(txt);
  }
  static clickInputSwitch() {
    cy.getByTestAttribute("input-switch").click();
  }

  static selectParentCategoryId() {
    cy.getFirstItemInDropDownList("parentCategoryId").then(
      ($parentCategoryId) => {
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
      }
    );
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
  static selectGLAccountd() {
    cy.getFirstItemInDropDownList("glAccountId").then(($glAccountId) => {
      if ($glAccountId != null) {
        cy.wrap($glAccountId)
          .invoke("text")
          .then((glAccountIdTxt) => {
            cy.log("glAccountIdTxt::: " + glAccountIdTxt);
            cy.wrap(glAccountIdTxt).as("glAccountIdTxt");
          });
      } else {
        cy.wrap("").as("glAccountIdTxt");
      }
    });
  }

  static selectCashSalesAccountId() {
    cy.getFirstItemInDropDownList("cashSalesAccountId").then(
      ($cashSalesAccountId) => {
        if ($cashSalesAccountId != null) {
          cy.wrap($cashSalesAccountId)
            .invoke("text")
            .then((cashSalesAccountIdTxt) => {
              cy.log("cashSalesAccountIdTxt::: " + cashSalesAccountIdTxt);
              cy.wrap(cashSalesAccountIdTxt).as("cashSalesAccountIdTxt");
            });
        } else {
          cy.wrap("").as("cashSalesAccountIdTxt");
        }
      }
    );
  }
  static selectCreditSalesAccountId() {
    cy.getFirstItemInDropDownList("creditSalesAccountId").then(
      ($creditSalesAccountId) => {
        if ($creditSalesAccountId != null) {
          cy.wrap($creditSalesAccountId)
            .invoke("text")
            .then((creditSalesAccountIdTxt) => {
              cy.log("creditSalesAccountIdTxt::: " + creditSalesAccountIdTxt);
              cy.wrap(creditSalesAccountIdTxt).as("creditSalesAccountIdTxt");
            });
        } else {
          cy.wrap("").as("creditSalesAccountIdTxt");
        }
      }
    );
  }
  static selectSalesReturnAccountId() {
    cy.getFirstItemInDropDownList("salesReturnAccountId").then(
      ($salesReturnAccountId) => {
        if ($salesReturnAccountId != null) {
          cy.wrap($salesReturnAccountId)
            .invoke("text")
            .then((salesReturnAccountIdTxt) => {
              cy.log("salesReturnAccountIdTxt::: " + salesReturnAccountIdTxt);
              cy.wrap(salesReturnAccountIdTxt).as("salesReturnAccountIdTxt");
            });
        } else {
          cy.wrap("").as("salesReturnAccountIdTxt");
        }
      }
    );
  }
  static dePurchaseAccountId() {
    cy.getFirstItemInDropDownList("purchaseAccountId").then(
      ($purchaseAccountId) => {
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
      }
    );
  }
  static selectSalesCostAccountId() {
    cy.getFirstItemInDropDownList("salesCostAccountId").then(
      ($salesCostAccountId) => {
        if ($salesCostAccountId != null) {
          cy.wrap($salesCostAccountId)
            .invoke("text")
            .then((salesCostAccountIdTxt) => {
              cy.log("salesCostAccountIdTxt::: " + salesCostAccountIdTxt);
              cy.wrap(salesCostAccountIdTxt).as("salesCostAccountIdTxt");
            });
        } else {
          cy.wrap("").as("salesCostAccountIdTxt");
        }
      }
    );
  }
  static clickDiscountAccountId() {
    cy.getFirstItemInDropDownList("discountAccountId").then(
      ($discountAccountId) => {
        if ($discountAccountId != null) {
          cy.wrap($discountAccountId)
            .invoke("text")
            .then((discountAccountIdTxt) => {
              cy.log("discountAccountIdTxt::: " + discountAccountIdTxt);
              cy.wrap(discountAccountIdTxt).as("discountAccountIdTxt");
            });
        } else {
          cy.wrap("").as("discountAccountIdTxt");
        }
      }
    );
  }
  static selectEvaluationAccountId() {
    cy.getFirstItemInDropDownList("evaluationAccountId").then(
      ($evaluationAccountId) => {
        if ($evaluationAccountId != null) {
          cy.wrap($evaluationAccountId)
            .invoke("text")
            .then((evaluationAccountIdTxt) => {
              cy.log("evaluationAccountIdTxt::: " + evaluationAccountIdTxt);
              cy.wrap(evaluationAccountIdTxt).as("evaluationAccountIdTxt");
            });
        } else {
          cy.wrap("").as("evaluationAccountIdTxt");
        }
      }
    );
  }
  static selectAdjustmentAccountId() {
    cy.getFirstItemInDropDownList("adjustmentAccountId").then(
      ($adjustmentAccountId) => {
        if ($adjustmentAccountId != null) {
          cy.wrap($adjustmentAccountId)
            .invoke("text")
            .then((adjustmentAccountIdTxt) => {
              cy.log("adjustmentAccountIdTxt::: " + adjustmentAccountIdTxt);
              cy.wrap(adjustmentAccountIdTxt).as("adjustmentAccountIdTxt");
            });
        } else {
          cy.wrap("").as("adjustmentAccountIdTxt");
        }
      }
    );
  }
  static selectGoodsInTransitAccountId() {
    cy.getFirstItemInDropDownList("goodsInTransitAccountId").then(
      ($goodsInTransitAccountId) => {
        if ($goodsInTransitAccountId != null) {
          cy.wrap($goodsInTransitAccountId)
            .invoke("text")
            .then((goodsInTransitAccountIdTxt) => {
              cy.log(
                "goodsInTransitAccountIdTxt::: " + goodsInTransitAccountIdTxt
              );
              cy.wrap(goodsInTransitAccountIdTxt).as(
                "goodsInTransitAccountIdTxt"
              );
            });
        } else {
          cy.wrap("").as("goodsInTransitAccountIdTxt");
        }
      }
    );
  }

  static clickSaveButton() {
    cy.getByTestAttribute("save").contains(/save/i).scrollIntoView().click();
  }
  static verifyCancelButton() {
    cy.getByTestAttribute("cancel")
      .contains(/cancel/i)
      .scrollIntoView()
      .click();
  }
  static clickCancelButton() {
    cy.getByTestAttribute("cancel").contains(/save/i).scrollIntoView().click();
  }
}
