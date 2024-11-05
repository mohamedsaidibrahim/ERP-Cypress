import { AccountingData } from "./../../../Accounting/data/accounting_data";
import { FinanceData } from "../../data/finance_data";
import { PaymentIn } from "../pages/payment_in";
import { getWrappedString } from "../../../../../../support/utils";
import { JournalEntry } from "../../../Accounting/journal_entry/pages/journal_entry";
/*
Pre Condition:
1. Valid Tax Definition
2. Valid PAyment Methods
3. Valid Cost Center
4. Valid Bank Definition
5. Valid Treasury Definition
*/

describe("Payment In (Add)", () => {
  
  beforeEach(() => {
    cy.visit(FinanceData.PaymentInUrl);
  });
  
  it("1.Verify Labels are Displayed", () => {
    PaymentIn.landing();
    cy.wait(1500);
    PaymentIn.clickAddNewButton();
    cy.wait(500);
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("PaymentInDate", /date/i);
    cy.verifyLabelText("description", /description/i);
    cy.verifyLabelText("paymentHub", /payment Hub/i);
    cy.verifyLabelText("paymentHubDetailId", /payment Hub Detail/i);
    cy.verifyLabelText("currency", /currency/i);
    cy.verifyLabelText("rate", /rate/i);
    cy.verifyLabelText("currentBalance", /current Balance/i);
    cy.verifyLabelText("totalReceivedAmount", /total Received Amount/i);
    cy.verifyLabelText("newBalance", /new Balance/i);
  });
  
  it("2.Verify All Column Headers are displaying", () => {
    PaymentIn.landing();
    cy.wait(1500);
    PaymentIn.clickAddNewButton();
    // Table  Column Headers
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
  
  it("3.Verify Submitting (Saving and Posting) new Payment In Treasury", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    PaymentIn.clickAddNewButton();
    cy.wait(5000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.FCname);
    PaymentIn.selectTreasuryHub();
    PaymentIn.selectPaymentHubDetailIdTxt();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    cy.verifyDimmidInput("newBalance");
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    PaymentIn.selectPaidBy();
    PaymentIn.selectPaidByDetailsId();
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    PaymentIn.inputNote();
    cy.wait(1000);
    PaymentIn.clickSaveButton();
    cy.wait(1000);
    PaymentIn.clickPostButton();
    cy.wait(1000);
    cy.assertnewItemAddedToListView();
  });
  
  it("4.Verify Submitting (Saving Only) new Payment In Treasury", () => {
    PaymentIn.landing();
    cy.wait(1500);
    PaymentIn.clickAddNewButton();
    cy.wait(5000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.FCname);
    PaymentIn.selectTreasuryHub();
    PaymentIn.selectPaymentHubDetailIdTxt();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    cy.verifyDimmidInput("newBalance");
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    PaymentIn.selectPaidBy();
    PaymentIn.selectPaidByDetailsId();
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    PaymentIn.inputNote();
    cy.wait(1000);
    PaymentIn.clickSaveButton();
    cy.wait(1000);
    PaymentIn.verifyDisplayingPostButton();
  });
  
  it("5.Verify POsting new Payment In Treasury", () => {
    PaymentIn.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();

    cy.clickFirstEditActionButton();
    cy.wait(3000);

    PaymentIn.clickPostButton();
    cy.wait(5000);
    
    cy.getFirstCellInTableValue(7).then((journalCode) => {
      cy.wrap(journalCode).as("journalCodeTxt");
    });
    cy.getFirstCellInTableValue(0).then((referenceNumber) => {
      cy.wrap(referenceNumber).as("referenceNumberTxt");
      cy.wrap(referenceNumber.toString().split("-")[0]).as("sourceCodeTxt");
    });
    cy.getFirstCellInTableValue(1).then((date) => {
      cy.wrap(date).as("dateTxt");
      var mon = date.split("/")[1];
      var year = date.split("/")[2];
      var journalPeriod = mon + "-" + year;
      cy.wrap(journalPeriod).as("journalPeriodTxt");
    });
    cy.getFirstCellInTableValue(1).then((date) => {
      cy.wrap(date).as("dateTxt");
    });
    // Assertion
    cy.visit(AccountingData.journalEntryLink);
    cy.wait(3000);

    cy.clickFirstEditActionButton();
    cy.get("@journalCodeTxt").then((journalCodeTxt) => {
      cy.verifyText("journalCode", getWrappedString(journalCodeTxt));
    });
    cy.verifyText("status", "Posted");
    cy.get("@referenceNumberTxt").then((referenceNumberTxt) => {
      cy.verifyText("referenceNumber", getWrappedString(referenceNumberTxt));
    });
    cy.verifyText("type", "Finance");
    cy.get("@sourceCodeTxt").then((sourceCodeTxt) => {
      cy.verifyText("sourceName", getWrappedString(sourceCodeTxt));
    });
    cy.verifyText("sourceCode", "PaymentIn");
    cy.verifyPlaceholderValueAttr("input-text", 0, "100.0");
    cy.verifyPlaceholderValueAttr("input-text", 1, "100.0");
    PaymentIn.verifyJLFirstTypeLine(
      1,
      1101001001,
      "100.0",
      "0.0",
      "Egyptian Pound",
      "100.0",
      "0.0"
    );

    PaymentIn.verifyJLFollowingTypeLine(
      2,
      1101001004,
      "0.0",
      "100.0",
      "Egyptian Pound",
      "0.0",
      "100.0"
    );
  });
  
  it("6. Verify that the Posted Payment Out can not be Editted (Treasury)", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(3000);
    cy.contains("button", /add new line/i).should("not.exist");
    cy.contains("button", /cancel/i).should("not.exist");
    cy.contains("button", /save/i).should("not.exist");
    cy.contains("button", /post/i).should("not.exist");
  });
  
  it("7.Verify Submitting (Save and Post) new Payment In Bank", () => {
    PaymentIn.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    PaymentIn.clickAddNewButton();
    cy.wait(3000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.FCname);
    PaymentIn.selectBankHub();
    PaymentIn.selectPaymentHubDetailIdTxt();
    PaymentIn.selectBankAccountId();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    cy.verifyDimmidInput("newBalance");
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    PaymentIn.inputPaymentMethodIdLineBank();
    PaymentIn.selectPaidBy();
    PaymentIn.selectPaidByDetailsId();
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    PaymentIn.inputNote();
    cy.wait(1000);
    PaymentIn.clickSaveButton();
    cy.wait(1000);
    PaymentIn.clickPostButton();
    // Assertion111111111111111
    cy.wait(1000);
    
    cy.assertnewItemAddedToListView();
  });
    
  it("8.Verify Submitting (Saving Only) new Payment In Bank", () => {
    PaymentIn.landing();
    cy.wait(1500);
    PaymentIn.clickAddNewButton();
    cy.wait(3000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.FCname);
    PaymentIn.selectBankHub();
    PaymentIn.selectPaymentHubDetailIdTxt();
    PaymentIn.selectBankAccountId();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    cy.verifyDimmidInput("newBalance");
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    PaymentIn.inputPaymentMethodIdLineBank();
    PaymentIn.selectPaidBy();
    PaymentIn.selectPaidByDetailsId();
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    PaymentIn.inputNote();
    cy.wait(1500);
    PaymentIn.clickSaveButton();
    PaymentIn.verifyDisplayingPostButton();
  });

  it("9.Verify POsting new Payment In Bank", () => {
    PaymentIn.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();

    cy.clickFirstEditActionButton();
    cy.wait(3000);

    PaymentIn.clickPostButton();
    cy.wait(5000);
    
    cy.getFirstCellInTableValue(7).then((journalCode) => {
      cy.wrap(journalCode).as("journalCodeTxt");
    });
    cy.getFirstCellInTableValue(0).then((referenceNumber) => {
      cy.wrap(referenceNumber).as("referenceNumberTxt");
      cy.log(
        "referenceNumberTxtreferenceNumberTxt referenceNumber 111::: " +
          referenceNumber
      );
      cy.wrap(referenceNumber.toString().split("-")[0]).as("sourceCodeTxt");
    });
    cy.getFirstCellInTableValue(1).then((date) => {
      cy.wrap(date).as("dateTxt");
      var mon = date.split("/")[1];
      var year = date.split("/")[2];
      var journalPeriod = mon + "-" + year;
      cy.wrap(journalPeriod).as("journalPeriodTxt");
    });
    cy.getFirstCellInTableValue(1).then((date) => {
      cy.wrap(date).as("dateTxt");
    });
    // Assertion
    cy.visit(AccountingData.journalEntryLink);
    JournalEntry.landing();
    cy.wait(3000);

    cy.clickFirstEditActionButton();
    cy.get("@journalCodeTxt").then((journalCodeTxt) => {
      cy.verifyText("journalCode", getWrappedString(journalCodeTxt));
    });
    cy.verifyText("status", "Posted");
    cy.get("@referenceNumberTxt").then((referenceNumberTxt) => {
      cy.verifyText("referenceNumber", getWrappedString(referenceNumberTxt));
    });
    cy.verifyText("type", "Finance");
    cy.get("@sourceCodeTxt").then((sourceCodeTxt) => {
      cy.verifyText("sourceName", getWrappedString(sourceCodeTxt));
    });
    cy.verifyText("sourceCode", "PaymentIn");
    cy.verifyPlaceholderValueAttr("input-text", 0, "110.3");
    cy.verifyPlaceholderValueAttr("input-text", 1, "110.3");

    PaymentIn.verifyJLFirstTypeLine(
      1,
      1101001001,
      "100.0",
      "0.0",
      "Egyptian Pound",
      "100.0",
      "0.0"
    );

    PaymentIn.verifyJLFollowingTypeLine(
      2,
      1101001002,
      "10.0",
      "0.0",
      "Egyptian Pound",
      "10.0",
      "0.0"
    );
    PaymentIn.verifyJLFollowingTypeLine(
      3,
      1101001001,
      "0.0",
      "10.0",
      "Egyptian Pound",
      "0.0",
      "10.0"
    );
    PaymentIn.verifyJLFollowingTypeLine(
      4,
      1101001003,
      "0.3",
      "0.0",
      "Egyptian Pound",
      "0.3",
      "0.0"
    );
    PaymentIn.verifyJLFollowingTypeLine(
      5,
      1101001001,
      "0.0",
      "0.3",
      "Egyptian Pound",
      "0.0",
      "0.3"
    );
    PaymentIn.verifyJLFollowingTypeLine(
      6,
      1101001004,
      "0.0",
      "100.0",
      "Egyptian Pound",
      "0.0",
      "100.0"
    );
    PaymentIn.verifyTfootTotalLine(110.3);
  });
  
  it("10. Verify that the Posted Payment Out can not be Editted (Bank)", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(3000);
    cy.contains("button", /add new line/i).should("not.exist");
    cy.contains("button", /cancel/i).should("not.exist");
    cy.contains("button", /save/i).should("not.exist");
    cy.contains("button", /post/i).should("not.exist");
  });

  it("11.Verify Required Validation of Treasury Hub", () => {
    PaymentIn.landing();
    PaymentIn.clickAddNewButton();
    PaymentIn.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(6);
    PaymentIn.selectTreasuryHub();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectPaymentHubDetailIdTxt();
    cy.verifyNotExistanceTheRequiredValidation();
    PaymentIn.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectPaidBy();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectPaidByDetailsId();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("12.Verify Displaying Validation of bank Hub", () => {
    PaymentIn.landing();
    PaymentIn.clickAddNewButton();
    PaymentIn.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(6);
    PaymentIn.selectBankHub();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentIn.selectPaymentHubDetailIdTxt();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectBankAccountId();
    cy.verifyNotExistanceTheRequiredValidation();
    PaymentIn.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(4);
    PaymentIn.inputAmountLine(FinanceData.pAmount);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentIn.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectPaidBy();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentIn.selectPaidByDetailsId();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    PaymentIn.selectGlAccountCode();
    PaymentIn.addCostCenter();
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
