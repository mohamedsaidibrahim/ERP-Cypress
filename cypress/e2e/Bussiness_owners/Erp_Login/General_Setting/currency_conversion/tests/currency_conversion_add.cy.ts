import { GeneralSettingsData } from "../../data/general_settings_data";
import { CurrencyConversion } from "../pages/currency_conversion";

describe("Currency Conversion (Add)", () => {
  beforeEach(() => {
    cy.visit(GeneralSettingsData.CurrencyConversionUrl);
  });

  it("1.Verify All components are displaying", () => {
    CurrencyConversion.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    CurrencyConversion.clickAddNewButton();
    cy.wait(1500);
    cy.verifyLabelText("fromCurrencyId", /from currency/i);
    cy.verifyLabelText("fromCurrencyRate", /currency rate/i);
    cy.verifyLabelText("toCurrencyId", /to currency/i);
    cy.verifyLabelText("reversedRate", /reversed rates/i);
    cy.verifyLabelText("note", /notes/i);
  });

  it("2.Verify Submitting new Currency Conversion", () => {
    CurrencyConversion.landing();
    cy.wait(1500);

    cy.getInitItemsCountInListView();
    CurrencyConversion.clickAddNewButton();
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.currency1
    );
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.newCurrencySearch
    );
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);

    CurrencyConversion.clickSaveButton();
    // Assertion
    cy.wait(1000);

    cy.assertnewItemAddedToListView();
  });

  it("3.Verify Cancelling Submitting new Currency Conversion", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    CurrencyConversion.clickAddNewButton();
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.newCurrencySearch
    );
    cy.wait(1000);
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency1
    );
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);

    CurrencyConversion.clickcancelButton();
    // Assertion
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Required Validation and The name Field is Required", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    CurrencyConversion.clickAddNewButton();
    cy.wait(1500);
    CurrencyConversion.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);

    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.newCurrencySearch
    );
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);

    cy.getByTestAttribute("fromCurrencyRate")
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);

    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency1
    );
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("5.Verify Validation of the same From and To Currency", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    CurrencyConversion.clickAddNewButton();
    cy.wait(1500);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.currency1
    );
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency1
    );
    cy.wait(1000);
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);
    cy.contains("div", /different/i)
      .first()
      .scrollIntoView()
      .should("be.visible");
    cy.contains("div", /different/i)
      .last()
      .scrollIntoView()
      .should("be.visible");
  });
});