import { FinanceData } from "../../data/finance_data";

export class Sequence {
  static verifyLabels() {
    cy.contains("span", /Status/i);
    cy.verifyLabelText("status", /Allowed/i);
    cy.contains("span", /sequence apply on/i);
    cy.verifyLabelText("companyId", /company/i);
    cy.verifyLabelText("branchesIds", /branch /i);
    cy.verifyLabelText("module", /module/i);
    cy.verifyLabelText("screen", /screen/i);
    cy.contains("span", /sequence Type/i);
    cy.verifyLabelText("Yearly", /yearly/i);
    cy.verifyLabelText("Monthly", /Monthly/i);
    cy.verifyLabelText("Daily", /Daily/i);
    cy.verifyLabelText("Continuous", /Continuous/i);
    cy.contains("span", /example/i);
  }
  static verifyInitDimmedStatus() {
    cy.verifyDimmidItemDropDownList("companyId");
    cy.verifyDimmidItemDropDownList("module");
    cy.verifyDimmidItemDropDownList("screen");
  }
  static verifyDisplayingOfTheDefaultBranch() {
    // cy.getByTestAttribute("branchesIds").click();
    cy.get('span[class="p-multiselect-token-label"]')
    .scrollIntoView()
      .invoke("text")
      .should("exist");
  }
  static verifyTableHeaders() {
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/segment/i)
        .should("be.visible");
      cy.wrap(table).find("th").eq(2).contains(/Value/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/option/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/actions/i)
        .should("be.visible");
    });
  }
  static changeAllowedStatus() {
    cy.getByTestAttribute("input-switch").click();
  }
  static verifyDisplayingSerialNumberValidation() {
    cy.contains("div", /error/i).should("be.visible");
    cy.contains(
      "div",
      /Please enter the serial number to complete the process. Serial number/i
    ).should("be.visible");
  }
  static verifyNotExistanceSerialNumberValidation() {
    cy.contains("div", /error/i).should("not.exist");
    cy.contains(
      "div",
      /Please enter the serial number to complete the process. Serial number/i
    ).should("not.exist");
  }
  static verifyDisplayingOfSuccessMessagen() {
    cy.contains("div", /success/i).should("not.exist");
  }
  static verifySNOTExistanceerialNumberValidation() {
    cy.contains("div", /error/i).should("not.exist");
    cy.contains(
      "div",
      /Please enter the serial number to complete the process. Serial number/i
    ).should("not.exist");
  }
  static changeSequenceType(index: any) {
    cy.get('div[data-pc-section="input"]').eq(index).scrollIntoView().click();
  }
  static selectSegmentTypeDropDown(segmentSrch: string, row: number) {
    cy.clickCellInATable(row, 1);
    cy.clickInputtedSearchDropDownList("segment", segmentSrch);
  }

  static inputSegmentValue(segmentValue: string, row: number) {
    cy.clickCellInATable(row, 2);
    cy.inputText("detailValue", segmentValue);
  }
  static verifySegmentDefaultValue(segmentValue: string, row: number) {
    cy.clickCellInATable(row, 2);
    cy.get("tbody tr")
      .eq(row)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(segmentValue);
      });
  }
  static selectSegmentValueDropDown(segmentSrch: string, row: number) {
    cy.clickCellInATable(row, 2);
    cy.clickInputtedSearchDropDownList("detailValue", segmentSrch);
  }
  static addSequenceLineText(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("Text", index);
    this.inputSegmentValue(FinanceData.segmentText, index);
  }
  static addSequenceLineYear(index: number) {
    cy.clickAddNewLine();

    this.selectSegmentTypeDropDown("Year", index);
    this.verifySegmentDefaultValue("YYYY", index);
  }

  static addSequenceLineMonth(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("Month", index);
    this.verifySegmentDefaultValue("MM", index);
  }

  static addSequenceLineDay(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("Day", index);
    this.verifySegmentDefaultValue("DD", index);
  }

  static addSequenceLineSeparator(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("Separator", index);
    this.selectSegmentValueDropDown(FinanceData.segmentSeparator, index);
  }

  static addSequenceLineCompanyCode(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("CompanyCode", index);
  }

  static addSequenceLineBranchCode(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("BranchCode", index);
  }

  static addSequenceLineSerialNumber(index: number) {
    cy.clickAddNewLine();
    this.selectSegmentTypeDropDown("SerialNumber", index);
    this.inputSegmentValue(FinanceData.serialNumber, index);
  }
}
