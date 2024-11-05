import { AccountingData } from "../../data/accounting_data";
import { ChartOfAccounts } from "../pages/charts_of_accounts";
import { DisplayingAccountScreen } from "../pages/displaying_account_screen";

describe("Acount View Displaying Chart of Account", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(AccountingData.ChartOfAccountsLink);
  });
  it("Verify All Components are displaying in their correct states", () => {
    ChartOfAccounts.landing();
    cy.wait(1500);
    cy.get('div[class="description"]').last().scrollIntoView().click();
    cy.wait(1000);
    DisplayingAccountScreen.verifyDisplayingTheCorrectDataInAccountView();
  });
});
