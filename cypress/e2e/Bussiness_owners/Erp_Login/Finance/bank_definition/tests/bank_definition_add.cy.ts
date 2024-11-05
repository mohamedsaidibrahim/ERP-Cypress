import { FinanceData } from "../../data/finance_data";
import { BankDefinition } from "../pages/bank_definition";

describe("Bank Definition (Add)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.BankDefinitionUrl);
  });

  it("1.Verify All components are displaying", () => {
    BankDefinition.landing();
    cy.wait(3000);
    BankDefinition.clickAddNewButton();
    cy.zoomOut();
    cy.get("th")
      .eq(0)
      .contains(/account number/i)
      .should("be.visible");
    cy.get("th")
      .eq(1)
      .contains(/gl account code/i)
      .should("be.visible");
    cy.get("th")
      .eq(2)
      .contains(/gl account name/i)
      .should("be.visible");
    cy.get("th")
      .eq(3)
      .contains(/branch/i)
      .should("be.visible");
    cy.get("th").eq(4).contains(/iban/i).should("be.visible");
    cy.get("th")
      .eq(5)
      .contains(/currency/i)
      .should("be.visible");
    cy.get("th")
      .eq(6)
      .contains(/account opening balance/i)
      .should("be.visible");
    cy.get("th")
      .eq(7)
      .contains(/opening balance/i)
      .should("be.visible");
    cy.get("th")
      .eq(8)
      .contains(/actions/i)
      .should("be.visible");
  });

  it("2.Verify Submitting new Bank Definition", () => {
    BankDefinition.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    cy.reload();
    cy.wait(1000);
    BankDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.getByTestAttribute("shortName").clear().type(FinanceData.shortName);
    cy.getByTestAttribute("bankAddress").clear().type(FinanceData.bankAddress);
    cy.getByTestAttribute("contactName").clear().type(FinanceData.contactName);
    cy.getByTestAttribute("bankEmail").clear().type(FinanceData.bankEmail);
    cy.getByTestAttribute("phone").clear().type(FinanceData.phone);
    cy.getByTestAttribute("fax").clear().type(FinanceData.fax);
    BankDefinition.addAccountNumber();
    BankDefinition.addAccountCode();
    // BankDefinition.selectAllBranches();
    cy.getByTestAttribute("name").clear().type(FinanceData.bankName);
    BankDefinition.addIBN();
    // BankDefinition.addCurrency();
    BankDefinition.addOpeningBalance();
    // BankDefinition.selectUserPermission();
    cy.wait(1000);
    BankDefinition.clickSaveButton();
    // Assertion
    cy.wait(3000);

    cy.assertnewItemAddedToListView();
  });

  it("3.Verify Required Validation and The name Field is Required", () => {
    BankDefinition.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    BankDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear().type(FinanceData.bankName);
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear();
    cy.contains("span", /required/i).should("be.visible");
    BankDefinition.clickSaveButton();
    cy.get("span").should("include", /create/i);
    cy.getByTestAttribute("name").clear().type(FinanceData.bankName);
    BankDefinition.clickSaveButton();
    cy.wait(1500);
    cy.get("span").should("not.include", /create/i);
  });

  it("4.Verify Inputting Invalid Bank Email Address", () => {
    BankDefinition.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    BankDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.getByTestAttribute("name").clear().type(FinanceData.bankName);
    cy.getByTestAttribute("bankEmail").clear().type(FinanceData.bankAddress);
    cy.contains(
      "span",
      /invalid email address, the pattern should be :ABC@cba.com/i
    ).should("be.visible");
    cy.getByTestAttribute("bankEmail").clear().type(FinanceData.bankEmail);
    cy.contains(
      "span",
      /invalid email address, the pattern should be :ABC@cba.com/i
    ).should("not.exist");
  });

  it("5.Verify Inputting very Long Bank Short Name", () => {
    BankDefinition.landing();
    cy.wait(1000);
    cy.reload();
    cy.wait(1000);
    BankDefinition.clickAddNewButton();
    cy.wait(1000);
    cy.getByTestAttribute("name").clear().type(FinanceData.bankName);
    cy.getByTestAttribute("shortName").clear().type(FinanceData.bankName);
    cy.contains(
      "span",
      /the minimum length must be 0, and the maximum length must be 5/i
    ).should("be.visible");
    cy.getByTestAttribute("shortName").clear().type(FinanceData.shortName);
    cy.contains(
      "span",
      /the minimum length must be 0, and the maximum length must be 5/i
    ).should("not.exist");
  });
});
