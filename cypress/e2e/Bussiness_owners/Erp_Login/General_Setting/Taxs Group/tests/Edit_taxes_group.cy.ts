import { TaxsGroup } from "../pages/TaxsGroup";
import { getWrappedString } from "../../../../../../support/utils";
import { GeneralSettingsData } from "../../data/general_settings_data";

describe("Edit New Taxs Group", () => {
  beforeEach("Navigates to Taxs Group", () => {
    cy.visit(GeneralSettingsData.TaxGroupLink);
  });

  it("1.Verify all the components are displayed on the Edit New Tax Group", () => {
    TaxsGroup.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    // Code Label
    cy.get('label[for="code"]').contains(/code/i).should("be.visible");
    // Code Input
    cy.getByTestAttribute("code").should("be.visible");
    // Name Label
    cy.get('label[for="name"]').contains(/name/i).should("be.visible");
    // Name Input
    cy.getByTestAttribute("name").should("be.visible");
  });

  it("2.Verify Displaying Of Required Messsages", () => {
    TaxsGroup.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    TaxsGroup.clearName();
    TaxsGroup.verifyRequiredMessages("1");
    TaxsGroup.inputName("name");

    TaxsGroup.clearCode();
    TaxsGroup.verifyRequiredMessages("1");
    TaxsGroup.inputCode(GeneralSettingsData.taxesGroupCode);

    TaxsGroup.verifyInExistenceOfRequiredMessage();
  });

  it("3.Verify Editting New Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    cy.getLastCellInTableValue(0).then((code1) => {
      cy.wrap(code1).as("code1");
    });
    cy.getLastCellInTableValue(1).then((name1) => {
      cy.wrap(name1).as("name1");
    });
    cy.reload();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    cy.get("@name1").then((name1) => {
      TaxsGroup.inputName("Editted_" + getWrappedString(name1));
    });
    TaxsGroup.submitDialog();
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
    cy.get("@code1").then((code1) => {
      cy.verifyFirstCellInTable(0, getWrappedString(code1));
    });
    cy.get("@name1").then((name1) => {
      cy.verifyFirstCellInTable(1, "Editted_" + getWrappedString(name1));
    });
  });
  
  it("4.Verify canceling Editting New Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    cy.getLastCellInTableValue(0).then((code1) => {
      cy.wrap(code1).as("code1");
    });
    cy.getLastCellInTableValue(1).then((name1) => {
      cy.wrap(name1).as("name1");
    });
    cy.reload();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    cy.get("@name1").then((name1) => {
      TaxsGroup.inputName("Editted_" + getWrappedString(name1));
    });
    TaxsGroup.cancelDialog();
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
    cy.get("@code1").then((code1) => {
      cy.verifyFirstCellInTable(0, getWrappedString(code1));
    });
    cy.get("@name1").then((name1) => {
      cy.verifyFirstCellInTable(1, getWrappedString(name1));
    });
  });
});
