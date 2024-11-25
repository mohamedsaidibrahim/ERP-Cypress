import { InventoryData } from "../../data/inventory_data";
import { getWrappedString } from "../../../../../../support/utils";

export class OperationTags {
  static landing() {
    cy.NavigateToAPPModule(6, 5);
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).scrollIntoView().click();
  }
  static verifyDimmedCode() {
    cy.verifyDimmidInput("code");
  }
  static inputName() {
    cy.getByTestAttribute("name").clear().type(InventoryData.nameEn);
  }
  static selectOperationType(srchStr: string) {
    cy.clickInputtedSearchDropDownList("operationType", srchStr).then(
      ($operationType) => {
        if ($operationType != null) {
          cy.wrap($operationType)
            .invoke("text")
            .then((operationTypeTxt) => {
              cy.log("operationTypeTxt::: " + operationTypeTxt);
              cy.wrap(operationTypeTxt).as("operationTypeTxt");
            });
        } else {
          cy.wrap("").as("operationTypeTxt");
        }
      }
    );
  }
  static selectwarehouse(srchStr: string) {
    cy.clickInputtedSearchDropDownList("warehouseId", srchStr).then(
      ($warehouse) => {
        if ($warehouse != null) {
          cy.wrap($warehouse)
            .invoke("text")
            .then((warehouseTxt) => {
              cy.log("warehouseTxt::: " + warehouseTxt);
              cy.wrap(warehouseTxt).as("warehouseTxt");
            });
        } else {
          cy.wrap("").as("warehouseTxt");
        }
      }
    );
  }
  static selectglAccountAdd() {
    cy.getLastItemInDropDownList("glAccountId");
  }
  static selectglAccountEdit() {
    cy.getLastItemInDropDownList("glAccountId").then(($glAccount) => {
      if ($glAccount != null) {
        cy.wrap($glAccount)
          .invoke("text")
          .then((glAccountTxt) => {
            cy.log("glAccountTxt::: " + glAccountTxt);
            cy.wrap(glAccountTxt).as("glAccountTxt");
          });
      } else {
        cy.wrap("").as("glAccountTxt");
      }
    });
  }

  static assertEditting() {
    cy.verifyFirstCellInTable(2, InventoryData.nameEn);
    cy.get("@operationTypeTxt").then((operationTypeTxt) => {
      cy.verifyFirstCellInTable(3, getWrappedString(operationTypeTxt));
    });
    cy.get("@warehouseTxt").then((warehouseTxt) => {
      cy.verifyFirstCellInTable(4, getWrappedString(warehouseTxt));
    });
  }
}
