import { getWrappedString } from "../../../../../../support/utils";
import { AccountingData } from "../../../Accounting/data/accounting_data";
import { FinanceData } from "../../data/finance_data";
import { PaymentOUT } from "../pages/payment_out";
import { JournalEntry } from "../../../Accounting/journal_entry/pages/journal_entry";
/*
Pre Condition:
1. Valid Tax Definition
2. Valid PAyment Methods
3. Valid Cost Center
4. Valid Bank Definition
5. Valid Treasury Definition
*/

describe("Payment OUt (Add)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.PaymentOUTUrl);
  });
  it("1.Verify Labels are Displayed", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    PaymentOUT.clickAddNewButton();
    cy.wait(500);
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
    PaymentOUT.clickAddNewButton();
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

  it("3.Verify Submitting (Saving Then Posting) new Payment OUt Treasury", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    PaymentOUT.clickAddNewButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    // cy.inputFollowingToDate("PaymentOUTDate");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    PaymentOUT.selectTreasuryHub();
    cy.get("body").click();
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.get("body").click();
    cy.verifyDimmidInput("currency");
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
    cy.wait(1000);
    PaymentOUT.clickPostButton();
    // Assertion111111111111111
    cy.wait(1000);
    
    cy.assertnewItemAddedToListView();
  });

  it("4.Verify Submitting (Saving Only) new Payment OUt Treasury", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    PaymentOUT.clickAddNewButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    // cy.inputFollowingToDate("PaymentOUTDate");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    PaymentOUT.selectTreasuryHub();
    cy.get("body").click();
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.get("body").click();
    cy.verifyDimmidInput("currency");
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
    PaymentOUT.verifyDisplayingPostButton();
  });

  it("5.Verify POsting new Payment OUt Treasury", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    

    cy.clickFirstEditActionButton();
    cy.wait(2000);

    PaymentOUT.clickPostButton();
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
    cy.verifyText("sourceCode", "PaymentOut");
    cy.verifyPlaceholderValueAttr("input-text", 0, "100.0");
    cy.verifyPlaceholderValueAttr("input-text", 1, "100.0");
    PaymentOUT.verifyJLFirstTypeLine(
      1,
      1101001005,
      "0.0",
      "100.0",
      "Egyptian Pound",
      "0.0",
      "100.0"
    );

    PaymentOUT.verifyJLFollowingTypeLine(
      2,
      1101001004,
      "100.0",
      "0.0",
      "Egyptian Pound",
      "100.0",
      "0.0"
    );
  });

  it("6.Verify that the Posted Payment Out can not be Editted (Treasury)", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.contains("button", /add new line/i).should("not.exist");
    cy.contains("button", /cancel/i).should("not.exist");
    cy.contains("button", /save/i).should("not.exist");
    cy.contains("button", /post/i).should("not.exist");
  });

  it("7.Verify Submitting (Saving Then Posting) new Payment OUt Bank", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    PaymentOUT.clickAddNewButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    PaymentOUT.selectBankHub();
    cy.get("body").click();
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.get("body").click();
    PaymentOUT.selectBankAccountId();
    cy.get("body").click();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    PaymentOUT.clickAddNewLine();
    PaymentOUT.inputAmountLine(FinanceData.pAmount);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    PaymentOUT.inputPaymentMethodIdLineBank();
    PaymentOUT.selectPaidBy();
    PaymentOUT.selectPaidByDetailsId();
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    PaymentOUT.inputNote();
    cy.wait(1000);
    PaymentOUT.clickSaveButton();
    cy.wait(1000);
    PaymentOUT.clickPostButton();
    // Assertion111111111111111
    cy.wait(1000);
    
    cy.assertnewItemAddedToListView();
  });

  it("8.Verify Submitting (Saving Only) new Payment OUt Bank", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    PaymentOUT.clickAddNewButton();
    cy.wait(2000);
    cy.verifyDimmidInput("code");
    cy.getByTestAttribute("description").clear().type(FinanceData.desc);
    PaymentOUT.selectBankHub();
    cy.get("body").click();
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.get("body").click();
    PaymentOUT.selectBankAccountId();
    cy.get("body").click();
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidInput("input-text");
    PaymentOUT.clickAddNewLine();
    PaymentOUT.inputAmountLine(FinanceData.pAmount);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    PaymentOUT.inputPaymentMethodIdLineBank();
    PaymentOUT.selectPaidBy();
    PaymentOUT.selectPaidByDetailsId();
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    PaymentOUT.inputNote();
    cy.wait(1000);
    PaymentOUT.clickSaveButton();
    cy.wait(1000);
    PaymentOUT.verifyDisplayingPostButton();
  });

  it("9.Verify POsting new Payment In Bank", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    

    cy.clickFirstEditActionButton();
    cy.wait(2000);

    PaymentOUT.clickPostButton();
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
    cy.verifyText("sourceCode", "PaymentOut");
    cy.verifyPlaceholderValueAttr("input-text", 0, "110.3");
    cy.verifyPlaceholderValueAttr("input-text", 1, "110.3");

    PaymentOUT.verifyJLFirstTypeLine(
      1,
      1101001005,
      "0.0",
      "100.0",
      "Egyptian Pound",
      "0.0",
      "100.0"
    );

    PaymentOUT.verifyJLFollowingTypeLine(
      2,
      1101001002,
      "10.0",
      "0.0",
      "Egyptian Pound",
      "10.0",
      "0.0"
    );
    PaymentOUT.verifyJLFollowingTypeLine(
      3,
      1101001005,
      "0.0",
      "10.0",
      "Egyptian Pound",
      "0.0",
      "10.0"
    );
    PaymentOUT.verifyJLFollowingTypeLine(
      4,
      1101001003,
      "0.3",
      "0.0",
      "Egyptian Pound",
      "0.3",
      "0.0"
    );
    PaymentOUT.verifyJLFollowingTypeLine(
      5,
      1101001005,
      "0.0",
      "0.3",
      "Egyptian Pound",
      "0.0",
      "0.3"
    );
    PaymentOUT.verifyJLFollowingTypeLine(
      6,
      1101001004,
      "100.0",
      "0.0",
      "Egyptian Pound",
      "100.0",
      "0.0"
    );
    PaymentOUT.verifyTfootTotalLine(110.3);
  });

  it("10.Verify that the Posted Payment Out can not be Editted (Bank)", () => {
    PaymentOUT.landing();
    cy.wait(1500);
    cy.clickFirstEditActionButton();
    cy.wait(2000);
    cy.contains("button", /add new line/i).should("not.exist");
    cy.contains("button", /cancel/i).should("not.exist");
    cy.contains("button", /save/i).should("not.exist");
    cy.contains("button", /post/i).should("not.exist");
  });

  it("11.Verify Required Validation of Treasury Hub", () => {
    PaymentOUT.landing();
    PaymentOUT.clickAddNewButton();
    PaymentOUT.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(5);
    PaymentOUT.selectTreasuryHub();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.verifyNotExistanceTheRequiredValidation();
    PaymentOUT.clickAddNewLine();
    PaymentOUT.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentOUT.inputAmountLine(FinanceData.pAmount);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pTreesuryMethod);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectPaidBy();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectPaidByDetailsId();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("12.Verify Displaying Validation of bank Hub", () => {
    PaymentOUT.landing();
    PaymentOUT.clickAddNewButton();
    PaymentOUT.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(5);
    PaymentOUT.selectBankHub();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentOUT.selectPaymentHubDetailIdTxt();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectBankAccountId();
    cy.verifyNotExistanceTheRequiredValidation();
    PaymentOUT.clickAddNewLine();
    PaymentOUT.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentOUT.inputAmountLine(FinanceData.pAmount);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    PaymentOUT.choosePaymentMethodIdLine(FinanceData.pBankMethod);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectPaidBy();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    PaymentOUT.selectPaidByDetailsId();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    PaymentOUT.selectGlAccountCode();
    PaymentOUT.addCostCenter();
    cy.verifyNotExistanceTheRequiredValidation();
  });
});
