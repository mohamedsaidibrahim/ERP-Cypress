import { trimText } from "../../../../../../support/utils";
import { LoginPage } from "../../../../../Authentication/Login/pages/loginPage";
import { GeneralSettingsData } from "../../data/general_settings_data";
import { GeneralSetting } from "../pages/general_setting";

describe("General Setting", () => {
  beforeEach("Navigation", () => {
    LoginPage.visit();
    cy.reload();
  });

  it.skip("1.Verify that the user can shift between All Apps in the Subdomain", () => {
    GeneralSetting.landing();
    cy.wait(2500);
    GeneralSetting.clickShifttingButton();
    GeneralSetting.shiftToAnotherApp("Accounting");
    cy.wait(500);
    GeneralSetting.verifyNavigatingToAnotherApp("accounting");
    GeneralSetting.clickShifttingButton();
    GeneralSetting.shiftToAnotherApp("purchase");
    cy.wait(1000);
    GeneralSetting.verifyNavigatingToAnotherApp("purchase");
  });

  it("2.Verify that all components of taglist are exist successfully", function () {
    GeneralSetting.landing();
    GeneralSetting.verifyColumnHeaders();
  });

  it("3.Verify Required Validations", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    GeneralSetting.clickAddNewButton();
    GeneralSetting.clickDialogSaveButton();
    GeneralSetting.inputTagName(GeneralSettingsData.tagName);
    GeneralSetting.validatePressenceRequiredMessage();
    cy.checkAllMultiSelect(0);
    GeneralSetting.validateNoRequiredMessage();
    GeneralSetting.clearTagName();
    GeneralSetting.validatePressenceRequiredMessage();
    GeneralSetting.inputTagName(GeneralSettingsData.tagName);
    GeneralSetting.validateNoRequiredMessage();
    GeneralSetting.clickDialogSaveButton();
    GeneralSetting.verifyAddNewTagDisAppearing();
  });

  it("4.Verify that cancel Button cancel all changes in Add a new tag Dialog", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    GeneralSetting.clickAddNewButton();
    cy.wait(500);
    cy.checkAllMultiSelect(0);
    cy.wait(750);
    GeneralSetting.inputTagName(GeneralSettingsData.tagName);
    GeneralSetting.clickDialogcancelButton();
    
    cy.assertAfterItemEditedInListView();
    GeneralSetting.verifyThatNewTagNameIsNOTAddedtotheTable(
      GeneralSettingsData.tagName
    );
  });

  it("5.Verify that the user can Add a new tag", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    GeneralSetting.clickAddNewButton();
    cy.checkAllMultiSelect(0);
    GeneralSetting.inputTagName(GeneralSettingsData.tagName);
    GeneralSetting.clickDialogSaveButton();
    
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, GeneralSettingsData.tagName);
  });

  it("6.Verify that cancel Button cancels all changes in Edit tag Dialog", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    cy.getFirstCellInTableValue(0).then((codeT1) => {
      cy.wrap(codeT1).as("codeT1");
    });
    cy.getFirstCellInTableValue(1).then((nameT1) => {
      cy.wrap(nameT1).as("nameT1");
    });
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.get('timescircleicon[data-pc-section="clearicon"]')
      .first()
      .click({ force: true });
    cy.get("@nameT1").then((nameT1) => {
      GeneralSetting.inputTagNameEditted(
        "Edited " + trimText(nameT1.toString().trim())
      );
    });
    GeneralSetting.clickDialogcancelButton();
    cy.wait(3000);
    
    cy.assertAfterItemEditedInListView();
    cy.get("@codeT1").then((codeT1) => {
      cy.verifyFirstCellInTable(0, trimText(codeT1.toString().trim()));
    });
    cy.get("@nameT1").then((nameT1) => {
      cy.verifyFirstCellInTable(1, trimText(nameT1.toString().trim()));
    });
  });

  it("7.Verify that the user can Edit an existing tag", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    cy.getFirstCellInTableValue(0).then((codeT1) => {
      cy.wrap(codeT1).as("codeT1");
    });
    cy.getFirstCellInTableValue(1).then((nameT1) => {
      cy.wrap(nameT1).as("nameT1");
    });
    cy.clickFirstEditActionButton();
    cy.wait(1000);
    cy.get('timescircleicon[data-pc-section="clearicon"]')
      .first()
      .click({ force: true });
    cy.get("@nameT1").then((nameT1) => {
      GeneralSetting.inputTagNameEditted(
        "Edited " + trimText(nameT1.toString().trim())
      );
    });
    GeneralSetting.clickDialogSaveButton();
    cy.wait(3000);
    
    cy.assertAfterItemEditedInListView();
    cy.get("@codeT1").then((codeT1) => {
      cy.verifyFirstCellInTable(0, trimText(codeT1.toString().trim()));
    });
    cy.get("@nameT1").then((nameT1) => {
      cy.verifyFirstCellInTable(
        1,
        "Edited " + trimText(nameT1.toString().trim())
      );
    });
  });

  it("8.should filter the table based on search input in the first two columns", () => {
    GeneralSetting.landing();
    cy.wait(2000);
    cy.verifySearchFunctionality();
  });

  it("9.Verify that the user can delete a new tag", () => {
    GeneralSetting.landing();
    cy.wait(2000);  
    cy.getInitItemsCountInListView();
    cy.clickFirstDeleteActionButton();
    cy.confirmDeletePopUp();
    cy.assertItemDeletedFromListView();
  });
});
