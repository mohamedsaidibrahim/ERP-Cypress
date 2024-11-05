import { getRandomNumber } from "../../../../../../support/utils";
import { FinanceData } from "../../../Finance/data/finance_data";
import { InventoryData } from "../../../Inventory/data/inventory_data";
import { AccountingData } from "../../data/accounting_data";
import { JDEditScreen } from "../pages/edit_screeen";
import { JournalEntry } from "../pages/journal_entry";

describe("Journal Entry", () => {
  beforeEach("Navigating To The Journal Entry List", () => {
    cy.visit(AccountingData.journalEntryLink);
  });

  it("1.Verify Walk Through", () => {
    JournalEntry.landing();
    cy.wait(2000);
    JournalEntry.addNewJournalEntry();
    cy.wait(1000);
    JournalEntry.clickWalkTrough();
    JournalEntry.verifyWalkThroughStep(
      /Step 1/i,
      /Fill In Reference Number/i,
      /next   1\/4/i
    );
    JournalEntry.clickNextWalkThroughStep();
    JournalEntry.verifyWalkThroughStep(
      /Step 2/i,
      /Select Date/i,
      /next   2\/4/i
    );
    JournalEntry.clickNextWalkThroughStep();
    JournalEntry.verifyWalkThroughStep(
      /Step 3/i,
      /Add Journal Entry Description/i,
      /next   3\/4/i
    );
    JournalEntry.clickNextWalkThroughStep();
    JournalEntry.verifyWalkThroughStep(
      /Step 4/i,
      /Select To Add New Journal Entry/i,
      /done/i
    );
    JournalEntry.clickNextWalkThroughStep();
    JournalEntry.verifyDisAppearingWalkthroughPopUps();
  });

  it("2.Verify that all components are displayed in Journal Entry Main Screen", () => {
    JournalEntry.landing();
    cy.wait(1500);
    //  Verify that The Search Input Text field is displayed in Header
    JournalEntry.verifySearchInputTextField();
    //  Verify that the Column headers are displayed successfully
    JournalEntry.verifyTheColumnHeadersAreDisplayed();
  });

  it("3.Verify that all components are displayed in Add New Screen", () => {
    JournalEntry.landing();
    cy.wait(1500);
    // Click Add New Button
    JournalEntry.addNewJournalEntry();
    // Verify that 'walk through' is displayed in the Header
    JournalEntry.verifyWalkThroughISDisplayedOnHeader();
    // verify that the  Reference Number Text field is displayed in the Header
    JournalEntry.verifyReferenceNumberTextFieldOnHeader();
    // verify that the  Date Picker Text field is displayed in the Header
    JournalEntry.verifyDatePickerTextFieldOnHeader();
    // verify that the  Attach Button is displayed in the Header
    JournalEntry.verifyAttachButton();
    // verify that the  Description Text field is displayed in the Header
    JournalEntry.verifyDescriptionTextFieldOnHeader();
    // Verify That the Save Button is displayed in the bottom
    JournalEntry.verifySaveButtonIsDisplayedOnBottom();
    // Verify That the 'Add Template' is displayed in the bottom of the Table
    // Verify That the ' Add New Line ' is displayed in the bottom of the Table
    JournalEntry.verifyAddNewLineOnBottom();
    //  Verify That Column Headers are displayed successfully in the Table
    JournalEntry.verifyColumnHeadersAddNewScreen();
  });

  it("4.should filter the table based on search input in the first two columns", () => {
    JournalEntry.landing();
    cy.wait(1500);
    cy.verifySearchFunctionality();
  });

  it.skip("5.Verify Add New Template in Add New Screen", () => {
    JournalEntry.landing();
    cy.wait(1500);
    // Click Add New Button
    JournalEntry.addNewJournalEntry();
    //  Click Add New Templete
    JournalEntry.clickAddNewTemplate();
    cy.zoomOut();
    // Click Close Icon
    JournalEntry.clickCloseIcon();
    cy.reload();
    cy.wait(2000);
    cy.clickContinueAs();
    //  Click Add New Templete
    cy.zoomIn();
    JournalEntry.clickAddNewTemplate();
    JournalEntry.verifyNewTemplateDialog();
  });

  it("6.Verify The System Can Add Delete new Lines", () => {
    JournalEntry.landing();
    cy.wait(1500);
    JournalEntry.addNewJournalEntry();
    JournalEntry.clickSaveButton();
    cy.reload();
    cy.wait(1500);
    JournalEntry.verifyNumberOfRowsInTable(1);
    JournalEntry.addNewLine();
    JournalEntry.addAcountCode(0, InventoryData.pAccount);
    JournalEntry.addNewLine();
    JournalEntry.verifyNumberOfRowsInTable(2);
    JournalEntry.addAcountCode(1, InventoryData.sAccount);
    JournalEntry.addNewLine();
    JournalEntry.verifyNumberOfRowsInTable(3);
    JournalEntry.clickDeleteLine(0);
    JournalEntry.verifyNumberOfRowsInTable(2);
    JournalEntry.clickDeleteLine(0);
    JournalEntry.verifyNumberOfRowsInTable(1);
  });

  it("7.Verify canceling Balanced Journal Entry in Add New Screen", () => {
    var i = getRandomNumber(7, 77);
    JournalEntry.landing();
    cy.wait(1500);
    JournalEntry.addNewJournalEntry();
    JournalEntry.addHeaderReferenceNumber(i);
    JournalEntry.inputHeaderDescriptionData(i);
    cy.wait(1500);
    JournalEntry.addAcountCode(0, InventoryData.pAccount);
    // Debit
    JournalEntry.inputDebit(0, AccountingData.corDebitAmount.toString());
    JournalEntry.addNewLine();
    JournalEntry.addAcountCode(1, InventoryData.sAccount);
    // Credit
    JournalEntry.inputCredit(1, AccountingData.corCreditAmount.toString());
    JournalEntry.clickcancelButton();
    cy.url().should("not.include", "add");
  });

  it("8.Verify saving UnBalanced Journal Entry in Add New Screen The Account With cost center Mandatory or Optional", () => {
    var i = getRandomNumber(7, 77);
    JournalEntry.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    JournalEntry.addNewJournalEntry();
    cy.reload();
    JournalEntry.clickSaveButton();
    JournalEntry.addHeaderReferenceNumber(i);
    JournalEntry.inputHeaderDescriptionData(i);
    cy.wait(1500);
    JournalEntry.addAcountCode(0, InventoryData.pAccount);
    // Debit
    JournalEntry.inputDebit(0, AccountingData.corDebitAmount.toString());
    JournalEntry.addCostCenter(0);
    JournalEntry.addNewLine();
    JournalEntry.addAcountCode(1, InventoryData.sAccount);
    JournalEntry.inputCredit(1, AccountingData.corCreditAmount.toString());
    JournalEntry.addCostCenter(1);
    cy.wait(2000);
    JournalEntry.clickSaveButton();
    cy.wait(3000);
    cy.url().should("not.include", "add");
  });

  it("9.Verify That The System can not save the date if any required data is missing", () => {
    var i = getRandomNumber(8, 88);
    JournalEntry.landing();
    cy.wait(1500);
    JournalEntry.addNewJournalEntry();
    JournalEntry.clickSaveButton();
    JournalEntry.verifyIsRequiedMessage(5);
    cy.wait(1500);
    JournalEntry.addHeaderReferenceNumber(i);
    JournalEntry.verifyIsRequiedMessage(4);
    JournalEntry.inputHeaderDescriptionData(i);
    JournalEntry.verifyIsRequiedMessage(3);
    // Line Description
    JournalEntry.inputLineDescription(0, FinanceData.bankAddress);
    JournalEntry.verifyIsRequiedMessage(2);

    JournalEntry.inputDebit(0, AccountingData.corDebitAmount.toString());
    JournalEntry.verifyIsRequiedMessage(2);

    JournalEntry.addAcountCode(0, InventoryData.pAccount);
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("10.Verify canceling Changes in Journal Entry in Edit Screen", () => {
    JournalEntry.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    cy.zoomOut();
    JournalEntry.clickEditButton();
    cy.wait(1500);
    JDEditScreen.verifycancelButton();
    JournalEntry.clickcancelButton();
    JDEditScreen.verifycancelButtonDisAppearing();
  });

  it("11.Verify posting a Submitted balanced Journal Entry in Edit Screen", () => {
    JournalEntry.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    cy.zoomOut();
    JournalEntry.clickEditButton();
    cy.wait(1000);
    // Adding the Credit Amount of the First Line to The Debit Amount of Second Line
    JournalEntry.inputDebit(1, AccountingData.corDebitAmount.toString());
    JournalEntry.clickSaveButton();
    cy.wait(1000);
    JournalEntry.clickPostButton();
    JDEditScreen.verifyAfterPosting();
    JournalEntry.clickcancelButton();
    cy.wait(500);
  });

  it.skip(" 14.Verify posting a Submitted balanced Journal Entry in Edit Screen For Automation DB Seeding", () => {
    JournalEntry.landing();
    cy.increaseScreenItemsMaxCount(30);
    JournalEntry.clickEditButton();
    cy.wait(500);
    JournalEntry.clickSaveButton();
    cy.wait(500);
    JournalEntry.clickSubmitButton();
    cy.wait(1000);
    JournalEntry.clickPostButton();
    JDEditScreen.verifyAfterPosting();
    cy.wait(500);
    JournalEntry.clickcancelButton();
    cy.wait(500);
    cy.verifyCustomCellInTable(0, 9, /posted/i);
  });
});
