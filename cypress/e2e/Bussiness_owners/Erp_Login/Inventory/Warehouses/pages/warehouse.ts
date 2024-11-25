import { InventoryData } from "../../data/inventory_data";

export class Warehouse {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).last().click({ force: true });
  }
  static clickSaveContinueButton() {
    cy.contains("button", /continue/i).click({ force: true });
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click({ force: true });
  }

  static landing() {
    cy.NavigateToAPPModule(6, 1);
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-trash pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-trash pointer"]').first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-pencil pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-pencil pointer"]')
          .first()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/yes/i)
      .scrollIntoView()
      .click({ force: true });
  }
  static assertSuccessfulDeletion() {
    cy.assertItemDeletedFromListView();
  }
  static uploadAttachment(imagePath: string) {
    cy.get('input[type="file"]').attachFile(imagePath);
  }
  static setName(str: any) {
    cy.inputText("name", str);
  }
  static clearName() {
    cy.getByTestAttribute("name").clear();
  }
  static selectWarehouseTypeTxt(warehouseType: string) {
    cy.clickInputtedSearchDropDownList("warehouseType", warehouseType).then(
      ($warehouseType) => {
        cy.wrap($warehouseType)
          .invoke("text")
          .then((warehouseTypeTxt) => {
            cy.log("warehouseTypeTxt::: " + warehouseTypeTxt);
            cy.wrap(warehouseTypeTxt).as("warehouseTypeTxt");
          });
      }
    );
  }
  static selectBranchWarehousesTxt() {
    cy.checkAllMultiSelect(0);
  }

  static clickCancelButtton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  }
  static clickCDetailSaveButtton() {
    cy.getByTestAttribute("save").scrollIntoView().click();
  }

  static checkAllRelatedBranch() {
    cy.checkAllMultiSelect(0);
  }
  static switchToAccountTab() {
    cy.get('li[role="presentation"]').eq(0).click();
  }
  static switchToAddressTab() {
    cy.get('li[role="presentation"]').eq(1).click();
  }
  // Acount Acount  Acount Acount   Acount Acount   Acount Acount
  static setGlAccountId(action: string) {
    var srchTxt = action == "add" ? "1" : "10";
    cy.clickInputtedSearchDropDownList("glAccountId", srchTxt).then(
      ($glAccountId) => {
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
      }
    );
  }

  static setCashSalesAccountId(action: string) {
    var srchTxt = action == "add" ? "2" : "8";
    cy.clickInputtedSearchDropDownList("cashSalesAccountId", srchTxt).then(
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

  static setCreditSalesAccountId(action: string) {
    var srchTxt = action == "add" ? "3" : "7";
    cy.clickInputtedSearchDropDownList("creditSalesAccountId", srchTxt).then(
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

  static setSalesReturnAccountId(action: string) {
    var srchTxt = action == "add" ? "4" : "6";
    cy.clickInputtedSearchDropDownList("salesReturnAccountId", srchTxt).then(
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

  static setPurchaseAccountId(action: string) {
    var srchTxt = action == "add" ? "5" : "1";
    cy.clickInputtedSearchDropDownList("purchaseAccountId", srchTxt).then(
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

  static setSalesCostAccountId(action: string) {
    var srchTxt = action == "add" ? "6" : "4";
    cy.clickInputtedSearchDropDownList("salesCostAccountId", srchTxt).then(
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

  static setDiscountAccountId(action: string) {
    var srchTxt = action == "add" ? "7" : "3";
    cy.clickInputtedSearchDropDownList("discountAccountId", srchTxt).then(
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

  static setEvaluationAccountId(action: string) {
    var srchTxt = action == "add" ? "8" : "2";
    cy.clickInputtedSearchDropDownList("evaluationAccountId", srchTxt).then(
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

  static setAdjustmentAccountId(action: string) {
    var srchTxt = action == "add" ? "9" : "1";
    cy.clickInputtedSearchDropDownList("adjustmentAccountId", srchTxt).then(
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

  static setGoodsInTransitAccountId(action: string) {
    var srchTxt = action == "add" ? "10" : "1";
    cy.clickInputtedSearchDropDownList("goodsInTransitAccountId", srchTxt).then(
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

  // Address Address Address Address Address Address

  static selectCountryCode() {
    cy.clickInputtedSearchDropDownList("countryCode", "egypt").then(
      ($countryId) => {
        if ($countryId != null) {
          cy.wrap($countryId)
            .invoke("text")
            .then((countryIdTxt) => {
              cy.log("countryIdTxt::: " + countryIdTxt);
              cy.wrap(countryIdTxt).as("countryIdTxt");
            });
        } else {
          cy.wrap("").as("countryIdTxt");
        }
      }
    );
  }

  static inputPhone() {
    cy.inputText("phone", InventoryData.wPhone);
  }
  static setCity(action: string) {
    var srchTxt = action == "add" ? "maadi" : "aswan";
    cy.clickInputtedSearchDropDownList("city", srchTxt).then(($city) => {
      if ($city != null) {
        cy.wrap($city)
          .invoke("text")
          .then((cityTxt) => {
            cy.log("cityTxt::: " + cityTxt);
            cy.wrap(cityTxt).as("cityTxt");
          });
      } else {
        cy.wrap("").as("cityTxt");
      }
    });
  }
  static inputAddressLine() {
    cy.inputText("addressLine", InventoryData.wAddressLine);
  }
  static inputEmail() {
    cy.inputText("email", InventoryData.wEmail);
  }
  static inputFax() {
    cy.inputText("fax", InventoryData.wFax);
  }
  static inputPostalCode() {
    cy.inputText("postalCode", InventoryData.wPostalCode);
  }
  static inputLongitude() {
    cy.inputText("longitude", InventoryData.wLongitude);
  }
  static inputLatitude() {
    cy.inputText("latitude", InventoryData.wLatitude);
  }
  static inputRadius() {
    cy.inputText("radius", InventoryData.wRadius);
  }
}
