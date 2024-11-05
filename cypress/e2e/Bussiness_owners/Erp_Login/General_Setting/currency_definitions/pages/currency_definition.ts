import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";

export class CurrencyDefinitions {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").contains(/save/i).should("be.visible").click();
  }
  static clickCancelButton() {
    cy.getByTestAttribute("cancel").should("be.visible").click();
  }

  static forceNavigate() {
    cy.visit(GeneralSettingsData.CurrencyDefinitionsUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("definition")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/general setting/i);
        NavigatesToSideModule.navigatesToTheModule(
          GeneralSettingsData.CurrencyDefinitionsUrl,
          3
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(GeneralSettingsData.CurrencyDefinitionsUrl, "definition");

  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.wrap($table)
          .find('btn_delet')
          .first()
          .scrollIntoView();
        cy.wrap($table)
          .find('btn_delet')
          .first()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.getByTestAttribute('btn_edit')
          .first()
          .scrollIntoView();
        cy.getByTestAttribute('btn_edit')
          .first()
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
