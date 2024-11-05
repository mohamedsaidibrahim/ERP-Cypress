import { CompanyData } from "../data/company_data";

export class EditCompanyScreenVerify {
  static clickCountryDropDown() {
    cy.get(".p-dropdown-label").click();
  }
  static selectCountry() {
    cy.get("#pn_id_10_56").click();
  }

  static verifyCity(str: string) {
    cy.getByTestAttribute("city").should("have.value", str);
  }
  static verifyRegion(str: string) {
    cy.getByTestAttribute("region").should("have.value", str);
  }
  static verifyAddress(str: string) {
    cy.getByTestAttribute("address").should("have.value", str);
  }
  static verifyLangitude(str: string) {
    cy.getByTestAttribute("longitude").should("have.value", str);
  }
  static verifyLatitude(str: string) {
    cy.getByTestAttribute("latitude").should("have.value", str);
  }

  static selectCountryCode() {
    cy.get('span[role="combobox"]').click();
    cy.get("li#pn_id_13_1").click();
    cy.get('span[role="combobox"]').click();
  }
  // static selectCompanyPhoneNumber() {
  //   cy.getFirstElementDropDownList('span[role="combobox"]', 0);
  // }
  // static verifyContactNumber() {
  //   cy.getFirstElementDropDownList('span[role="combobox"]', 1);
  // }
  static verifyTelephon(str: any) {
    cy.getByTestAttribute("mobileNumber").should("have.value", str);
  }
  static verifyCompnayName(str: string) {
    cy.getByTestAttribute("companyName").should("have.value", str);
  }
  static verifyCompnayEmail(str: string) {
    cy.getByTestAttribute("companyEmail").should("have.value", str);
  }

  static verifyCompanyAddress(str: string) {
    cy.getByTestAttribute("companyAddress").should("have.value", str);
  }

  static verifyContactPersonal(str: string) {
    cy.getByTestAttribute("contactPersonal").should("have.value", str);
  }
  static verifyContactPersonalPosition(str: string) {
    cy.getByTestAttribute("contactPersonalPosition").should("have.value", str);
  }
  static verifyContactPersonalEmail(str: string) {
    cy.getByTestAttribute("contactPersonalEmail").should("have.value", str);
  }

  static verifyContactPersonalMobileNumber(str: string) {
    cy.getByTestAttribute("contactPersonalMobileNumber").should(
      "have.value",
      str
    );
  }
  static verifyCountryNumberCode() {
    cy.contains(
      "span div span",
      CompanyData.companyPhoneNumber
    ).scrollIntoView();
    cy.contains("span div span", CompanyData.companyPhoneNumber).should(
      "be.visible"
    );
  }
  static verifyCompanyPhoneNumberCode() {
    cy.contains("span div span", CompanyData.companyPhoneNumber).should(
      "have.length",
      1
    );
  }
  static verifyContactNumberCode() {
    cy.contains("span div span", CompanyData.contactNumber).should(
      "have.length",
      1
    );
  }
  static verifyCompanyNameE(str: string) {
    cy.get('input[type="text"]').eq(0).should("have.value", str);
  }
  static verifyCompanyEmail(str: string) {
    cy.get('input[type="text"]').eq(1).should("have.value", str);
  }
  static verifyOrganizationUnit(str: string) {
    cy.get('input[type="text"]').eq(2).should("have.value", str);
  }
  static verifyOrganization(str: string) {
    cy.get('input[type="text"]').eq(3).should("have.value", str);
  }
  static verifyTaxID(str: string) {
    cy.get('input[type="text"]').eq(4).should("have.value", str);
  }
  static verifyCommercialID(str: string) {
    cy.get('input[type="text"]').eq(5).should("have.value", str);
  }
  static verifyRegisteredAddress(str: string) {
    cy.get('input[type="text"]').eq(6).should("have.value", str);
  }
  static verifyBusinessCategory(str: string) {
    cy.get('input[type="text"]').eq(7).should("have.value", str);
  }
  static verifyStreetName(str: string) {
    cy.get('input[type="text"]').eq(8).should("have.value", str);
  }
  static verifyCitySubdivisionName(str: string) {
    cy.get('input[type="text"]').eq(9).should("have.value", str);
  }
  static verifyCompanyAddCityName(str: string) {
    cy.get('input[type="text"]').eq(10).should("have.value", str);
  }
  static verifyPostalZone(str: string) {
    cy.get('input[type="text"]').eq(11).should("have.value", str);
  }
  static verifyCountrySubentity(str: string) {
    cy.get('input[type="text"]').eq(12).should("have.value", str);
  }
  static verifyBuildingNumber(str: string) {
    cy.get('input[type="text"]').eq(13).should("have.value", str);
  }
  static verifyAdditionalStreetName(str: string) {
    cy.get('input[type="text"]').eq(14).should("have.value", str);
  }
  static verifyRegistrationName(str: string) {
    cy.get('input[type="text"]').eq(15).should("have.value", str);
  }
  static validateCompanyType(str: string) {
    cy.get("label.form-label").should("contains", /company type/i);
    cy.get("div.view").contains(str).should("be.visible");
  }
}
