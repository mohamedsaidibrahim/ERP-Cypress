import { getWrappedNumber } from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { CompanyData } from "../data/company_data";
import { AddCompanyDialog } from "../pages/AddCompanyDialoge";
import { EditCompanyScreen } from "../pages/editCompanyScreenAct";

describe("Add Company Dialoge", () => {
  beforeEach(
    '0) Verify that the system navigates to Company list when user clicks "Manage Companies" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
      EditCompanyScreen.clickLastManageCompanies();
    }
  );

  it("1) Verify Happy Scenario The User Add The Required Data and Save and Back to The Previous Page..", () => {
    cy.wait(1500);
    cy.navigateToTheLatestScreen();
    cy.wait(1000);
    cy.getInitItemsCountInListView();
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.inputCompanyName(CompanyData.companyName);
    AddCompanyDialog.inputBranchName(CompanyData.branchName);
    cy.get("@initialCount").then((initialCount) => {
      AddCompanyDialog.selectCompanyType(initialCount);
    });
    AddCompanyDialog.clickSaveButton();
    AddCompanyDialog.dialogNotExist();
    cy.assertnewItemAddedToListView();
  });

  it.skip("2.Verify That The Save and Edit button Save The Action and Navigates To The Edit Screen.", () => {
    cy.wait(1500);
    cy.navigateToTheLatestScreen();
    cy.wait(1000);
    cy.increaseScreenItemsMaxCount(100);
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.inputCompanyName(CompanyData.companyName);
    AddCompanyDialog.inputBranchName(CompanyData.branchName);
    AddCompanyDialog.clickSaveAndEditBtn();
    AddCompanyDialog.dialogNotExist();
    cy.url().should("contains", "edit");
  });

  it("3.Verify That All Components are Blank When The Add New Company list is Open.", () => {
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.verifyElementsWithoutValues();
  });

  it("4.Verify That The Form can not Submit if any of the required fields is empty", () => {
    cy.wait(1500);
    cy.navigateToTheLatestScreen();
    cy.wait(1000);
    cy.getInitItemsCountInListView();
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.clickSaveButton();
    cy.get("@initialCount").then((initialCount) => {
      if (getWrappedNumber(initialCount) > 0) {
        cy.validateRequiredComponents(3);
      } else {
        cy.validateRequiredComponents(2);
      }
    });
    AddCompanyDialog.inputCompanyName(CompanyData.companyName);
    cy.get("@initialCount").then((initialCount) => {
      if (getWrappedNumber(initialCount) > 0) {
        cy.validateRequiredComponents(2);
      } else {
        cy.validateRequiredComponents(1);
      }
    });
    AddCompanyDialog.inputBranchName(CompanyData.BranchNameTh);
    cy.get("@initialCount").then((initialCount) => {
      if (getWrappedNumber(initialCount) > 0) {
        cy.validateRequiredComponents(1);
      } else {
        cy.get("span.errorMessage.ng-star-inserted").should("not.exist");
      }
    });
    cy.get("@initialCount").then((initialCount) => {
      AddCompanyDialog.selectCompanyType(initialCount);
      if (getWrappedNumber(initialCount) > 0) {
        cy.get("span.errorMessage.ng-star-inserted").should("not.exist");
      } else {
        cy.get("span.errorMessage.ng-star-inserted").should("not.exist");
      }
    });
  });
});
