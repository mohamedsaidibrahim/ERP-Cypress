import { describe } from "mocha";
import { ManageApps } from "../pages/manage_apps";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { AddDomainSpace } from "../../Add_domain_space/pages/add_domain_space";
import { getWrappedNumber } from "../../../../../support/utils";
let appIndex = 0;
describe("Manage Apps", () => {
  beforeEach("Navigation", () => {
    LoginPage.visit();
    cy.clickContinueAs();
  });
  it("000.Create New Subdomain", () => {
    AddDomainSpace.AddNewSubDomain();
  });
  it("0.Verify that the Cart List Screen has Text button 'Start Shopping' When there are not any items", () => {
    ManageApps.clickShoppingCart();
    cy.get("body").then(($body) => {
      if ($body.find('div[class="title"]').is(":visible")) {
        cy.log("There Are Title");
      } else {
        ManageApps.verifyDisplayingStartShoppingText();
        ManageApps.verifyDisplayingRouterlinkAppStore();
      }
    });
  });
  it("1.Verify that the users can switch from Vertical to Horizontal List view and Vice verse", () => {
    ManageApps.clickAppStore();
    cy.get('span[class="slider"]').should("be.visible").click();
    cy.get('div[class="app_list"]').find(".card_list").should("be.visible");
  });
  it("2.Verify that All the Subdomains names are displayed on Add to Cart DropDown", () => {
    cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
    cy.get('div[class="supdomain paragraph_b20"]')
      .its("length")
      .then((length) => {
        let allDomains = "";
        for (var c = 0; c < length; c++) {
          cy.get('div[class="supdomain paragraph_b20"]').should("be.visible");
          cy.get('div[class="supdomain paragraph_b20"]')
            .eq(c)
            .invoke("text")
            .then((txt) => {
              allDomains = allDomains + "---" + txt.split(".")[0];
              cy.wrap(allDomains).as("allDomains");
            });
        }
      });
    ManageApps.clickAppStore();
    cy.wait(1500);
    ManageApps.clickAddToCart(appIndex);
    cy.wait(1000);
    ManageApps.clickSubDomainsDropDown();
    cy.get("@allDomains").then((allDomains) => {
      let allDomainsList = allDomains.toString().split("---");
      for (var d = 1; d < allDomainsList.length; d++) {
        cy.contains("li", allDomainsList[d].toString())
          .scrollIntoView()
          .should("be.visible");
      }
    });
  });
  it("3.Verify that All Components are Displayed in Manage Apps Screen", () => {
    ManageApps.clickAppStore();
    // Header Label
    cy.get(".p-menuitem-text").should("have.text", "App Store");
    // HeaderAppCountLabel
    cy.get(".count_of_apps").should("have.text", " 6 App in Store ");
    // sliderisVisible
    cy.get(".slider").should("be.visible").should("have.class", "slider");
    //  Verify Each Card Components
    cy.get('div[class="card"]')
      .its("length")
      .then((len) => {
        cy.wrap(len).as("cardsCount");
      });
    cy.get("@cardsCount").then((cardCounts) => {
      for (let i = 0; i < parseInt(cardCounts.toString()) - 1; i++) {
        ManageApps.verifyCardTitle(i);
        ManageApps.verifyCardRenew(i);
        ManageApps.verifyCardDesc(i);
        ManageApps.verifyCardAddToCart(i);
      }
    });
  });
  it("4.Verify that the user can add a new App to the Checkout List", () => {
    cy.reload();
    cy.clickContinueAs();
    ManageApps.clickShoppingCart();
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find('div[class="title"]').is(":visible")) {
        cy.get('div[class="title"]')
          .its("length")
          .then((initCount) => {
            cy.wrap(initCount).as("initCount");
            cy.log("initCount :::^^^^:::: " + initCount);
          });
      } else {
        cy.log("Table is not Exist");
        cy.wrap(0).as("initCount");
      }
    });
    ManageApps.clickAppStore();
    cy.wait(1000);
    ManageApps.clickAddToCart(appIndex);
    cy.getLastItemInDropDownList("subdomain");
    ManageApps.clickSave();
    ManageApps.verifySuccessProcess();
    ManageApps.clickShoppingCart();
    cy.get("@initCount").then((initCount) => {
      cy.get('div[class="title"]')
        .its("length")
        .then((finalCount) => {
          cy.log("initCount :::#####:::: " + initCount);
          cy.log("finalCount :::#####:::: " + finalCount);
          expect(finalCount).to.equal(getWrappedNumber(initCount) + 1);
        });
    });
  });
  it("5.verify that the user can not buy an app to the same Subdomain multiple times", () => {
    cy.reload();
    cy.clickContinueAs();
    ManageApps.clickAppStore();
    cy.wait(2000);
    ManageApps.clickAppStore();
    ManageApps.clickAddToCart(appIndex);
    cy.getLastItemInDropDownList("subdomain");
    ManageApps.clickSave();
    ManageApps.verifyDialogPresence();
  });

  it("6.Verify That the user can delete an app from Checkout list", function () {
    cy.reload();
    cy.clickContinueAs();
    ManageApps.clickShoppingCart();
    cy.wait(1000);
    cy.get("body").then(($body) => {
      if ($body.find('div[class="title"]').is(":visible")) {
        cy.get('div[class="title"]')
          .its("length")
          .then((initCount) => {
            cy.wrap(initCount).as("initCount");
            cy.log("initCount :::^^^^:::: " + initCount);
          });
      } else {
        cy.wrap(0).as("initCount");
        cy.log("Table is not Exist");
      }
    });
    ManageApps.deleteFromCheckOutList();
    cy.confirmDeletePopUp();
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.get("@initCount").then((initCount) => {
      cy.get("body").then(($body) => {
        if ($body.find('div[class="title"]').is(":visible")) {
          cy.get('div[class="title"]')
            .its("length")
            .then((finalCount) => {
              cy.log("initCount :::#####:::: " + initCount);
              cy.log("finalCount :::#####:::: " + finalCount);
              var z = getWrappedNumber(initCount) - 1;
              expect(finalCount).to.equal(z);
            });
        } else {
          ManageApps.verifyDisplayingStartShoppingText();
          ManageApps.verifyDisplayingRouterlinkAppStore();
        }
      });
    });
  });
  it("7.Verify that the user can re Add to Cart a canceled App in the checkout screen", () => {
    cy.reload();
    cy.clickContinueAs();
    ManageApps.clickAppStore();
    cy.wait(2000);
    ManageApps.clickAppStore();
    ManageApps.clickAddToCart(appIndex);
    cy.getLastItemInDropDownList("subdomain");
        ManageApps.clickSave();
    ManageApps.verifySuccessProcess();
  });

  it("9.Verify that the Checklist Screen has all components", function () {
    cy.reload();
    cy.clickContinueAs();
    ManageApps.clickCheckOutIcon();
    cy.wait(1000);
    cy.get(".p-menuitem-text").should("be.visible");
    cy.get(".p-menuitem-text").should("have.text", "Cart List");

    cy.get("span").should("include", /cart list/i);
    cy.get(".body_b16").should(
      "have.text",
      " Enter an item number and press Enter to load the product inormation and variants . Tab to select variants and quantity . press on the quantity arrows to add the product to the list "
    );
    cy.get(".data_head > .grid > .col-4").should("have.text", "Product");
    cy.get(".data_head > .grid > :nth-child(2)").should(
      "have.text",
      "Subdomain"
    );
    cy.get(".data_head > .grid > :nth-child(3)").should("have.text", "Price");
    cy.get(".data_head > .grid > :nth-child(4)").should("have.text", "Total");

    cy.get("span").should("include", /cart list/i);
    cy.get(".text > :nth-child(2)").should("have.text", "Details");
    cy.get(".total_items > .title").contains(/items/i).should("be.visible");

    cy.get(".Check_out")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", " Check out ");
    cy.get(".Cancel")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "Cancel");
  });
  it("10.Verify That the Checkout Process is Finished Successfully", function () {
    cy.wait(500);
    ManageApps.clickLastSubDomainManageApp();
    ManageApps.clickShoppingCart();
    ManageApps.clickCheckOut();
    ManageApps.verifySuccessCheckOut();
  });
  it("11.Verify that the Subdomain's App Management Screen has all Components", () => {
    cy.wait(1000);
    ManageApps.clickLastSubDomainManageApp();
    cy.get(".p-menuitem-text").should("have.text", "Manage Apps");
    cy.get(".count_of_apps")
      .contains(/app in store/i)
      .should("be.visible");
    cy.get(".slider").should("have.class", "slider");
  });
  it("12.Verify that the user can shift between Horizontal to vertical Listview Mode in the  Subdomain's App Management Screen", () => {
    cy.wait(1000);
    ManageApps.clickLastSubDomainManageApp();
    cy.get('div[class="col-12 md:col-12"]').then(($body) => {
      if ($body.find('div[class="card ng-star-inserted"]').length > 0) {
        cy.get('div[class="card card_list"]').should("not.exist");
        cy.get(".slider").click();
        cy.get('div[class="card card_list"]').should("exist");
      }
    });
  });
});
