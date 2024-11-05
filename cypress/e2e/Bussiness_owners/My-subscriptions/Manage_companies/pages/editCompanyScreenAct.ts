import { BranchesManagmentData } from "../../manage_branches/data/branches_managment__data";
import { CompanyData } from "../data/company_data";

export class EditCompanyScreen {
  static EdittingIsFinished() {
    cy.contains("button", /edit/i).should("be.visible");
  }
  static closeTheDialog() {
    cy.get(BranchesManagmentData.deleteActionButton).click();
  }
  static clickSaveEditCompanyButton() {
    cy.contains("button", /save/i).scrollIntoView().click({ force: true });
  }
  static clickLastManageCompanies() {
    cy.get('button[class="mange body_b14 Companies"]').last().click();
    cy.url().should("include", "company");
    cy.get(".p-breadcrumb").should("include", /company list/i);
  }

  static clickPageBody() {
    cy.get("div.grid").eq(0).click();
  }

  static clickFirstCompanyToEdit() {
    cy.get('p-button[icon="pi pi-pencil"]').first().click({ force: true });
  }
  static clickEditCompanyButton() {
    cy.contains("button", /edit/i).scrollIntoView().click({ force: true });
  }
  static clickAddressTab() {
    cy.get("#addres > a").click();
    cy.get("label.form-label")
      .contains(/address/i)
      .should("be.visible");
    cy.get("label.form-label").should("have.length", 7);
  }
  static clickContactTab() {
    cy.get("#contact > a").click();
    cy.get("label.form-label")
      .contains(/contact/i)
      .should("be.visible");
    cy.get("label.form-label").should("have.length", 8);
  }
  static clickLegalTab() {
    cy.get("#legal > a").click();
    cy.get("label.form-label")
      .contains(/tax id/i)
      .should("be.visible");
    cy.get("label.form-label").should("have.length", 16);
  }
  static clickHierarchyTab() {
    cy.get("#hierarchy > a").click();
    cy.get("label.form-label")
      .contains(/company type/i)
      .should("be.visible");
    cy.get("label.form-label").should("have.length", 1);
  }
  static clickBranchesTab() {
    cy.get("#branches > a").click();
    cy.get("th")
      .contains(/branch name/i)
      .should("be.visible");
    cy.get("th").should("have.length", 9);
  }
  static validateBranchesTab() {
    cy.validateTableHeaders(
      CompanyData.branchesThSelector,
      CompanyData.branchHeadersList
    );
  }
  // static clickEditBtn() {
  //   cy.get(".save").contains(/edit/i).click();
  // }
  // static clickSaveBtn() {
  //   cy.get(".save").contains(/save/i).scrollIntoView();
  //   cy.get(".save").contains(/save/i).click();
  // }

  static selectCountry() {
    cy.selectCountryByIndex(0, "egy");
  }
  static inputCity(str: string) {
    cy.getByTestAttribute("city").clear().type(str);
  }
  static inputRegion(str: string) {
    cy.getByTestAttribute("region").clear().type(str);
  }
  static inputAddress(str: string) {
    cy.getByTestAttribute("address").clear().type(str);
  }
  static inputLangitude(str: string) {
    cy.getByTestAttribute("longitude").clear().type(str);
  }
  static inputLatitude(str: string) {
    cy.getByTestAttribute("latitude").clear().type(str);
  }

  static selectSecCountryCode() {
    cy.get('div[class="p-dropdown p-component p-inputwrapper"]')
      .eq(1)
      .scrollIntoView();
    cy.get('div[class="p-dropdown p-component p-inputwrapper"]')
      .eq(1)
      .click({ force: true });
    cy.contains("span", "+20").click({ force: true });
    cy.get('div[class="p-dropdown p-component p-inputwrapper"]')
      .eq(1)
      .click({ force: true });
    EditCompanyScreen.clickContactTab();
  }
  static selectCompanyPhoneNumberCode() {
    cy.selectCountryByIndex(0, CompanyData.companyPhoneNumber);
  }
  static selectContactNumberCode() {
    cy.selectCountryByIndex(1, CompanyData.contactNumber);
  }

  static inputTelephon(str: any) {
    cy.getByTestAttribute("mobileNumber").clear().type(str);
  }
  static inputCompnayName(str: string) {
    cy.getByTestAttribute("companyName").clear().type(str);
  }
  static inputCompnayEmail(str: string) {
    cy.getByTestAttribute("companyEmail").clear().type(str);
  }

  static inputCompanyAddress(str: string) {
    cy.getByTestAttribute("companyAddress").clear().type(str);
  }

  static inputContactPersonal(str: string) {
    cy.getByTestAttribute("contactPersonal").clear().type(str);
  }
  static inputContactPersonalPosition(str: string) {
    cy.getByTestAttribute("contactPersonalPosition").clear().type(str);
  }
  static inputContactPersonalEmail(str: string) {
    cy.getByTestAttribute("contactPersonalEmail").clear().type(str);
  }

  static inputContactPersonalMobileNumber(str: string) {
    cy.getByTestAttribute("contactPersonalMobileNumber").clear().type(str);
  }
  static inputCompanyNameE(str: string) {
    cy.get('input[type="text"]').eq(0).clear().type(str);
  }
  static inputCompanyEmail(str: string) {
    cy.get('input[type="text"]').eq(1).clear().type(str);
  }
  static inputOrganizationUnit(str: string) {
    cy.get('input[type="text"]').eq(2).clear().type(str);
  }
  static inputOrganization(str: string) {
    cy.get('input[type="text"]').eq(3).clear().type(str);
  }
  static inputTaxID(str: string) {
    cy.get('input[type="text"]').eq(4).clear().type(str);
  }
  static inputCommercialID(str: string) {
    cy.get('input[type="text"]').eq(5).clear().type(str);
  }
  static inputRegisteredAddress(str: string) {
    cy.get('input[type="text"]').eq(6).clear().type(str);
  }
  static inputBusinessCategory(str: string) {
    cy.get('input[type="text"]').eq(7).clear().type(str);
  }
  static inputStreetName(str: string) {
    cy.get('input[type="text"]').eq(8).clear().type(str);
  }
  static inputCitySubdivisionName(str: string) {
    cy.get('input[type="text"]').eq(9).clear().type(str);
  }
  static inputCompanyAddCityName(str: string) {
    cy.get('input[type="text"]').eq(10).clear().type(str);
  }
  static inputPostalZone(str: string) {
    cy.get('input[type="text"]').eq(11).clear().type(str);
  }
  static inputCountrySubentity(str: string) {
    cy.get('input[type="text"]').eq(12).clear().type(str);
  }
  static inputBuildingNumber(str: string) {
    cy.get('input[type="text"]').eq(13).clear().type(str);
  }
  static inputAdditionalStreetName(str: string) {
    cy.get('input[type="text"]').eq(14).clear().type(str);
  }
  static inputRegistrationName(str: string) {
    cy.get('input[type="text"]').eq(15).clear().type(str);
  }
  static validateCompanyType(str: string) {
    cy.get("label.form-label").should("contains", /company type/i);
    cy.get("div.view").contains(str).should("be.visible");
  }
}
