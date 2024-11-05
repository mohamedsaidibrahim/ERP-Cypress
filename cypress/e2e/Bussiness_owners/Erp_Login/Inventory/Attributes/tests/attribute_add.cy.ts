import { InventoryData } from "../../data/inventory_data";
import { Attribute } from "../pages/attribute";

describe("Attribute (Add )", () => {
  beforeEach(() => {
    cy.visit(InventoryData.AttributeUrl);
  });
  it("1.Verify Labels", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1000);
    cy.contains("label", /Attribute Name/i).should("be.visible");
    cy.zoomOut();
    cy.get("table").then((table) => {
      // Verify Table Column Headers
        cy.wrap(table).find("th").eq(0).contains(/name ar/i).should("be.visible");
        cy.wrap(table).find("th").eq(1).contains(/Name en/i).should("be.visible");
        cy.wrap(table).find("th").eq(2).contains(/action/i).should("be.visible");
    });
  });
  it("2.Verify Adding new Attribute (Save Button) ", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    Attribute.verifyDimmedAddNewButton();
    Attribute.selectAttrName();
    Attribute.clickAddNewButton();
    Attribute.inputNameEn();
    Attribute.verifyMissingSaveLineButton();
    Attribute.inputNameAr();
    // Verify Required Validation
    Attribute.verifyVisibilitySaveLineButton();
    Attribute.clickSaveLineButton();
  });
});
