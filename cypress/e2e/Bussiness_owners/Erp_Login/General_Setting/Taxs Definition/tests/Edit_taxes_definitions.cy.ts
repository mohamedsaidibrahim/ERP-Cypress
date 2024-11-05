import {
  getWrappedString,
  removeSpacesBetween,
} from "../../../../../../support/utils";
import { GeneralSettingsData } from "../../data/general_settings_data";
import { TaxsDefinitions } from "../pages/Taxs Definitions";

describe("Edit Existing Taxs Definitions", () => {
  beforeEach("Navigates to Taxs Definitions", () => {
    cy.visit(GeneralSettingsData.TaxDefinitionsLink);
  });

  it("1.Verify all the components are displayed on the Edit Existing Tax Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
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
  });

  it("2.Verify Displaying Of Required Messsages", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();

    TaxsDefinitions.clearName();
    TaxsDefinitions.verifyRequiredMessages("1");
    TaxsDefinitions.inputName("name");
    TaxsDefinitions.verifyAbsenceRequiredMessages();

    TaxsDefinitions.clearRatio();
    TaxsDefinitions.verifyRequiredMessages("1");
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.verifyAbsenceRequiredMessages();
  });

  it("3.Verify canceling Editting Existing Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    TaxsDefinitions.preActions();
    cy.clickFirstEditActionButton();
    // TaxsDefinitions.inputCode(GeneralSettingsData.taxesDefinitionsCode);
    TaxsDefinitions.inputName(GeneralSettingsData.taxesDefinitionsName);
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.selectFirstAccountId();
    TaxsDefinitions.selectLastTaxGroupId();
    TaxsDefinitions.cancelDialog();
    TaxsDefinitions.assertNotSaving();
  });

  it("4.Verify Editting Existing Taxes Definitions", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    TaxsDefinitions.preActions();
    cy.clickFirstEditActionButton();
    // TaxsDefinitions.inputCode(GeneralSettingsData.taxesDefinitionsCode);
    TaxsDefinitions.inputName(GeneralSettingsData.taxesDefinitionsName);
    TaxsDefinitions.inputRatio(GeneralSettingsData.taxesDefinitionsRatio);
    TaxsDefinitions.selectFirstAccountId();
    TaxsDefinitions.selectLastTaxGroupId();
    TaxsDefinitions.submitDialog();
    TaxsDefinitions.assertSuccessfulSubmission(true);
  });

  it("5.Verify That the  Editting Dialog has the correct Data after Landing", () => {
    TaxsDefinitions.landing();
    cy.wait(1500);
    cy.getFirstCellInTableValue(0).then((code1) => {
      cy.wrap(code1).as("code1");
    });
    cy.getFirstCellInTableValue(1).then((name1) => {
      cy.wrap(name1).as("name1");
    });
    cy.getFirstCellInTableValue(2).then((ratio1) => {
      cy.wrap(ratio1).as("ratio1");
    });
    cy.getFirstCellInTableValue(3).then((account1) => {
      cy.wrap(account1).as("account1");
    });
    cy.getFirstCellInTableValue(4).then((taxGroup1) => {
      cy.wrap(taxGroup1).as("taxGroup1");
    });
    cy.clickFirstEditActionButton();
    cy.get("@code1").then((code1) => {
      cy.getByTestAttribute("code")
        .invoke("val")
        .then((codeText) => {
          expect(codeText).to.equal(getWrappedString(code1));
        });
    });
    cy.get("@name1").then((name1) => {
      cy.getByTestAttribute("name")
        .invoke("val")
        .then((nameText) => {
          expect(nameText).to.equal(
            removeSpacesBetween(getWrappedString(name1))
          );
        });
    });
    cy.get("@ratio1").then((ratio1) => {
      cy.getByTestAttribute("ratio")
        .invoke("val")
        .then((ratioTxt) => {
          expect(ratioTxt).to.equal(
            removeSpacesBetween(getWrappedString(ratio1))
          );
        });
    });
    cy.get('span[role="combobox"]').eq(1).scrollIntoView();
    cy.get("@account1").then((account1) => {
      var expextedTxt = removeSpacesBetween(getWrappedString(account1));
      cy.get('span[role="combobox"]')
        .eq(1)
        .invoke("attr", "aria-label")
        .then((ariaLabel) => {
          expect(removeSpacesBetween(ariaLabel)).to.equal(expextedTxt); // Replace 'expected value' with the value you expect
        });
    });
    cy.get('span[role="combobox"]').eq(2).scrollIntoView();
    cy.get("@taxGroup1").then((taxGroup1) => {
      var expextedTxt = removeSpacesBetween(getWrappedString(taxGroup1));
      cy.get('span[role="combobox"]')
        .eq(2)
        .should("have.attr", "aria-label", expextedTxt);
    });
  });
});
