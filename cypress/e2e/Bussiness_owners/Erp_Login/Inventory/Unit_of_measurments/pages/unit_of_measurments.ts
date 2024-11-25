import { InventoryData } from "../../data/inventory_data";
import { getWrappedString } from "../../../../../../support/utils";
export class UnitOfMeasurements {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }



  static landing() {
    cy.NavigateToAPPModule(6, 3);
  }
  static editPreCondition() {
    cy.getFirstCellInTableValue(0).then((uomCode) => {
      cy.wrap(uomCode).as("uomCode");
    });
    cy.getFirstCellInTableValue(1).then((uomName) => {
      cy.wrap(uomName).as("uomName");
    });
    cy.getFirstCellInTableValue(2).then((shortName) => {
      cy.wrap(shortName).as("shortName");
    });
    cy.getFirstCellInTableValue(3).then((uomCategory) => {
      cy.wrap(uomCategory).as("uomCategory");
    });
    cy.getFirstCellInTableValue(4).then((uomFactor) => {
      cy.wrap(uomFactor).as("uomFactor");
    });
  }

  static assertNotEditting() {
    cy.get("@uomCode").then((uomCode) => {
      cy.verifyFirstCellInTable(0, getWrappedString(uomCode));
    });
    cy.get("@uomName").then((uomName) => {
      cy.verifyFirstCellInTable(1, getWrappedString(uomName));
    });
    cy.get("@shortName").then((shortName) => {
      cy.verifyFirstCellInTable(2, getWrappedString(shortName));
    });
    cy.get("@uomCategory").then((uomCategory) => {
      cy.verifyFirstCellInTable(3, getWrappedString(uomCategory));
    });
    cy.get("@uomFactor").then((uomFactor) => {
      cy.verifyFirstCellInTable(4, getWrappedString(uomFactor));
    });
  }

  static assertSubmitEdittingTheBaseUOM() {
    cy.get("@uomCode").then((uomCode) => {
      cy.verifyFirstCellInTable(0, getWrappedString(uomCode));
    });
    cy.verifyFirstCellInTable(1, InventoryData.nameBEn);
    cy.verifyFirstCellInTable(2, InventoryData.shortBame);
    cy.get("@uomCategory").then((uomCategory) => {
      cy.verifyFirstCellInTable(3, getWrappedString(uomCategory));
    });
    cy.get("@uomFactor").then((uomFactor) => {
      cy.verifyFirstCellInTable(4, getWrappedString(uomFactor));
    });
  }

  static assertSubmitEdittingSystemUnitBaseLine() {
    cy.get("@uomCode").then((uomCode) => {
      cy.verifyFirstCellInTable(0, getWrappedString(uomCode));
    });
    cy.verifyFirstCellInTable(1, InventoryData.nameEn);
    cy.verifyFirstCellInTable(2, InventoryData.shortName);
    cy.get("@uomCategory").then((uomCategory) => {
      cy.verifyFirstCellInTable(3, getWrappedString(uomCategory));
    });
    cy.get("@uomFactor").then((uomFactor) => {
      cy.verifyFirstCellInTable(4, getWrappedString(uomFactor));
    });
  }

  static clearEnNameM() {
    cy.getByTestAttribute("nameEn").clear();
  }

  static inputEnNameM() {
    cy.getByTestAttribute("nameEn").clear().type(InventoryData.nameHEn);
  }
  static clearARNameM() {
    cy.getByTestAttribute("nameAr").clear();
  }
  static inputARNameM() {
    cy.getByTestAttribute("nameAr").clear().type(InventoryData.nameHAr);
  }

  static selectSystemUnitOfMeasure(search: string) {
    cy.clickInputtedSearchDropDownList("systemUnitOfMeasureId", search).then(
      ($systemUnitOfMeasureId) => {
        if ($systemUnitOfMeasureId != null) {
          cy.wrap($systemUnitOfMeasureId)
            .invoke("text")
            .then((systemUnitOfMeasureIdTxt) => {
              cy.log("systemUnitOfMeasureIdTxt::: " + systemUnitOfMeasureIdTxt);
              cy.wrap(systemUnitOfMeasureIdTxt).as("systemUnitOfMeasureIdTxt");
            });
        } else {
          cy.wrap("").as("systemUnitOfMeasureIdTxt");
        }
      }
    );
  }
  static clearEnNameB() {
    cy.getByTestAttribute("baseUomEn").clear();
  }
  static inputEnNameB() {
    cy.getByTestAttribute("baseUomEn").clear().type(InventoryData.nameBEn);
  }
  static clearARNameB() {
    cy.getByTestAttribute("baseUomAr").clear();
  }
  static inputARNameB() {
    cy.getByTestAttribute("baseUomAr").clear().type(InventoryData.nameBAr);
  }
  static clearShortNameB() {
    cy.getByTestAttribute("shortName").clear();
  }
  static inputShortNameB() {
    cy.getByTestAttribute("shortName").clear().type(InventoryData.shortBame);
  }

  static clickAddNewLine() {
    cy.wait(1000);
    cy.contains("button", /add new/i)
      .scrollIntoView()
      .click();
  }

  static selectSystemUnitOfMeasureLine() {
    cy.clickLastCellInATable(0);
    cy.getLastElementDropDownList(5).then(
      ($systemUnitOfMeasureId) => {
        if ($systemUnitOfMeasureId != null) {
          cy.wrap($systemUnitOfMeasureId)
            .invoke("text")
            .then((systemUnitOfMeasureIdLineTxt) => {
              cy.log(
                "systemUnitOfMeasureIdLineTxt::: " +
                systemUnitOfMeasureIdLineTxt
              );
              cy.wrap(systemUnitOfMeasureIdLineTxt).as(
                "systemUnitOfMeasureIdLineTxt"
              );
            });
        } else {
          cy.wrap("").as("systemUnitOfMeasureIdLineTxt");
        }
      }
    );
  }
  static clearLineNameEn() {
    cy.clickLastCellInATable(1);
    cy.get("input").last().clear();
  }
  static inputLineNameEn(str: string) {
    cy.clickLastCellInATable(1);
    cy.get("input").last().clear().type(str);
  }
  static clearLineNameAr() {
    cy.clickLastCellInATable(2);
    cy.get("input").last().clear();
  }
  static inputLineNameAr(str: string) {
    cy.clickLastCellInATable(2);
    cy.get("input").last().clear().type(str);
  }
  static inputLineShortName(str: string) {
    cy.clickLastCellInATable(3);
    cy.get("input").last().clear().type(str);
  }

  static inputLineUomFactor(ratio:string) {
    cy.clickLastCellInATable(4);
    cy.get("input").last().clear().type(ratio);
  }

  static selectFromUnitOfMeasureId() {
    cy.clickLastCellInATable(5);
    cy.getFirstItemInDropDownList("fromUnitOfMeasureId").then(($fromUnitOfMeasureId) => {
      if ($fromUnitOfMeasureId != null) {
        cy.wrap($fromUnitOfMeasureId)
          .invoke("text")
          .then((fromUnitOfMeasureIdTxt) => {
            cy.log("fromUnitOfMeasureIdTxt ::: " + fromUnitOfMeasureIdTxt);
            cy.wrap(fromUnitOfMeasureIdTxt).as("fromUnitOfMeasureIdTxt");
          });
      } else {
        cy.wrap("").as("fromUnitOfMeasureIdTxt");
      }
    });
  }

  static deleteFirstLine() {
    cy.getByTestAttribute("cancel").eq(0).scrollIntoView().click();
  }
  static deleteAllLines() {
    cy.getByTestAttribute("cancel").invoke('len').then((cancelLen) => {
      if (cancelLen > 1) {
        this.deleteFirstLine();
      }
    });
  }

  static CancelSubmission() {
    cy.getByTestAttribute("cancel").last().scrollIntoView().click();
  }
  static SaveTheSubmission() {
    cy.getByTestAttribute("save").last().scrollIntoView().click();
  }
  static confirmTheSubmissionSuccessMessage() {
    cy.contains("div", /Success/i);
    cy.contains("div", /UOM Added Successfully/i);

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
