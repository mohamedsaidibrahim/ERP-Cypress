import { InventoryData } from "../../../Inventory/data/inventory_data";
import { FinanceData } from "../../data/finance_data";
import { TreasuryDefinition } from "../pages/treasury_definition";

describe("Treasury Definition (Add)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.TreasuryDefinitionUrl);
  });

  it("1.Verify All components are displaying", () => {
    TreasuryDefinition.landing();
    TreasuryDefinition.clickAddNewButton();
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
    TreasuryDefinition.clickAddNewButton();
    cy.zoomOut();
    cy.clickInputtedSearchDropDownList("accountId",InventoryData.pAccount);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.correctCurrency
    );
    cy.checkAllMultiSelect(0);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(3000);
    cy.get('div[role="dialog"]').should("not.exist");
    
    cy.assertnewItemAddedToListView();
  });

  it("3.Verify Required Validation and The name Field is Required", () => {
    TreasuryDefinition.landing();
    TreasuryDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.zoomOut();
    TreasuryDefinition.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    cy.clickInputtedSearchDropDownList("accountId",InventoryData.pAccount);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.correctCurrency
    );
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    cy.checkAllMultiSelect(0);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    TreasuryDefinition.inputOpeningBalance();
    cy.verifyNotExistanceTheRequiredValidation();
    TreasuryDefinition.clickSaveButton();
    cy.wait(1500);
    cy.get('div[role="dialog"]').should("not.exist");
  });

  it("4.Verify Different Currency Validation", () => {
    TreasuryDefinition.landing();
    TreasuryDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.zoomOut();
    cy.clickInputtedSearchDropDownList("accountId",InventoryData.pAccount);
    cy.clickInputtedSearchDropDownList("currencyId", FinanceData.wrongCurrency);
    cy.checkAllMultiSelect(0);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(3000);
    cy.get('div[role="dialog"]').should("be.visible");
  });

  it("5.Verify Different openingBalance Confirmation", () => {
    TreasuryDefinition.landing();
    cy.getInitItemsCountInListView();
    TreasuryDefinition.clickAddNewButton();
    cy.zoomOut();
    cy.clickInputtedSearchDropDownList("accountId",InventoryData.pAccount);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.correctCurrency
    );
    cy.checkAllMultiSelect(0);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    TreasuryDefinition.inputDiffOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    // Assertion
    cy.wait(1000);
    // cy.get('div[role="dialog"]').should("be.visible");
    // TreasuryDefinition.submitSaving();
    // cy.wait(1500);
    cy.assertnewItemAddedToListView();
  });
});
