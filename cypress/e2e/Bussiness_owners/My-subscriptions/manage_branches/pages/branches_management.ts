import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { CompanyData } from "../../Manage_companies/data/company_data";
import { AddCompanyDialog } from "../../Manage_companies/pages/AddCompanyDialoge";
import { EditCompanyScreen } from "../../Manage_companies/pages/editCompanyScreenAct";
import { BranchesManagmentData } from "../data/branches_managment__data";

export class BranchesManagment {
  static closeTheDialog() {
    cy.get(BranchesManagmentData.deleteActionButton).click();
  }
  static clickAddNewButton() {
    cy.get('button[label="Add New"]').click();
  }
  static checkLabels() {
    cy.get("label.form-label").should("have.length", 8);
    cy.visibilityOfRequiredStar('label[for="branchName"]');
    cy.get("label.form-label").contains("Branch Name").should("be.visible");
    cy.visibilityOfRequiredStar('label[for="countryCode"]');
    cy.get("label.form-label").contains("Country").should("be.visible");
    cy.get("label.form-label").contains("Branch Region").should("be.visible");
    cy.get("label.form-label").contains("Branch City").should("be.visible");
    cy.get("label.form-label").contains("Branch Email").should("be.visible");
    cy.get("label.form-label").contains("Branch Address").should("be.visible");
    cy.get("label.form-label")
      .contains("Mobile Number Code")
      .scrollIntoView()
      .should("be.visible");
    cy.get("label.form-label")
      .contains("Mobile Number")
      .scrollIntoView()
      .should("be.visible");
  }

  static inputBranchName(str: any) {
    cy.inputText("branchName", str);
  }
  static verifyBranchName(str: any) {
    cy.verifyText("branchName", str);
  }
  static validateDublicatedBranchName() {
    cy.get(".p-datatable-tbody > :nth-child(1) > :nth-child(2)")
      .invoke("text")
      .then((brName) => {
        cy.wrap(brName).as("brName");
      });
    BranchesManagment.clickEditBranch();
    cy.get("@brName").then((brName) => {
      BranchesManagment.inputBranchName(brName);
      BranchesManagment.submitEditBranchDialog();
      BranchesManagment.verifySuccessAlertInVisibility();
    });
  }
  static clickDialogeTitle() {
    cy.get("div.title").eq(0).click();
  }
  static selectCountry() {
    cy.get('span[role="combobox"]').eq(0).click({ force: true });
    cy.contains("li", /egypt/i).click();
    cy.get('span[role="combobox"]').eq(0).click({ force: true });
    BranchesManagment.clickDialogeTitle();
  }

  static inputBranchRegion(str: any) {
    cy.inputText("branchRegion", str);
  }
  static verifyBranchRegion(str: any) {
    cy.verifyText("branchRegion", str);
  }
  static inputBranchCity(str: any) {
    cy.inputText("branchCity", str);
  }
  static verifyBranchCity(str: any) {
    cy.verifyText("branchCity", str);
  }
  static inputBranchEmail(str: any) {
    cy.inputText("branchEmail", str);
  }
  static verifyBranchEmail(str: any) {
    cy.verifyText("branchEmail", str);
  }
  static inputBranchAddress(str: any) {
    cy.inputText("branchAddress", str);
  }
  static verifyBranchAddress(str: any) {
    cy.verifyText("branchAddress", str);
  }
  static selectMobileCode() {
    cy.get('span[role="combobox"]').eq(1).click({ force: true });
    cy.contains("span", "+20").scrollIntoView();
    cy.contains("span", "+20").click();
    cy.get('span[role="combobox"]').eq(1).click({ force: true });
    BranchesManagment.clickDialogeTitle();
  }

  static inputMobileNumber() {
    cy.inputText("mobileNumber", CompanyData.branchMobileNumber);
  }
  static verifyMobileNumber() {
    cy.verifyText("mobileNumber", CompanyData.branchMobileNumber);
  }
  static checKVisibilityOfRequiredMessage(len: number) {
    cy.get('span[class="errorMessage ng-star-inserted"]').should(
      "have.length",
      len
    );
  }

