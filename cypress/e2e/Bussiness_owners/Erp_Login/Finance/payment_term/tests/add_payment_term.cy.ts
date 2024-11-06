import { FinanceData } from "../../data/finance_data";
import { PaymentTerm } from "../pages/payment_term";

describe("Add Payment Term", () => {
  beforeEach(() => {
    cy.visit(FinanceData.paymentTermUrl);
  });

  it("1.Verify All Column Headers are Displaying", () => {
    PaymentTerm.landing();
    cy.wait(2500);
    PaymentTerm.clickAddNewButton();
    cy.get("th")
      .eq(0)
      .should("include", /due term value/i);
    cy.get("th")
      .eq(1)
      .should("include", /after value/i);
    cy.get("th")
      .eq(2)
      .should("include", /after period/i);
    cy.get("th").eq(3).should("include", /note/i);
    cy.get("th")
      .eq(4)
      .should("include", /actions/i);
  });

  it("2.Verify The Required Validation", () => {
    PaymentTerm.landing();
    PaymentTerm.clickAddNewButton();
    PaymentTerm.verifyCode();
    PaymentTerm.setName(FinanceData.bankName);
    PaymentTerm.clearName();
    cy.contains("span", /required/i).should("be.visible");
    PaymentTerm.setName(FinanceData.bankName);
    cy.contains("span", /required/i).should("not.exist");

    PaymentTerm.setDueTermValue(0, FinanceData.wrongDueTerm);
    PaymentTerm.clearDueTermValue(0);
    cy.contains("span", /required/i).should("be.visible");
    PaymentTerm.setDueTermValue(0, FinanceData.wrongDueTerm);
    cy.contains("span", /required/i).should("not.exist");

    PaymentTerm.setAfterValue(0, FinanceData.afterValue);
    PaymentTerm.clearafterValue(0);
    cy.contains("span", /required/i).should("be.visible");
    PaymentTerm.setAfterValue(0, FinanceData.afterValue);
    cy.contains("span", /required/i).should("not.exist");

    PaymentTerm.clickSaveButton();
    cy.contains("span", /required/i).should("be.visible");
    PaymentTerm.setAfterPeriod(0,0);
    cy.contains("span", /required/i).should("not.exist");

    cy.log("Verify that the System Can not Submit Wrong Due Term");
    PaymentTerm.setDueTermValue(0, FinanceData.wrongDueTerm);
    PaymentTerm.clickSaveButton();
    cy.contains("div", /failure/i);
    cy.contains("div", /The total of Due Term Values must be exactly 100./i);
    cy.wait(2500);
    cy.url().should("include", "add");
    PaymentTerm.setDueTermValue(0, FinanceData.correctDueTerm);
    PaymentTerm.clickSaveButton();
    cy.url().should("not.include", "add");
  });

  it("3.Verify Adding Happy Scenario", () => {
    PaymentTerm.landing();
    cy.getInitItemsCountInListView();
    PaymentTerm.clickAddNewButton();
    PaymentTerm.setName(FinanceData.bankName);
    // The First Line
    PaymentTerm.setDueTermValue(0, 20);
    PaymentTerm.setAfterValue(0, FinanceData.afterValue);
    PaymentTerm.setAfterPeriod(0, 0);
    PaymentTerm.setNote(0, FinanceData.note);
    // The Second Line
    PaymentTerm.clickAddNewLine();
    PaymentTerm.setDueTermValue(1, 30);
    PaymentTerm.setAfterValue(1, FinanceData.afterValue);
    PaymentTerm.setAfterPeriod(1, 1);
    PaymentTerm.setNote(1, FinanceData.note);
    // The Third Line
    PaymentTerm.clickAddNewLine();
    cy.wait(500);
    cy.get("tbody tr").last().scrollIntoView().should("be.visible");
    PaymentTerm.setDueTermValue(2, 50);
    PaymentTerm.setAfterValue(2, FinanceData.afterValue);
    PaymentTerm.setAfterPeriod(2, 2);
    PaymentTerm.setNote(2, FinanceData.note);
    PaymentTerm.clickSaveButton();
    cy.wait(1000);
    cy.url().should("not.include", "add");
    cy.assertnewItemAddedToListView();
  });

  it("4.Verify setting DueTermValue is smaller than 100", () => {
    PaymentTerm.landing();
    PaymentTerm.clickAddNewButton();
    PaymentTerm.setName(FinanceData.bankName);
    // The First Line
    PaymentTerm.setDueTermValue(0, 99);
    PaymentTerm.setAfterValue(0, FinanceData.afterValue);
    PaymentTerm.setAfterPeriod(0, 0);
    PaymentTerm.setNote(0, FinanceData.note);
    PaymentTerm.clickSaveButton();
    cy.wait(1000);
    cy.contains("div",/failure/i);
    cy.contains("div",/The total of Due Term Values must be exactly 100/i);
    cy.contains("button", /add new line/i).should("be.visible");
  });
});
