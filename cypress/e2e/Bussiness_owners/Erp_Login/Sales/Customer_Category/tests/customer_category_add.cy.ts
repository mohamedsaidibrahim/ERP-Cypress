import { generateRandomString } from "../../../../../../support/utils";
import { SalesData } from "../../data/sales_data";
import { CustomerCategory } from "../pages/Customer_category";

describe("Customer Category (Add)", () => {
  beforeEach(() => {
    cy.visit(SalesData.customerCategoryUrl);
  });
  it("1.Verify All components are displaying", () => {
    CustomerCategory.landing();
    cy.wait(1500);
    CustomerCategory.clickAddNewButton();
    // Verify Labels
    cy.verifyLabelText("code", /category code/i);
    cy.verifyLabelText("name", /category name/i);
    cy.verifyLabelText("receivableAccountId", /recievable gl account/i);
    cy.verifyLabelText("salesAccountId", /sales gl account/i);
    cy.verifyLabelText("salesReturnAccountId", /sales return gl account/i);
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

  it("2.Verify Submitting new Customer Category", () => {
    CustomerCategory.landing();
    
    cy.getInitItemsCountInListView();
    CustomerCategory.clickAddNewButton();
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    cy.getFirstItemInDropDownList("receivableAccountId");
    cy.getFirstItemInDropDownList("salesAccountId");
    cy.getFirstItemInDropDownList("salesReturnAccountId");
    cy.getFirstItemInDropDownList("discountAccountId");
    cy.getFirstItemInDropDownList("priceListId");
    cy.getFirstItemInDropDownList("paymentTermId");
    cy.getFirstItemInDropDownList("marketType");
    CustomerCategory.clickSaveButton();
    // Assertion
    cy.wait(1000);
    
    cy.assertnewItemAddedToListView();
  });

  it("3.Verify Required Validation and The name Field is Required", () => {
    CustomerCategory.landing();
    CustomerCategory.clickAddNewButton();
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear();
    cy.contains("span", /required/i).should("be.visible");
    CustomerCategory.clickSaveButton();
    cy.get("span").should("include",/create/i);
    cy.getByTestAttribute("name").clear().type(generateRandomString(7));
    CustomerCategory.clickSaveButton();
    cy.wait(1500);
    cy.get("span").should("not.include",/create/i);
  });
});
