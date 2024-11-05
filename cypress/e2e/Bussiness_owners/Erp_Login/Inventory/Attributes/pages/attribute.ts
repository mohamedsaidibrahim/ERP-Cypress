import { InventoryData } from "../../data/inventory_data";

export class Attribute {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).last().click({ force: true });
  }
  static clickSaveContinueButton() {
    cy.contains("button", /continue/i).click({ force: true });
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click({ force: true });
  }

  static landing() {
    cy.LandingToERPModule(InventoryData.AttributeUrl, "attribute");
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

  static inputNameEn() {
    cy.clickLastCellInATable(1);
    cy.get("input").last().clear().type(InventoryData.nameEn);
  }
  static inputNameAr() {
    cy.clickLastCellInATable(0);
    cy.get("input").last().clear().type(InventoryData.nameAr);
  }
  static clickSaveLineButton() {
    cy.getByTestAttribute("save").scrollIntoView().click();
  }
  static verifyMissingSaveLineButton() {
    cy.getByTestAttribute("save").should("not.exist");
  }
  static verifyVisibilitySaveLineButton() {
    cy.getByTestAttribute("save").should("be.visible");
  }
  static verifyDimmedAddNewButton() {
    cy.contains("button", /create/i).should("have.attr", "disabled");
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-trash pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-trash pointer"]').first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
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
}
