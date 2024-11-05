import { calculateExpiryDate } from "../../../../../support/utils";
import { SubDomainData } from "../../../data/sub_domain_data";
import { BussinessOwnerFunction } from "../../../functions/get_expiry_date";
import { MySubscriptionsPage } from "../../My_subscriptions_page/pages/my-subscriptions_page";

export class AddDomainSpace {
  static AddNewSubDomain() {
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    // implement Add SubDomain and Monthly
    AddDomainSpace.implementAddSubDomain(
      SubDomainData.count,
      SubDomainData.subDomainName
    );
    AddDomainSpace.clickAddToCartButton();
    cy.wait(22000);
    // Verify That The Saved Data is Stored and Displayed Successfully
    AddDomainSpace.validateNewCardIsAddedOnTheGrid(
      SubDomainData.subDomainName,
      SubDomainData.count,
      SubDomainData.isMonthly
    );
  }

  static clickDialoge() {
    cy.get("div.new_domain").click();
  }
  static verifyDialogDisappears() {
    cy.get('button[class="swal2-confirm swal2-styled"]').should("be.visible");
  }
  static verifyDialogPresistance() {
    cy.get("div.new_domain").should("be.visible");
  }
  static clearCount() {
    cy.get('input[type="number"]').clear();
  }
  static inputeCount(count: any) {
    cy.get('input[type="number"]').clear().type(count);
  }
  static validateMonthlyCount(count: any) {
    var cost = count * 50;
    cy.get("span.cost").contains(cost.toString()).should("be.visible");
    cy.get("sub.period").contains("Monthly").should("be.visible");
    cy.get("sup.currency").should("be.visible");
  }
  static clickYearly() {
    cy.get("#Yearly").click();
  }
  static clickMonthly() {
    cy.get("#Monthly").click();
  }
  static validateYearlyCount(count: number) {
    var cost = count * 600;
    // cy.get("span.cost").should("have.value", cost.toString());
    // cy.get("sub.period").should("have.value", "Yearly");
    cy.get("sup.currency").invoke("css", "opacity", "1").should("be.visible");
  }
  static clearYourDomainSpace() {
    cy.get('input[type="text"]').eq(0).clear();
    cy.get('input[type="text"]').eq(0).clear();
  }

  static inputeYourDomainSpace(subDomain: any) {
    cy.get('input[type="text"]').eq(0).clear().type(subDomain);
  }
  
  static validateAddedSubdomain(subDomain: any) {
    // Validate The Subdomain Url is displayed
    cy.get(":nth-child(3) > .card_header > .supdomain").should(
      "include",
      subDomain
    );
    // Validate The Subdomain Url is Expire date is Displayed
    cy.get(":nth-child(3) > .card_header > .date > .expire_date").should(
      "include",
      BussinessOwnerFunction.getExpiryDate()
    );
  }
  static validateRequiredComponentsMsgRemoval() {
    cy.get("span.errorMessage.ng-star-inserted").should("not.exist");
  }
  static validateRequiredComponents(len: number) {
    cy.get("span.errorMessage.ng-star-inserted").should("have.length", len);
  }

  static validateDublicatedDomainSpace() {
    cy.get('div[class="new_domain"]').then(($body) => {
      if (
        $body.find('span[class="errorMessage.ng-star-inserted"]').length > 0
      ) {
        cy.get('span[class="errorMessage.ng-star-inserted"]')
          .invoke("css", "opacity", "1")
          .then(() => {
            cy.contains(
              "span",
              /the minimum length must be 1, and the maximum length must be 12/i
            ).should("be.visible");
          });
      }
    });
  }

  static validateAvailableDomainSpace() {
    cy.get('div[class="new_domain"]').then(($body) => {
      if (
        $body.find('div[class="domain_valid body_b14 ng-star-inserted"]')
          .length > 0
      ) {
        cy.get('div[class="domain_valid body_b14 ng-star-inserted"]')
          .invoke("css", "opacity", "1")
          .then(() => {
            cy.contains(
              'div[class="domain_valid body_b14 ng-star-inserted"]',
              /domain name is available/i
            ).should("be.visible");
          });
      }
    });
  }
  static validateInvalidCount() {
    cy.get("span")
      .contains(
        /The minimum length must be 1, and the maximum length must be 12/i
      )
      .should("be.visible");
  }
  static validateStringCount(count: string) {
    cy.get('input[type="number"]').clear().type(count).should("not.have.value");
  }
  static verifyValidSubDomainCount(count: any) {
    AddDomainSpace.inputeCount(count);
    AddDomainSpace.validateInvalidCount();
  }
  static clickAddToCartButton() {
    cy.get("button[type='submit']").invoke("removeAttr", "disabled");
    cy.get("button[type='submit']").should("not.be.disabled");
    cy.get("button[type='submit']").click({ force: true });
  }

  static confirmTheSuccessPopUp() {
    cy.get('button[class="swal2-confirm swal2-styled"]').should("be.visible");
    cy.get('button[class="swal2-confirm swal2-styled"]').click();
  }
  static validateTheSuccessPopUp() {
    cy.get("#swal2-title").should("have.text", "Success");
    cy.get("#swal2-html-container").should(
      "include",
      /Subdomain Added Successfully/i
    );
    cy.get(".swal2-confirm").should("have.text", "OK");
    cy.get(".swal2-success-ring").should("be.visible");
    cy.get(".swal2-confirm").click();
  }
  static validationSpecialCharacters() {
    cy.contains("span", /special charachters not allowed/i).should(
      "be.visible"
    );
  }
  static validateNewCardIsAddedOnTheGrid(
    subDomainName: string,
    count: number,
    isMonthly: boolean
  ) {
    const expectedDate = calculateExpiryDate(count, isMonthly);
    cy.get(".card").last().should("be.visible");
    cy.get(".card")
      .last()
      .within(() => {
        cy.get(".card_header").within(() => {
          cy.contains(".supdomain", subDomainName).should("be.visible");
          cy.contains(".date > .expire_date", expectedDate).should(
            "be.visible"
          );
        });
        cy.get(".card_contant > .plan_cover").should("be.visible");
        cy.get(".card_contant > .plan_description").within(() => {
          cy.get(".btn_manage > .Companies").should("be.visible");
          cy.get(".btn_manage > :nth-child(3)").should("be.visible");
          cy.get(".mange_app > :nth-child(1)").should("be.visible");
          cy.get(".mange_app > :nth-child(2)").should("be.visible");
          cy.get(".mange_erp > .btn_mange_erp").should("be.visible");
          cy.get(".btn_manage > .user").should("be.enabled");
          cy.get(".btn_manage > .Companies").should("be.enabled");
          cy.get(".btn_manage > :nth-child(3)").should("be.enabled");
          cy.get(".mange_app > :nth-child(1)").should("be.enabled");
          cy.get(".mange_app > :nth-child(2) > .pi").should("be.visible");
          cy.get(".mange_erp > .btn_mange_erp").should("be.enabled");
        });
      });
  }
  static implementAddSubDomain(count: number, subDomain: string) {
    AddDomainSpace.inputeCount(count);
    AddDomainSpace.clickMonthly();
    AddDomainSpace.inputeYourDomainSpace(subDomain);
    AddDomainSpace.validateAvailableDomainSpace();
  }
}
