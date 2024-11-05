import { FinanceData } from "../../data/finance_data";
import { PaymentIn } from "../../PaymentIN/pages/payment_in";
import { PaymentMethods } from "../pages/payment_methods";

describe("Payment Methods (Add)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.PaymentMethodsUrl);
  });
  it("1.Verify All components are displaying", () => {
    PaymentMethods.landing();
    cy.wait(1500);
    PaymentMethods.clickAddNewButton();
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
    cy.verifyLabelText("paymentPlace", /payment place/i);
    cy.verifyLabelText("paymentMethodType", /payment method type/i);
    cy.verifyLabelText("bankId", /related bank/i);
    cy.verifyLabelText("bankAccountId", /bank account/i);
    cy.verifyLabelText("currency", /currency/i);
    cy.verifyLabelText("commissionType", /commission type/i);
    cy.verifyLabelText("commissionValue", /commission value/i);
    cy.verifyLabelText("commissionAccountId", /commission account/i);
    cy.verifyLabelText("allowVAT", /allow vat/i);
  });

  it("2.Verify Submitting new Payment Methods (Bank) With Commisions has Method not (Check)", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.clickInputtedSearchDropDownList("paymentPlace", "bank");
    cy.wait(700);
    cy.clickInputtedSearchDropDownList("paymentMethodType", "span");
    cy.wait(700);
    cy.getLastItemInDropDownList("bankId");
    cy.wait(700);
    cy.getFirstItemInDropDownList("bankAccountId");
    cy.wait(700);
    cy.verifyDimmidInput("currency");
    cy.wait(1000);
    cy.getLastItemInDropDownList("commissionType");
    cy.wait(700);
    PaymentMethods.inputCommissionValue();
    cy.getFirstItemInDropDownList("commissionAccountId");
    cy.wait(700);
    PaymentMethods.clickSaveButton();
    // Assertion
    PaymentMethods.preAssertion();
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, FinanceData.FCname);
  });

  it("3.Verify Submitting new Payment Methods (Bank) With Commisions has Method (Transfer)", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.pBankMethod);
    cy.clickInputtedSearchDropDownList("paymentPlace", "bank");
    cy.wait(700);
    cy.clickInputtedSearchDropDownList("paymentMethodType", "ransfer");
    cy.wait(700);
    cy.getLastItemInDropDownList("bankId");
    PaymentIn.selectGlAccountCode();
    cy.wait(700);
    cy.verifyDimmidInput("currency");
    cy.wait(1000);
    cy.getLastItemInDropDownList("commissionType");
    cy.wait(700);
    PaymentMethods.inputCommissionValue();
    cy.getFirstItemInDropDownList("commissionAccountId");
    cy.wait(700);
    PaymentMethods.clickSaveButton();
    // Assertion
    PaymentMethods.preAssertion();
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, FinanceData.FCname);
  });

  it("4.Verify Submitting new Payment Methods (Bank) Without Commisions has Method (Check)", () => {
    PaymentMethods.landing();
    cy.wait(2000);
  

    
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.clickInputtedSearchDropDownList("paymentPlace", "bank");
    cy.wait(700);

    cy.clickInputtedSearchDropDownList("paymentMethodType", "check");
    cy.wait(700);

    cy.getLastItemInDropDownList("bankId");
    cy.wait(700);

    cy.getFirstItemInDropDownList("bankAccountId");
    cy.wait(700);

    cy.verifyDimmidInput("currency");
    PaymentMethods.clickSaveButton();
    // Assertion
    PaymentMethods.preAssertion();
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, FinanceData.FCname);
  });

  it("5.Verify Submitting new Payment Methods (Treasury) Without Commisions", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.pTreesuryMethod);
    cy.getFirstItemInDropDownList("paymentPlace");
    cy.getFirstItemInDropDownList("paymentMethodType");
    cy.verifyDimmidItemDropDownList("bankId");
    cy.verifyDimmidItemDropDownList("bankAccountId");
    cy.wait(1000);
    cy.verifyDimmidItemDropDownList("commissionType");
    cy.verifyDimmidItemDropDownList("commissionAccountId");
    PaymentMethods.clickSaveButton();
    PaymentMethods.preAssertion();
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, FinanceData.FCname);
  });
  it("6.Verify Submitting new Payment Methods (Treasury) Without Commisions", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.getFirstItemInDropDownList("paymentPlace");
    cy.getFirstItemInDropDownList("paymentMethodType");
    cy.verifyDimmidItemDropDownList("bankId");
    cy.wait(500);
    cy.verifyDimmidItemDropDownList("bankAccountId");
    PaymentMethods.clickSaveButton();
    PaymentMethods.preAssertion();
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(1, FinanceData.FCname);
  });
  it("7.Verify Required Validation (Bank) ", () => {
    PaymentMethods.landing();
    PaymentMethods.clickAddNewButton();
    PaymentMethods.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    cy.getLastItemInDropDownList("paymentPlace");
    cy.wait(700);

    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    cy.getLastItemInDropDownList("paymentMethodType");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    cy.getLastItemInDropDownList("bankId");
    cy.wait(700);

    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    cy.getLastItemInDropDownList("bankAccountId");
    cy.wait(700);

    cy.verifyNotExistanceTheRequiredValidation();
  });
  it("8.Verify Required Validation (Treasury) ", () => {
    PaymentMethods.landing();
    PaymentMethods.clickAddNewButton();
    PaymentMethods.clickSaveButton();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(3);
    // Choose Treasury
    cy.getFirstItemInDropDownList("paymentPlace");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(2);
    cy.getFirstItemInDropDownList("paymentMethodType");
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.verifyNotExistanceTheRequiredValidation();
  });
  it("9.Verify Action Cancel Button", () => {
    PaymentMethods.landing();
    cy.wait(2000);
    
    cy.getInitItemsCountInListView();
    PaymentMethods.clickAddNewButton();
    cy.getByTestAttribute("code").should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.FCname);
    cy.getFirstItemInDropDownList("paymentPlace");
    cy.getFirstItemInDropDownList("paymentMethodType");
    cy.verifyDimmidItemDropDownList("bankId");
    cy.verifyDimmidItemDropDownList("bankAccountId");
    PaymentMethods.clickcancelButton();
    PaymentMethods.preAssertion();
    cy.assertAfterItemEditedInListView();
  });
});
