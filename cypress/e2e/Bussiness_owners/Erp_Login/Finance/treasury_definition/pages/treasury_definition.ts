import { getRandomNumber } from "../../../../../../support/utils";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { FinanceData } from "../../data/finance_data";

export class TreasuryDefinition {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }

  static inputOpeningBalance() {
    cy.get('input[data-testid="accountBalance"]')
      .invoke("val")
      .then((text: any) => {
        var openingBalanc = "50000";
        if (text.trim().toString() == "--" || text == "" || text == null) {
          openingBalanc = "50000";
        } else {
          openingBalanc = text.trim().toString();
        }
        cy.log("Opening Account Balance:", openingBalanc);
        cy.getByTestAttribute("openingBalance")
          .last()
          .scrollIntoView()
          .clear()
          .type(openingBalanc);
      });
  }

  static inputDiffOpeningBalance() {
    cy.getByTestAttribute("openingBalance")
      .last()
      .scrollIntoView()
      .clear()
      .type(getRandomNumber(0, 1000).toString());
  }

  static clickSaveButton() {
    cy.getByTestAttribute("save").last().click({ force: true });
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find('div[role="dialog"]').length > 1) {
        cy.getByTestAttribute("save").last().click({ force: true });
      }
    });
  }

  static submitSaving() {
    cy.get('div[role="dialog"]').then(($submissionDialog) => {
      cy.wrap($submissionDialog)
        .find("button")
        .contains(/submit/i)
        .click();
    });
  }

  static clickcancelButton() {
    cy.getByTestAttribute("cancel")
      .last()
      .scrollIntoView()
      .click({ force: true });
  }

  static forceNavigate() {
    cy.visit(FinanceData.TreasuryDefinitionUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("reasury")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/finance/i);
        NavigatesToSideModule.navigatesToTheModule(
          FinanceData.TreasuryDefinitionUrl,
          1
        );
      }
    });
  }

  static landing() {
    cy.LandingToERPModule(FinanceData.TreasuryDefinitionUrl, "reasury");
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
    cy.contains("button", /yes/i).click();
  }
}
