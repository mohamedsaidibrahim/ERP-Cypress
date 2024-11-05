import { GeneralSettingsData } from "../../data/general_settings_data";
import { CurrencyConversion } from "../pages/currency_conversion";

describe("Currency Conversion List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(GeneralSettingsData.CurrencyConversionUrl);
  });
  it("1.Verify all the components are displayed on the Listview", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      cy.wrap(table)
        .find("th")
        .eq(0)
        .contains(/from currency/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/currency rate/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/to currency/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/reversed rate/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(4).contains(/notes/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .scrollIntoView()
        .contains(/actions/i)
        .should("be.visible");
    });
  });
  it("2.should filter the table based on search input in the first two columns", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    cy.verifySearchFunctionality();
  });
  it("3.Verify Deleting A Currency Conversion", () => {
    CurrencyConversion.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();

    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    // Assertion

    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });
});
