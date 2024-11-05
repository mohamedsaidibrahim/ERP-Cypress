import {
  generateRandomEmail,
  getRandomNumber,
  trimText,
} from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { EditCompanyScreen } from "../../Manage_companies/pages/editCompanyScreenAct";
import { BranchesManagmentData } from "../data/branches_managment__data";
import { BranchesManagment } from "../pages/branches_management";

let branchName = "branch" + getRandomNumber(1, 1000);

describe("Add Branch Dialoge", () => {
  beforeEach("Navigate", () => {
    LoginPage.visit();
    cy.clickContinueAs();
    cy.wait(1000);
    EditCompanyScreen.clickLastManageCompanies();
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickBranchesTab();
  });

  it("1. Check The Labels", () => {
    cy.wait(1000);
    BranchesManagment.clickAddNewButton();
    BranchesManagment.checkLabels();
  });

  it("2. Verify That The User Can't Delete The Branch If The Count of Branches is (1).", () => {
    cy.wait(1000);
    BranchesManagment.clickAddNewButton();
    BranchesManagment.clickCancelIcon();
    cy.get("body").then(($body) => {
      if ($body.find(BranchesManagmentData.deleteActionButton).length < 2) {
        cy.wrap($body).find(BranchesManagmentData.deleteActionButton).click();
        BranchesManagment.ConfirmDeleteBranchDialog();
      } else {
        cy.log("There Are many Branches ");
      }
    });
  });

  it("3. Verify That The User Can Add Branch by clicking on the Add button on the branch card.", () => {
    cy.wait(1000);
    
    cy.getInitItemsCountInListView();
    BranchesManagment.clickAddNewButton();
    BranchesManagment.inputBranchName(branchName);
    BranchesManagment.selectCountry();
    BranchesManagment.inputBranchRegion("region" + getRandomNumber(1, 1000));
    BranchesManagment.inputBranchCity("city" + getRandomNumber(1, 1000));
    BranchesManagment.inputBranchEmail(generateRandomEmail());
    BranchesManagment.inputBranchAddress("address" + getRandomNumber(1, 1000));
    cy.hideDialogFooter();
    BranchesManagment.selectMobileCode();
    BranchesManagment.inputMobileNumber();
    cy.displayDialogFooter();
    BranchesManagment.clickSaveButton();
    BranchesManagment.verifySuccessAlertVisibility();
    
    cy.assertnewItemAddedToListView();
  });

  it("4. Verify Displaying THe Validation messages", () => {
    cy.wait(1000);
    BranchesManagment.clickAddNewButton();
    BranchesManagment.inputBranchName("{enter}");
    BranchesManagment.checKVisibilityOfRequiredMessage(1);
    // Type In Region Text field without Selecting Country
    BranchesManagment.inputBranchRegion("{enter}");
    BranchesManagment.checKVisibilityOfRequiredMessage(1);

    BranchesManagment.clickSaveButton();
    BranchesManagment.checKVisibilityOfRequiredMessage(2);
    BranchesManagment.inputBranchName(
      "branch" + getRandomNumber(1, 1000) + "{enter}"
    );
    BranchesManagment.checKVisibilityOfRequiredMessage(1);

    BranchesManagment.selectCountry();
    BranchesManagment.verifyRemovingRequiredMessage();

    BranchesManagment.inputBranchEmail("@test.com");
    BranchesManagment.inputBranchRegion("{enter}");
    BranchesManagment.checKVisibilityOfInvalidEmailMessage();

    BranchesManagment.inputBranchEmail("email");
    BranchesManagment.inputBranchCity("{enter}");
    BranchesManagment.checKVisibilityOfInvalidEmailMessage();

    BranchesManagment.inputBranchEmail("email@test");
    BranchesManagment.inputBranchAddress("{enter}");
    BranchesManagment.checKVisibilityOfInvalidEmailMessage();

    BranchesManagment.inputBranchEmail("email.com");
    BranchesManagment.inputBranchCity("{enter}");
    BranchesManagment.checKVisibilityOfInvalidEmailMessage();

    BranchesManagment.inputBranchEmail("email@test.co");
    BranchesManagment.checKLackingOfInvalidEmailMessage();
    BranchesManagment.inputBranchEmail("email@test.com");
    BranchesManagment.checKLackingOfInvalidEmailMessage();
  });

  it("5. Verify That The User Can Canel The Added Branch By Cancel Button or (X) Button.", () => {
    cy.wait(1000);
    BranchesManagment.clickAddNewButton();
    BranchesManagment.clickCancelIcon();
    BranchesManagment.verifyDialogeRemoval();
    BranchesManagment.clickAddNewButton();
    BranchesManagment.clickCancelButton();
    BranchesManagment.verifyDialogeRemoval();
  });

  it.skip("6. Verify That The User Can't Add Branch Name To An Existing Branch Name.", () => {
    cy.wait(1000);
    BranchesManagment.clickAddNewButton();
    BranchesManagment.clickCancelIcon();
    BranchesManagment.verifyDialogeRemoval();
    cy.getLastCellInTableValue(1).as("name");
    BranchesManagment.clickAddNewButton();
    cy.get(".p-inputtext").eq(0).should("be.visible");
    cy.get("@name").then((brName) => {
      cy.log("brName var : " + brName);
      cy.log("branchName var : " + branchName);
      expect(trimText(brName.toString().trim())).to.equal(
        trimText(branchName.toString().trim())
      );
      BranchesManagment.inputBranchName(branchName);
    });
    BranchesManagment.selectCountry();
    BranchesManagment.inputBranchRegion("region" + getRandomNumber(1, 1000));
    BranchesManagment.inputBranchCity("city" + getRandomNumber(1, 1000));
    BranchesManagment.inputBranchEmail(generateRandomEmail());
    BranchesManagment.inputBranchAddress("address" + getRandomNumber(1, 1000));
    BranchesManagment.selectMobileCode();
    BranchesManagment.inputMobileNumber();
    BranchesManagment.clickSaveButton();
    BranchesManagment.verifySuccessAlertInVisibility();
  });
});
