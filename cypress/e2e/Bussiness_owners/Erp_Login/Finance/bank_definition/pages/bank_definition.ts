import { generateRandomMobileNumber } from "../../../../../../support/utils";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { InventoryData } from "../../../Inventory/data/inventory_data";
import { FinanceData } from "../../data/finance_data";

export class BankDefinition {
  static clickAddNewButton() {
    // cy.contains('button span',/create/i).click({ force: true });
    cy.clickAddNewButton();
    cy.wait(1000);
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").click({ force: true });
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find('div[role="dialog"]').is(":visible")) {
        cy.get('div[role="dialog"]').contains("button", /save/i).click();
      }
    });
  }
  static forceNavigate() {
    cy.visit(FinanceData.BankDefinitionUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("bank")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/bank/i);
        NavigatesToSideModule.navigatesToTheModule(
          FinanceData.BankDefinitionUrl,
          2
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(FinanceData.BankDefinitionUrl, "bank");
    cy.wait(6500);
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_delet").first().scrollIntoView();
        cy.getByTestAttribute("btn_delet").first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute("btn_edit").first().scrollIntoView();
        cy.getByTestAttribute("btn_edit")
          .first()
          .scrollIntoView()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.contains("button", /yes/i).click({ force: true });
  }
  static addAccountNumber() {
    cy.clickCellInATable(0, 0);
    cy.get("tbody tr").first().find("td").first().scrollIntoView();
    cy.get("tbody tr").first().find("td").first().click({ force: true });
    cy.get("input").last().clear();
    cy.get("input").last().type(generateRandomMobileNumber());
  }
  // static addOpeningBalance() {
  //   cy.get("tbody tr").eq(8).find("td").first().scrollIntoView();
  //   cy.get("tbody tr").eq(8).find("td").first().click({ force: true });
  //   cy.get("input").last().clear();
  //   cy.get("input").last().type(generateRandomMobileNumber());
  // }
  static addAccountCode() {
    cy.clickCellInATable(0, 1);
    cy.get("tbody tr").first().find("td").eq(1).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(1).click({ force: true });
    cy.clickInputtedSearchDropDownList("glAccountId", InventoryData.pAccount).then(
      ($glAccountId) => {
        if ($glAccountId != null) {
          cy.wrap($glAccountId)
            .invoke("text")
            .then((glAccountIdTxt) => {
              cy.log("glAccountIdTxt::: " + glAccountIdTxt);
              cy.wrap(glAccountIdTxt).as("glAccountIdTxt");
            });
        } else {
          cy.wrap("").as("glAccountIdTxt");
        }
      }
    );
  }
  static selectAllBranches() {
    cy.clickCellInATable(0, 3);
    cy.get("tbody tr").first().find("td").eq(3).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(3).click({ force: true });
    cy.checkAllMultiSelect(0);
  }
  static addIBN() {
    cy.clickCellInATable(0, 4);
    cy.get("tbody tr").first().find("td").eq(4).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(4).click({ force: true });
    cy.get("input").last().clear({ force: true }).type(generateRandomMobileNumber());
  }
  // static addCurrency() {
  //   cy.get("tbody tr").first().find("td").eq(5).scrollIntoView();
  //   cy.get("tbody tr").first().find("td").eq(5).click({ force: true });
  //   cy.clickInputtedSearchDropDownList("currencyId", "eg").then(
  //     ($currencyId) => {
  //       if ($currencyId != null) {
  //         cy.wrap($currencyId)
  //           .invoke("text")
  //           .then((currencyIdTxt) => {
  //             cy.log("currencyIdTxt::: " + currencyIdTxt);
  //             cy.wrap(currencyIdTxt).as("currencyIdTxt");
  //           });
  //       } else {
  //         cy.wrap("").as("currencyIdTxt");
  //       }
  //     }
  //   );
  // }
  static selectUserPermission() {
    cy.get("tbody tr").first().find("td").eq(7).scrollIntoView();
    cy.get("tbody tr").first().find("td").eq(7).click({ force: true });
    cy.checkAllMultiSelect(0);
    cy.wait(750);
    cy.get('body').click();
  }
  static addOpeningBalance() {
    cy.clickCellInATable(0, 6);
    cy.get("tbody tr").eq(0).find("td").eq(6).invoke('text').then((obVal: any) => {
      var openingBalanc = "10000";
      if (obVal.trim().toString() == "--" || obVal == "" || obVal == null
        // || obVal == 0.0 || obVal==0
      ) {
        openingBalanc = "10000";
      } else {
        openingBalanc = obVal.trim().toString();
      }
      cy.log('addOpeningBalance obVal : ' + openingBalanc);
      cy.get("tbody tr").eq(0).find("td").eq(7).scrollIntoView().click({ force: true });
      cy.get("input").last().click({ force: true });
      cy.get("input").last().clear({force: true}).type(openingBalanc, { force: true });
    });
  }
}
