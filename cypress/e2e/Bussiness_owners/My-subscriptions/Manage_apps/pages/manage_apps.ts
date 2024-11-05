import { trimText } from "../../../../../support/utils";

export class ManageApps {
  static clickAppStore() {
    cy.contains('div', /app store/i).click();
  }
  static titleList = [
    " General Ledger ",
    " Personal ",
    " App General Settings ",
  ];
  static descList = [
    " This module handles all general ledger operations. ",
    " This module manages personal information and settings. ",
    " This module contains general settings for the app. ",
  ];
  static renewList = ["80USD", "60USD", "30USD"];

  static clickSubDomainsDropDown() {
    cy.get('span[role="combobox"]').click();
  }
  static selectTheSubDomain() {
    cy.get(".p-dropdown-label").click();
    cy.get("li span")
      .last()
      .invoke("text")
      .then((subDomainName1) => {
        cy.log("subDomainName1 ::: " + subDomainName1);
        cy.wrap(subDomainName1).as("subDomainName1");
      });

    cy.get("li span").last().click({ force: true });
    cy.get("@subDomainName1").then((subDomainName1) => {
      cy.get(".p-dropdown-label")
        .invoke("text")
        .then((subDomainName2) => {
          expect(trimText(subDomainName2.trim())).to.equal(
            trimText(subDomainName1.toString().trim())
          );
        });
    });
  }
  static clickSave() {
    cy.get(".btn_save").click();
  }
  static navigateToAppStore() {
    cy.get(".item.body_b14 > button > .item_icon > .fa").click();
  }
  static verifyNavigationToAppStoreScreen(appName: any) {
    cy.get(":nth-child(1) > .app_description > .sec_one > .title").should(
      "have.text",
      appName
    );
  }
  static clickManageAppsButton() {
    cy.get(
      ":nth-child(1) > .card > .card_contant > .plan_description > .mange_app > :nth-child(1)"
    ).click();
  }
  static verifyNavigationToTheSubDomainManageAppsScreen(appName: any) {
    cy.contains(/App In Store/i).should("be.visible");
    cy.get('div[class="count_of_apps"]').should("be.visible");
    cy.get(":nth-child(1) > .app_description > .sec_one > .title")
      .contains(appName)
      .should("not.exist");
  }
  static confirmOPerationFailedDublicatedAppsOnASubDomain() {
    cy.contains("h2", "Operation Fail").should("be.visible");
    cy.contains('div[id="swal2-html-container"]', "FluentValidation").should(
      "be.visible"
    );
    cy.get('span[class="swal2-x-mark"]').should("be.visible");
    cy.get(".swal2-x-mark-line-right").should("be.visible");
    cy.get('button[class="swal2-confirm swal2-styled"]').click();
  }

  static verifySuccessProcess() {
    cy.wait(1500);
    cy.get('div[role="dialog"]').should("not.exist");
  }
  static verifyDialogPresence() {
    cy.wait(1500);
    cy.get('div[role="dialog"]').should("be.visible");
  }
  static clickShoppingCart() {
    cy.wait(1000);
    cy.get('span[class="pi pi-shopping-cart icon_link"]').click();
    cy.wait(1000);
  }
  static verifyDisplayingStartShoppingText() {
    cy.get(".cart_page").should(
      "have.text",
      " No items in Cart. Start Shopping"
    );
  }
  static verifyDisplayingRouterlinkAppStore() {
    cy.get(".cart_page > a")
      .should("be.visible")
      .should("have.text", "Start Shopping")
      .should("have.attr", "href", "/bussiness-owners/app-store")
      .should("have.attr", "routerlink", "/app-store");
  }
  static verifyAppCountIsZero() {
    cy.get(".count").eq(4)
      .should("be.visible")
      .should("have.class", "count").invoke("text").then((countTxt: string) => {
        expect(countTxt.trim()).to.equal("0");
      });
  }
  static verifyEachAppCard() {
    cy.get('div[class="card"]')
      .its("length")
      .then((len) => {
        cy.wrap("len").as("cardsCount");
      });
    cy.get("@cardsCount").then((cardCounts) => {
      for (let i = 0; i < parseInt(cardCounts.toString()); i++) {
        this.verifyCardData(i);
      }
    });
  }
  static verifyCardData(index: number) {
    cy.get('div[class="card ng-star-inserted"]').within(($card) => {
      cy.get("div img").should("be.visible");
      cy.get('div div div[class="title"]')
        .eq(index)
        .should("include", this.titleList[index]);
      cy.get('div div div[class="re_new"]')
        .eq(index)
        .should("include", this.renewList[index]);

      cy.get('div div div[class="rate"]')
        .eq(index)
        .should("include", this.descList[index]);
      cy.get('div div div[class="cart"] button')
        .eq(index)
        .should("be.enabled")
        .should("include", /add to cart/i);
    });
  }
  static verifyCardTitle(index: number) {
    cy.get('div[class="title"]')
      .eq(index)
      .should("have.text", this.titleList[index]);
  }
  static verifyCardRenew(index: number) {
    cy.get('div[class="re_new"]')
      .eq(index)
      .should("have.text", this.renewList[index]);
  }
  static verifyCardDesc(index: number) {
    cy.get('div[class="rate"]')
      .eq(index)
      .should("have.text", this.descList[index]);
  }
  static verifyCardAddToCart(index: number) {
    cy.get('div[class="cart"] button')
      .eq(index)
      .should("be.enabled")
      .should("include", /add to cart/i);
  }
  static clickLastSubDomainManageApp() {
    cy.contains('button[class="btn_mange_app body_b14"]', /manage app/i).last().scrollIntoView().should("be.visible");
    cy.contains('button[class="btn_mange_app body_b14"]', /manage app/i).last().click();
  }
  static clickAddToCart(index: number) {
    if (index > 1) {
      cy.contains('button',/add to cart/i).eq(index).scrollIntoView().should('be.visible').click();
    } else {
      cy.contains('button',/add to cart/i).eq(index).should('be.visible').click();
    }
  }
  static clickcancelButton() {
    cy.get(".btn_cancel").click();
  }
  static clickDialogCancelIcon() {
    cy.get(".domain_header > .pi").click();
  }
  static verifyCheckOutIconCounter(counter: number) {
    cy.get('div[class="count"]').last().should(
      "have.text",
      " " + counter.toString()
    );
  }
  static clickCheckOutIcon() {
    cy.get('div[class="count"]').last().click();
  }
  static navigateToMySubscriptions() {
    cy.get(":nth-child(1) > button > .item_text").click();
  }
  static verifyAppName(appName: string) {
    cy.contains(".app_name", appName).should("be.visible");
  }
  static verifyAppPrice(appPrice: number) {
    cy.contains(".item.ng-star-inserted", appPrice + " USD ").should(
      "be.visible"
    );
  }
  static verifyAppDataInCheckList(
    index: number,
    appName: string,
    price: string
  ) {
    cy.get(
      ":nth-child(" +
      (index + 2) +
      ") > .grid > .col-4 > .app_name > :nth-child(1)"
    ).should("have.text", appName);
    cy.get(":nth-child(" + (index + 4) + ") > .singel_item > .title").should(
      "have.text",
      appName
    );
    cy.get(":nth-child(" + (index + 2) + ") > .grid > :nth-child(4)").should(
      "have.text",
      price
    );
    cy.get(":nth-child(" + (index + 4) + ") > .singel_item > .price").should(
      "have.text",
      price
    );
  }

