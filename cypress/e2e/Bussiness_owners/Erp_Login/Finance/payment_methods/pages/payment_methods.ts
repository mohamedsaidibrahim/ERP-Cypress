import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { FinanceData } from "../../data/finance_data";

export class PaymentMethods {
  static clickAddNewButton() {
    cy.clickAddNewButton();
    cy.wait(1000);

  }
  static clickSaveButton() {
    cy.contains("button", /save/i).scrollIntoView();
    cy.contains("button", /save/i).click();
    cy.wait(1500);
  }
  static clickcancelButton() {
    cy.getByTestAttribute("cancel").last().scrollIntoView();
    cy.getByTestAttribute("cancel").last().click();
  }

  static forceNavigate() {
    cy.visit(FinanceData.PaymentMethodsUrl);
    cy.wait(1000);
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("method")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/finance/i);
        NavigatesToSideModule.navigatesToTheModule(
          FinanceData.PaymentMethodsUrl,
          4
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(FinanceData.PaymentMethodsUrl, "method");
    cy.wait(2000);
  }
  static selectGlAccountCode() {
    cy.clickInputtedSearchDropDownList(
      "glAccountId",
      FinanceData.glAccountCode
    ).then(($glAccountId) => {
      cy.wrap($glAccountId)
        .invoke("text")
        .then((glAccountIdTxt) => {
          cy.log("glAccountIdTxt::: " + glAccountIdTxt);
          cy.wrap(glAccountIdTxt).as("glAccountIdTxt");
        });
    });
  }
  static inputCommissionValue() {
    cy.inputText("commissionValue", FinanceData.cRate);
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_delet").first().scrollIntoView();
        cy.getByTestAttribute("btn_delet").first().click({ force: true });
      } else {
        cy.wait(1000);
        this.clickFirstDeleteButton();
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
        cy.wait(1000);
        this.clickFirstEditButton();
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.contains("button", /yes/i).click();
  }
  static preAssertion() {
    cy.wait(500);
    cy.reload();
    cy.wait(500);
  }
}
