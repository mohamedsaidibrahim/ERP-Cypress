import { GeneralSettingsData } from "../../data/general_settings_data";
import { TaxsDefinitions } from "../pages/Taxs Definitions";

describe("Taxs Definitions List View", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(GeneralSettingsData.TaxDefinitionsLink);
  });

  it("1.Verify all the Column Headers are displayed on the Listview", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      cy.wrap(table).find("th").eq(0).contains(/id/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table).find("th").eq(2).contains(/ratio/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/account/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/tax group/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    TaxsDefinitions.landing();
    cy.wait(1000);
    cy.verifySearchFunctionality();
  });

  it("3.Verify canceling Deleting an Existing Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(500);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    TaxsDefinitions.cancelDeleteAction();
    cy.wait(1000);
    
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Deleting an Existing Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(500);
    
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    TaxsDefinitions.confirmDeleteAction();
    cy.wait(1000);
    
    cy.assertItemDeletedFromListView();
  });
});
