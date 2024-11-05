import { AccountingData } from "../../data/accounting_data";

export class AddingAccountScreen {
  static clickAddNewButton() {
    cy.get('button[class="btn_tree_item btn_add pi pi-plus"]').should(
      "be.visible"
    );
    cy.get('button[class="btn_tree_item btn_add pi pi-plus"]').click();
  }

  static inputName(txt: string) {
    cy.getByTestAttribute("name").scrollIntoView().clear().type(txt);
  }

  static selectParentAccount() {
    // 3
    cy.getFirstItemInDropDownList("parentId").then(($parentId) => {
      if ($parentId != null) {
        cy.wrap($parentId)
          .invoke("text")
          .then((parentIdTxt) => {
            cy.log("parentIdTxt::: " + parentIdTxt);
            cy.wrap(parentIdTxt).as("parentIdTxt");
          });
      } else {
        cy.wrap("").as("parentIdTxt");
      }
    });
  }

  static selectAccountTypeId() {
    // 7
    cy.getFirstItemInDropDownList("accountTypeId").then(($accountTypeId) => {
      if ($accountTypeId != null) {
        cy.wrap($accountTypeId)
          .invoke("text")
          .then((accountTypeIdTxt) => {
            cy.log("accountTypeIdTxt::: " + accountTypeIdTxt);
            cy.wrap(accountTypeIdTxt).as("accountTypeIdTxt");
          });
      } else {
        cy.wrap("").as("accountTypeIdTxt");
      }
    });
  }
  static selectNatureId() {
    // 5
    cy.getFirstItemInDropDownList("natureId").then(($natureId) => {
      if ($natureId != null) {
        cy.wrap($natureId)
          .invoke("text")
          .then((natureIdTxt) => {
            cy.log("natureIdTxt::: " + natureIdTxt);
            cy.wrap(natureIdTxt).as("natureIdTxt");
          });
      } else {
        cy.wrap("").as("natureIdTxt");
      }
    });
  }
  static selectSectionId() {
    // 6
    cy.getFirstItemInDropDownList("accountSectionId").then(
      ($accountSectionId) => {
        if ($accountSectionId != null) {
          cy.wrap($accountSectionId)
            .invoke("text")
            .then((accountSectionIdTxt) => {
              cy.log("accountSectionIdTxt::: " + accountSectionIdTxt);
              cy.wrap(accountSectionIdTxt).as("accountSectionIdTxt");
            });
        } else {
          cy.wrap("").as("accountSectionIdTxt");
        }
      }
    );
  }
  static selectTags() {
    cy.wait(1000);
    cy.checkAllMultiSelect(0);
  }
  static deSelectTags() {
    cy.wait(500);
    cy.checkAllMultiSelect(0);
  }
  static selectCompanies() {
    cy.getFirstItemInDropDownList("companies");
  }
  static clickIsDetail() {
    cy.get('span[data-pc-section="slider"]').click();
  }
  static checkActiveAccountActivation() {
    cy.get('span[class="p-radiobutton-icon"]').eq(0).click({ force: true });
  }
  static checkInactiveAccountActivation() {
    cy.get('span[class="p-radiobutton-icon"]').eq(1).click({ force: true });
  }
  static checkPeriodicActiveAccountActivation() {
    cy.get('span[class="p-radiobutton-icon"]').eq(2).click({ force: true });
    this.clickSaveButton();
    cy.get('span[class="p-radiobutton-icon"]').eq(2).click({ force: true });
    this.setPeriodicActiveTo();
  }
  //   mm/dd/yyyy
  static setPeriodicActiveFrom() {
    cy.get('input[role="combobox"]').eq(1).scrollIntoView().click();
    cy.get('td[aria-label="5"]').scrollIntoView().click();
    cy.get("body").click();
    cy.wait(3500);
      }
  static setPeriodicActiveTo() {
    cy.get('input[role="combobox"]').eq(2).scrollIntoView().click();
    cy.get('td[aria-label="28"]').scrollIntoView().click();
    cy.get("body").click();
    cy.wait(3500);
  }
  static checkMandatoryCostCenterConfiguration() {
    cy.get('span[class="p-radiobutton-icon"]').eq(0).click({ force: true });
  }
  static checkOptionalCostCenterConfiguration() {
    cy.get('span[class="p-radiobutton-icon"]').eq(1).click({ force: true });
  }
  static checkNotAllowCostCenterConfiguration() {
    cy.get('span[class="p-radiobutton-icon"]').eq(2).click({ force: true });
  }
  static checkActiveAccountActivationEdit() {
    cy.get('span[class="p-radiobutton-icon"]').eq(3).click({ force: true });
  }
  static checkInactiveAccountActivationEdit() {
    cy.get('span[class="p-radiobutton-icon"]').eq(4).click({ force: true });
  }
  static checkPeriodicActiveAccountActivationEdit() {
    cy.get('span[class="p-radiobutton-icon"]').eq(5).click({ force: true });
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").contains(/save/i).scrollIntoView().click();
  }
}
