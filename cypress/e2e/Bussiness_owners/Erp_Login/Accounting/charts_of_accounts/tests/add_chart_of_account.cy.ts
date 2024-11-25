import { AccountingData } from "../../data/accounting_data";
import { AddingAccountScreen } from "../pages/adding_account_screen";
import { ChartOfAccounts } from "../pages/charts_of_accounts";
import { getWrappedString } from "../../../../../../support/utils";

describe("Adding Chart of Account", () => {
  beforeEach("Navigates to Chart of Account", () => {
    cy.visit(AccountingData.ChartOfAccountsLink);
  });

  it("1.Verify All Components are displaying in their correct states", () => {
    ChartOfAccounts.landing();
    cy.wait(2000);
    AddingAccountScreen.clickAddNewButton();
    cy.wait(1500);
    // Verify Labels
    cy.contains('[data-pc-section="legendtitle"]', "Account").should(
      "be.visible"
    );
    cy.contains('label[for="name"]', "Name").should("be.visible");
    cy.contains('label[for="natureId"]', "Account Nature").should("be.visible");
    cy.contains('label[for="accountSectionId"]', "Account Section").should(
      "be.visible"
    );
    cy.contains('label[for="accountTypeId"]', "Account Type").should(
      "be.visible"
    );
    cy.contains('label[for="tags"]', "Tags").should("be.visible");
    cy.contains('label[for="hasNoChild"]', "Details")
      .scrollIntoView()
      .should("be.visible");
    cy.contains(
      '[data-pc-section="legendtitle"]',
      "Cost Center Configuration"
    ).should("not.exist");
    AddingAccountScreen.clickIsDetail();
    cy.contains('[data-pc-section="legendtitle"]', "Cost Center Configuration")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('label[for="1"]', "Mandatory")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('label[for="2"]', "Optional")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('label[for="3"]', "Not Allow")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('[data-pc-section="legendtitle"]', "Account Activation")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('label[for="Active"]', "Active")
      .scrollIntoView()
      .should("be.visible");
    cy.contains('label[for="Inactive"]', "Inactive")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestAttribute("save")
      .contains(/save/i)
      .scrollIntoView()
      .should("be.visible");
    // Verift the name Text Field
    cy.get(
      '[data-testid="name"]'
    ).should("have.length", 1);
    cy.get(
      'span[class="p-element p-dropdown-label p-inputtext p-dropdown-label-empty ng-star-inserted"]'
    )
      .eq(1)
      .click();
    // Verify The Visibility of One MultiSelect "Tags"
    cy.get('div[class="p-element p-multiselect-label-container"]').should(
      "have.length",
      1
    );
    cy.get(".p-inputswitch-slider").should("be.visible");
    cy.get("#Active").should("exist");
    cy.get("#Inactive").should("exist");
    cy.get(".p-radiobutton > .p-radiobutton-box").should("have.length", 6);
    cy.getByTestAttribute("save")
      .contains(/save/i)
      .scrollIntoView()
      .should("be.visible");
  });

  it("2.Verify Adding new Parent Chart of Account HAS PARENT", () => {
    ChartOfAccounts.landing();
    cy.wait(2000);
    AddingAccountScreen.clickAddNewButton();
    cy.wait(1500);
    cy.getFirstItemInDropDownList("natureId").then(($natureId) => {
      cy.wrap($natureId)
        .invoke("text")
        .then((natureTxt) => {
          cy.log("natureTxt natureTxt natureTxt::: " + natureTxt);
          cy.wrap(natureTxt).as("natureTxt");
        });
    });
    AddingAccountScreen.inputName(AccountingData.testParentAccountAddedd);
    cy.getLastItemInDropDownList("accountSectionId").then(
      ($accountSectionId) => {
        cy.wrap($accountSectionId)
          .invoke("text")
          .then((sectionTxt) => {
            cy.log("sectionTxt::: " + sectionTxt);
            cy.wrap(sectionTxt).as("sectionTxt");
          });
      }
    );
    AddingAccountScreen.inputName(AccountingData.testParentAccountAddedd);
    cy.getLastItemInDropDownList("parentId").then(($parentId) => {
      cy.wrap($parentId)
        .invoke("text")
        .then((parentTxt) => {
          cy.log("parentTxt::: " + parentTxt);
          cy.wrap(parentTxt).as("parentTxt");
        });
    });
    AddingAccountScreen.inputName(AccountingData.testParentAccountAddedd);
    cy.getFirstItemInDropDownList("accountTypeId").then(($accountTypeId) => {
      cy.wrap($accountTypeId)
        .invoke("text")
        .then((typeTxt) => {
          cy.log("typeTxt::: " + typeTxt);
          cy.wrap(typeTxt).as("typeTxt");
        });
    });
    AddingAccountScreen.selectTags();
    AddingAccountScreen.checkActiveAccountActivation();
    AddingAccountScreen.clickSaveButton();
    cy.wait(2000);
    ChartOfAccounts.SearchAnTreeAccount(AccountingData.testParentAccountAddedd);
    cy.get('div[class="description"]').last().scrollIntoView().click({force:true});
    cy.wait(1000);
    cy.verifyPlaceholderText(2, AccountingData.testParentAccountAddedd);
    cy.wait(1000);
    cy.get("@natureTxt").then((natureTxt) => {
      cy.verifyPlaceholderText(5, getWrappedString(natureTxt));
    });
    cy.get("@sectionTxt").then((sectionTxt) => {
      cy.verifyPlaceholderText(6, getWrappedString(sectionTxt));
    });
    cy.get("@parentTxt").then((parentTxt) => {
      cy.verifyPlaceholderText(3, getWrappedString(parentTxt));
    });
    cy.get("@typeTxt").then((typeTxt) => {
      cy.verifyPlaceholderText(7, getWrappedString(typeTxt));
    });
  });

  it("3.Verify Adding new Parent Chart of Account WITHOUT PARENT", () => {
    ChartOfAccounts.landing();
    cy.wait(2000);
    AddingAccountScreen.clickAddNewButton();
    cy.wait(1500);
    cy.getFirstItemInDropDownList("natureId").then(($natureId) => {
      cy.wrap($natureId)
        .invoke("text")
        .then((natureTxt) => {
          cy.log("natureTxt natureTxt natureTxt::: " + natureTxt);
          cy.wrap(natureTxt).as("natureTxt");
        });
    });
    cy.getLastItemInDropDownList("accountSectionId").then(
      ($accountSectionId) => {
        cy.wrap($accountSectionId)
          .invoke("text")
          .then((sectionTxt) => {
            cy.log("sectionTxt::: " + sectionTxt);
            cy.wrap(sectionTxt).as("sectionTxt");
          });
      }
    );
    cy.getLastItemInDropDownList("parentId").then(($parentId) => {
      cy.wrap($parentId)
        .invoke("text")
        .then((parentTxt) => {
          cy.log("parentTxt::: " + parentTxt);
          cy.wrap(parentTxt).as("parentTxt");
        });
    });
    AddingAccountScreen.inputName(AccountingData.testParentAccountEditted);
    cy.getFirstItemInDropDownList("accountTypeId").then(($accountTypeId) => {
      cy.wrap($accountTypeId)
        .invoke("text")
        .then((typeTxt) => {
          cy.log("typeTxt::: " + typeTxt);
          cy.wrap(typeTxt).as("typeTxt");
        });
    });
    AddingAccountScreen.selectTags();
    AddingAccountScreen.checkActiveAccountActivation();
    AddingAccountScreen.clickSaveButton();
    cy.wait(2000);
    ChartOfAccounts.SearchAnTreeAccount(
      AccountingData.testParentAccountEditted
    );
    cy.get('div[class="description"]').last().scrollIntoView().click({ force: true });
    cy.wait(1000);
    cy.verifyPlaceholderText(2, AccountingData.testParentAccountEditted);
    cy.get("@natureTxt").then((natureTxt) => {
      cy.verifyPlaceholderText(5, getWrappedString(natureTxt));
    });
    cy.get("@sectionTxt").then((sectionTxt) => {
      cy.verifyPlaceholderText(6, getWrappedString(sectionTxt));
    });
    cy.get("@parentTxt").then((parentTxt) => {
      cy.verifyPlaceholderText(3, getWrappedString(parentTxt));
    });
    cy.get("@typeTxt").then((typeTxt) => {
      cy.verifyPlaceholderText(7, getWrappedString(typeTxt));
    });
  });

  it("4.Verify Adding new Detail Chart of Account", () => {
    ChartOfAccounts.landing();
    cy.wait(2000);
    AddingAccountScreen.clickAddNewButton();
    cy.wait(1500);
    cy.getFirstItemInDropDownList("natureId").then(($natureId) => {
      cy.wrap($natureId)
        .invoke("text")
        .then((natureTxt) => {
          cy.log("natureTxt natureTxt natureTxt::: " + natureTxt);
          cy.wrap(natureTxt).as("natureTxt");
        });
    });
    cy.getLastItemInDropDownList("accountSectionId").then(
      ($accountSectionId) => {
        cy.wrap($accountSectionId)
          .invoke("text")
          .then((sectionTxt) => {
            cy.log("sectionTxt::: " + sectionTxt);
            cy.wrap(sectionTxt).as("sectionTxt");
          });
      }
    );
    cy.clickInputtedSearchDropDownList(
      "parentId",
      AccountingData.testParentAccountAddedSearch
    ).then(($parentId) => {
      cy.wrap($parentId)
        .invoke("text")
        .then((parentTxt) => {
          cy.log("parentTxt::: " + parentTxt);
          cy.wrap(parentTxt).as("parentTxt");
        });
    });
    AddingAccountScreen.inputName(AccountingData.ChartOfAccountName);
    cy.getFirstItemInDropDownList("accountTypeId").then(($accountTypeId) => {
      cy.wrap($accountTypeId)
        .invoke("text")
        .then((typeTxt) => {
          cy.log("typeTxt::: " + typeTxt);
          cy.wrap(typeTxt).as("typeTxt");
        });
    });
    AddingAccountScreen.selectTags();
    AddingAccountScreen.checkActiveAccountActivation();
    AddingAccountScreen.clickIsDetail();
    AddingAccountScreen.checkOptionalCostCenterConfiguration();
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      AccountingData.currencySrch
    );
    AddingAccountScreen.clickSaveButton();
    cy.wait(2000);
    ChartOfAccounts.SearchAnTreeAccount(AccountingData.ChartOfAccountName);
    cy.get("span#label_tree.ng-star-inserted")
      .last()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);
    cy.verifyPlaceholderText(2, AccountingData.ChartOfAccountName);
    cy.get("@natureTxt").then((natureTxt) => {
      cy.verifyPlaceholderText(5, getWrappedString(natureTxt));
    });
    cy.get("@sectionTxt").then((sectionTxt) => {
      cy.verifyPlaceholderText(6, getWrappedString(sectionTxt));
    });
    cy.get("@parentTxt").then((parentTxt) => {
      cy.verifyPlaceholderText(3, getWrappedString(parentTxt));
    });
    cy.get("@typeTxt").then((typeTxt) => {
      cy.verifyPlaceholderText(7, getWrappedString(typeTxt));
    });
  });
});
