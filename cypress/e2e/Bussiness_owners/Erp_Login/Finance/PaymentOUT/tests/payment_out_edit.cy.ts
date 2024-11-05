import { FinanceData } from "../../data/finance_data";
import { PaymentOUT } from "../pages/payment_out";
import {
  getWrappedString,
  removeSpacesBetween,
} from "../../../../../../support/utils";
describe("Payment In (Edit)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.PaymentOUTUrl);
  });
  
  it("1.Verify Labels are Displayed", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("paymentOutDate", /date/i);
    cy.verifyLabelText("description", /description/i);
    cy.verifyLabelText("paymentHub", /payment Hub/i);
    cy.verifyLabelText("paymentHubDetailId", /payment Hub Detail/i);
    cy.verifyLabelText("currency", /currency/i);
    cy.verifyLabelText("rate", /rate/i);
    cy.verifyLabelText("currentBalance", /current Balance/i);
    cy.verifyLabelText("totalPaidAmount", /total paid Amount/i);
    cy.verifyLabelText("newBalance", /new Balance/i);
  });

  it("2.Verify All Column Headers are displaying", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.get("th")
      .eq(0)
      .contains(/amount/i)
      .should("be.visible");
    cy.get("th")
      .eq(1)
      .contains(/local amount/i)
      .should("be.visible");
    cy.get("th")
      .eq(2)
      .contains(/payment method/i)
      .should("be.visible");
    cy.get("th")
      .eq(3)
      .contains(/payment method details/i)
      .should("be.visible");
    cy.get("th")
      .eq(4)
      .contains(/paid by/i)
      .should("be.visible");
    cy.get("th")
      .eq(5)
      .contains(/paid by details/i)
      .should("be.visible");
    cy.get("th")
      .eq(6)
      .contains(/linked gl account/i)
      .should("be.visible");
    cy.get("th")
      .eq(7)
      .contains(/cost center/i)
      .should("be.visible");
    cy.get("th").eq(8).contains(/notes/i).should("be.visible");
    cy.get("th")
      .eq(9)
      .contains(/actions/i)
      .should("be.visible");
  });

  it("3.Verify Submitting new Payment OUt Treasury", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    PaymentOUT.clickAddNewButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    // cy.inputFollowingToDate("paymentOutDate");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    PaymentOUT.selectTreasuryHub();
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.verifyDimmidInput("currency");
    // cy.getByTestAttribute("rate").clear().type(FinanceData.pRate);
    cy.verifyDimmidInput("input-text");
    // cy.verifyDimmidInput("newBalance");
    PaymentOUT.clickAddNewLine();
    PaymentOUT.inputAmountLine(FinanceData.pAmount);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    PaymentOUT.selectPaidBy();
    PaymentOUT.selectPaidByDetailsId();
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    PaymentOUT.inputNote();
    cy.wait(1000);
    PaymentOUT.clickSaveButton();
    // Assertion111111111111111
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.assertnewItemAddedToListView();
  });

  it("4. Verify that the Payment Hub (Treasury) Drobdowns are dimmed", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.verifyDimmidItemDropDownList("paymentHub");
    cy.verifyDimmidItemDropDownList("paymentHubDetailId");
  });

  it("5. Verify that the Payment Hub (Bank) Drobdowns are dimmed", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.verifyDimmidItemDropDownList("paymentHub");
    cy.verifyDimmidItemDropDownList("paymentHubDetailId");
    cy.verifyDimmidItemDropDownList("bankAccountId");
  });

  it("6.Verify Editting new Payment OUt Treasury", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("code")
      .invoke("val")
      .then((codeVal) => {
        cy.wrap(codeVal).as("codeVal");
      });
    cy.inputFollowingToDate("paymentOutDate");
    // cy.inputFollowingToDate("paymentOutDate");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    cy.get(".p-dropdown-label")
      .eq(0)
      .invoke("text")
      .then((paymentHubTxt) => {
        cy.wrap(paymentHubTxt).as("paymentHubTxt");
      });
    cy.get(".p-dropdown-label")
      .eq(1)
      .invoke("text")
      .then((paymentHubDetailTxt) => {
        cy.wrap(paymentHubDetailTxt).as("paymentHubDetailTxt");
      });
    cy.verifyDimmidInput("currency");
    cy.getByTestAttribute("currency")
      .invoke("val")
      .then((currencyVal) => {
        cy.wrap(currencyVal).as("currencyVal");
      });
    cy.get("body").click();
    cy.getByTestAttribute("rate").clear().type(FinanceData.pRate.toString());
    cy.wrap((FinanceData.pRate * 200).toString()).as("localAmountTxt");
    cy.get(".p-calendar > .p-inputtext")
      .scrollIntoView()
      .invoke("val")
      .then((paymentOutDateVal) => {
        cy.wrap(paymentOutDateVal).as("paymentOutDateVal");
      });
    cy.verifyDimmidInput("input-text");
    // cy.verifyDimmidInput("newBalance");
    PaymentOUT.inputAmountLine(FinanceData.pAmountEditted);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    PaymentOUT.selectPaidBy();
    PaymentOUT.selectPaidByDetailsId();
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    PaymentOUT.inputNote();
    cy.wait(1000);
    PaymentOUT.clickSaveEditButton();
    // Assertion111111111111111
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.get("@codeVal").then((codeVal) => {
      cy.get('[data-testid="code"]').should(
        "have.value",
        getWrappedString(codeVal)
      );
    });
    // **************************************
    // cy.get("@paymentOutDateVal").then((paymentOutDateVal) => {
    //   cy.get(".p-calendar > .p-inputtext").should(
    //     "have.value",
    //     getWrappedString(paymentOutDateVal)
    //   );
    // });
    cy.get('[data-testid="description"]').should(
      "have.value",
      FinanceData.desc
    );
    cy.get("@paymentHubTxt").then((paymentHubTxt) => {
      cy.get(".p-dropdown-label")
        .eq(0)
        .should("have.text", getWrappedString(paymentHubTxt));
    });
    cy.get("@paymentHubDetailTxt").then((paymentHubDetailTxt) => {
      cy.get(".p-dropdown-label")
        .eq(1)
        .should("have.text", getWrappedString(paymentHubDetailTxt));
    });
    cy.get("@currencyVal").then((currencyVal) => {
      cy.get('[data-testid="currency"]')
        .invoke("val")
        .then((currencyFF) => {
          expect(removeSpacesBetween(currencyFF)).to.equal(
            removeSpacesBetween(getWrappedString(currencyVal))
          );
        });
    });
    // ******************************************************
    // cy.get('[data-testid="rate"]').should("have.value", FinanceData.pRate);
    cy.get('[peditablecolumnfield="amount"] > .p-element').should(
      "have.text",
      " " + FinanceData.pAmountEditted + " "
    );
    // ******************************************************
    // cy.get("@localAmountTxt").then((localAmountTxt) => {
    //   cy.get(".p-datatable-tbody > .ng-untouched > :nth-child(2)").should(
    //     "include",
    //     getWrappedString(localAmountTxt)
    //   );
    // });

    cy.get('[peditablecolumnfield="paymentMethodId"] > .p-element')
      .invoke("text")
      .then((paymentMethodFFFTxt: any) => {
        cy.get("@paymentMethodIdTxt").then((paymentMethodIdTxt) => {
          expect(paymentMethodFFFTxt).to.contain(
            getWrappedString(paymentMethodIdTxt)
          );
        });
      });
    cy.get('[peditablecolumnfield="paidBy"] > .p-element').should(
      "have.text",
      " Other "
    );
    cy.get('[peditablecolumnfield="paidByDetailsId"] > .p-element').should(
      "have.text",
      " GL account "
    );
    cy.get('[peditablecolumnfield="glAccountId"] > .p-element')
      .invoke("text")
      .then((accountFF) => {
        cy.get("@glAccountIdTxt").then((glAccountIdTxt) => {
          expect(getWrappedString(glAccountIdTxt)).to.contains(
            removeSpacesBetween(accountFF)
          );
        });
      });
    // **************************************
    // cy.get('[peditablecolumnfield="notes"] > .p-element').should(
    //   "include",
    //   FinanceData.note
    // );
  });
});
