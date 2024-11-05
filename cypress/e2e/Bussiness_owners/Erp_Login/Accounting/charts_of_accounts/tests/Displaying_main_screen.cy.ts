import { ChartOfAccounts } from "../pages/charts_of_accounts";
import { DisplayingMainScreen } from "../pages/displaying_main_screen";
import { AccountingData } from "../../data/accounting_data";
import { getWrappedString } from "../../../../../../support/utils";

describe("Displaying List View Chart of Account", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(AccountingData.ChartOfAccountsLink);
  });

  it("1. Verify All Components are displaying in their correct states", () => {
    ChartOfAccounts.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1500);
    cy.clickContinueAs();
    cy.wait(1500);
    DisplayingMainScreen.verifyEmptyViewPanal();
    DisplayingMainScreen.verifyTHeTreeHeaders();
    DisplayingMainScreen.verifySearchTextField();
    DisplayingMainScreen.verifyTheMainParentAccounts();
  });

  it("2. Verify Shiftting between Tree and List view", () => {
    ChartOfAccounts.landing();
    ChartOfAccounts.switchingToListView();
    ChartOfAccounts.switchingToTreeView();
  });

  it("3. Verify Tree and List views have the same data", () => {
    ChartOfAccounts.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1500);
    cy.clickContinueAs();
    cy.wait(1500);
    ChartOfAccounts.SearchAnTreeAccount(AccountingData.accountCOde);
    cy.wait(1000);
    cy.get('div[class="description"]').last().scrollIntoView().click();
    cy.wait(1000);
    cy.wrapDisabledPlaceholderValue(0).then((codeT) => {
      cy.wrap(codeT).as("codeT");
    });
    cy.wrapDisabledPlaceholderValue(2).then((nameText) => {
      cy.wrap(nameText).as("nameText");
    });
    cy.wrapDisabledPlaceholderValue(5).then((natureTxt) => {
      cy.wrap(natureTxt).as("natureTxt");
    });
    cy.wrapDisabledPlaceholderValue(6).then((sectionTxt) => {
      cy.wrap(sectionTxt).as("sectionTxt");
    });
    cy.wrapDisabledPlaceholderValue(7).then((typeText) => {
      cy.wrap(typeText).as("typeText");
    });
    cy.wait(2000);
    ChartOfAccounts.switchingToListView();
    ChartOfAccounts.SearchAListAccount(AccountingData.accountCOde);
    cy.wait(2000);
    cy.get("@codeT").then((codeT) => {
      cy.verifyFirstCellInTable(0, getWrappedString(codeT));
    });
    cy.get("@nameText").then((nameText) => {
      cy.verifyFirstCellInTable(1, getWrappedString(nameText));
    });
    cy.get("@sectionTxt").then((sectionTxt) => {
      cy.verifyFirstCellInTable(3, getWrappedString(sectionTxt));
    });
    cy.get("@typeText").then((typeText) => {
      cy.verifyFirstCellInTable(4, getWrappedString(typeText));
    });
    cy.get("@natureTxt").then((natureTxt) => {
      cy.verifyFirstCellInTable(5, getWrappedString(natureTxt));
    });
  });
});
