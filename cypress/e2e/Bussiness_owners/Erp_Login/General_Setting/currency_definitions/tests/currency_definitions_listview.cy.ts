import { GeneralSettingsData } from "../../data/general_settings_data";
import { CurrencyDefinitions } from "../pages/currency_definition";

describe("Currency Definitions List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(GeneralSettingsData.CurrencyDefinitionsUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    CurrencyDefinitions.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/sympol/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/subunit/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/country/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    CurrencyDefinitions.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
