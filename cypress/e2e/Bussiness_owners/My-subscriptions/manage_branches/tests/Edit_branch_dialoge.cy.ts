import { BranchesManagmentData } from "../data/branches_managment__data";
import { BranchesManagment } from "../pages/branches_management";
import { getWrappedString } from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { CompanyData } from "../../Manage_companies/data/company_data";
import { EditCompanyScreen } from "../../Manage_companies/pages/editCompanyScreenAct";

describe("Edit Branch Dialoge", () => {
  beforeEach("Navigate", () => {
    LoginPage.visit();
    cy.clickContinueAs();
    cy.wait(1000);
    EditCompanyScreen.clickLastManageCompanies();
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickBranchesTab();
  });
  it("1. Verify That The Edit Branch Dialoge Has All Labels.", () => {
    BranchesManagment.clickEditBranch();
    BranchesManagment.checkLabels();
  });

  it("2.Verify That The User Can Canel The Edited Branch By Cancel Button or (X) Button.", () => {
    BranchesManagment.clickEditBranch();
    BranchesManagment.inputBranchName(
      "Edited_" + BranchesManagmentData.branchName
    );
    BranchesManagment.selectCountry();
    BranchesManagment.inputBranchRegion(
      "Edited_" + BranchesManagmentData.branchRegion
    );
    BranchesManagment.inputBranchCity(
      "Edited_" + BranchesManagmentData.branchCity
    );
    BranchesManagment.inputBranchEmail(
      "Edited_" + BranchesManagmentData.branchMail
    );
    BranchesManagment.inputBranchAddress(
      "Edited_" + BranchesManagmentData.branchAddress
    );
    BranchesManagment.selectMobileCode();
    BranchesManagment.inputMobileNumber();
    BranchesManagment.cancelEditBranchDialog();
    BranchesManagment.verifyDialogeRemoval();
  });

  it("3. Verify That The User Can Edit Branch by clicking on the edit button on the branch card.", () => {
    BranchesManagment.clickEditBranch();
    BranchesManagment.inputBranchName(
      "Edited_" + BranchesManagmentData.branchName
    );
    BranchesManagment.selectCountry();
    BranchesManagment.inputBranchRegion(
      "Edited_" + BranchesManagmentData.branchRegion
    );
    BranchesManagment.inputBranchCity(
      "Edited_" + BranchesManagmentData.branchCity
    );
    BranchesManagment.inputBranchEmail(
      "Edited_" + BranchesManagmentData.branchMail
    );
    BranchesManagment.inputBranchAddress(
      "Edited_" + BranchesManagmentData.branchAddress
    );
    BranchesManagment.selectMobileCode();
    BranchesManagment.inputMobileNumber();
    BranchesManagment.submitEditBranchDialog();
    BranchesManagment.verifyDialogeRemoval();
    cy.wait(1000);
    // Verify Data is Displaying in the Table
    cy.verifyFirstCellInTable(1, "Edited_" + BranchesManagmentData.branchName);
    cy.verifyFirstCellInTable(
      2,
      "Edited_" + BranchesManagmentData.branchRegion
    );
    cy.verifyFirstCellInTable(3, "Edited_" + BranchesManagmentData.branchCity);
    cy.verifyFirstCellInTable(
      4,
      "Edited_" + BranchesManagmentData.branchAddress
    );
    cy.verifyFirstCellInTable(5, CompanyData.branchMobileNumber);
    cy.verifyFirstCellInTable(6, "Edited_" + BranchesManagmentData.branchMail);
    BranchesManagment.clickEditBranch();
    // Verify Data is Displaying in the Editting Dialog
    BranchesManagment.verifyBranchRegion(
      "Edited_" + BranchesManagmentData.branchRegion
    );
    BranchesManagment.verifyBranchCity(
      "Edited_" + BranchesManagmentData.branchCity
    );
    BranchesManagment.verifyBranchEmail(
      "Edited_" + BranchesManagmentData.branchMail
    );
    BranchesManagment.verifyBranchAddress(
      "Edited_" + BranchesManagmentData.branchAddress
    );
  });
  it("4. Verify that the Edit Branch Dialoge has the Correct data values as they displayed in the Grid", () => {
    cy.wait(2000);
    cy.getFirstCellInTableValue(1).then((nameT) => {
      cy.wrap(nameT).as("nameT");
    });
    cy.getFirstCellInTableValue(2).then((regionT) => {
      cy.wrap(regionT).as("regionT");
    });
    cy.getFirstCellInTableValue(3).then((cityT) => {
      cy.wrap(cityT).as("cityT");
    });
    cy.getFirstCellInTableValue(4).then((addressT) => {
      cy.wrap(addressT).as("addressT");
    });
    cy.getFirstCellInTableValue(5).then((phoneT) => {
      cy.wrap(phoneT).as("phoneT");
    });
    cy.getFirstCellInTableValue(6).then((emailT) => {
      cy.wrap(emailT).as("emailT");
    });
    BranchesManagment.clickEditBranch();
    cy.wait(2000);
    cy.get("@nameT").then((nameT) => {
      BranchesManagment.verifyBranchName(getWrappedString(nameT));
    });
    cy.get("@regionT").then((regionT) => {
      BranchesManagment.verifyBranchRegion(getWrappedString(regionT));
    });
    cy.get("@cityT").then((cityT) => {
      BranchesManagment.verifyBranchCity(getWrappedString(cityT));
    });
    cy.get("@addressT").then((addressT) => {
      BranchesManagment.verifyBranchAddress(getWrappedString(addressT));
    });
    cy.get("@phoneT").then(() => {
      BranchesManagment.verifyMobileNumber();
    });
    cy.get("@emailT").then((emailT) => {
      BranchesManagment.verifyBranchEmail(getWrappedString(emailT));
    });
  });
});
