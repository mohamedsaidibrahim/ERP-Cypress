import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { InventoryData } from "../../../Inventory/data/inventory_data";
import { AccountingData } from "../../data/accounting_data";

export class JournalEntry {
  static addNewJournalEntry() {
    cy.contains("button", /create/i)
      .first()
      .scrollIntoView()
      .click();
  }
  static forceNavigate() {
    cy.visit(AccountingData.journalEntryLink);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("journalentry")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/accounting/i);
        NavigatesToSideModule.navigatesToTheModule(
          AccountingData.journalEntryLink,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(AccountingData.journalEntryLink, "journalentry");
  }
  static clickSaveButton() {
    cy.getByTestAttribute("save").last().scrollIntoView();
    cy.getByTestAttribute("save").last().click({ force: true });
  }
  static clickSaveDraftButton() {
    cy.getByTestAttribute("outline").last().scrollIntoView();
    cy.getByTestAttribute("outline").last().click({ force: true });
  }
  static clickcancelButton() {
    cy.getByTestAttribute("cancel").last().scrollIntoView();
    cy.getByTestAttribute("cancel").last().click({ force: true });
  }

  static clickEditButton() {
    cy.wait(750);
    cy.clickFirstEditActionButton();
  }
  static clickCustomEditButton(index: number) {
    cy.get('span[class="pi pi-pencil p-button-icon ng-star-inserted"]')
      .eq(index)
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  }
  static submitDataOnEditScreen() {
    cy.get('button[class="btn save').scrollIntoView();
    cy.get('button[class="btn save').click();
  }
  static postData() {
    cy.get('button[class="btn btn save"]').last().scrollIntoView();
    cy.get('button[class="btn btn save"]').last().click({ force: true });
    cy.get(".swal2-confirm").click();
  }
  static editCreditAmount(num: string) {
    cy.get(
      ':nth-child(2) > [peditablecolumnfield="creditAmount"] > .p-element'
    ).click();
    cy.get("input").last().clear();
    cy.get("input").last().type(num);
  }

