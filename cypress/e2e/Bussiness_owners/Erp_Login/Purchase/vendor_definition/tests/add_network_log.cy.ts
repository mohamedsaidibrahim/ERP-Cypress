import { PurchaseData } from "../../data/purchase_data";
import { VendorDefinition } from "../pages/vendor_Definition";
import { getWrappedNumber } from "../../../../../../support/utils";

interface NetworkRequest {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  requestHeaders: Record<string, string>;
  requestBody: any;
  responseHeaders: Record<string, string>;
  responseBody: any;
}

describe("Network Log Test", () => {
  let interceptedRequests: NetworkRequest[] = [];
  beforeEach("Navigate", () => {
    cy.visit(PurchaseData.VendorDefinitionUrl);
  });
  beforeEach(() => {
    cy.intercept("*", (req: any) => {
      const requestData: NetworkRequest = {
        method: req.method,
        url: req.url,
        statusCode: req.response?.statusCode || 0,
        responseTime: req.response?.headers["x-response-time"] || 0,
        requestHeaders: req.headers,
        requestBody: req.body,
        responseHeaders: req.response?.headers || {},
        responseBody: req.response?.body,
      };
      interceptedRequests.push(requestData);
    });
  });
  afterEach(() => {
    // Write interceptedRequests to a file
    const logFilePath = "cypress/logs/add_vendor_definition_network_log.json";
    cy.writeFile(logFilePath, JSON.stringify(interceptedRequests, null, 2), {
      flag: "w",
    }).then(() => {
      console.log("Network log saved to", logFilePath);
    });
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
    VendorDefinition.clickSaveButton();
    cy.assertnewItemAddedToListView();
  });
});
