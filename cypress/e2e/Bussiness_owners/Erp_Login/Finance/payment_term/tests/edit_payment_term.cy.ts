import { getWrappedNumber } from "../../../../../../support/utils";
import { FinanceData } from "../../data/finance_data";
import { PaymentTerm } from "../pages/payment_term";

describe("Edit Payment Term", () => {
  beforeEach(() => {
    cy.visit(FinanceData.paymentTermUrl);
  });
  it("1.Verify All Column Headers are Displaying", () => {
    PaymentTerm.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
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
    cy.clickFirstEditActionButton();
    PaymentTerm.verifyCode();
    PaymentTerm.clearName();
    cy.contains("span", /required/i).should("be.visible");
    PaymentTerm.setName(FinanceData.contactName);
    cy.contains("span", /required/i).should("not.exist");

    cy.getInitItemsCountInListView();
    cy.get("initCount").then((rowsCount) => {
      var lastIndex = getWrappedNumber(rowsCount);

      PaymentTerm.clearAfterValue(lastIndex);
      cy.contains("span", /required/i).should("be.visible");
      PaymentTerm.setAfterValue(lastIndex, 100);
      cy.contains("span", /required/i).should("not.exist");

      PaymentTerm.clearAfterValue(lastIndex);
      cy.contains("span", /required/i).should("be.visible");
      PaymentTerm.setAfterValue(lastIndex, FinanceData.afterValue);
      cy.contains("span", /required/i).should("not.exist");

      PaymentTerm.clearNote();
      cy.contains("span", /required/i).should("not.exist");
    });
  });

  it("3.Verify Editting Happy Scenario", () => {
    PaymentTerm.landing();
    cy.clickFirstEditActionButton();
    cy.getInitItemsCountInListView();
    PaymentTerm.setName(FinanceData.contactName);
    cy.get("initCount").then((rowsCount) => {
      var lastIndex = getWrappedNumber(rowsCount);
      cy.getLastCellInTableValue(0).then((prevDueTermValue) => {
        cy.log("---- prevDueTermValue ::::::: " + prevDueTermValue);
        var dueTermValue = getWrappedNumber(prevDueTermValue);
        cy.log("---- dueTermValue ********* " + dueTermValue);
        cy.get("table")
          .find("tbody tr")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.get("table")
          .find("tbody tr")
          .its("length")
          .then((lenC) => {
            PaymentTerm.setAfterValue(lastIndex, dueTermValue * 0.5);
            PaymentTerm.setAfterValue(lastIndex, FinanceData.afterValue);
            PaymentTerm.setAfterPeriod(lastIndex, lenC - 1);
            PaymentTerm.setNote(lastIndex, FinanceData.note);
          });
        PaymentTerm.clickAddNewLine();
        cy.get("table")
          .find("tbody tr")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.get("table")
          .find("tbody tr")
          .its("length")
          .then((lenC) => {
            PaymentTerm.setAfterValue(lastIndex + 1, dueTermValue * 0.5);
            PaymentTerm.setAfterValue(lastIndex + 1, FinanceData.afterValue);
            PaymentTerm.setAfterPeriod(lastIndex + 1, lenC - 1);
            PaymentTerm.setNote(lastIndex + 1, FinanceData.note);
          });
      });
    });

    PaymentTerm.clickSaveButton();
    // Assertion
    cy.wait(1000);
    cy.contains("button", /add new line/i).should("not.exist");
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);

    cy.assertnewItemAddedToListView();
  });

  it("4.Verify setting DueTermValue is smaller than 100", () => {
    PaymentTerm.landing();
    cy.clickFirstEditActionButton();
    PaymentTerm.setName(FinanceData.contactName);
    cy.get("table")
      .find("tbody tr")
      .last()
      .scrollIntoView()
      .should("be.visible");
    cy.getInitItemsCountInListView();
    cy.get("initCount").then((rowsCount) => {
      var lastIndex = getWrappedNumber(rowsCount);
      PaymentTerm.setAfterValue(lastIndex, 99);
    });
    PaymentTerm.clickSaveButton();
    cy.wait(1000);
    cy.contains("button", /add new line/i).should("be.visible");
  });
});
