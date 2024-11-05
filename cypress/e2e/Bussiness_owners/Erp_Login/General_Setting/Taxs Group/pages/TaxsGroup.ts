import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";

export class TaxsGroup {
  static forceNavigate() {
    cy.visit(GeneralSettingsData.TaxGroupLink);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("group")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/accounting/i);
        NavigatesToSideModule.navigatesToTheModule(
          GeneralSettingsData.TaxGroupLink,
          2
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(GeneralSettingsData.TaxGroupLink, "group")
  }

  static inputSearch(txt: string) {
    cy.get('input[placeholder="Search"]')
      .should("be.visible")
      .should("be.enabled")
      .clear()
      .type(txt);
  }
  static clickAddNewButton() {
    // cy.contains('button span ',/create/i).scrollIntoView().click({ force: true });
    cy.clickAddNewButton();
  }
  static clickExportButton() {
    cy.getByTestAttribute("export")
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  static inputCode(code: string) {
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("code").clear().type(code);
  }
  static inputName(name: string) {
    cy.getByTestAttribute("name").should("be.visible");
    cy.getByTestAttribute("name").clear().type(name);
  }
  static clearCode() {
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("code").clear();
  }
  static clearName() {
    cy.getByTestAttribute("name").should("be.visible");
    cy.getByTestAttribute("name").clear();
  }
  static verifyRequiredMessages(count: string) {
    cy.get('span[class="errorMessage ng-star-inserted"]')
      .should("be.visible")
      .should("have.length", count);
  }
  static verifyInExistenceOfRequiredMessage() {
    cy.get('span[class="errorMessage ng-star-inserted"]').should("not.exist");
  }
  static submitDialog() {
    cy.get('div[role="dialog"] [data-testid="save"]')
      .scrollIntoView()
      .click({ force: true });
  }
  static cancelDialog() {
    cy.get('div[role="dialog"] [data-testid="cancel"]')
      .scrollIntoView()
      .click({ force: true });
  }
  static clickLAstEditButton() {
    cy.get('table').should('be.visible');
    cy.wait(1000);
    cy.get("table").then((table) => {
      if (table.find("td").first().is(":visible")) {
        cy.getByTestAttribute("btn_edit")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.getByTestAttribute("btn_edit").last().click();
      } else {
        cy.log("Table Body Edit Button is not Visible");
      }
    });
  }
  static clickLastDeleteButton() {
    cy.get("table").then((table) => {
      if (table.find("td").first().is(":visible")) {
        cy.getByTestAttribute("btn_delet")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.getByTestAttribute("btn_delet").last().click();
      } else {
        cy.log("Table Body Delete Button is not Visible");
      }
    });
  }
  static confirmDeleteAction() {
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).should("be.visible");
    cy.get(
      'button[class="swal2-confirm swal2-styled swal2-default-outline"]'
    ).click();
  }
  static cancelDeleteAction() {
    cy.get(
      'button[class="swal2-cancel swal2-styled swal2-default-outline"]'
    ).should("be.visible");
    cy.get(
      'button[class="swal2-cancel swal2-styled swal2-default-outline"]'
    ).click();
  }
  static selectCountry(srch: string) {
    cy.get('span[role="combobox"]').last().scrollIntoView().should("be.visible");
    cy.get('span[role="combobox"]').last().click();
    cy.get('input[role="searchbox"]').clear().type(srch);
    cy.get('ul[role="listbox"]').then(($listbox) => {
      if (
        $listbox
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.get('span[role="combobox"]').last().click();
        cy.wrap("").as("lastEl");
        cy.log("clickInputtedSearchDropDownList empty listbox");
      } else {
        cy.wrap($listbox).find("p-dropdownitem li span").last().scrollIntoView();
        cy.wrap($listbox)
          .find("p-dropdownitem li span")
          .last()
          .scrollIntoView()
          .then(($lastEl) => {
            cy.wrap($lastEl).click();
            cy.wrap($lastEl)
              .invoke("text")
              .then((lastElText) => {
                cy.log(
                  "Commands Last Parent Last Element in Drop Down List Text: " +
                  lastElText
                );
                cy.wrap(lastElText).as("lastElText");
              });
          });
      }
    });
  }
}
