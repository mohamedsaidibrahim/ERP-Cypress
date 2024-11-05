import { getRandomNumber, trimText } from "../../../../../../support/utils";
import { LoginPage } from "../../../../../Authentication/Login/pages/loginPage";
import { AddDomainSpace } from "../../../../My-subscriptions/Add_domain_space/pages/add_domain_space";
import { ManageApps } from "../../../../My-subscriptions/Manage_apps/pages/manage_apps";
import { MySubscriptionsPage } from "../../../../My-subscriptions/My_subscriptions_page/pages/my-subscriptions_page";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { GeneralSettingsData } from "../../data/general_settings_data";

export class GeneralSetting {
  static visitTheSubDomain(sdURl: string) {
    //  Visit the domain s
    cy.visit(sdURl);
    //  Confirm Refactoring
    cy.wait(500);
    // Check if the button is visible
    cy.clickContinueAs();
  }

  static clickDeleteIcon() {
    cy.clickFirstDeleteActionButton();
  }
  static confirmDeletePopUp() {
    cy.contains("button", /yes/i).should("be.visible");
    cy.contains("button", /yes/i).click();
  }
  static verifyThatNewTagNameIsNOTAddedtotheTable(tagName: string) {
    cy.get("table")
      .find("tbody tr")
      .last()
      .find("td")
      .eq(1)
      .scrollIntoView()
      .should("not.contain", tagName);
  }
  static clickTheShiftingAppCloseIcon() {
    cy.get("button timesicon").should("be.visible");
    cy.get("button timesicon").click();
  }
  static clickDialogSaveButton() {
    cy.get('div[role="dialog"]').find('[data-testid="save"]').scrollIntoView();
    cy.get('div[role="dialog"]').find('[data-testid="save"]').click();
  }
  static clickDialogcancelButton() {
    cy.get('div[role="dialog"]').find('[data-testid="cancel"]').scrollIntoView();
    cy.get('div[role="dialog"]').find('[data-testid="cancel"]').click();
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }

  static inputTagName(tagName: string) {
    cy.getByTestAttribute("name").clear({ force: true }).type(tagName, { force: true });
  }
  static inputTagNameEditted(tagName: string) {
    cy.get('input[type="text"]').last().clear({ force: true }).type(tagName, { force: true });
  }
  static clearTagName() {
    cy.getByTestAttribute("name").clear({ force: true });
  }
  static validatePressenceRequiredMessage() {
    cy.contains("span", /required/i).should("be.visible");
  }
  static validateNoRequiredMessage() {
    cy.contains("span", /required/i).should("not.exist");
  }
  // static validateRequiredMessage(num: number) {
  //   if (num == 0) {
  //     cy.contains("span", /required/i).should("not.exist");
  //   } else {
  //     cy.contains("span", /required/i).should("have.text", " Required ");
  //     cy.contains("span", /required/i).then((elements) => {
  //       expect(elements.length).to.equal(num);
  //     });
  //   }
  // }
  static verifyAddNewTagDisAppearing() {
    cy.get("#pn_id_17_header").should("not.exist");
  }
  static clickEditButton() {
    cy.clickFirstEditActionButton();
  }

  static clickShifttingButton() {
    cy.get('button[class="btn_mod_select"]').first().click({ force: true });
    cy.get('div[role="dialog"]').should("be.visible");
    cy.get('div[role="dialog"]').then(($dialog) => {
      if ($dialog.find('div[class="modal-card"]').is(":not(:visible)")) {
        cy.get('div[class="cancel"]').last().click({ force: true });
        this.clickShifttingButton();
      }
    });
  }

  static shiftToAnotherApp(appName: string) {
    cy.wait(1000);
    cy.get('input[placeholder="Search App"]').clear().type(appName);
    cy.wait(1500);
    cy.get('div[class="modal-card"]').first().click({ force: true });
    cy.wait(2000);
  }

