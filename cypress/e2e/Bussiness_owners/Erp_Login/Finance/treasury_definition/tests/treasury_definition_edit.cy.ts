import { getWrappedNumber } from "../../../../../../support/utils";
import { FinanceData } from "../../data/finance_data";
import { TreasuryDefinition } from "../pages/treasury_definition";

describe("Treasury Definition (edit)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.TreasuryDefinitionUrl);
  });

  it("1.Verify All components are displaying", () => {
    TreasuryDefinition.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.verifyDimmidInput("code");
    // Verify Labels
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
    cy.verifyLabelText("currencyId", /currency/i);
    cy.verifyLabelText("branches", /branches/i);
    cy.verifyLabelText("accountId", /gl account/i);
    cy.get('label[for="openingBalance"]')
      .first()
      .should("include", /opening account balance/i);
    cy.get('label[for="openingBalance"]')
      .last()
      .should("include", /treasury opening balance/i);
  });

  it("2.Verify Submitting new Treasury Definition", () => {
    TreasuryDefinition.landing();
    
    cy.getInitItemsCountInListView();
    cy.clickFirstEditActionButton();
    cy.clickInputtedSearchDropDownList("accountId", FinanceData.edittedAccount);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.edittedCurrency
    );
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(1000);
    cy.get('div[role="dialog"]').should("not.exist");
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
    cy.verifyFirstCellInTable(1, FinanceData.treasuryName);
    cy.get("table tbody")
      .find("tr")
      .first()
      .find("td")
      .eq(2)
      .then(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((txtEx) => {
            expect(txtEx.trim().split(" ").join("")).to.include(
              FinanceData.edittedCurrency.substring(1)
            );
          });
      });
    cy.verifyFirstCellInTable(3, FinanceData.edittedAccount);
  });

  it("3.Verify Required Validation and The name Field is Required", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear();
    cy.contains("span", /required/i).should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    cy.contains("span", /required/i).should("not.exist");
  });

  it("4.Verify Different Currency Validation", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();
    cy.clickInputtedSearchDropDownList("currencyId", FinanceData.wrongCurrency);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    cy.clickInputtedSearchDropDownList("accountId", FinanceData.edittedAccount);
    TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(3000);
    cy.get('div[role="dialog"]').should("be.visible");
  });

  it("5.Verify Different openingBalance Confirmation", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();
    cy.clickInputtedSearchDropDownList("accountId", FinanceData.edittedAccount);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.edittedCurrency
    );
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    TreasuryDefinition.inputDiffOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(500);
    cy.get('div[role="dialog"]').should("be.visible");
    cy.wait(500);
    TreasuryDefinition.submitSaving();
    cy.wait(1500);
    cy.get('div[role="dialog"]').should("not.exist");
  });
});
