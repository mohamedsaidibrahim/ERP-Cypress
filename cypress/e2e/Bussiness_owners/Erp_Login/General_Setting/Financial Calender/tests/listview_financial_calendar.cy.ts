import { GeneralSettingsData } from "../../data/general_settings_data";
import { FinancialCallender } from "../pages/financial_calender";

describe("Financial Calander List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(GeneralSettingsData.FinancialCalenderUrl);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    FinancialCallender.landing();
    cy.wait(1500);
    // Menu Item Text
    cy.get("span")
      .should("be.visible")
      .should("include", /financial calender/i);
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/from date/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/to date/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/status/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    FinancialCallender.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });
});