  static chooseTheJournalEntryListButton() {
    cy.contains("span", "Choose App").should("be.visible");
    cy.contains("span", "Choose App").click();
    cy.get(".containar_modules > :nth-child(1)").should("be.visible");
    cy.get(".containar_modules > :nth-child(1)").click();
  }
  static verifyNavigatingToAnotherApp(appName: any) {
    cy.url().should("include", appName);
  }

  static clickGeneralSetting() {
    cy.contains("span", "Choose App").should("be.visible");
    cy.contains("span", "Choose App").click();
    cy.get(":nth-child(2) > .card_photo > img").should("be.visible");
    cy.get(":nth-child(2) > .card_photo > img").click();
  }

  static forceNavigate() {
    cy.visit(GeneralSettingsData.tagsUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("erp/masterdata")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/general setting/i);
        NavigatesToSideModule.navigatesToTheModule(
          GeneralSettingsData.tagsUrl,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(GeneralSettingsData.tagsUrl, "erp/masterdata");
  }

  static verifyColumnHeaders() {
    cy.get("thead tr").find('th').eq(0).should("include", /Code/i);
    cy.get("thead tr").find('th').eq(1).should("include", /Name/i);
    cy.get("thead tr").find('th').eq(2).should("include", /Modules/i);
    cy.get("thead tr").find('th').eq(3).should("include", /Status/i);
    cy.get("thead tr").find('th').eq(4).should("include", /Actions/i);
  }

  static clickAddNewTag() {
    cy.contains('button span',/create/i).scrollIntoView().click({ force: true });
  }
  static closeTheDialogIcon() {
    cy.get('div[class="pi cancel"]').last().should("be.visible");
  }

  static verifyCodeTextField() {
    cy.get("div[role='dialog']")
      .find('input').first()
      .should("be.disabled")
      .should("not.be.checked")
      // .should("have.class", "read")
      ;
  }
  static verifyNameTextField() {
    cy.get(
      ":nth-child(2) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    )
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked")
      .should("have.class", "p-inputtext");
  }
  static verifyMultiApplicabilityDropDown() {
    cy.get(".p-multiselect-label").click({ force: true });
    cy.get(".p-checkbox-box")
      .should("be.visible")
      .should("have.attr", "aria-checked", "false")
      .should("have.class", "p-checkbox-box");
    cy.get(".p-multiselect-filter")
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked")
      .should("have.class", "p-multiselect-filter")
      .should("have.class", "p-inputtext")
      .should("have.attr", "autocomplete", "off");
    cy.get(".p-multiselect-empty-message").should("be.visible").click();
    cy.get('div[class="p-element p-multiselect-label-container"]')
      .last()
      .click({ force: true });
  }
  static verifycancelButton() {
    cy.get(".custom-danger-outline > .p-ripple")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", " cancel ")
      .should("have.class", "p-element");
  }
  static verifySaveButton() {
    cy.get(".custom-light-blue > .p-ripple")
      .should("be.visible")
      .should("be.enabled")
      .should("have.class", "p-button")
      .should("have.text", " Save ");
  }
  static verifyDialogCloseIcon() {
    cy.get('div[class="cancel"]').click();
  }
  // static TagListMainTitle() {
  //   cy.get(".p-menuitem-text").should("have.text", "Tag List");
  //   cy.get(
  //     ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select'
  //   )
  //     .should("be.visible")
  //     .should("be.enabled")
  //     .should("have.class", "btn_mod_select")
  //     .should("have.text", " General Settings ");
  // }

  static navigateToTheLastSubDomainAccounting() {
    cy.clickContinueAs();
    LoginPage.visit();
    cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]').last().scrollIntoView();
    cy.get('div[class="supdomain paragraph_b20"]').last().should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]')
      .last()
      .invoke("text")
      .then((domain) => {
        let cURl = "https://" + domain + ":2050/accounting/";
        GeneralSetting.visitTheSubDomain(cURl);
      });
    cy.clickContinueAs();
  }

