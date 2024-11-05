import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { FinanceData } from "../../data/finance_data";

export class PaymentTerm {
  static clickAddNewButton() {
    // cy.contains('button span',/create/i).click({ force: true });
    cy.clickAddNewButton();
  }
  static clickFirstEditPaymentTerm() {
    cy.getByTestAttribute("btn_edit").first().click();
  }
  static clickDeletePaymentTerm() {
    cy.getByTestAttribute("btn_delet").click();
  }
  static clickSaveButton() {
    cy.contains("button",/save/i).scrollIntoView().click();
  }

  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  }
  static forceNavigate() {
    cy.visit(FinanceData.paymentTermUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("paymentterm")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/finance/i);
        NavigatesToSideModule.navigatesToTheModule(
          FinanceData.paymentTermUrl,
          3
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(FinanceData.paymentTermUrl, "paymentterm");
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_delet")
          .first()
          .scrollIntoView()
          .should("be.visible");
        cy.getByTestAttribute("btn_delet").first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.get('div[role="dialog"]')
      .find('button[class="swal2-confirm swal2-styled swal2-default-outline"]')
      .scrollIntoView()
      .click({ force: true });
  }

  static setName(str: any) {
    cy.inputText("name", str);
  }
  static clearName() {
    cy.getByTestAttribute("name").clear();
  }

  static clearafterValue(row:number) {
    cy.clickCellInATable(row, 1);
    cy.get("tbody tr")
      .last()
      .find('input[data-testid="afterValue"]')
      .last()
      .clear();
  }

  static setAfterValue(row: number, str: any) {
    cy.clickCellInATable(row, 1);
    cy.get("tbody tr")
      .last()
      .find('input[data-testid="afterValue"]')
      .last()
      .clear()
      .type(str);
  }


  static clearDueTermValue(row:number) {
    cy.clickCellInATable(row, 0);
    cy.get("tbody tr")
      .last()
      .find('input[data-testid="dueTermValue"]')
      .last()
      .clear();
  }

  static setDueTermValue(row: number, str: any) {
    cy.clickCellInATable(row, 0);
    cy.get("tbody tr")
      .last()
      .find('input[data-testid="dueTermValue"]')
      .last()
      .clear()
      .type(str);
  }
  static setAfterPeriod(row: number, index: number) {
    cy.clickCellInATable(row, 2);
    index % 2 == 0
      ? this.getLastItemInDropDownListP("afterPeriod")
      : this.getFirstItemInDropDownListP("afterPeriod");
  }

  static setNote(row: number, str: any) {
    cy.clickCellInATable(row, 3);
    cy.get("tbody tr")
      .last()
      .find('input[data-testid="note"]')
      .last()
      .clear()
      .type(str);
  }
  static clearNote() {
    cy.get("tbody tr").last().find('input[data-testid="note"]').last().clear();
  }
  static verifyCode() {
    cy.get('[data-testid="code"]').should("be.visible");
  }

  static clickAddNewLine() {
    cy.contains("button", /add new line/i).click();
  }

  static getFirstItemInDropDownListP(attrName: String) {
    cy.getByTestAttribute(attrName)
      .last()
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestAttribute(attrName).last().click();
    cy.get('ul[role="listbox"]').then(($listbox) => {
      if (
        $listbox
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.getByTestAttribute(attrName).last().click({ force: true });
        cy.log("getFirstItemInDropDownList empty listbox");
      } else {
        cy.get('li[role="option"]')
          .first()
          .then(($firstEl) => {
            cy.wrap($firstEl).as("firstEl");
            cy.get("@firstEl").click({ force: true });
          });
      }
    });
  }
  static getLastItemInDropDownListP(attrName: String) {
    cy.getByTestAttribute(attrName)
      .last()
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestAttribute(attrName).last().click();
    cy.get('ul[role="listbox"]').then(($listbox) => {
      if (
        $listbox
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.getByTestAttribute(attrName).last().click({ force: true });
        cy.log("getlastItemInDropDownList empty listbox");
      } else {
        cy.get('li[role="option"]')
          .last()
          .then(($lastEl) => {
            cy.wrap($lastEl).as("lastEl");
            cy.get("@lastEl").click({ force: true });
          });
      }
    });
  }
}
