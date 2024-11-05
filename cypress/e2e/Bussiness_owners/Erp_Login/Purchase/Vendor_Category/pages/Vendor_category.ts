import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { PurchaseData } from "../../data/purchase_data";
import { getWrappedString } from "../../../../../../support/utils";

export class VendorCategory {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").click({ force: true });
  }
  static forceNavigate() {
    cy.visit(PurchaseData.VendorCategoryUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("vendor")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/purchase/i);
        NavigatesToSideModule.navigatesToTheModule(
          PurchaseData.VendorCategoryUrl,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(PurchaseData.VendorCategoryUrl, "vendor");
    cy.wait(1500);
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_delet").first().scrollIntoView();
        cy.getByTestAttribute("btn_delet").first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_edit").first().scrollIntoView();
        cy.getByTestAttribute("btn_edit").first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }

  static confirmDeleteDialog() {
    cy.contains("button", /yes/i).click();
  }
  static InputAllFields() {
    cy.getByTestAttribute("name").clear().type(PurchaseData.vName);
    cy.getLastItemInDropDownList("payableAccountId").then(
      ($payableAccountId) => {
        if ($payableAccountId != null) {
          cy.wrap($payableAccountId)
            .invoke("text")
            .then((payableAccountIdTxt) => {
              cy.log("payableAccountIdTxt::: " + payableAccountIdTxt);
              cy.wrap(payableAccountIdTxt).as("payableAccountIdTxt");
            });
        } else {
          cy.wrap("").as("payableAccountIdTxt");
        }
      }
    );
    cy.getLastItemInDropDownList("purchaseAccountId").then(
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

    cy.getLastItemInDropDownList("purchaseReturnAccountId").then(
      ($purchaseReturnAccountId) => {
        if ($purchaseReturnAccountId != null) {
          cy.wrap($purchaseReturnAccountId)
            .invoke("text")
            .then((purchaseReturnAccountIdTxt) => {
              cy.log(
                "purchaseReturnAccountIdTxt::: " + purchaseReturnAccountIdTxt
              );
              cy.wrap(purchaseReturnAccountIdTxt).as(
                "purchaseReturnAccountIdTxt"
              );
            });
        } else {
          cy.wrap("").as("purchaseReturnAccountIdTxt");
        }
      }
    );
    cy.getLastItemInDropDownList("discountAccountId").then(
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
    cy.getLastItemInDropDownList("priceListId").then(($priceListId) => {
      if ($priceListId != null) {
        cy.wrap($priceListId)
          .invoke("text")
          .then((priceListIdTxt) => {
            cy.log("priceListIdTxt::: " + priceListIdTxt);
            cy.wrap(priceListIdTxt).as("priceListIdTxt");
          });
      } else {
        cy.wrap("").as("priceListIdTxt");
      }
    });
    cy.wait(1000);
    cy.getLastItemInDropDownList("paymentTermId").then(($paymentTermId) => {
      if ($paymentTermId != null) {
        cy.wrap($paymentTermId)
          .invoke("text")
          .then((paymentTermIdTxt) => {
            cy.log("paymentTermIdTxt::: " + paymentTermIdTxt);
            cy.wrap(paymentTermIdTxt).as("paymentTermIdTxt");
          });
      } else {
        cy.wrap("").as("paymentTermIdTxt");
      }
    });
    cy.wait(1000);
    cy.getLastItemInDropDownList("marketType").then(($marketType) => {
      if ($marketType != null) {
        cy.wrap($marketType)
          .invoke("text")
          .then((marketTypeTxt) => {
            cy.log("marketTypeTxt::: " + marketTypeTxt);
            cy.wrap(marketTypeTxt).as("marketTypeTxt");
          });
      } else {
        cy.wrap("").as("marketTypeTxt");
      }
    });
  }
  static assertSuccesfulSaving() {
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);

    cy.verifyFirstCellInTable(1, PurchaseData.vName);
    cy.get("@payableAccountIdTxt").then((payableAccountId) => {
      cy.verifyFirstCellInTable(2, getWrappedString(payableAccountId));
    });
    cy.get("@purchaseAccountIdTxt").then((purchaseAccountId) => {
      cy.verifyFirstCellInTable(3, getWrappedString(purchaseAccountId));
    });
    cy.get("@purchaseReturnAccountIdTxt").then((purchaseReturnAccountId) => {
      cy.verifyFirstCellInTable(4, getWrappedString(purchaseReturnAccountId));
    });
    cy.get("@discountAccountIdTxt").then((discountAccountId) => {
      cy.verifyFirstCellInTable(5, getWrappedString(discountAccountId));
    });
    cy.get("@priceListIdTxt").then((priceListId) => {
      cy.verifyFirstCellInTable(6, getWrappedString(priceListId));
    });
    cy.get("@paymentTermIdTxt").then((paymentTermId) => {
      cy.verifyFirstCellInTable(7, getWrappedString(paymentTermId));
    });
    cy.get("@marketTypeTxt").then((marketType1) => {
      cy.verifyFirstCellInTable(8, getWrappedString(marketType1));
    });
  }
}
