import { GeneralSettingsData } from "../../data/general_settings_data";
import { TaxsGroup } from "../pages/TaxsGroup";

describe("Taxs Group List View", () => {
  beforeEach("Navigates to Taxs Group", () => {
    cy.visit(GeneralSettingsData.TaxGroupLink);
  });

  it("1.Verify all the components are displayed on the Listview", () => {
    TaxsGroup.landing();
    cy.wait(1500);
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table).find("th").eq(1).contains(/name/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/country name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it("2.should filter the table based on search input in the first two columns", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.verifySearchFunctionality();
  });

  it("3.Verify canceling Deleting an Existing Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);   
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    TaxsGroup.cancelDeleteAction();
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Deleting an Existing Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    TaxsGroup.confirmDeleteAction();
    cy.wait(1000);
    cy.assertItemDeletedFromListView();
  });
});