  static verifyRemovingRequiredMessage() {
    cy.get('span[class="errorMessage ng-star-inserted"]').should("not.exist");
  }

  static clickSaveButton() {
    cy.contains("button", /save/i).scrollIntoView().click();
  }

  static checKVisibilityOfInvalidEmailMessage() {
    cy.get("span.errorMessage.ng-star-inserted")
      .contains("Invalid Email Address, the pattern should be :ABC@cba.com")
      .should("be.visible");
  }
  static checKLackingOfInvalidEmailMessage() {
    cy.get("span.errorMessage.ng-star-inserted").should("not.exist");
  }
  static clickCancelButton() {
    cy.get("button.cancel").click();
  }

  static clickCancelIcon() {
    cy.get('button[aria-label="Close"]').click({ force: true });
  }

  static verifyDialogeRemoval() {
    cy.get("div[role='dialog']").should("not.exist");
  }
  static verifySuccessAlertInVisibility() {
    cy.wait(1000);
    cy.get('div[role="dialog"]').should("not.exist");
  }
  static verifySuccessAlertVisibility() {
    cy.wait(1000);
    cy.get('div[role="dialog"]').should("not.exist");
  }
  static displayingDataInTheGrid() {
    cy.get(".user_info > p")
      .invoke("val")
      .then((codeVal) => {
        expect(codeVal).not.to.equal(null);
      });
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(2)").should(
      "be.visible"
    );
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(3)").should(
      "be.visible"
    );
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(4)").should(
      "be.visible"
    );
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(5)").should(
      "be.visible"
    );
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(6)").should(
      "be.visible"
    );
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(7)").should(
      "be.visible"
    );
    cy.get(":nth-child(8)").scrollIntoView().should("be.visible");
    cy.get(".p-datatable-tbody > tr.ng-star-inserted > :nth-child(9)")
      .last()
      .scrollIntoView()
      .should("be.visible");
  }
  // static checkVisibilityOfActivate() {
  //   cy.get(".checked > .active").last().scrollIntoView().should("be.visible");
  // }
  static checkVisibilityOfEditIcon() {
    cy.get('[icon="pi pi-pencil"] > .p-ripple > .pi')
      .last()
      .scrollIntoView()
      .should("be.visible");
  }

  static clickEditBranch() {
    cy.get('span[class="pi pi-pencil p-button-icon ng-star-inserted"]')
      .first()
      .scrollIntoView()
      .click({ force: true });
  }

  static cancelEditBranchDialog() {
    cy.getByTestAttribute("cancel").click({ force: true });
  }
  static submitEditBranchDialog() {
    cy.get("button.save").click();
  }
  static checkVisibilityOfDeleteIcon() {
    cy.get('[icon="pi pi-trash"] > .p-ripple > .pi').should(
      "have.class",
      "pi-trash"
    );
  }
  static ConfirmDeleteBranchDialog() {
    cy.contains("button", /yes/i).should("be.visible").click();
  }

  static clickDeleteTheLastItem() {
    cy.get('[icon="pi pi-trash"] > .p-ripple > .pi')
      .last()
      .scrollIntoView()
      .click();
  }

  static CancelDeleteBranchDialog() {
    cy.contains("button", /cancel/i).click({ force: true });
  }

  static verifyCountryInEditDialog() {
    cy.get("#pn_id_16 > .p-dropdown-label").should(
      "have.text",
      BranchesManagmentData.branchCountry
    );
    cy.get("#pn_id_18 > .p-dropdown-label").should(
      "have.text",
      BranchesManagmentData.branchCountryCode
    );
    BranchesManagment.cancelEditBranchDialog();
  }
  static verifyBranchCodeInEditDialog() {
    cy.get(":nth-child(1) > :nth-child(1) > .user_info > p")
      .invoke("text")
      .then((txt) => {
        BranchesManagment.clickEditBranch();
        cy.get(".code_text")
          .invoke("text")
          .then((text) => {
            expect(txt.toString().trim()).to.equal(text.trim());
          });
      });
    BranchesManagment.cancelEditBranchDialog();
  }

  static verifyBranchNameInEditDialog(name1: string) {
    cy.getByTestAttribute("branchName")
      .invoke("val")
      .then((branchNameInPut) => {
        expect(removeSpacesBetween(branchNameInPut)).to.equal(
          removeSpacesBetween(name1)
        );
      });
  }

  static verifyBranchRegionInEditDialog() {
    cy.get(".p-datatable-tbody > :nth-child(1) > :nth-child(3)")
      .invoke("val")
      .then((nameT1: any) => {
        BranchesManagment.clickEditBranch();
        cy.get('input[type="text"]')
          .eq(1)
          .invoke("text")
          .then((text) => {
            expect(text.toString().trim()).to.equal(nameT1.toString().trim());
          });
      });
    BranchesManagment.cancelEditBranchDialog();
  }
  static verifyBranchCityInEditDialog() {
    cy.get(".p-datatable-tbody > :nth-child(1) > :nth-child(4)")
      .invoke("text")
      .then((nameT1) => {
        BranchesManagment.clickEditBranch();
        cy.get('input[type="text"]')
          .eq(2)
          .invoke("val")
          .then((val: any) => {
            expect(val.toString().trim()).to.equal(nameT1.trim());
          });
      });
    BranchesManagment.cancelEditBranchDialog();
  }
  static verifyBranchAddressInEditDialog() {
    cy.get(".p-datatable-tbody > :nth-child(1) > :nth-child(5)")
      .invoke("text")
      .then((nameT1) => {
        BranchesManagment.clickEditBranch();
        cy.get('input[type="text"]')
          .eq(4)
          .invoke("val")
          .then((val: any) => {
            expect(val.toString().trim()).to.equal(nameT1.trim());
          });
      });
    BranchesManagment.cancelEditBranchDialog();
  }
  static verifyBranchEmailInEditDialog() {
    cy.get(".p-datatable-tbody > :nth-child(1) > :nth-child(7)")
      .invoke("text")
      .then((nameT1) => {
        BranchesManagment.clickEditBranch();
        cy.get('input[type="text"]')
          .eq(3)
          .invoke("val")
          .then((val: any) => {
            expect(val.toString().trim()).to.equal(nameT1.trim());
          });
      });
    BranchesManagment.cancelEditBranchDialog();
  }

  static implementAddNewBranch() {
    // Perform actions to submit new data, for example, click a button to add data
    BranchesManagment.clickAddNewButton();
    BranchesManagment.inputBranchName(BranchesManagmentData.branchName);
    BranchesManagment.inputBranchRegion(BranchesManagmentData.branchRegion);
    BranchesManagment.inputBranchCity(BranchesManagmentData.branchCity);
    BranchesManagment.inputBranchEmail(BranchesManagmentData.branchMail);
    BranchesManagment.inputBranchAddress(BranchesManagmentData.branchAddress);
    BranchesManagment.selectMobileCode();
    BranchesManagment.selectCountry();
    BranchesManagment.inputMobileNumber();
  }

  static createNewCompanyAndBranch() {
    LoginPage.visit();
    cy.clickContinueAs();
    cy.wait(1000);
    EditCompanyScreen.clickLastManageCompanies();
    cy.wait(1500);
    cy.navigateToTheLatestScreen();
    cy.wait(1000);
    cy.increaseScreenItemsMaxCount(100);
    cy.getAllItemsCount(
      CompanyData.cListGrid_selector,
      CompanyData.cCardItem_selector
    ).then((initialCount: number) => {
      cy.wrap(initialCount).as("initialCount");
      cy.log("initialCount:::" + initialCount);
    });
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.inputCompanyName(CompanyData.companyName);
    AddCompanyDialog.inputBranchName(CompanyData.branchName);
    cy.get("@initialCount").then((initialCount) => {
      AddCompanyDialog.selectCompanyType(initialCount);
    });
    AddCompanyDialog.clickSaveButton();
    AddCompanyDialog.dialogNotExist();
  }
}
