import { SalesData } from "../../data/sales_data";
import { CustomerDefinition } from "../pages/customer_Definition";

describe("Customer Definition (Edit)", () => {
  beforeEach(() => {
    cy.visit(SalesData.CustomerDefinitionUrl);
  });
  it("1.Verify Editing Existing Customer Definition (All fields are filled)", () => {
    CustomerDefinition.landing();
    CustomerDefinition.prepare();
    cy.clickFirstEditActionButton();
    // Essential Header Data
    CustomerDefinition.setName(SalesData.cName);
    cy.wait(750);
    CustomerDefinition.setCustomerCategoryId();
    cy.wait(750);
    CustomerDefinition.setBirthDate();
    cy.wait(750);
    // Information Tab
    CustomerDefinition.setContactMobileCountryCode();
    CustomerDefinition.setContactMobile(SalesData.cContactMobil);
    CustomerDefinition.setContactPhone(SalesData.cContactPhone);
    CustomerDefinition.setContactFax(SalesData.cContactFax);
    CustomerDefinition.setContactEmail(SalesData.cContactEmail);
    CustomerDefinition.setContactWebsite(SalesData.cContactWebsite);
    CustomerDefinition.setContactPersonName(SalesData.cContactPersonName);
    CustomerDefinition.setContactPersonalMobileCountryCode();
    CustomerDefinition.setContactPersonMobile(SalesData.cContactPersonMobile);
    CustomerDefinition.setContactPersonPhone(SalesData.cContactPersonPhone);
    // Address Tab
    CustomerDefinition.switchToAddressTab();
    CustomerDefinition.setCountryId();
    cy.wait(500);
    CustomerDefinition.setState(SalesData.cState);
    CustomerDefinition.setCityId();
    cy.wait(500);
    CustomerDefinition.setStreet(SalesData.cStrat);
    CustomerDefinition.setLongitude(SalesData.cLongitude);
    CustomerDefinition.setLatitude(SalesData.cLatitude);
    CustomerDefinition.setRadius(SalesData.cRadius);
    //Legal
    CustomerDefinition.switchToLegalTab();
    CustomerDefinition.setCommercialId(SalesData.cCommercialId);
    CustomerDefinition.setTaxId(SalesData.cTaxId);
    // Financial
    CustomerDefinition.switchToFinancialTab();
    CustomerDefinition.setPaymentTermId();
    CustomerDefinition.setpricePolicyId();
    CustomerDefinition.setCreditLimit(SalesData.cCreditLimit);
    CustomerDefinition.setCurrencyId();
    // Accounting
    CustomerDefinition.switchToAccountingTab();
    CustomerDefinition.setReceivableAccountId();
    CustomerDefinition.setSalesAccountId();
    CustomerDefinition.setSalesReturnAccountId();
    CustomerDefinition.setDiscountAccountId();
    CustomerDefinition.clickSaveButton();
    cy.reload();
    cy.wait(1000);
    cy.clickContinueAs();
    cy.verifyFirstCellInTable(1, SalesData.cName);
    cy.verifyFirstCellInTable(3, SalesData.cContactEmail);
    cy.verifyFirstCellInTable(6, SalesData.cCreditLimit);
  });

  it("2.Verify Requird Validation", () => {
    CustomerDefinition.landing();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    cy.verifyNotExistanceTheRequiredValidation();
    CustomerDefinition.clearName();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    CustomerDefinition.setName(SalesData.cName);
    cy.verifyNotExistanceTheRequiredValidation();
  });

  it("3.Verify Labels", () => {
    CustomerDefinition.landing();
    cy.wait(1000);
    cy.clickFirstEditActionButton();
    // Information Tab
    cy.verifyLabelText("code", /Customer code/i);
    cy.verifyLabelText("name", /Customer name/i);
    cy.verifyLabelText("categoryId", /category/i);
    cy.verifyLabelText("tagIds", /Customer tag/i);
    cy.verifyLabelText("birthdate", /birth date/i);
    cy.verifyLabelText("contactMobileCode", /code/i);
    cy.verifyLabelText("contactMobile", /contact mobile/i);
    cy.verifyLabelText("contactPhone", /contact phone/i);
    cy.verifyLabelText("contactFax", /contact fax/i);
    cy.verifyLabelText("contactEmail", /contact email/i);
    cy.verifyLabelText("contactWebsite", /contact website/i);
    cy.verifyLabelText("contactPersonName", /contact person name/i);
    cy.verifyLabelText("contactPersonMobileCode", /code/i);
    cy.verifyLabelText("contactPersonMobile", /contact person mobile/i);
    cy.verifyLabelText("contactPersonPhone", /contact person phone/i);
    cy.verifyLabelText("contactEmail", /contact person email/i);
    // Address Tab
    CustomerDefinition.switchToAddressTab();
    cy.verifyLabelText("countryId", /country/i);
    cy.verifyLabelText("state", /state/i);
    cy.verifyLabelText("cityId", /city/i);
    cy.verifyLabelText("street", /street/i);
    cy.verifyLabelText("longitude", /longitude/i);
    cy.verifyLabelText("latitude", /latitude/i);
    cy.verifyLabelText("errorRadius", /error radius/i);
    //Legal
    CustomerDefinition.switchToLegalTab();
    cy.verifyLabelText("commercialId", /commercial id/i);
    cy.verifyLabelText("taxId", /tax id/i);
    // Financial
    CustomerDefinition.switchToFinancialTab();
    cy.verifyLabelText("paymentTermId", /payment term/i);
    cy.verifyLabelText("pricePolicyId", /price policy/i);
    cy.verifyLabelText("creditLimit", /credit limit/i);
    cy.verifyLabelText("currencyId", /currency/i);
    // Accounting
    CustomerDefinition.switchToAccountingTab();
    cy.verifyLabelText("receivableAccountId", /receivable account/i);
    cy.verifyLabelText("salesAccountId", /purchase account/i);
    cy.verifyLabelText("salesReturnAccountId", /purchase return account/i);
    cy.verifyLabelText("discountAccountId", /discount account/i);
  });
});
