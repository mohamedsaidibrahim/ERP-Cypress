import { generateRandomMobileNumber } from "../../../../../../support/utils";
import { JournalEntry } from "../../../Accounting/journal_entry/pages/journal_entry";
import { FinanceData } from "../../data/finance_data";

export class PaymentIn {

  static verifyDisplayingPostButton() {
    cy.wait(2000);
    cy.contains("button", /post/i).scrollIntoView().should("be.visible");
  }

  static clickPostButton() {
    cy.contains("button", /post/i).scrollIntoView().click();
  }

  static selectTreasuryHub() {
    cy.getFirstItemInDropDownList("paymentHub").then(($paymentHub) => {
      if ($paymentHub != null) {
        cy.wrap($paymentHub)
          .invoke("text")
          .then((paymentHubTxt) => {
            cy.log("paymentHubTxt::: " + paymentHubTxt);
            cy.wrap(paymentHubTxt).as("paymentHubTxt");
          });
      } else {
        cy.wrap("").as("paymentHubTxt");
      }
    });
  }

  static selectBankHub() {
    cy.getLastItemInDropDownList("paymentHub").then(($paymentHub) => {
      if ($paymentHub != null) {
        cy.wrap($paymentHub)
          .invoke("text")
          .then((paymentHubTxt) => {
            cy.log("paymentHubTxt::: " + paymentHubTxt);
            cy.wrap(paymentHubTxt).as("paymentHubTxt");
          });
      } else {
        cy.wrap("").as("paymentHubTxt");
      }
    });
  }
  static selectPaymentHubDetailIdTxt() {
    cy.getFirstItemInDropDownList("paymentHubDetailId").then(
      ($paymentHubDetailId) => {
        if ($paymentHubDetailId != null) {
          cy.wrap($paymentHubDetailId)
            .invoke("text")
            .then((paymentHubDetailIdTxt) => {
              cy.log("paymentHubDetailIdTxt::: " + paymentHubDetailIdTxt);
              cy.wrap(paymentHubDetailIdTxt).as("paymentHubDetailIdTxt");
            });
        } else {
          cy.wrap("").as("paymentHubDetailIdTxt");
        }
      }
    );
  }

  static clickAddNewLine() {
    cy.contains("button", /Add New Line/i)
      .scrollIntoView()
      .click();
  }

  static inputAmountLine(amount: string) {
    cy.clickCellInATable(0, 0);
    cy.inputText("amount", amount);
  }

  static choosePaymentMethodIdLine(methodSrch: string) {
    cy.clickCellInATable(0, 2);
    cy.clickInputtedSearchDropDownList("paymentMethodId", methodSrch).then(
      ($paymentMethodId) => {
        cy.wrap($paymentMethodId)
          .invoke("text")
          .then((paymentMethodIdTxt) => {
            cy.log("paymentMethodIdTxt::: " + paymentMethodIdTxt);
            cy.wrap(paymentMethodIdTxt).as("paymentMethodIdTxt");
          });
      }
    );
  }

  static inputPaymentMethodIdLineBank() {
    cy.clickCellInATable(0, 3);
    // cy.get('lib-button-micro').click();
    cy.inputText("bankReference", FinanceData.bankReference);
    cy.get('div[role="dialog"] button[data-testid="save"]').click();
  }

  static selectPaidBy() {
    cy.clickCellInATable(0, 4);
    cy.getLastItemInDropDownList("paidBy").then(($paidBy) => {
      cy.wrap($paidBy)
        .invoke("text")
        .then((paidByTxt) => {
          cy.log("paidByTxt::: " + paidByTxt);
          cy.wrap(paidByTxt).as("paidByTxt");
        });
    });
  }

  static selectPaidByDetailsId() {
    cy.clickCellInATable(0, 5);
    cy.getLastItemInDropDownList("paidByDetailsId").then(($paidByDetailsId) => {
      cy.wrap($paidByDetailsId)
        .invoke("text")
        .then((paidByDetailsIdTxt) => {
          cy.log("paidByDetailsIdTxt::: " + paidByDetailsIdTxt);
          cy.wrap(paidByDetailsIdTxt).as("paidByDetailsIdTxt");
        });
    });
  }

