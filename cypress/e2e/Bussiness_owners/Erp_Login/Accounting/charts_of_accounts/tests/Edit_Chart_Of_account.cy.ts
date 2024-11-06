import { AccountingData } from "../../data/accounting_data";
import { AddingAccountScreen } from "../pages/adding_account_screen";
import { ChartOfAccounts } from "../pages/charts_of_accounts";
import { getWrappedString } from "../../../../../../support/utils";
import { DisplayingAccountScreen } from "../pages/displaying_account_screen";

describe("Editting Chart of Account", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(AccountingData.ChartOfAccountsLink);
  });
  
  it("1.  Verify All Components are displaying in their correct states", () => {
    ChartOfAccounts.landing();
    cy.wait(1500);
    ChartOfAccounts.SearchAnTreeAccount(AccountingData.accountCOde);
    ChartOfAccounts.clickEditButtonDetailAccount();
    DisplayingAccountScreen.verifyDisplayingTheCorrectDataInAccountEditting();
  });

  it("2. Verify Editting an Detail Chart of Account", () => {
    ChartOfAccounts.landing();
    cy.wait(1500);
    ChartOfAccounts.SearchAnTreeAccount(AccountingData.accountCOde);
    cy.wait(1000);
    ChartOfAccounts.clickEditButtonDetailAccount();
    cy.wait(5500);
    cy.verifyDimmidItemDropDownList("natureId");
    cy.verifyDimmidItemDropDownList("accountSectionId");
    cy.clickInputtedSearchDropDownList(
      "parentId",
      AccountingData.testParentAccountEdittedSearch
    ).then(($parentId) => {
      cy.wrap($parentId)
        .invoke("text")
        .then((parentTxtEdited) => {
          cy.log("parentTxtEdited::: " + parentTxtEdited);
          cy.wrap(parentTxtEdited).as("parentTxtEdited");
        });
    });
    AddingAccountScreen.inputName(AccountingData.edittedChartOfAccountName);
    // cy.clickInputtedSearchDropDownList("accountTypeId","bank").then(($accountTypeId) => {
    //   cy.wrap($accountTypeId)
    //     .invoke("text")
    //     .then((typeTxtEditted) => {
    //       cy.log("typeTxtEditted::: " + typeTxtEditted);
    //       cy.wrap(typeTxtEditted).as("typeTxtEditted");
    //     });
    // });
    AddingAccountScreen.inputName(AccountingData.edittedChartOfAccountName);
    AddingAccountScreen.clickSaveButton();
    for (var i = 0; i < 7; i++) {
      cy.log(
        "<<<<<***** Viewing ***** Viewing ***** Viewing ***** Viewing *****>>>"
      );
    }
    cy.wait(2000);
    cy.log("<<<<<***** Verification in Tree View *****>>>>>>");
    ChartOfAccounts.SearchAnTreeAccount(
      AccountingData.edittedChartOfAccountName
    );
    cy.get("span#label_tree.ng-star-inserted").last().scrollIntoView().click();
    cy.wait(1000);
    cy.verifyPlaceholderText(2, AccountingData.edittedChartOfAccountName);
    cy.get("@parentTxtEdited").then((parentTxtEdited) => {
      cy.verifyPlaceholderText(3, getWrappedString(parentTxtEdited));
    });
    // cy.get("@typeTxtEditted").then((typeTxtEditted) => {
    //   cy.verifyPlaceholderText(7, getWrappedString(typeTxtEditted));
    // });
  });
});
