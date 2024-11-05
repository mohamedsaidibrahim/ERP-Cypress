import { generateRandomEmail } from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { ManageUsers } from "../pages/manage_users";
import { getWrappedNumber } from "../../../../../support/utils";

describe("Add new User", () => {
  beforeEach(
    '0.Verify that the system navigates to Users list when user clicks "Manage User" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
    }
  );

  it("1.Verify That The Dialoge has the same SubDomain name", () => {
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    ManageUsers.clickCancelDialoge();
    ManageUsers.clickBackSubDomainHomeButton();
    cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]')
      .eq(1)
      .invoke("text")
      .then((txt1) => {
        cy.wrap(txt1).as("txt1");
        ManageUsers.clickFirstManageUsers();
        ManageUsers.clickAddNewUser();
      });
    cy.get("@txt1").then((txt1) => {
      cy.get(".view")
        .should("be.visible")
        .should(($div) => {
          const cleanedText = $div
            .text()
            .replace(/\u00a0/g, " ")
            .trim();
          expect(cleanedText).to.equal(
            txt1
              .toString()
              .trim()
              .replace(/.Microtecdev.Com/i, "")
              .replace("&nbsp;", "")
          );
        });
    });
  });

  it("2.Verify All The compontes Are Visible", () => {
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    ManageUsers.clickCancelDialoge();
    ManageUsers.clickBackSubDomainHomeButton();
    cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]')
      .eq(1)
      .invoke("text")
      .then((txt1) => {
        ManageUsers.clickFirstManageUsers();
        ManageUsers.clickAddNewUser();
        //  verify All Components Are Visible
        //	Check The Dialoge Title
        ManageUsers.verifyDialogTitleComponentsAreVisible();
        //	Check the Dialog Cancel Icon
        ManageUsers.verifyDialogCancelIconComponentsAreVisible();
        //	Check The Email Label
        ManageUsers.verifyDialogEmailLabelComponentsAreVisible();
        //	Check The Email Text Field
        ManageUsers.verifyDialogEmailTextFieldComponentsAreVisible();
        //	Check The Company Label
        ManageUsers.verifyDialogCompanyLabelComponentsAreVisible();
        //	Check The Company Drop Down
        ManageUsers.verifyDialogCompanyDropDownComponentsAreVisible();
        //	Check The Branches Label
        ManageUsers.verifyDialogBranchesLabelComponentsAreVisible();
        //	Check The Branches Text Field
        ManageUsers.verifyDialogBranchesTextFieldComponentsAreVisible();
        //	Check The Domain Space Label
        ManageUsers.verifyDialogDomainSpaceLabelComponentsAreVisible();
        //	Check The Domain Space Text Field
        ManageUsers.verifyDialogDomainSpaceTextFieldComponentsAreVisible(txt1);
        //	Check The select Licence Label
        ManageUsers.verifyDialogLicenceLabelComponentsAreVisible();
        //	Check The select Licence Text Field
        ManageUsers.verifyDialogSelectLicenceTextFieldComponentsAreVisible();
        //	Check the Dialog Cancel Button
        ManageUsers.verifyDialogCancelDialoButtonComponentsAreVisible();
        //	Check the Dialog Save Button
        ManageUsers.verifyDialogSaveDialoButtonComponentsAreVisible();
      });
  });

  it("3.Verify That The Dialoge validates All the Required Components", () => {
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    ManageUsers.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);

    ManageUsers.selectAdvancedLicence();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);

    ManageUsers.selectTheLastCompany();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);

    ManageUsers.inputMail(generateRandomEmail());
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);

    ManageUsers.selectTheFirstAndLastBranch();
    cy.verifyNotExistanceTheRequiredValidation();

    cy.confirmEmailRegExCompatibility(
      '[data-testid="email"]',
      generateRandomEmail()
    );
  });

  it("4.Verify That the Submitted data is Displayed on the grid and displayed it in the Table", () => {
    var mail = generateRandomEmail();
    ManageUsers.clickFirstManageUsers();
    cy.wait(500);
    cy.getInitItemsCountInListView();

    ManageUsers.clickAddNewUser();
    // input All Required Dataو MAil, Company, Breanches, Licence
    ManageUsers.inputAllRegularData(mail);
    ManageUsers.clickSaveButton();
    cy.wait(2000);
    cy.reload();
    cy.wait(500);
    cy.assertnewItemAddedToListView();
  });

  it("5.Verify That the System does not display Branches, If there is not any Chosen Company", () => {
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    // There is not any chosen company
    cy.get('p-multiselect[data-testid="branchIds"]').click();
    cy.get('li[class="p-multiselect-empty-message ng-star-inserted"]').should(
      "be.visible"
    );
    ManageUsers.inputMail("test@test.co");
    // There is a chosen company
    ManageUsers.selectTheLastCompany();
    cy.get('p-multiselect[data-testid="branchIds"]').click();
    cy.get('div[class="p-checkbox-box"]')
      .its("length")
      .then((cout) => {
        expect(cout).to.be.greaterThan(1);
      });
  });

  it("6.Verify That the Dialog prevents dublicated Email", () => {
    var mail = generateRandomEmail();
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    // input All Required Dataو MAil, Company, Breanches, Licence
    ManageUsers.inputAllRegularData(mail);
    ManageUsers.clickSaveButton();
    cy.wait(2000);
    cy.get('div[role="dialog"]').should("not.exist");
    ManageUsers.clickAddNewUser();
    // input All Required Dataو MAil, Company, Breanches, Licence
    ManageUsers.inputAllRegularData(mail);
    ManageUsers.clickSaveButton();
    cy.wait(2000);
    cy.get('div[role="dialog"]').should("be.visible");
  });

  it.skip("7.Verify That the System does display a Licence type with its available count", () => {
    var mail = generateRandomEmail();
    var licence = "Advanced";
    ManageUsers.clickFirstManageUsers();
    ManageUsers.clickAddNewUser();
    ManageUsers.selectTheLastCompany();
    ManageUsers.inputMail(mail);
    ManageUsers.selectTheFirstAndLastBranch();
    ManageUsers.inputMail(mail);
    ManageUsers.selectAdvancedLicence();
    ManageUsers.clickSaveButton();
    cy.reload();
    cy.wait(500);
    cy.increaseScreenItemsMaxCount(100);
    cy.verifyFirstCellInTable(1, mail);
    cy.verifyFirstCellInTable(3, licence);
  });
});
