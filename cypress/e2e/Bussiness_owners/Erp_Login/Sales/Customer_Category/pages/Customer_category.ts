import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { SalesData } from "../../data/sales_data";
import { getWrappedString } from "../../../../../../support/utils";


export class CustomerCategory {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).click({ force: true });
  }

  static forceNavigate() {
    cy.visit(SalesData.customerCategoryUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("customer")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/sales/i);
        NavigatesToSideModule.navigatesToTheModule(
          SalesData.customerCategoryUrl,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(SalesData.customerCategoryUrl, "ustomer");
    cy.wait(1500);
  }
  static reloadAgain() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.log("You are IN");
      } else {
        cy.visit(SalesData.customerCategoryUrl);
        cy.wait(500);
        this.reloadAgain();
      }
    });
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_delet").first().scrollIntoView();
        cy.getByTestAttribute("btn_delet")
          .first()
          .scrollIntoView()
          .click({ force: true });
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
    cy.getByTestAttribute("name").clear().type(SalesData.cName);
    cy.getFirstItemInDropDownList("receivableAccountId").then(
      ($receivableAccountId) => {
        if ($receivableAccountId != null) {
          cy.wrap($receivableAccountId)
            .invoke("text")
            .then((receivableAccountIdTxt) => {
              cy.log("receivableAccountIdTxt::: " + receivableAccountIdTxt);
              cy.wrap(receivableAccountIdTxt).as("receivableAccountIdTxt");
            });
        } else {
          cy.wrap("").as("receivableAccountIdTxt");
        }
      }
    );
    cy.getFirstItemInDropDownList("salesAccountId").then(($salesAccountId) => {
      if ($salesAccountId != null) {
        cy.wrap($salesAccountId)
          .invoke("text")
          .then((salesAccountIdTxt) => {
            cy.log("salesAccountIdTxt::: " + salesAccountIdTxt);
            cy.wrap(salesAccountIdTxt).as("salesAccountIdTxt");
          });
      } else {
        cy.wrap("").as("salesAccountIdTxt");
      }
    });

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
    cy.getFirstItemInDropDownList("pricePolicyId").then(($pricePolicyId) => {
      if ($pricePolicyId != null) {
        cy.wrap($pricePolicyId)
          .invoke("text")
          .then((pricePolicyIdTxt) => {
            cy.log("pricePolicyIdTxt::: " + pricePolicyIdTxt);
            cy.wrap(pricePolicyIdTxt).as("pricePolicyIdTxt");
          });
      } else {
        cy.wrap("").as("pricePolicyIdTxt");
      }
    });
    cy.getFirstItemInDropDownList("paymentTermId").then(($paymentTermId) => {
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
    cy.getFirstItemInDropDownList("marketType").then(($marketType) => {
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
  static InputNameEdit() {
    cy.getByTestAttribute("name").clear().type(SalesData.cName);
  }
  static InputReceivableAccountIdEdit() {
    cy.getLastItemInDropDownList("receivableAccountId").then(
      ($receivableAccountId) => {
        if ($receivableAccountId != null) {
          cy.wrap($receivableAccountId)
            .invoke("text")
            .then((receivableAccountIdTxt) => {
              cy.log("receivableAccountIdTxt::: " + receivableAccountIdTxt);
              cy.wrap(receivableAccountIdTxt).as("receivableAccountIdTxt");
            });
        } else {
          cy.wrap("").as("receivableAccountIdTxt");
        }
      }
    );
  }
  static InputSalesAccountIdEdit() {
    cy.getLastItemInDropDownList("salesAccountId").then(($salesAccountId) => {
      if ($salesAccountId != null) {
        cy.wrap($salesAccountId)
          .invoke("text")
          .then((salesAccountIdTxt) => {
            cy.log("salesAccountIdTxt::: " + salesAccountIdTxt);
            cy.wrap(salesAccountIdTxt).as("salesAccountIdTxt");
          });
      } else {
        cy.wrap("").as("salesAccountIdTxt");
      }
    });

  }
  static InputSalesReturnAccountIdEdit() {
    cy.getLastItemInDropDownList("salesReturnAccountId").then(
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

  static InputDiscountAccountIdEdit() {
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
  }
  static InputPricePolicyIdEdit() {
    cy.getLastItemInDropDownList("pricePolicyId").then(($pricePolicyId) => {
      if ($pricePolicyId != null) {
        cy.wrap($pricePolicyId)
          .invoke("text")
          .then((pricePolicyIdTxt) => {
            cy.log("pricePolicyIdTxt::: " + pricePolicyIdTxt);
            cy.wrap(pricePolicyIdTxt).as("pricePolicyIdTxt");
          });
      } else {
        cy.wrap("").as("pricePolicyIdTxt");
      }
    });
  }

  static InputPaymentTermIdEdit() {
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
  }

  static InputMarketTypeEdit() {
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

    cy.verifyFirstCellInTable(1, SalesData.cName);
    cy.get("@receivableAccountIdTxt").then((receivableAccountIdTxt) => {
      cy.verifyFirstCellInTable(2, getWrappedString(receivableAccountIdTxt));
    });
    cy.get("@salesAccountIdTxt").then((salesAccountIdTxt1) => {
      cy.verifyFirstCellInTable(3, getWrappedString(salesAccountIdTxt1));
    });
    cy.get("@salesReturnAccountIdTxt").then((salesReturnAccountIdTxt1) => {
      cy.verifyFirstCellInTable(4, getWrappedString(salesReturnAccountIdTxt1));
    });
    cy.get("@discountAccountIdTxt").then((discountAccountIdTxt1) => {
      cy.verifyFirstCellInTable(5, getWrappedString(discountAccountIdTxt1));
    });
    cy.get("@pricePolicyIdTxt").then((pricePolicyIdTxt1) => {
      cy.verifyFirstCellInTable(6, getWrappedString(pricePolicyIdTxt1));
    });
    cy.get("@paymentTermIdTxt").then((paymentTermIdTxt1) => {
      cy.verifyFirstCellInTable(7, getWrappedString(paymentTermIdTxt1));
    });
    cy.get("@marketTypeTxt").then((marketTypeTxt1) => {
      cy.verifyFirstCellInTable(8, getWrappedString(marketTypeTxt1));
    });
  }
}
