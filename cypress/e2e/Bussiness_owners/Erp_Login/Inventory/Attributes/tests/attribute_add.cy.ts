import { InventoryData } from "../../data/inventory_data";
import { Attribute } from "../pages/attribute";

describe("Attribute (Add )", () => {
  beforeEach(() => {
    cy.visit(InventoryData.AttributeUrl);
  });
  it("1.Verify Labels", () => {
    cy.wait(2000);
    Attribute.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    cy.wait(1000);
    cy.verifyDimmidInput("attributeId");
    cy.contains("label", /ID/i).should("be.visible");
    cy.contains("label", /Attribute Name English/i).should("be.visible");
    cy.contains("label", /Attribute Name Arabic/i).should("be.visible");
    cy.zoomOut();
    cy.get("table th").eq(0).contains(/Value English/i).should("be.visible");
    cy.get("table th").eq(1).contains(/Value Arabic/i).should("be.visible");
    cy.get("table th").eq(2).contains(/Status/i).should("be.visible");
    cy.get("table th").eq(3).contains(/action/i).should("be.visible");
  });

  it("2.Verify Adding new Attribute With One Value Line(Save Button) ", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    Attribute.inputAttributtNameEnglish(InventoryData.nameEn);
    Attribute.inputAttributeNameArabic(InventoryData.nameAr);
    Attribute.clickAddNewLineButton();
    Attribute.inputValueEnglish(InventoryData.nameHEn);
    Attribute.inputValueArabic(InventoryData.nameHAr);
    Attribute.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });

  it("3.Verify Cancel Adding new Attribute With One Value Line(Save Button) ", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    Attribute.inputAttributtNameEnglish(InventoryData.nameEn);
    Attribute.inputAttributeNameArabic(InventoryData.nameAr);
    Attribute.clickAddNewLineButton();
    Attribute.inputValueEnglish(InventoryData.nameHEn);
    Attribute.inputValueArabic(InventoryData.nameHAr);
    Attribute.clickSCancelButton();
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Adding new Attribute Multiple Lines Values", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    Attribute.inputAttributtNameEnglish(InventoryData.nameEn+"Multi");
    Attribute.inputAttributeNameArabic(InventoryData.nameAr+"Multi");
    Attribute.clickAddNewLineButton();
    Attribute.inputValueEnglish(InventoryData.nameHEn+"Multi");
    Attribute.inputValueArabic(InventoryData.nameHAr+"Multi");
    Attribute.clickAddNewLineButton();
    Attribute.inputValueEnglish(InventoryData.nameBEn+"Multi");
    Attribute.inputValueArabic(InventoryData.nameBAr+"Multi");
    Attribute.clickAddNewLineButton();
    Attribute.inputValueEnglish(InventoryData.vName+"Multi");
    Attribute.inputValueArabic(InventoryData.itemName+"Multi");
    Attribute.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });

  it("5.Verify Adding new Attribute Without Values", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    Attribute.inputAttributtNameEnglish(InventoryData.nameEn);
    Attribute.inputAttributeNameArabic(InventoryData.nameAr);
    Attribute.clickSaveButton();
    cy.url().should("include","add");
  });

  it("6.Verify Required Validation Messages", () => {
    Attribute.landing();
    cy.wait(1500);
    cy.clickAddNewButton();
    Attribute.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    Attribute.inputAttributtNameEnglish(InventoryData.nameEn);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    Attribute.inputAttributeNameArabic(InventoryData.nameAr);
    cy.verifyNotExistanceTheRequiredValidation();
    Attribute.clickAddNewLineButton();
    Attribute.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    Attribute.inputValueEnglish(InventoryData.nameHEn);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    Attribute.inputValueArabic(InventoryData.nameHAr);
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
