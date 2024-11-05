import { generateRandomString } from "../../../../../../support/utils";
import { PurchaseData } from "../../data/purchase_data";
import { VendorCategory } from "../pages/Vendor_category";

describe("Vendor Category (Edit)", () => {
  beforeEach(() => {
    cy.visit(PurchaseData.VendorCategoryUrl);
  });
  it("1.Verify All components are displaying", () => {
    VendorCategory.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    // Verify Labels
    cy.verifyLabelText("code", /category code/i);
    cy.verifyLabelText("name", /category name/i);
    cy.verifyLabelText("payableAccountId", /paypal gl account/i);
    cy.verifyLabelText("purchaseAccountId", /purchase gl account/i);
    cy.verifyLabelText(
      "purchaseReturnAccountId",
      /purchase return gl account/i
    );
    cy.verifyLabelText("discountAccountId", /discount gl account/i);
    cy.verifyLabelText("priceListId", /price list/i);
    cy.verifyLabelText("paymentTermId", /payment terms/i);
    cy.verifyLabelText("marketType", /market type/i);
    // Verify The Dimmed Code
    cy.getByTestAttribute("code").should("have.attr", "readonly");
    cy.getByTestAttribute("code").should("have.attr", "disabled");
    // Verify All Dropdown Buttons
    cy.get('span[role="combobox"]').should("have.length", 7);
  });

  it("2.Verify Submitting Editted Vendor Category", () => {
    VendorCategory.landing();
    cy.wait(3000);
    cy.clickFirstEditActionButton();
    VendorCategory.InputAllFields();
    VendorCategory.clickSaveButton();
    // Assertion
    VendorCategory.assertSuccesfulSaving();
  });
  
  it("3.Verify Required Validation and The name Field is Required", () => {
    VendorCategory.landing();
    cy.clickFirstEditActionButton();
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear();
    cy.contains("span", /required/i).should("be.visible");
    VendorCategory.clickSaveButton();
    cy.get("span").should("include", /edit/i);
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    VendorCategory.clickSaveButton();
    cy.wait(1500);
    cy.get("span").should("not.include", /edit/i);
  });
});
