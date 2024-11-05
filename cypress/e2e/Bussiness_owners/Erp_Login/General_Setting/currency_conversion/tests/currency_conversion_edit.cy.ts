import { GeneralSettingsData } from "../../data/general_settings_data";
import { CurrencyConversion } from "../pages/currency_conversion";

describe("Currency Conversion (Edit)", () => {
  beforeEach(() => {
    cy.visit(GeneralSettingsData.CurrencyConversionUrl);
  });

  it("1.Verify All components are displaying", () => {
    CurrencyConversion.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(500);
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.verifyLabelText("fromCurrencyId", /from currency/i);
    cy.verifyLabelText("fromCurrencyRate", /currency rate/i);
    cy.verifyLabelText("toCurrencyId", /to currency/i);
    cy.verifyLabelText("reversedRate", /reversed rates/i);
    cy.verifyLabelText("note", /notes/i);
  });

  it("2.Verify Submitting Editted Currency Conversion", () => {
    CurrencyConversion.landing();
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency2
    ).then(($toCurrencyId) => {
      if ($toCurrencyId != null) {
        cy.wrap($toCurrencyId)
          .invoke("text")
          .then((toCurrencyIdTxt) => {
            cy.log("toCurrencyIdTxt::: " + toCurrencyIdTxt);
            cy.wrap(toCurrencyIdTxt).as("toCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("toCurrencyIdTxt");
      }
    });
    cy.wait(1000);
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.newCurrencySearch
    ).then(($fromCurrencyId) => {
      if ($fromCurrencyId != null) {
        cy.wrap($fromCurrencyId)
          .invoke("text")
          .then((fromCurrencyIdTxt) => {
            cy.log("fromCurrencyIdTxt::: " + fromCurrencyIdTxt);
            cy.wrap(fromCurrencyIdTxt).as("fromCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("fromCurrencyIdTxt");
      }
    });
    
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    CurrencyConversion.clickSaveButton();
    CurrencyConversion.assertSuccesfulSaving();
  });

  it("3.Verify Rejecting Submitting Editted Currency Conversion (2 Currencies has previous Conversion relation)", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.newCurrencySearch
    ).then(($fromCurrencyId) => {
      if ($fromCurrencyId != null) {
        cy.wrap($fromCurrencyId)
          .invoke("text")
          .then((fromCurrencyIdTxt) => {
            cy.log("fromCurrencyIdTxt::: " + fromCurrencyIdTxt);
            cy.wrap(fromCurrencyIdTxt).as("fromCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("fromCurrencyIdTxt");
      }
    });
    cy.wait(1000);
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency2
    ).then(($toCurrencyId) => {
      if ($toCurrencyId != null) {
        cy.wrap($toCurrencyId)
          .invoke("text")
          .then((toCurrencyIdTxt) => {
            cy.log("toCurrencyIdTxt::: " + toCurrencyIdTxt);
            cy.wrap(toCurrencyIdTxt).as("toCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("toCurrencyIdTxt");
      }
    });
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    CurrencyConversion.clickSaveButton();
    cy.wait(2000);
    cy.contains("div[role='dialog']").should("be.visible");
  });

  it("4.Verify Cancelling Editting Currency Conversion", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency2
    ).then(($toCurrencyId) => {
      if ($toCurrencyId != null) {
        cy.wrap($toCurrencyId)
          .invoke("text")
          .then((toCurrencyIdTxt) => {
            cy.log("toCurrencyIdTxt::: " + toCurrencyIdTxt);
            cy.wrap(toCurrencyIdTxt).as("toCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("toCurrencyIdTxt");
      }
    });
    cy.wait(1000);
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.newCurrencySearch
    ).then(($fromCurrencyId) => {
      if ($fromCurrencyId != null) {
        cy.wrap($fromCurrencyId)
          .invoke("text")
          .then((fromCurrencyIdTxt) => {
            cy.log("fromCurrencyIdTxt::: " + fromCurrencyIdTxt);
            cy.wrap(fromCurrencyIdTxt).as("fromCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("fromCurrencyIdTxt");
      }
    });
    cy.wait(1000);
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type("1" + GeneralSettingsData.ccFromCurrencyRate);
    CurrencyConversion.clickcancelButton();
    // Assertion
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.verifyFirstCellInTableNotEqual(
      1,
      "1" + GeneralSettingsData.ccFromCurrencyRate
    );
  });

  it("5.Verify Validation of the same From and To Currency", () => {
    CurrencyConversion.landing();
    cy.clickFirstEditActionButton();
    cy.wait(1500);
    cy.clickInputtedSearchDropDownList(
      "fromCurrencyId",
      GeneralSettingsData.currency2
    ).then(($fromCurrencyId) => {
      if ($fromCurrencyId != null) {
        cy.wrap($fromCurrencyId)
          .invoke("text")
          .then((fromCurrencyIdTxt) => {
            cy.log("fromCurrencyIdTxt::: " + fromCurrencyIdTxt);
            cy.wrap(fromCurrencyIdTxt).as("fromCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("fromCurrencyIdTxt");
      }
    });
    cy.wait(1000);
    cy.getByTestAttribute("note")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccNote);
    cy.clickInputtedSearchDropDownList(
      "toCurrencyId",
      GeneralSettingsData.currency2
    ).then(($toCurrencyId) => {
      if ($toCurrencyId != null) {
        cy.wrap($toCurrencyId)
          .invoke("text")
          .then((toCurrencyIdTxt) => {
            cy.log("toCurrencyIdTxt::: " + toCurrencyIdTxt);
            cy.wrap(toCurrencyIdTxt).as("toCurrencyIdTxt");
          });
      } else {
        cy.wrap("").as("toCurrencyIdTxt");
      }
    });
    cy.getByTestAttribute("fromCurrencyRate")
      .scrollIntoView()
      .clear()
      .type(GeneralSettingsData.ccFromCurrencyRate);
    // CurrencyConversion.clickSaveButton();
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