  static selectGlAccountCode() {
    cy.clickCellInATable(0, 6);
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
  static addCostCenterNewLine() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/add new line/i)
      .scrollIntoView()
      .click();
  }
  static addCostCenter() {
    cy.clickCellInATable(0, 7);
    cy.get("tbody").find("tr").first().find("td").eq(7).find("img").click();
    cy.wait(2000);
    cy.getFirstItemInDropDownList("costCenterId");
    JournalEntry.addCostCenterPercentage("100");
    this.addCostCenterNewLine();
    JournalEntry.removeCostCenterNewLine();
    JournalEntry.clickSaveCostCenter();
  }
  static inputNote() {
    cy.clickCellInATable(0, 8);
    cy.inputText("notes", FinanceData.note);
  }

  static deleteBottomLine() {
    cy.clickCellInATable(0, 9);
    cy.getByTestAttribute("table_button_delete").click();
  }

  static selectBankAccountId() {
    cy.getFirstItemInDropDownList("bankAccountId").then(($bankAccountId) => {
      if ($bankAccountId != null) {
        cy.wrap($bankAccountId)
          .invoke("text")
          .then((bankAccountIdTxt) => {
            cy.log("bankAccountIdTxt::: " + bankAccountIdTxt);
            cy.wrap(bankAccountIdTxt).as("bankAccountIdTxt");
          });
      } else {
        cy.wrap("").as("bankAccountIdTxt");
      }
    });
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }

  static clickSaveEditButton() {
    cy.contains("button", /save/i).scrollIntoView().click();
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").click({ force: true });
  }

  static landing() {
    cy.LandingToERPModule(FinanceData.PaymentInUrl, "paymentin");
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
        cy.getByTestAttribute("btn_edit")
          .first()
          .scrollIntoView()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.contains("button", /yes/i).click({ force: true });
  }
  static addAccountNumber() {
    cy.get("tbody tr").eq(0).find("td").first().scrollIntoView();
    cy.get("tbody tr").eq(0).find("td").first().click({ force: true });
    cy.get("input").last().clear();
    cy.get("input").last().type(generateRandomMobileNumber());
  }

  static addAccountCode() {
    cy.get("tbody tr").first().find("td").eq(1).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(1).click({ force: true });
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
  static selectAllBranches() {
    cy.get("tbody tr").first().find("td").eq(3).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(3).click({ force: true });
    cy.checkAllMultiSelect(0);
  }
  static addIBN() {
    cy.get("tbody tr").first().find("td").eq(4).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(4).click({ force: true });
    cy.get("input").last().clear().type(generateRandomMobileNumber());
  }
  static addCurrency() {
    cy.get("tbody tr").first().find("td").eq(5).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(5).click({ force: true });
    cy.clickInputtedSearchDropDownList("currencyId", "eg").then(
      ($currencyId) => {
        if ($currencyId != null) {
          cy.wrap($currencyId)
            .invoke("text")
            .then((currencyIdTxt) => {
              cy.log("currencyIdTxt::: " + currencyIdTxt);
              cy.wrap(currencyIdTxt).as("currencyIdTxt");
            });
        } else {
          cy.wrap("").as("currencyIdTxt");
        }
      }
    );
  }
  static selectUserPermission() {
    cy.get("tbody tr").first().find("td").eq(7).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(7).click({ force: true });
    cy.checkAllMultiSelect(0);
    cy.wait(750);
    cy.get("body").click();
  }
  static addOpeningBalance() {
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(6)
      .invoke("text")
      .then((obVal: any) => {
        cy.log("addOpeningBalance obVal : " + obVal);
        cy.get("tbody tr").eq(0).find("td").eq(8).scrollIntoView();
        cy.get("tbody tr").eq(0).find("td").eq(8).click({ force: true });
        cy.get("input").last().click({ force: true });
        cy.get("input").last().clear({ force: true });
        cy.get("input").last().type(obVal.toString().trim().toString());
      });
  }
  static verifyJLFirstTypeLine(
    row: number,
    jlAccount: number,
    debitAmount: any,
    creditAmount: any,
    currency: string,
    localDebitAmount: any,
    localCreditAmount: any
  ) {
    cy.get(
      ":nth-child(" + row + ') > [peditablecolumnfield="accountId"]'
    ).should("have.text", " " + jlAccount + " ");
    cy.get(
      ":nth-child(" +
      row +
      ') > [peditablecolumnfield="debitAmount"] > .p-element'
    ).should("have.text", " " + debitAmount + " ");
    cy.get(
      ":nth-child(" +
      row +
      ') > [peditablecolumnfield="creditAmount"] > .p-element'
    ).should("have.text", " " + creditAmount + " ");
    cy.get(
      ".p-datatable-tbody > :nth-child(" + row + ") > :nth-child(8)"
    ).should("have.text", " " + currency + " ");
    cy.get(
      ".p-datatable-tbody > :nth-child(" + row + ") > :nth-child(10)"
    ).should("have.text", " " + localDebitAmount + " ");
    cy.get(
      ".p-datatable-tbody > :nth-child(" + row + ") > :nth-child(11)"
    ).should("have.text", " " + localCreditAmount + " ");
  }

  static verifyJLFollowingTypeLine(
    row: number,
    jlAccount: number,
    debitAmount: any,
    creditAmount: any,
    currency: string,
    localDebitAmount: any,
    localCreditAmount: any
  ) {
    cy.get(
      ":nth-child(" +
      row +
      ') > [peditablecolumnfield="accountId"] > .p-element'
    ).should("have.text", " " + jlAccount + " ");
    cy.get(
      ":nth-child(" +
      row +
      ') > [peditablecolumnfield="debitAmount"] > .p-element'
    ).should("have.text", " " + debitAmount + " ");
    cy.get(
      ":nth-child(" +
      row +
      ') > [peditablecolumnfield="creditAmount"] > .p-element'
    ).should("have.text", " " + creditAmount + " ");
    cy.get(":nth-child(" + row + ") > :nth-child(8)").should(
      "have.text",
      " " + currency + " "
    );
    cy.get(":nth-child(" + row + ") > :nth-child(10)").should(
      "have.text",
      " " + localDebitAmount + " "
    );
    cy.get(":nth-child(" + row + ") > :nth-child(11)").should(
      "have.text",
      " " + localCreditAmount + " "
    );
  }

  static verifyTfootTotalLine(totalAmount: any) {
    cy.get(".imptyData").should("have.text", " Total ");
    cy.get(".p-datatable-tfoot > .ng-star-inserted > :nth-child(2)").should(
      "have.text",
      " " + totalAmount + " "
    );
    cy.get(".p-datatable-tfoot > .ng-star-inserted > :nth-child(3)").should(
      "have.text",
      " " + totalAmount + " "
    );
    cy.get(".p-datatable-tfoot > .ng-star-inserted > :nth-child(6)").should(
      "have.text",
      " " + totalAmount + " "
    );
    cy.get(".p-datatable-tfoot > .ng-star-inserted > :nth-child(7)").should(
      "have.text",
      " " + totalAmount + " "
    );
  }
}
