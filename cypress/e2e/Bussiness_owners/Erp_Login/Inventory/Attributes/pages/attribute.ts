import { getWrappedString } from "../../../../../../support/utils";

export class Attribute {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewLineButton() {
    cy.getByTestAttribute("outline").scrollIntoView().click();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).last().click({ force: true });
  }
  static clickSaveContinueButton() {
    cy.contains("button", /continue/i).click({ force: true });
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").last().scrollIntoView().click({ force: true });
  }

  static landing() {
    cy.NavigateToAPPModule(6, 4);
  }
  static selectAttrName() {
    cy.getFirstItemInDropDownList("attrName").then(($attrName) => {
      if ($attrName != null) {
        cy.wrap($attrName)
          .invoke("text")
          .then((attrNameTxt) => {
            cy.log("attrNameTxt::: " + attrNameTxt);
            cy.wrap(attrNameTxt).as("attrNameTxt");
          });
      } else {
        cy.wrap("").as("attrNameTxt");
      }
    });
  }

  static clearAttributtNameEnglish() {
    cy.getByTestAttribute("nameEn").last().clear();
  }

  static inputAttributtNameEnglish(str: string) {
    cy.getByTestAttribute("nameEn").last().clear().type(str);
  }
  static clearAttributeNameArabic() {
    cy.getByTestAttribute("nameAr").last().clear();
  }
  static inputAttributeNameArabic(str: string) {
    cy.getByTestAttribute("nameAr").last().clear().type(str);
  }
  static clearValueArabic() {
    cy.clickLastCellInATable(1);
    cy.get("tr").last().find("td").eq(1).find("input").clear();
  }
  static inputValueArabic(str: string) {
    cy.clickLastCellInATable(1);
    cy.get("tr").last().find("td").eq(1).find("input").clear().type(str);
  }
  static clearValueEnglish() {
    cy.clickLastCellInATable(0);
    cy.get("tr").last().find("td").eq(0).find("input").clear();
  }

  static inputValueEnglish(str: string) {
    cy.clickLastCellInATable(0);
    cy.get("tr").last().find("td").eq(0).find("input").clear().type(str);
  }
  static clickSaveLineButton() {
    cy.getByTestAttribute("save").last().scrollIntoView().click();
  }
  static verifyMissingSaveLineButton() {
    cy.getByTestAttribute("save").should("not.exist");
  }
  static verifyVisibilitySaveLineButton() {
    cy.getByTestAttribute("save").should("be.visible");
  }

  static clickFirstListViewDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get("tbody tr").first().find("td").eq(3).find("img").eq(1).scrollIntoView().click();
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstListViewEditButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get("tbody tr").first().find("td").eq(3).find("img").eq(0).scrollIntoView().click();
      } else {
        cy.log("The Table is Empty");
      }
    });
    cy.wait(2000);
  }
  static clickFirstListViewViewButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get("tbody tr").first().find("td").eq(3).find("img").eq(2).scrollIntoView().click();
      } else {
        cy.log("The Table is Empty");
      }
    });
    cy.wait(1000);
    cy.reload();
    cy.wait(3500);
  }
  static deleteFirstAddEditLine() {
    cy.getByTestAttribute("cancel").first().scrollIntoView().click();
  }

  static deleteAllAddEditLines() {
    cy.getByTestAttribute("cancel").then(($cancel) => {
      if ($cancel.length > 1) {
        this.deleteFirstAddEditLine();
      }
    });
  }

  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-pencil pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-pencil pointer"]')
          .first()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/yes/i)
      .scrollIntoView()
      .click({ force: true });
  }
  static assertSuccessfulDeletion() {
    cy.assertItemDeletedFromListView();
  }

  static verifySearchFunctionality() {
    cy.get("table").should("be.visible");
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").length > 1) {
        cy.getLastCellInTableValue(0).then((last1) => {
          cy.get('input[placeholder="Search"]')
            .clear()
            .type(last1.trim() + "{enter}");
          cy.wrap(last1).as("last1");
        });
        cy.wait(500);
        cy.get("@last1").then((last1) => {
          cy.verifyFirstCellInTable(0, getWrappedString(last1));
        });
        cy.get('input[placeholder="Search"]').clear();
        cy.wait(500);
        cy.getFirstCellInTableValue(0).then((first1) => {
          cy.get('input[placeholder="Search"]')
            .clear()
            .type(first1.trim() + "{enter}");
          cy.wrap(first1).as("first1");
        });
        cy.wait(500);
        cy.get("@first1").then((first1) => {
          cy.verifyFirstCellInTable(0, getWrappedString(first1));
        });
      }
    });
  }

}