  static clickSubmitButton() {
    cy.contains("button", /submit/i).scrollIntoView();
    cy.contains("button", /submit/i).should("be.visible");
    cy.contains("button", /submit/i).click();
  }
  static clickPostButton() {
    cy.contains("button", /post/i).scrollIntoView();
    cy.contains("button", /post/i).click();
  }
  // 1.Verify Walk Through
  static clickWalkTrough() {
    cy.get(".btn_walk").should("be.visible");
    cy.get(".btn_walk").click();
  }
  static verifyDisAppearingWalkthroughPopUps() {
    cy.get('div[class="guided-tour-spotlight-overlay"]').should("not.exist");
  }
  static clickNextWalkThroughStep() {
    cy.get(".next-button").click({ force: true });
  }
  static verifyTheFirstWalkThroughStep() {
    cy.get(".tour-title").should("be.visible");
    cy.get(".tour-title").should("include", /Step 1/i);
    cy.get(".tour-content").should("include", /Select Date/i);
    cy.get(".skip-button").should("be.visible");
    cy.get(".skip-button").should("be.enabled");
    cy.get(".skip-button").should("include", / skip/i);
    cy.get(".next-button").should("be.visible");
    cy.get(".next-button").should("be.enabled");
    cy.get(".next-button").should("include", /next   1\/4/i);
  }
  static verifySecondWalkThroughStep() {
    cy.get(".tour-title").should("be.visible");
    cy.get(".tour-title").should("include", /Step 2/i);
    cy.get(".tour-content").should("include", /Select Date/i);
    cy.get(".skip-button").should("be.visible");
    cy.get(".skip-button").should("be.enabled");
    cy.get(".skip-button").should("include", / skip/i);
    cy.get(".next-button").should("be.visible");
    cy.get(".next-button").should("be.enabled");
    cy.get(".next-button").should("include", /next   2\/4/i);
    cy.get(".guided-tour-spotlight-overlay").should("be.visible");
  }
  static verifyThirdWalkThroughStep() {
    cy.get(".tour-title").should("be.visible");
    cy.get(".tour-title").should("include", /Step 3/i);
    cy.get(".tour-content").should("be.visible");
    cy.get(".tour-content").should("include", "Add Journal Entry Description");
    cy.get(".guided-tour-spotlight-overlay").should("be.visible");
    cy.get(".skip-button").should("be.visible");
    cy.get(".skip-button").should("be.enabled");
    cy.get(".skip-button").should("include", /skip/i);
    cy.get(".next-button").should("be.visible");
    cy.get(".next-button").should("be.enabled");
    cy.get(".next-button").should("include", /next   3\/4/i);
  }
  static verifyFourthWalkThrough() {
    cy.zoomOut();
    cy.wait(1000);
    cy.get(".tour-title").should("be.visible");
    cy.get(".tour-title").should("include", /Step 4/i);
    cy.get(".tour-content").should("be.visible");
    cy.get(".tour-content").should(
      "include",
      /Add Journal Entry Description"/i
    );
    cy.get(".guided-tour-spotlight-overlay").should("be.visible");
    cy.get(".skip-button").should("be.visible");
    cy.get(".skip-button").should("be.enabled");
    cy.get(".skip-button").should("include", /skip/i);
    cy.get(".next-button").should("be.visible");
    cy.get(".next-button").should("be.enabled");
    cy.get(".next-button").should("include", /done/i);
    cy.wait(1000);
    cy.zoomIn();
  }
  static verifyWalkThroughStep(titleX: any, descX: any, stepNX: any) {
    cy.zoomOut();
    cy.wait(1000);
    cy.contains('div[class="tour-block"] h3', titleX).should("be.visible");
    cy.contains(
      'div[class="tour-block"] div[class="tour-content"]',
      descX
    ).should("be.visible");
    cy.get('div[class="tour-block"] button').first().should("include", /skip/i);
    cy.get('div[class="tour-block"] button').last().should("include", stepNX);
    cy.wait(1000);
    cy.zoomIn();
  }
  // 2.Verify that all components are displayed in Journal Entry Main Screen
  static verifyAccountingIsDisplayedOnHeader() {
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select'
    ).should("be.visible");
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select'
    ).should("be.enabled");
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select'
    ).should("include", /Accounting/i);
  }

  static verifySearchInputTextField() {
    cy.get('input[placeholder="Search"]').should("be.visible");
    cy.get('input[placeholder="Search"]').should("be.enabled");
    cy.get('input[placeholder="Search"]').should("not.be.checked");
  }

  static verifySaveButtonIsDisplayedOnBottom() {
    cy.getByTestAttribute("save").should("be.visible");
    cy.getByTestAttribute("save").should("be.enabled");
    cy.getByTestAttribute("save").should("include", /Save/i);
  }
  static clickJDSaveButton() {
    cy.getByTestAttribute("save").scrollIntoView().click();
  }
  static verifyAddTempleteOnTableBottom() {
    cy.get(".add_new").eq(1).should("be.visible");
    cy.get(".add_new").eq(1).should("be.enabled");
    cy.get(".add_new")
      .eq(1)
      .should("include", /Add Template/i);
  }
  static addHeaderReferenceNumber(index: number) {
    // Add Reference Number
    cy.get('input[placeholder="Reference Number"]').clear();
    cy.get('input[placeholder="Reference Number"]').type("11111" + index);
    cy.get('input[placeholder="Reference Number"]').click();
  }
  static verifyThePaginatorIsDisplayedOnTheBottom() {
    cy.get(".p-paginator").should("be.visible");
    cy.get(".p-paginator").should("include", /10/i);
    cy.get(".ng-untouched").should("be.visible");
    cy.get(".ng-untouched").should("include", /10/i);
  }
  static verifyTheColumnHeadersAreDisplayed() {
    cy.get("th").eq(0).should("be.visible");
    cy.get("th")
      .eq(0)
      .should("include", /Journal Code/i);
    cy.get("th").eq(1).should("be.visible");
    cy.get("th")
      .eq(1)
      .should("include", /Reference/i);
    cy.get("th").eq(2).should("be.visible");
    cy.get("th").eq(2).should("include", /Date/i);
    cy.zoomOut();
    cy.wait(1000);
    cy.get("th").eq(3).scrollIntoView();
    cy.get("th").eq(3).should("include", /Type/i);
    cy.get("th").eq(4).scrollIntoView();
    cy.get("th")
      .eq(4)
      .should("include", /Document Name/i);
    cy.get("th").eq(5).scrollIntoView();
    cy.get("th")
      .eq(5)
      .should("include", /Document Code/i);
    cy.get("th").eq(6).scrollIntoView();
    cy.get("th")
      .eq(6)
      .should("include", /Repeated/i);
    cy.get("th").eq(7).scrollIntoView();
    cy.get("th")
      .eq(7)
      .should("include", /Reversed/i);
    cy.get("th").eq(8).scrollIntoView();
    cy.get("th")
      .eq(8)
      .should("include", /Status/i);
    cy.get("th").eq(9).scrollIntoView();
    cy.get("th").eq(9).should("include", /Debit/i);
    cy.get("th").eq(10).scrollIntoView();
    cy.get("th")
      .eq(10)
      .should("include", /Credit/i);
    cy.get("th").eq(11).scrollIntoView();
    cy.get("th")
      .eq(11)
      .should("include", /Actions/i);
  }
  static verifyWalkThroughISDisplayedOnHeader() {
    cy.get(".btn_walk").should("be.visible");
    cy.get(".btn_walk").should("be.enabled");
    cy.get(".btn_walk").should("include", /walk through/i);
  }
  static verifyHeaderTitle(txt: string) {
    cy.get(".title").should("be.visible");
    cy.get(".title").should("include", txt);
  }
  static verifyReferenceNumberTextFieldOnHeader() {
    cy.getByTestAttribute("refrenceNumber").should("be.visible");
    cy.getByTestAttribute("refrenceNumber").should("be.enabled");
    cy.getByTestAttribute("refrenceNumber").should("not.be.checked");
  }

  static verifyDatePickerTextFieldOnHeader() {
    cy.get('input[role="combobox"]').first().should("be.visible");
    cy.get('input[role="combobox"]').first().should("be.enabled");
    cy.get('input[role="combobox"]').first().should("not.be.checked");
  }
  static verifyPeriodReadOnlyTextFieldOnHeader() {
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should("be.visible");
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should(
      "be.disabled"
    );
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should(
      "not.be.checked"
    );
  }
  static verifyAttachButton() {
    cy.get(".attach").should("be.visible");
    cy.get(".attach").should("be.enabled");
    cy.get(".attach").should("include", /Attach/i);
  }
  static verifyDescriptionTextFieldOnHeader() {
    cy.getByTestAttribute("description").should("be.visible");
    cy.getByTestAttribute("description").should("be.enabled");
    cy.getByTestAttribute("description").should("not.be.checked");
  }
  static inputHeaderDescriptionData(i: number) {
    // Add Header Description
    cy.get('input[placeholder="Description"]').clear();
    cy.get('input[placeholder="Description"]').type("header Description " + i);
  }

  static verifyAddNewLineOnBottom() {
    cy.contains("button", /add new line/i).scrollIntoView();
    cy.contains("button", /add new line/i).should("include", /Add New Line/i);
  }
  static verifyColumnHeadersAddNewScreen() {
    cy.get("thead tr th").eq(0).should("be.visible");
    cy.get("thead tr th").eq(0).should("include", /Id/i);
    cy.get("thead tr th").eq(1).should("be.visible");
    cy.get("thead tr th")
      .eq(1)
      .should("include", /Account Code/i);
    cy.get("thead tr th").eq(2).should("be.visible");
    cy.get("thead tr th")
      .eq(2)
      .should("include", /Account Name/i);
    cy.get("thead tr th").eq(3).should("be.visible");
    cy.get("thead tr th")
      .eq(3)
      .should("include", /Line Description/i);
    cy.get("thead tr th").eq(4).should("be.visible");
    cy.get("thead tr th")
      .eq(4)
      .should("include", /DB Amount/i);
    cy.get("thead tr th").eq(5).should("be.visible");
    cy.get("thead tr th")
      .eq(5)
      .should("include", /CR Amount/i);
    cy.get("thead tr th").eq(6).should("be.visible");
    cy.get("thead tr th")
      .eq(6)
      .should("include", /Currency/i);
    cy.get("thead tr th").eq(7).should("be.visible");
    cy.get("thead tr th").eq(7).should("include", /Rate/i);
    cy.get("thead tr th").eq(8).should("be.visible");
    cy.get("thead tr th")
      .eq(8)
      .should("include", /DB Amount Local/i);
    cy.get("thead tr th").should("be.visible");
    cy.get("thead tr th").should("include", /CR Amount Local/i);
  }
  static addNewLine() {
    cy.contains("button", /add new line/i).scrollIntoView();
    cy.contains("button", /add new line/i).should("be.visible");
    cy.contains("button", /add new line/i).click();
  }
  static addAcountCode(row: number, account: string) {
    cy.clickCellInATable(row, 1);
    cy.get("tbody")
      .find("tr")
      .eq(row)
      .find("td")
      .eq(1)
      .then(($vCell) => {
        cy.wrap($vCell).find("p-celleditor").click({ force: true });
        cy.clickInputtedSearchDropDownList("account", account);
      });
  }

  static inputDebit(row: number, amount: string) {
    cy.clickCellInATable(row, 4);
    cy.get("tbody")
      .find("tr")
      .eq(row)
      .find("td")
      .eq(4)
      .then(($vCell) => {
        cy.wrap($vCell).find("p-celleditor").click({ force: true });
        cy.wrap($vCell).find("input").clear().type(amount);
      });
  }

  static inputCredit(row: number, amount: string) {
    cy.clickCellInATable(row, 5);
    cy.get("tbody")
      .find("tr")
      .eq(row)
      .find("td")
      .eq(5)
      .then(($vCell) => {
        cy.wrap($vCell).find("p-celleditor").click({ force: true });
        cy.wrap($vCell)
          .find("input")
          .clear()
          .type(AccountingData.corCreditAmount.toString());
      });
  }

  static verifyAddingNewLineId() {
    cy.get(" tbody  .ng-untouched > :nth-child(1)").should("be.visible");
  }
  static verifyVisibilityOfAddingJDScreen() {
    cy.contains("button", /add new line/i).scrollIntoView();
    cy.contains("button", /add new line/i).should("be.visible");
  }
  static verifyDisappearingOfAddingJDScreen() {
    cy.contains("button", /add new line/i).should("not.exist");
  }
  static selectAnAccountFromDropDownList() {
    cy.get("[peditablecolumnfield=\"fg.controls['account']\"]").click();
    cy.get(".p-dropdown-label").click();
    cy.getLastItemInDropDownList("account");
  }
  static inputLineDescription(row:number,txt: string) {
    cy.clickCellInATable(row,3);
    cy.get('[peditablecolumnfield="lineDescription"]').click();
    cy.get("input").last().clear();
    cy.get("input").last().type(txt);
  }
  static inputDebitAmount() {
    cy.get('[peditablecolumnfield="debitAmount"]').click();
    cy.get("input").last().clear();
    cy.get("input").last().type("11");
  }
  static inputCreditAmount() {
    cy.get('[peditablecolumnfield="creditAmount"]').click();
    cy.get("input").last().clear();
  }

  static verifyLineIsDeletedSuccessfully() {
    cy.get("[peditablecolumnfield=\"fg.controls['account']\"]").should(
      "not.exist"
    );
  }
  static clickAddNewTemplate() {
    cy.get(".add_new").eq(1).click();
  }
  static verifyNewTemplateDialog() {
    cy.get(".p-dialog-header").should("be.visible"); // Ensure dialog header is visible
    // Scroll to the dialog to ensure elements inside are visible
    cy.get('div[role="dialog"]').scrollIntoView();
    cy.zoomOut();
    cy.get('div[role="dialog"]').should("be.visible");
    cy.get('div[role="dialog"]').then(($dialog) => {
      // Verify Column Headers
      cy.wrap($dialog).find("thead tr th").eq(0).should("be.visible");
      cy.wrap($dialog)
        .find("thead tr th")
        .eq(0)
        .should("include", /Select/i);
      cy.wrap($dialog).find("thead tr th").eq(1).should("be.visible");
      cy.wrap($dialog).find("thead tr th").eq(1).should("include", /Code/i);
      cy.wrap($dialog).find("thead tr th").eq(2).should("be.visible");
      cy.wrap($dialog)
        .find("thead tr th")
        .eq(2)
        .should("include", /Period Name/i);
      cy.wrap($dialog).find("thead tr th").eq(3).scrollIntoView();
      cy.wrap($dialog).find("thead tr th").eq(3).should("include", /Type/i);
      cy.wrap($dialog).find("thead tr th").eq(4).scrollIntoView();
      cy.wrap($dialog)
        .find("thead tr th")
        .eq(4)
        .should("include", /Total Debit Amount/i);
      cy.wrap($dialog).find("thead tr th").eq(5).scrollIntoView();
      cy.wrap($dialog)
        .find("thead tr th")
        .eq(5)
        .should("include", /Total Credit Amount/i);
    });
  }

  static verifyIsRequiedMessage(num: number) {
    if (num == 0) {
      cy.get('span[class="errorMessage ng-star-inserted"]').should("not.exist");
    } else {
      cy.get('span[class="errorMessage ng-star-inserted"]').should(
        "have.length",
        num
      );
    }
  }
  static verifyNumberOfRowsInTable(num: number) {
    if (num == 0) {
      cy.get("tbody").find("tr").should("not.exist");
    } else {
      cy.get("tbody").find("tr").should("have.length", num);
    }
  }
  static clickCloseIcon() {
    cy.get(".p-dialog-header-close-icon").click({ force: true });
  }
  static clickDeleteLine(rowIndex: number) {
    cy.get("tbody")
      .find("tr")
      .eq(rowIndex)
      .find("td")
      .last()
      .find("img")
      .click();
  }
  static clickCostCenterImg(rowIndex: number) {
    cy.get("tbody")
      .find("tr")
      .eq(rowIndex)
      .find("td")
      .eq(10)
      .find("img")
      .click();
  }
  static inputFirstLineData(num: string) {
    cy.get("[peditablecolumnfield=\"fg.controls['account']\"]").click();
    cy.get(".p-dropdown-label").click();
    cy.get('li span[class="ng-star-inserted"]').eq(1).click();
    cy.get('td[peditablecolumnfield="lineDescription"]').click();
    cy.get("td p-celleditor lib-text-input input").clear();
    cy.get("td p-celleditor lib-text-input input").type(
      "First Line Description " + 2 + num
    );
    cy.get('[peditablecolumnfield="debitAmount"]').click();
    cy.get('td p-celleditor lib-text-input input[type="number"]').clear();
    cy.get('td p-celleditor lib-text-input input[type="number"]').type(num);
  }
  static inputNewLineData(index: number, num: number, accountType: string) {
    cy.get(
      ".ng-pristine > [peditablecolumnfield=\"fg.controls['account']\"]"
    ).click();
    cy.get(".ng-pristine.ng-star-inserted > :nth-child(3)").click();
    cy.get(
      ".ng-pristine > [peditablecolumnfield=\"fg.controls['account']\"]"
    ).click();
    cy.get("span[role='combobox']").click();
    cy.get('li span[class="ng-star-inserted"]').eq(index).click();
    cy.get('.ng-invalid > [peditablecolumnfield="lineDescription"]').click();
    cy.get("input").last().clear();
    cy.get("input")
      .last()
      .type("Line Description " + index + num);
    cy.get(
      ".ng-invalid.ng-dirty > [peditablecolumnfield=" + accountType + "Amount]"
    ).click();
    cy.get("input").last().clear();
    cy.get("input").last().type(num.toString());
  }
  static verifyEmptyCostCenter() {
    cy.get("span[role='combobox']").click();
    cy.get(".p-dropdown-empty-message").should("be.visible");
    cy.get(".p-dropdown-empty-message").should(
      "have.class",
      "p-dropdown-empty-message"
    );
    cy.get(".p-dropdown-empty-message").should(
      "have.class",
      "p-dropdown-empty-message"
    );
    cy.get(".p-dropdown-empty-message").should("include", " No results found ");
    cy.get(".justify-content-between > div.ng-star-inserted").should(
      "be.visible"
    );
    cy.get(".p-dialog-header-close-icon > path").should("be.visible");
    cy.get(".p-dialog-header-close-icon").click();
  }
  // static chooseCostCenter() {
  //   cy.wait(500);
  //   cy.getLastItemInDropDownList("costCenterId");
  // }
  static addCostCenterPercentage(valu: string) {
    cy.get('div[role="dialog"]')
      .find('[data-testid="percentage"]')
      .last()
      .clear()
      .type(valu);
  }
  static addCostCenterNewLine() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/create/i)
      .scrollIntoView()
      .click();
  }
  static removeCostCenterNewLine() {
    cy.get('div[role="dialog"]')
      .find("tbody tr")
      .last()
      .find("td img")
      .scrollIntoView()
      .click();
  }
  static saveCostCenter() {
    cy.get('div[role="dialog"]')
      .find('[data-testid="save"]')
      .last()
      .scrollIntoView()
      .click();
  }
  static cancelSavingCostCenter() {
    cy.get('div[role="dialog"]')
      .find('[data-testid="cancel"]')
      .last()
      .scrollIntoView()
      .click({ force: true });
  }

  static clickSaveCostCenter() {
    cy.get('div[role="dialog"]')
      .find('[data-testid="save"]')
      .scrollIntoView()
      .click();
    cy.wait(500);
  }
  static addCostCenter(rowIndex: number) {
    this.clickCostCenterImg(rowIndex);
    cy.wait(500);
    cy.getFirstItemInDropDownList("costCenterId");
    this.addCostCenterPercentage("100");
    this.addCostCenterNewLine();
    this.removeCostCenterNewLine();
    this.clickSaveCostCenter();
  }

  static inputDateAdd(i: number) {
    // let y = 2024;
    // var day= getRandomNumber(1,29);
    // var month = getRandomNumber(2,11);
    cy.get('input[placeholder="Journal Date"]')
      .clear() // Clear the input field
      .type(`2021-01-09`, { force: true });
    // .type(`${y}-${month}-${day}`, { force: true });
  }

  static inputEditReferenceNumber(i: number) {
    cy.get('[data-testid="name"]')
      .eq(0)
      .invoke("removeAttr", "disabled") // Remove the disabled attribute if present
      .invoke("removeAttr", "readonly") // Remove the readonly attribute
      .clear()
      .type("5" + i);
  }
  static inputEditDescription(i: number) {
    cy.get('[data-testid="name"]')
      .eq(2)
      .invoke("removeAttr", "disabled") // Remove the disabled attribute if present
      .invoke("removeAttr", "readonly") // Remove the readonly attribute
      .clear()
      .type("Edited Desscription " + i);
  }
  static inputDateEdit() {
    let y = 2000 - 1;
    // cy.get('lib-form-group').then(($el)=>{
    // if($el.find('span[class="errorMessage ng-star-inserted"]').is(':visible')){
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    )
      .invoke("removeAttr", "disabled") // Remove the disabled attribute if present
      .invoke("removeAttr", "readonly") // Remove the readonly attribute
      .clear() // Clear the input field
      .type(`${y}-06-01`, { force: true });
  }
}