  static verifyAppDataInCheckListMMMM(index: number) {
    cy.get(
      ":nth-child(" +
      (index + 2) +
      ") > .grid > .col-4 > .app_name > :nth-child(1)"
    )
      .invoke("text")
      .then((appName) => {
        cy.get(
          ":nth-child(" + (index + 4) + ") > .singel_item > .title"
        ).should("have.text", appName);
      });
    cy.get(":nth-child(" + (index + 2) + ") > .grid > :nth-child(4)")
      .invoke("text")
      .then((price) => {
        cy.get(
          ":nth-child(" + (index + 4) + ") > .singel_item > .price"
        ).should("have.text", price);
      });
  }
  static verifyAppDataInCheckListXXXXX() {
    cy.get('div[class="data_table"] div div[class="grid ng-star-inserted"]')
      .its("length")
      .then((lll) => {
        if (lll > 0) {
          for (var index = 0; index < lll; index++) {
            cy.get(
              ":nth-child(" +
              (index + 2) +
              ") > .grid > .col-4 > .app_name > :nth-child(1)"
            )
              .invoke("text")
              .then((appName) => {
                cy.get(
                  ":nth-child(" + (index + 4) + ") > .singel_item > .title"
                ).should("have.text", appName);
              });
            cy.get(":nth-child(" + (index + 2) + ") > .grid > :nth-child(4)")
              .invoke("text")
              .then((price) => {
                cy.get(
                  ":nth-child(" + (index + 4) + ") > .singel_item > .price"
                ).should("have.text", price);
              });
          }
        }
      });
  }
  static verifyDisplayingItemsCountInCheckList(count: number) {
    cy.get(".total_items > .title").should(
      "have.text",
      " Items(" + count + ") "
    );
  }
  static verifyDisplayingSumItemsPriceInCheckList(total: number) {
    cy.get('div[class="total_items"] div[class="price"]').should(
      "have.text",
      " " + total + " "
    );
  }
  static clickCheckOut() {
    cy.get(".Check_out").click();
  }
  static cancelCheckoutButton() {
    cy.get(":nth-child(2) > .grid > :nth-child(5) > .btn_action > .pi").click();
  }
  static deleteFromCheckOutList() {
    cy.get('button[class="pi pi-trash delet"]').last().click();
  }
  static verifySuccessCheckOut() {
    cy.get('div[class="payment"]').find('div[class="card"]').should('be.visible');
    cy.get('div[class="payment"]').find('div[class="text"]').should('be.visible').should('include', /succeful/i);
  }
  static verifySuccessDeletePopUp() {
    cy.get("h2").should("include", /Are you sure?/i);
    cy.get('div').should(
      "include",
      /You won't be able to revert this!/i
    );
    cy.get(
      'button'
    ).should("include", /yes/i);
  }
  static confirmDeleteButton() {
    cy.get(
      'button'
    ).contains( /yes/i).should('be.visible').click();
  }
}
