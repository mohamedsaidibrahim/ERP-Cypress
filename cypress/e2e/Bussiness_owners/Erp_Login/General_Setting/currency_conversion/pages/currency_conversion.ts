import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";

export class CurrencyConversion {
  static clickAddNewButton() {
    // cy.contains("button span",/creat/i).scrollIntoView().click({force:true});
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").last().scrollIntoView().click({ force: true });
  }
  static assertSuccesfulSaving() {
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.get("@fromCurrencyIdTxt").then((fromCurrencyIdTxt) => {
      cy.verifyFirstCellInTable(0, getWrappedString(fromCurrencyIdTxt));
    });
    cy.verifyFirstCellInTable(1, GeneralSettingsData.ccFromCurrencyRate);
    cy.get("@toCurrencyIdTxt").then((toCurrencyIdTxt) => {
      cy.verifyFirstCellInTable(2, getWrappedString(toCurrencyIdTxt));
    });
    cy.verifyFirstCellInTable(4, GeneralSettingsData.ccNote);
  }
  static clickcancelButton() {
    cy.getByTestAttribute("cancel").last().click({ force: true });
  }
  static clickFirstErpLogin() {
    cy.get('div[class="plan_description"] div[class="mange_erp"]').first().scrollIntoView().click({ force: true });
  }
  static forceNavigate() {
    cy.wait(1000);
    NavigatesToSideModule.navigatesToAnAppinSubdomain(/general setting/i);
    NavigatesToSideModule.navigatesToTheModule(
      GeneralSettingsData.CurrencyConversionUrl,
      4
    );
  }
  static landing() {
    cy.LandingToERPModule(
      GeneralSettingsData.CurrencyConversionUrl,
      "conversion"
    );
  }
  // static landingEdit() {
  //   cy.wait(1000);
  //   cy.visit(GeneralSettingsData.CurrencyConversionUrl);
  //   cy.wait(1500);
  //   cy.clickContinueAs();
  //   cy.wait(1000);
  //   cy.url().then((currentUrl) => {
  //     if (currentUrl.includes("conversion")) {
  //       cy.log("You Are In .. " + GeneralSettingsData.CurrencyConversionUrl);
  //     } else if (currentUrl.includes("bussiness-owners")) {
  //       cy.wait(1000);
  //       cy.clickFirstErpLogin();
  //       this.forceNavigate();
  //     } else {
  //       this.forceNavigate();
  //     }
  //   });
  // }
}
