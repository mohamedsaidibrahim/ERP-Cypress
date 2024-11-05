import { getWrappedNumber } from "../../../../../support/utils";
import { CompanyData } from "../data/company_data";

export class AddCompanyDialog {
  static createNewCompany() {
    cy.wait(1500);
    cy.navigateToTheLatestScreen();
    cy.wait(1000);
    AddCompanyDialog.clickAddCompanyButton();
    AddCompanyDialog.inputCompanyName(CompanyData.companyName);
    AddCompanyDialog.inputBranchName(CompanyData.branchName);
    cy.get("@initialCount").then((initialCount) => {
      AddCompanyDialog.selectCompanyType(initialCount);
    });
    AddCompanyDialog.clickSaveButton();
    AddCompanyDialog.dialogNotExist();
  }

  static dialogNotExist() {
    cy.get('div[role="dialog"]').should("not.exist");
  }

  static navigateToTheLatestScreen() {
    //  Navigate to the latest Screen
    cy.get(".p-paginator-current")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("pTxt");
      })
      .then((pTxt) => {
        let currentPage = pTxt.split(" of ")[1].toString();
        if (parseInt(currentPage) > 1) {
          cy.get("[aria-label=" + currentPage + "]").click();
        }
      });
  }
  static clickCancelButton() {
    cy.get('div[class="pi pi-times cancel"]').click();
  }
  static clickAddCompanyButton() {
    cy.contains("button span",/create/i).click();
  }

  static clickSaveButton() {
    cy.get('div[role="dialog"]').find('[data-testid="save"]').first().click();
  }
  static clickSaveAndEditBtn() {
    cy.get('div[role="dialog"]').find('[data-testid="save"]').last().click();
  }

  static verifyElementsWithoutValues() {
    cy.get('input[type="text"]').eq(1).should("not.contain.value");
    cy.get('input[type="text"]').eq(2).should("not.contain.value");
  }
  static inputCompanyName(str: string) {
    cy.get('input[type="text"]').eq(1).clear().type(str);
  }
  static inputBranchName(str: string) {
    cy.get('input[type="text"]').eq(2).clear().type(str);
  }
  static clearCompanyName() {
    cy.get('input[type="text"]').eq(1).clear();
  }
  static clearBranchName() {
    cy.get('input[type="text"]').eq(2).clear();
  }
  static selectCompanyType(initCount: JQuery<HTMLElement>) {
    if (getWrappedNumber(initCount) > 0) {
      this.selectHoldingCompany();
    } else if (getWrappedNumber(initCount) > 1) {
      this.selectSubsidaryCompany();
    } else {
      cy.log("Company List is Empty");
    }
  }

  static selectHoldingCompany() {
    cy.get('div[role="dialog"]').then(($dialog) => {
      if ($dialog.find('[data-testid="companyType"]').is(":visible")) {
        cy.getByTestAttribute("companyType").click();
        cy.wait(1000);
        cy.get('li[role="option"]').first().click();
      } else {
        cy.log("The Dialoge is not Visible");
      }
    });
  }
  static selectSubsidaryCompany() {
    cy.get('div[role="dialog"]').then(($dialog) => {
      if ($dialog.find('[data-testid="companyType"]').is(":visible")) {
        cy.getByTestAttribute("companyType").click();
        cy.wait(1000);
        cy.get('li[role="option"]').last().click();
        cy.wait(1000);
        cy.get('span[role="combobox"]').last().click();
        cy.get('li[role="option"]').last().click();
      } else {
        cy.log("The Dialoge is not Visible");
      }
    });
  }

  static verifyDialogeDisapears() {
    cy.wait(500);
    cy.contains("button", " Save and Edit ").should("not.exist");
  }
  static verifyDialogeDisplaying() {
    AddCompanyDialog.clickSaveButton();
    cy.contains("button", " Save and Edit ").should("be.visible");
    cy.contains("button", " Save and Edit ").click();
    cy.wait(500);
    cy.get("button.save").should("be.visible");
  }

  static clickTheDialogeTitle() {
    cy.get('div[class="title"]').eq(0).click();
  }
  static clickPageDropDown() {
    cy.get("table").then(($grid) => {
      const itemCount = $grid.find("tr").length;
      if (itemCount > 10) {
        cy.get("div.p-dropdown-trigger").click();
        cy.get('li[aria-label="15"]').click();
        cy.get("div.p-dropdown-trigger").click();
        cy.get("tr").eq(0).click();
      }
    });
  }
}
