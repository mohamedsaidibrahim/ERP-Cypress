import { getRandomNumber, trimText } from "../../../../../../support/utils";
import { AccountingData } from "../../data/accounting_data";
import { ChartOfAccountsConfigurations } from "../pages/0.configuration";
import { ChartOfAccounts } from "../pages/charts_of_accounts";

describe("Configurations of Charts of Accounts", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(AccountingData.ChartOfAccountsLink);
  });
  
  it("1.Verify Submitting Add A New Line ", () => {
    const c = getRandomNumber(10, 100);
    ChartOfAccounts.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get(".pop_up_footer").invoke("hide");
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody")
      .find("tr")
      .its("length")
      .then((linesCountInit) => {
        cy.wrap(linesCountInit).as("linesCountInit");
      });
    ChartOfAccountsConfigurations.clickAddNewLine();
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody).find("tr").last().find("td").eq(0).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(0)
          .find("input")
          .clear()
          .type("" + c);
        cy.wrap($tbody).find("tr").last().find("td").eq(1).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(1)
          .find("input")
          .clear()
          .type("Level " + c);
        cy.wrap($tbody).find("tr").last().find("td").eq(2).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(2)
          .find("input")
          .clear()
          .type("" + c);
      }
    });
    cy.get(".pop_up_footer").invoke("css", "display", "block");
    ChartOfAccountsConfigurations.clickSaveButton();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("@linesCountInit").then((linesCountInit) => {
      cy.get(".pop_up_footer").invoke("hide");
      cy.wait(1000);
      cy.get("tbody").find("tr").last().scrollIntoView();
      cy.get("tbody")
        .find("tr")
        .its("length")
        .then((linesCountFinal) => {
          expect(linesCountFinal).to.equal(
            parseInt(trimText(linesCountInit.toString().trim())) + 1
          );
        });
    });
  });
  
  it("2.Verify cancel Add New Line ", () => {
    const c = getRandomNumber(10, 100);
    ChartOfAccounts.landing();
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get(".pop_up_footer").invoke("hide");
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody")
      .find("tr")
      .its("length")
      .then((linesCountInit) => {
        cy.wrap(linesCountInit).as("linesCountInit");
      });
    ChartOfAccountsConfigurations.clickAddNewLine();
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody).find("tr").last().find("td").eq(0).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(0)
          .find("input")
          .clear()
          .type("" + c);
        cy.wrap($tbody).find("tr").last().find("td").eq(1).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(1)
          .find("input")
          .clear()
          .type("Level " + c);
        cy.wrap($tbody).find("tr").last().find("td").eq(2).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(2)
          .find("input")
          .clear()
          .type("" + c);
      }
    });
    ChartOfAccountsConfigurations.clickcancelButton();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("@linesCountInit").then((linesCountInit) => {
      cy.get(".pop_up_footer").invoke("hide");
      cy.wait(1000);
      cy.get("tbody").find("tr").last().scrollIntoView();
      cy.get("tbody")
        .find("tr")
        .its("length")
        .then((linesCountFinal) => {
          expect(linesCountFinal).to.equal(
            parseInt(trimText(linesCountInit.toString().trim()))
          );
        });
    });
  });

  it("3.Verify Submitting Add multiple New Lines ", () => {
    const c = getRandomNumber(10, 100);
    ChartOfAccounts.landing();
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get(".pop_up_footer").invoke("hide");
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody")
      .find("tr")
      .its("length")
      .then((linesCountInit) => {
        cy.wrap(linesCountInit).as("linesCountInit");
      });
    for (var i = 0; i < 5; i++) {
      var m = c + i;
      ChartOfAccountsConfigurations.clickAddNewLine();
      cy.get("tbody").then(($tbody) => {
        if ($tbody.find("tr").is(":visible")) {
          cy.wait(500);
          cy.wrap($tbody)
            .find("tr")
            .last()
            .scrollIntoView()
            .should("be.visible");
          cy.wrap($tbody).find("tr").last().find("td").eq(0).click();
          cy.wrap($tbody)
            .find("tr")
            .last()
            .find("td")
            .eq(0)
            .find("input")
            .clear()
            .type("" + m);
          cy.wrap($tbody).find("tr").last().find("td").eq(1).click();
          cy.wrap($tbody)
            .find("tr")
            .last()
            .find("td")
            .eq(1)
            .find("input")
            .clear()
            .type("Level " + m);
          cy.wrap($tbody).find("tr").last().find("td").eq(2).click();
          cy.wrap($tbody)
            .find("tr")
            .last()
            .find("td")
            .eq(2)
            .find("input")
            .clear()
            .type("" + m);
        }
      });
    }
    cy.get(".pop_up_footer").invoke("css", "display", "block");
    ChartOfAccountsConfigurations.clickSaveButton();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("@linesCountInit").then((linesCountInit) => {
      cy.get(".pop_up_footer").invoke("hide");
      cy.wait(1000);
      cy.get("tbody").find("tr").last().scrollIntoView();
      cy.get("tbody")
        .find("tr")
        .its("length")
        .then((linesCountFinal) => {
          expect(linesCountFinal).to.equal(
            parseInt(trimText(linesCountInit.toString().trim())) + 5
          );
        });
    });
  });
  
  it("4.Verify All Components are displaying in their correct states", () => {
    ChartOfAccounts.landing();
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    // Verify the main Headers
    cy.contains(".add_line", /add new line/i).should("be.visible");
    cy.get(".add_line > .icon")
      .should("be.visible")
      .should("have.class", "fa-plus");
    // Verify the Column Headers
    cy.get(".p-datatable-thead > .ng-star-inserted > :nth-child(1)")
      .should("be.visible")
      .should("have.text", "level Number");
    cy.get(".p-datatable-thead > .ng-star-inserted > :nth-child(2)")
      .should("be.visible")
      .should("have.text", "level Name");
    cy.get(".p-datatable-thead > .ng-star-inserted > :nth-child(3)")
      .should("be.visible")
      .should("have.text", "Number Of Digits");
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        for (var i = 0; i < 5; i++) {
          var d = i == 4 ? 4 : i + 1;
          cy.wait(500);
          cy.wrap($tbody)
            .find("tr")
            .eq(i)
            .find("td")
            .eq(0)
            .should("be.visible")
            .should("have.text", " " + (i + 1) + " ");
          cy.wrap($tbody)
            .find("tr")
            .eq(i)
            .find("td")
            .eq(1)
            .should("be.visible")
            .should("have.text", " Level" + " " + (i + 1) + " ");
          cy.wrap($tbody)
            .find("tr")
            .eq(i)
            .find("td")
            .eq(2)
            .should("be.visible")
            .should("have.text", " " + d + " ");
        }
      }
    });
    cy.getByTestAttribute("cancel").scrollIntoView();
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  });
  
  it("5.Verify that he System can edit the Level that is not used in accounts these are parents or enters in Transaction", () => {
    const c = getRandomNumber(10, 100);
    const l = "Editted Level " + c;
    const v = c + 1;
    ChartOfAccounts.landing();
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody).find("tr").last().find("td").eq(0).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(0)
          .find("input")
          .clear()
          .type("" + c);
        cy.wrap($tbody).find("tr").last().find("td").eq(1).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(1)
          .find("input")
          .clear()
          .type(l);
        cy.wrap($tbody).find("tr").last().find("td").eq(2).click();
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(2)
          .find("input")
          .clear()
          .type("" + v);
      }
    });
    cy.get(".pop_up_footer").invoke("css", "display", "block");
    ChartOfAccountsConfigurations.clickSaveButton();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.wait(1000);
    cy.get("tbody").find("tr").last().scrollIntoView();
    cy.get(".pop_up_footer").invoke("hide");
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(0)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt1) => {
            expect(tdTxt1).to.contain(c.toString());
          });
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(1)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt2) => {
            expect(tdTxt2).to.contain(l.toString());
          });
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(2)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt3) => {
            expect(tdTxt3).to.contain(v.toString());
          });
      }
    });
  });

  it("6.Verify that he System prevents editting the Level that is used in accounts these are parents or enters in Transaction", () => {
    const c = getRandomNumber(10, 100);
    const l = "Editted Level " + c;
    const v = c + 1;
    ChartOfAccounts.landing();
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody)
          .find("tr")
          .first()
          .scrollIntoView()
          .should("be.visible");
        cy.wrap($tbody).find("tr").first().find("td").eq(0).click();
        cy.wrap($tbody)
          .find("tr")
          .first()
          .find("td")
          .eq(0)
          .find("input")
          .clear()
          .type("" + c);
        cy.wrap($tbody).find("tr").first().find("td").eq(1).click();
        cy.wrap($tbody)
          .find("tr")
          .first()
          .find("td")
          .eq(1)
          .find("input")
          .clear()
          .type(l);
        cy.wrap($tbody).find("tr").first().find("td").eq(2).click();
        cy.wrap($tbody)
          .find("tr")
          .first()
          .find("td")
          .eq(2)
          .find("input")
          .clear()
          .type("" + v);
      }
    });
    cy.get(".pop_up_footer").invoke("css", "display", "block");
    ChartOfAccountsConfigurations.clickSaveButton();
    cy.wait(1000);
    ChartOfAccountsConfigurations.clickConfigurationButtonOnDisplayScreen();
    cy.get(".pop_up_footer").invoke("hide");
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wait(500);
        cy.wrap($tbody).find("tr").last().scrollIntoView().should("be.visible");
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(0)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt1) => {
            expect(tdTxt1).not.to.contain(c.toString());
          });
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(1)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt2) => {
            expect(tdTxt2).not.to.contain(l.toString());
          });
        cy.wrap($tbody)
          .find("tr")
          .last()
          .find("td")
          .eq(2)
          .find("p-celleditor")
          .invoke("text")
          .then((tdTxt3) => {
            expect(tdTxt3).not.to.contain(v.toString());
          });
      }
    });
  });
});
