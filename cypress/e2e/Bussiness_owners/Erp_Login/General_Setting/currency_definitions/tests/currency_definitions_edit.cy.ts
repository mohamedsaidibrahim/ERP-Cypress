import {
  generateRandomString,
  getWrappedString,
} from "../../../../../../support/utils";
import { GeneralSettingsData } from "../../data/general_settings_data";
import { CurrencyDefinitions } from "../pages/currency_definition";

describe("Currency Definitions (Edit)", () => {
  beforeEach(() => {
    cy.visit(GeneralSettingsData.CurrencyDefinitionsUrl);
  });

  it("1.Verify All components are displaying", () => {
    CurrencyDefinitions.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    // Verify Labels
    cy.verifyLabelText("code", /currency code/i);
    cy.verifyLabelText("name", /currency name/i);
    cy.verifyLabelText("subUnit", /currency subunit/i);
    cy.verifyLabelText("symbol", /currency symbol/i);
    cy.verifyLabelText("countryCode", /currency country/i);
    cy.verifyLabelText("differenceAccount", /difference account/i);
  });

  it("2.Verify Submitting Editing an Existing Currency Definitions", () => {
    CurrencyDefinitions.landing();
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.getLastElementDropDownList(2);
    cy.getByTestAttribute("name").clear().type(GeneralSettingsData.newCurrency);
    cy.getByTestAttribute("subUnit")
      .clear()
      .type(GeneralSettingsData.cSubunitE);
    cy.selectCountryByIndex(1, "egy").then(($country1) => {
      if ($country1 != null) {
        cy.wrap($country1)
          .invoke("text")
          .then((country1Txt) => {
            cy.log("country1Txt::: " + country1Txt);
            cy.wrap(country1Txt).as("country1Txt");
          });
      } else {
        cy.wrap("").as("country1Txt");
      }
    });
    cy.getByTestAttribute("symbol").clear().type(GeneralSettingsData.cSymbolE);
    CurrencyDefinitions.clickSaveButton();
    // Assertion
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.verifyFirstCellInTable(1, GeneralSettingsData.newCurrency);
    cy.verifyFirstCellInTable(2, GeneralSettingsData.cSymbolE);
    cy.verifyFirstCellInTable(3, GeneralSettingsData.cSubunitE);
    cy.get("@country1Txt").then((country1) => {
      cy.verifyFirstCellInTable(4, getWrappedString(country1));
    });
  });

  it("3.Verify canceling Editing an Existing Currency Definitions", () => {
    CurrencyDefinitions.landing();
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.getLastElementDropDownList(2);
    cy.getByTestAttribute("name").clear().type(GeneralSettingsData.newCurrency);
    cy.getByTestAttribute("subUnit")
      .clear()
      .type(GeneralSettingsData.cSubunitE);
    cy.selectCountryByIndex(1, "egy").then(($country1) => {
      if ($country1 != null) {
        cy.wrap($country1)
          .invoke("text")
          .then((country1Txt) => {
            cy.log("country1Txt::: " + country1Txt);
            cy.wrap(country1Txt).as("country1Txt");
          });
      } else {
        cy.wrap("").as("country1Txt");
      }
    });
    cy.getByTestAttribute("symbol").clear().type(GeneralSettingsData.cSymbolE);
    CurrencyDefinitions.clickCancelButton();
    // Assertion
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.verifyFirstCellInTableNotEqual(1, GeneralSettingsData.newCurrency);
    cy.verifyFirstCellInTableNotEqual(3, GeneralSettingsData.cSubunitE);
  
  });

  it("4.Verify Required Validation and The name Field is Required", () => {
    CurrencyDefinitions.landing();
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.verifyNotExistanceTheRequiredValidation();
    cy.getByTestAttribute("name").clear();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    cy.getByTestAttribute("symbol").clear();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    CurrencyDefinitions.clickSaveButton();
    cy.get('div[role="dialog"]').should("be.visible");
    cy.getByTestAttribute("symbol").clear().type(GeneralSettingsData.cSymbolE);
    cy.verifyNotExistanceTheRequiredValidation();
    CurrencyDefinitions.clickSaveButton();
    cy.wait(1500);
    cy.get('div[role="dialog"]').should("not.exist");
  });
});
