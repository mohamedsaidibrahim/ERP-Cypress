import { GeneralSettingsData } from "../../data/general_settings_data";
import { TaxsDefinitions } from "../pages/Taxs Definitions";

describe("Add New Taxs Definitions", () => {
  beforeEach("Navigates to Taxs Definitions", () => {
    cy.visit(GeneralSettingsData.TaxDefinitionsLink);
  });

  it("1.Verify all the components are displayed on the Add New Tax Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    TaxsDefinitions.clickAddNewButton();
    // Code Label
    cy.get('label[for="code"]').contains(/code/i).should("be.visible");
    // Code Input
    cy.getByTestAttribute("code").should("be.visible");
    // Name Label
    cy.get('label[for="name"]').contains(/name/i).should("be.visible");
    // Name Input
    cy.getByTestAttribute("name").should("be.visible");
    // ratio Label
    cy.get('label[for="ratio"]').contains(/ratio/i).should("be.visible");
    // ratio Input
    cy.getByTestAttribute("ratio").should("be.visible");
    // accountId Label
    cy.get('label[for="accountId"]')
      .scrollIntoView()
      .contains(/gl account/i)
      .should("be.visible");
    // accountId Input
    cy.getByTestAttribute("accountId").should("be.visible");
    // taxGroupId Label
    cy.get('label[for="taxGroupId"]')
      .scrollIntoView()
      .contains(/tax group/i)
      .should("be.visible");
    // taxGroupId Input
    cy.getByTestAttribute("taxGroupId").should("be.visible");
  });

  it("2.Verify Displaying Of Required Messsages", () => {
    TaxsDefinitions.landing();
    TaxsDefinitions.clickAddNewButton();
    TaxsDefinitions.submitDialog();
    TaxsDefinitions.verifyRequiredMessages("5");
    TaxsDefinitions.inputCode("123");
    TaxsDefinitions.verifyRequiredMessages("4");
    TaxsDefinitions.inputName("name");
    TaxsDefinitions.verifyRequiredMessages("3");
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.verifyRequiredMessages("2");
    TaxsDefinitions.selectLastAccountId();
    TaxsDefinitions.verifyRequiredMessages("1");
    TaxsDefinitions.verifySlectTaxGroupId();
  });

  it("3.Verify canceling Adding New Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1000);
    
    cy.getInitItemsCountInListView();
    TaxsDefinitions.clickAddNewButton();
    TaxsDefinitions.inputCode(GeneralSettingsData.taxesDefinitionsCode);
    TaxsDefinitions.inputName(GeneralSettingsData.taxesDefinitionsName);
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.selectLastAccountId();
    TaxsDefinitions.selectLastTaxGroupId();
    TaxsDefinitions.cancelDialog();
    cy.wait(1000);
    
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Adding New Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1000);
    
    cy.getInitItemsCountInListView();
    TaxsDefinitions.clickAddNewButton();
    TaxsDefinitions.inputCode(GeneralSettingsData.taxesDefinitionsCode);
    TaxsDefinitions.inputName(GeneralSettingsData.taxesDefinitionsName);
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.selectLastAccountId();
    TaxsDefinitions.selectLastTaxGroupId();
    TaxsDefinitions.submitDialog();
    TaxsDefinitions.assertSuccessfulSubmission(false);
  });
});