  static navigateToTheLastSubDomainHR() {
    cy.clickContinueAs();
    cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]').last().scrollIntoView();
    cy.get('div[class="supdomain paragraph_b20"]').last().should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]')
      .last()
      .invoke("text")
      .then((domain) => {
        let cURl = "https://" + domain + ":2050/hr/";
        GeneralSetting.visitTheSubDomain(cURl);
      });
  }
  static verifyNavigatingToGeneralSetting() {
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)").should(
      "have.text",
      " Id "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)").should(
      "have.text",
      " Code "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)").should(
      "have.text",
      " Name "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(4)").should(
      "have.text",
      " Status "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)")
      .scrollIntoView()
      .should("have.text", " Modules ");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)")
      .scrollIntoView()
      .should("have.text", " Actions ");
  }
  static verifyNavigatingToHR() {
    cy.get("thead tr th").should("be.visible");
    cy.get("thead tr th").eq(0).should("include", /name/i);
    cy.get("thead tr th").eq(1).should("include", /code/i);
    cy.get("thead tr th")
      .eq(2)
      .should("include", /attendance code/i);
    cy.get("thead tr th")
      .eq(3)
      .should("include", /actions/i);
  }

  //	Create SubDomain
  static createNewSubDomain() {
    const subDomainName =
      "lowerdomain" + getRandomNumber(1, 1000000).toString();
    let count = 6;
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.implementAddSubDomain(count, subDomainName);
    AddDomainSpace.clickAddToCartButton();
    cy.wait(2000);
    // AddDomainSpace.verifyDialogDisappears();
  }

  static confirmNavigationToSubDomain() {
    cy.get(".w-75").click();
  }
  static selectMultipleApps() {
    cy.get('div[class="p-element p-multiselect-label-container"]')
      .last()
      .should("be.visible");
    cy.get('div[class="p-element p-multiselect-label-container"]')
      .last()
      .click();
    cy.contains("span", /accounting/i).scrollIntoView().click({ force: true });
    cy.contains("span", /general setting/i).scrollIntoView().click({ force: true });
    cy.contains("span", /finance/i).scrollIntoView().click({ force: true });
    cy.getByTestAttribute('cancel').last().scrollIntoView().click({ force: true });
  }
  static unSelectAnApp() {
    cy.get('div[class="p-element p-multiselect-label-container"]')
      .last()
      .should("be.visible");
    cy.get('div[class="p-element p-multiselect-label-container"]')
      .last()
      .click();
    cy.contains("span", /accounting/i).click();
    cy.get('div[class="cancel"]').last().click();
  }
  // static confirmSuccessAlert() {
  //   cy.get(".swal2-confirm").click();
  // }
  static addAppsFromAppStore() {
    //	Add Apps From App Store
    for (var i = 0; i < 3; i++) {
      ManageApps.clickAppStore();
      cy.wait(500);
      cy.clickContinueAs();
      cy.wait(500);
      ManageApps.clickAddToCart(i);
      cy.get(".p-dropdown-label").click();
      cy.get("li span")
        .last()
        .scrollIntoView()
        .invoke("text")
        .then((subDomainName1) => {
          cy.log("subDomainName1 ::: " + subDomainName1);
          cy.wrap(subDomainName1).as("subDomainName1");
        });

      cy.get("li span").last().scrollIntoView().click({ force: true });
      cy.get("@subDomainName1").then((subDomainName1) => {
        cy.get(".p-dropdown-label")
          .invoke("text")
          .then((subDomainName2) => {
            expect(trimText(subDomainName1.toString().trim())).to.equal(
              trimText(subDomainName2.toString().trim())
            );
          });
      });
      ManageApps.clickSave();
      ManageApps.verifySuccessProcess();
    }
  }

  static checkOutTheApps() {
    ManageApps.clickShoppingCart();
    ManageApps.clickCheckOut();
    ManageApps.verifySuccessCheckOut();
  }
}
