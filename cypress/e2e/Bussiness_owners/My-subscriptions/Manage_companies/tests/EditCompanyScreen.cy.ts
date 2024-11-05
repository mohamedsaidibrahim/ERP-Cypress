import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { CompanyData } from "../data/company_data";
import { EditCompanyScreen } from "../pages/editCompanyScreenAct";
import { EditCompanyScreenVerify } from "../pages/editCompanyScreenVerify";

describe("Edit Company Screen", () => {
  beforeEach(
    'Verify that the system navigates to Company list when user clicks "Manage Companies" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
      EditCompanyScreen.clickLastManageCompanies();
    }
  );

  it("1. Verify That The User Can Navigate Between All Tabs", () => {
    cy.wait(1000);
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickContactTab();
    EditCompanyScreen.clickLegalTab();
    EditCompanyScreen.clickHierarchyTab();
    EditCompanyScreen.clickBranchesTab();
    EditCompanyScreen.clickAddressTab();
  });

  it("2. Verify  Editting Address Tab", () => {
    cy.wait(1000);
    // Click Edit Button
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1000);
    EditCompanyScreen.clickEditCompanyButton();
    // Choose Country
    EditCompanyScreen.selectCountry();
    // Input Latitude
    EditCompanyScreen.inputLatitude(CompanyData.cLatitude);
    // Input Langitude
    EditCompanyScreen.inputLangitude(CompanyData.cLongitude);
    // Input City
    EditCompanyScreen.inputCity(CompanyData.cCity);
    // Input Region
    EditCompanyScreen.inputRegion(CompanyData.cRegion);
    // Input Address
    EditCompanyScreen.inputAddress(CompanyData.address);
    // Add Currency
    cy.getLastItemInDropDownList("currencyId");
    // Submit
    EditCompanyScreen.clickSaveEditCompanyButton();
    // Check and close the Success POp up
    EditCompanyScreen.EdittingIsFinished();
  });

  it("3. Verify Editting Adress Tab is Successfully Saved", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1500);
    EditCompanyScreen.clickEditCompanyButton();
    EditCompanyScreenVerify.verifyCity(CompanyData.cCity);
    // Input Region
    EditCompanyScreenVerify.verifyRegion(CompanyData.cRegion);
    // Input Address
    EditCompanyScreenVerify.verifyAddress(CompanyData.address);
    // Input Latitude
    EditCompanyScreenVerify.verifyLatitude(CompanyData.cLatitude);
    // Input Langitude
    EditCompanyScreenVerify.verifyLangitude(CompanyData.cLongitude);
  });

  it("4. Verify  Editting Contact Tab", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1500);
    EditCompanyScreen.clickContactTab();
    EditCompanyScreen.clickEditCompanyButton();
    EditCompanyScreen.inputTelephon(CompanyData.cTelephone);
    EditCompanyScreen.inputCompnayName(CompanyData.companyName);
    EditCompanyScreen.inputCompnayEmail(CompanyData.cMail);
    EditCompanyScreen.inputCompanyAddress(CompanyData.cAddress);
    EditCompanyScreen.inputContactPersonal(CompanyData.cPerson);
    EditCompanyScreen.inputContactPersonalEmail(CompanyData.cPersonMail);
    EditCompanyScreen.selectCompanyPhoneNumberCode();
    EditCompanyScreen.selectContactNumberCode();
    EditCompanyScreen.inputTelephon(CompanyData.cTelephone);
    EditCompanyScreen.inputContactPersonalPosition(
      CompanyData.cContactPersonPosition
    );
    EditCompanyScreen.clickSaveEditCompanyButton();
    cy.wait(1000);
    EditCompanyScreen.EdittingIsFinished();
  });

  it("5. Verify Editting Contact Tab is Successfully Saved", () => {
    cy.wait(1500);
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1500);
    EditCompanyScreen.clickContactTab();
    EditCompanyScreen.clickEditCompanyButton();
    cy.wait(1500);
    EditCompanyScreenVerify.verifyTelephon(CompanyData.cTelephone);
    EditCompanyScreenVerify.verifyTelephon(CompanyData.cTelephone);
    EditCompanyScreenVerify.verifyCompnayEmail(CompanyData.cMail);
    EditCompanyScreenVerify.verifyCompanyAddress(CompanyData.cAddress);
    EditCompanyScreenVerify.verifyContactPersonal(CompanyData.cPerson);
    EditCompanyScreenVerify.verifyContactPersonalEmail(CompanyData.cPersonMail);
    EditCompanyScreenVerify.verifyCountryNumberCode();
    EditCompanyScreenVerify.verifyContactPersonalPosition(
      CompanyData.cContactPersonPosition
    );
  });

  it("6. Verify  Editting Legal Tab", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1500);
    EditCompanyScreen.clickLegalTab();
    EditCompanyScreen.clickEditCompanyButton();
    EditCompanyScreen.inputCompanyNameE(CompanyData.companyName);
    EditCompanyScreen.inputCompanyEmail(CompanyData.cMail);
    EditCompanyScreen.inputOrganizationUnit(CompanyData.OrganizationUnit);
    EditCompanyScreen.inputOrganization(CompanyData.Organization);
    EditCompanyScreen.inputTaxID(CompanyData.TaxID);
    EditCompanyScreen.inputCommercialID(CompanyData.CommercialID);
    EditCompanyScreen.inputRegisteredAddress(CompanyData.RegisteredAddress);
    EditCompanyScreen.inputBusinessCategory(CompanyData.BusinessCategory);
    EditCompanyScreen.inputStreetName(CompanyData.StreetName);
    EditCompanyScreen.inputCitySubdivisionName(CompanyData.CitySubdivisionName);
    EditCompanyScreen.inputCompanyAddCityName(CompanyData.CompanyAddCityName);
    EditCompanyScreen.inputPostalZone(CompanyData.PostalZone);
    EditCompanyScreen.inputCountrySubentity(CompanyData.CountrySubentity);
    EditCompanyScreen.inputBuildingNumber(CompanyData.BuildingNumber);
    EditCompanyScreen.inputAdditionalStreetName(
      CompanyData.AdditionalStreetName
    );
    EditCompanyScreen.inputRegistrationName(CompanyData.RegistrationName);
    EditCompanyScreen.clickSaveEditCompanyButton();
    EditCompanyScreen.EdittingIsFinished();
  });

  it("7. Verify Editting Legal Tab is Successfully Saved", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    cy.wait(1500);
    EditCompanyScreen.clickLegalTab();
    EditCompanyScreen.clickEditCompanyButton();
    EditCompanyScreenVerify.verifyCompanyNameE(CompanyData.companyName);
    EditCompanyScreenVerify.verifyCompanyEmail(CompanyData.cMail);
    EditCompanyScreenVerify.verifyOrganizationUnit(
      CompanyData.OrganizationUnit
    );
    EditCompanyScreenVerify.verifyOrganization(CompanyData.Organization);
    EditCompanyScreenVerify.verifyTaxID(CompanyData.TaxID);
    EditCompanyScreenVerify.verifyCommercialID(CompanyData.CommercialID);
    EditCompanyScreenVerify.verifyRegisteredAddress(
      CompanyData.RegisteredAddress
    );
    EditCompanyScreenVerify.verifyBusinessCategory(
      CompanyData.BusinessCategory
    );
    EditCompanyScreenVerify.verifyStreetName(CompanyData.StreetName);
    EditCompanyScreenVerify.verifyCitySubdivisionName(
      CompanyData.CitySubdivisionName
    );
    EditCompanyScreenVerify.verifyCompanyAddCityName(
      CompanyData.CompanyAddCityName
    );
    EditCompanyScreenVerify.verifyPostalZone(CompanyData.PostalZone);
    EditCompanyScreenVerify.verifyCountrySubentity(
      CompanyData.CountrySubentity
    );
    EditCompanyScreenVerify.verifyBuildingNumber(CompanyData.BuildingNumber);
    EditCompanyScreenVerify.verifyAdditionalStreetName(
      CompanyData.AdditionalStreetName
    );
    EditCompanyScreenVerify.verifyRegistrationName(
      CompanyData.RegistrationName
    );
  });

  it("8. Verify  Editting Hierarchy Tab", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickHierarchyTab();
    EditCompanyScreen.validateCompanyType("Holding");
  });

  it("9. Verify  Editting Branches Tab", () => {
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickBranchesTab();
    EditCompanyScreen.validateBranchesTab();
  });
});
