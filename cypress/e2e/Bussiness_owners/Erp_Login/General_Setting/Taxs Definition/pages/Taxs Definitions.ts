import {
  getWrappedString,
  removeSpacesBetween,
} from "../../../../../../support/utils";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";

export class TaxsDefinitions {
  static forceNavigate() {
    cy.visit(GeneralSettingsData.TaxDefinitionsLink);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("definition")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/accounting/i);
        NavigatesToSideModule.navigatesToTheModule(
          GeneralSettingsData.TaxDefinitionsLink,
          3
        );
      }
    });
  }
  static preActions() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static assertNotSaving() {
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
    cy.verifyFirstCellInTableNotEqual(
      1,
      GeneralSettingsData.taxesDefinitionsName
    );
    cy.verifyFirstCellInTableNotEqual(
      2,
      GeneralSettingsData.taxesDefinitionsRatioEdit
    );
    cy.get("@accountIdTxt").then((accountIdTxt) => {
      cy.verifyFirstCellInTableNotEqual(3, getWrappedString(accountIdTxt));
    });
  }
  static assertSuccessfulSubmission(isEdited: any) {
    cy.wait(1000);
    if (isEdited) {
      cy.assertAfterItemEditedInListView();
    } else {
      cy.assertnewItemAddedToListView();
    }
    cy.verifyFirstCellInTable(
      1,
      removeSpacesBetween(GeneralSettingsData.taxesDefinitionsName)
    );
    cy.verifyFirstCellInTable(
      2,
      removeSpacesBetween(GeneralSettingsData.taxesDefinitionsRatio)
    );
    cy.get("@accountIdTxt").then((accountIdTxt) => {
      cy.verifyFirstCellInTable(
        3,
        removeSpacesBetween(getWrappedString(accountIdTxt))
      );
    });
    cy.get("@taxGroupIdTxt").then((taxGroupIdTxt) => {
      cy.verifyFirstCellInTable(
        4,
        removeSpacesBetween(getWrappedString(taxGroupIdTxt))
      );
    });
  }
  static landing() {
    cy.LandingToERPModule(GeneralSettingsData.TaxDefinitionsLink, "definition");
  }
  static inputSearch(txt: string) {
    cy.get('input[placeholder="Search"]').clear({ force: true }).type(txt);
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickExportButton() {
    cy.get('p-button[label="Export"]')
      .should("be.visible")
      .should("be.enabled")
      .click();
  }
  static inputCode(code: string) {
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("code").clear({ force: true }).type(code);
  }

  static inputName(name: string) {
    cy.getByTestAttribute("name").should("be.visible");
    cy.getByTestAttribute("name").clear({ force: true }).type(name);
  }
  static inputRatio(ratio: string) {
    cy.getByTestAttribute("ratio").should("be.visible");
    cy.getByTestAttribute("ratio").clear({ force: true }).type(ratio);
  }
  static clearRatio() {
    cy.getByTestAttribute("ratio").should("be.visible");
    cy.getByTestAttribute("ratio").clear({ force: true });
  }
  static selectLastAccountId() {
    cy.getLastItemInDropDownList("accountId").then(($accountId1) => {
      cy.wrap($accountId1)
        .invoke("text")
        .then((accountIdTxt) => {
          cy.log("accountIdTxt::: " + accountIdTxt);
          cy.wrap(accountIdTxt).as("accountIdTxt");
        });
    });
  }
  static selectFirstAccountId() {
    cy.getFirstItemInDropDownList("accountId").then(($accountId1) => {
      cy.wrap($accountId1)
        .invoke("text")
        .then((accountIdTxt) => {
          cy.log("accountIdTxt::: " + accountIdTxt);
          cy.wrap(accountIdTxt).as("accountIdTxt");
        });
    });
  }

  static selectLastTaxGroupId() {
    cy.getLastItemInDropDownList("taxGroupId").then(($taxGroupId1) => {
      cy.wrap($taxGroupId1)
        .invoke("text")
        .then((taxGroupIdTxt) => {
          cy.log("taxGroupIdTxt::: " + taxGroupIdTxt);
          cy.wrap(taxGroupIdTxt).as("taxGroupIdTxt");
        });
    });
  }

  static selectFirstTaxGroupId() {
    cy.getFirstItemInDropDownList("taxGroupId");
  }
  static verifySlectTaxGroupId() {
    cy.getByTestAttribute("taxGroupId").scrollIntoView().should("be.visible");
    cy.getByTestAttribute("taxGroupId").click();
    cy.get('ul[role="listbox"]').then((list) => {
      if (
        list
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.getByTestAttribute("taxGroupId").click();
        TaxsDefinitions.verifyRequiredMessages("1");
      } else {
        cy.get('li[role="option"]').first().click();
        TaxsDefinitions.verifyInExistenceOfRequiredMessage();
      }
    });
  }
  static clearCode() {
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("code").clear({ force: true });
  }
  static clearName() {
    cy.getByTestAttribute("name").should("be.visible");
    cy.getByTestAttribute("name").clear({ force: true });
  }
  static verifyRequiredMessages(count: string) {
    cy.get('span[class="errorMessage ng-star-inserted"]')
      .should("exist")
      .should("have.length", count);
  }
  static verifyAbsenceRequiredMessages() {
    cy.get('span[class="errorMessage ng-star-inserted"]').should("not.exist");
  }
  static verifyInExistenceOfRequiredMessage() {
    cy.get('span[class="errorMessage ng-star-inserted"]').should("not.exist");
  }
  static submitDialog() {
    cy.getByTestAttribute("save").last().scrollIntoView().click();
  }
  static cancelDialog() {
    cy.getByTestAttribute("cancel").last().scrollIntoView().click();
  }
  static clickLAstEditButton() {
    cy.wait(2000);
    cy.get("table").then((table) => {
      if (table.find("td").first().is(":visible")) {
        cy.getByTestAttribute("btn_edit")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.getByTestAttribute("btn_edit").last().click();
      } else {
        cy.log("Table Body Edit Button is not Visible");
      }
    });
  }
  static clickLastDeleteButton() {
    cy.get("table").then((table) => {
      if (table.find("td").first().is(":visible")) {
        cy.getByTestAttribute("btn_delet")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.getByTestAttribute("btn_delet").last().click();
      } else {
        cy.log("Table Body Delete Button is not Visible");
      }
    });
  }
  static confirmDeleteAction() {
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).should("be.visible");
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).click();
  }
  static cancelDeleteAction() {
    cy.get(
      'button[class="swal2-cancel swal2-styled swal2-default-outline"]'
    ).should("be.visible");
    cy.get(
      'button[class="swal2-cancel swal2-styled swal2-default-outline"]'
    ).click();
  }
}
