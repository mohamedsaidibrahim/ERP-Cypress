import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";
import { getWrappedString } from "../../../../../../support/utils";

export class FinancialCallender {
  static forceNavigate() {
    cy.visit(GeneralSettingsData.FinancialCalenderUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("calendar")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/general setting/i);
        NavigatesToSideModule.navigatesToTheModule(
          GeneralSettingsData.FinancialCalenderUrl,
          2
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(GeneralSettingsData.FinancialCalenderUrl, "calendar");
  }

  static clickAddNewButton() {
    // cy.contains('button span',/creat/i).scrollIntoView().click({force:true});
    cy.clickAddNewButton();

  }
  static clickGeneratePeriods() {
    cy.contains('button span', /generate period/i).scrollIntoView().click({ force: true });
  }
  static clickCancelButton() {
    cy.contains('button span', /cancel/i).scrollIntoView().click({ force: true });
  }
  static clickSaveButton() {
    cy.contains('button span', /save/i).scrollIntoView().click({ force: true });
  }
  static clickSelectYearDropDownList() {
    cy.getFirstItemInDropDownList("year").then(
      ($year) => {
        if ($year != null) {
          cy.wrap($year)
            .invoke("text")
            .then((yearTxt) => {
              cy.log("yearTxt::: " + yearTxt);
              cy.wrap(yearTxt).as("yearTxt");
            });
        } else {
          cy.wrap("").as("yearTxt");
        }
      }
    );
  }
  static verifyYearIsDisplayedInDimmedInput() {
    cy.get('@yearTxt').then((yearTxt) => {
      cy.get('input[readonly]')
        .should('have.value', getWrappedString(yearTxt));
    });
  }
  static inputFromDate() {
    cy.get('input[role="combobox"]')
      .eq(0)
      .clear({ force: true })
      .type(GeneralSettingsData.fromDate, { force: true });
  }

  static inputToDate(dateVal: any) {
    cy.get('input[role="combobox"]')
      .eq(1)
      .clear({ force: true })
      .type(dateVal, { force: true });
    cy.get('[aria-label="29"] > .p-ripple').last().click();
  }
  static inputFollowingToDate(index: number) {
    cy.get('input[role="combobox"]').eq(index).scrollIntoView().click();
    cy.get('button[aria-label="Choose Year"]').first().scrollIntoView().click();
    cy.get('button[aria-label="Next Decade"]').first().scrollIntoView().click();
    cy.get('span[tabindex="-1"]').eq(index).scrollIntoView().click();
    cy.get('span[tabindex="-1"]').eq(index).scrollIntoView().click();
    cy.contains('td span', /16/i).scrollIntoView().click();
    cy.wait(1000);
  }
  static inputName() {
    cy.getByTestAttribute("name").clear().type(GeneralSettingsData.FCname);
  }
  static clearName() {
    cy.getByTestAttribute("name").clear();
  }
  // static clickGeneratePeriod() {
  //   // cy.get('p[class="m-0 generateBtn"]').first().click({force:true});
  //   cy.get(":nth-child(2) > .flex > .m-0").click();
  // }
  // static clickSavebutton() {
  //   cy.get('lib-button[label="Save"]').click();
  // }
}
