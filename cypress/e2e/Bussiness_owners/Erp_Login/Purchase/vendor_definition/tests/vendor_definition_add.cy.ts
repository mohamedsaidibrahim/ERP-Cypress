import { PurchaseData } from "../../data/purchase_data";
import { VendorDefinition } from "../pages/vendor_Definition";

describe("Vendor Definition (Add)", () => {
  beforeEach(() => {
    cy.visit(PurchaseData.VendorDefinitionUrl);
  });
  it("1.Verify Adding new Vendor Definition (All fields are filled)", () => {
    VendorDefinition.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();

    cy.clickAddNewButton();
    // Essential Header Data
    VendorDefinition.setName(PurchaseData.vName);
    cy.wait(750);
    VendorDefinition.setVendorCategoryId();
    cy.wait(750);
    VendorDefinition.setBirthDate();
    cy.wait(750);
    VendorDefinition.checkAllVendorTagIds();
    cy.wait(750);
    // VendorDefinition.uploadAttachment(PurchaseData.attachPath);
    // Information Tab
    VendorDefinition.setContactMobileCountryCode();
    VendorDefinition.setContactMobile(PurchaseData.vContactMobil);
    VendorDefinition.setContactPhone(PurchaseData.vContactPhone);
    VendorDefinition.setContactFax(PurchaseData.vContactFax);
    VendorDefinition.setContactEmail(PurchaseData.vContactEmail);
    VendorDefinition.setContactWebsite(PurchaseData.vContactWebsite);
    VendorDefinition.setContactPersonName(PurchaseData.vContactPersonName);
    VendorDefinition.setContactPersonalMobileCountryCode();
    VendorDefinition.setContactPersonMobile(PurchaseData.vContactPersonMobile);
    VendorDefinition.setContactPersonPhone(PurchaseData.vContactPersonPhone);
    VendorDefinition.setContactPersonEmail();
    // Address Tab
    VendorDefinition.switchToAddressTab();
    VendorDefinition.setCountryId();
    cy.wait(750);
    VendorDefinition.setState(PurchaseData.vState);
    VendorDefinition.setCityId();
    cy.wait(750);
    VendorDefinition.setStreet(PurchaseData.vStrat);
    VendorDefinition.setLongitude(PurchaseData.vLongitude);
    VendorDefinition.setLatitude(PurchaseData.vLatitude);
    VendorDefinition.setRadius(PurchaseData.vRadius);
    //Legal
    VendorDefinition.switchToLegalTab();
    VendorDefinition.setCommercialId(PurchaseData.vCommercialId);
    VendorDefinition.setTaxId(PurchaseData.vTaxId);
    // Financial
    VendorDefinition.switchToFinancialTab();
    VendorDefinition.setPaymentTermId();
    VendorDefinition.setPriceListId();
    VendorDefinition.setCreditLimit(PurchaseData.vCreditLimit);
    VendorDefinition.setCurrencyId();
    // Accounting
    VendorDefinition.switchToAccountingTab();
    VendorDefinition.setPayableAccountId();
    VendorDefinition.setPurchaseAccountId();
    VendorDefinition.setPurchaseReturnAccountId();
    VendorDefinition.setDiscountAccountId();

    VendorDefinition.clickSaveButton2();
    
    cy.assertnewItemAddedToListView();
  });

  it("2.Verify Requird Validation", () => {
    VendorDefinition.landing();
    cy.wait(1000);
    cy.clickAddNewButton();
    cy.get('div[class="error ng-star-inserted"]').should("not.exist");
    VendorDefinition.clickSaveButton2();
    cy.get('div[class="error ng-star-inserted"]').should("be.visible");
    VendorDefinition.setName(PurchaseData.vName);
    VendorDefinition.clearName();
    cy.get('div[class="error ng-star-inserted"]').should("be.visible");
    VendorDefinition.setName(PurchaseData.vName);
    cy.get('div[class="error ng-star-inserted"]').should("not.exist");
  });
  
  it("3.Verify Labels", () => {
    VendorDefinition.landing();
    cy.wait(1000);
    cy.clickAddNewButton();
    // Information Tab
    cy.verifyLabelText("code", /vendor code/i);
    cy.verifyLabelText("name", /vendor name/i);
    cy.verifyLabelText("vendorCategoryId", /category/i);
    cy.verifyLabelText("VendorTagIds", /vendor tag/i);
    cy.verifyLabelText("birthDate", /birth date/i);
    cy.verifyLabelText("ContactMobileCode", /code/i);
    cy.verifyLabelText("contactMobile", /contact mobile/i);
    cy.verifyLabelText("contactPhone", /contact phone/i);
    cy.verifyLabelText("contactFax", /contact fax/i);
    cy.verifyLabelText("contactEmail", /contact email/i);
    cy.verifyLabelText("contactWebsite", /contact website/i);
    cy.verifyLabelText("contactPersonName", /contact person name/i);
    cy.verifyLabelText("ContactPersonMobileCode", /code/i);
    cy.verifyLabelText("contactPersonMobile", /contact person mobile/i);
    cy.verifyLabelText("contactPersonPhone", /contact person phone/i);
    cy.verifyLabelText("contactPersonEmail", /contact person email/i);
    // Address Tab
    VendorDefinition.switchToAddressTab();
    cy.verifyLabelText("countryId", /country/i);
    cy.verifyLabelText("state", /state/i);
    cy.verifyLabelText("cityId", /city/i);
    cy.verifyLabelText("street", /street/i);
    cy.verifyLabelText("longitude", /longitude/i);
    cy.verifyLabelText("latitude", /latitude/i);
    cy.verifyLabelText("radius", /radius/i);
    //Legal
    VendorDefinition.switchToLegalTab();
    cy.verifyLabelText("commercialId", /commercial id/i);
    cy.verifyLabelText("taxId", /tax id/i);
    // Financial
    VendorDefinition.switchToFinancialTab();
    cy.verifyLabelText("paymentTermId", /payment term/i);
    cy.verifyLabelText("priceListId", /price list/i);
    cy.verifyLabelText("creditLimit", /credit limit/i);
    cy.verifyLabelText("currencyId", /currency/i);
    // Accounting
    VendorDefinition.switchToAccountingTab();
    cy.verifyLabelText("payableAccountId", /receivable account/i);
    cy.verifyLabelText("purchaseAccountId", /purchase account/i);
    cy.verifyLabelText("purchaseReturnAccountId", /purchase return account/i);
    cy.verifyLabelText("discountAccountId", /discount account/i);
  });
});
