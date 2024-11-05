import { SalesData } from "../../data/sales_data";
import { CustomerDefinition } from "../pages/customer_Definition";

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
    cy.visit(SalesData.CustomerDefinitionUrl);
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
    const logFilePath = "cypress/logs/add_customer_definition_network_log.json";
    cy.writeFile(logFilePath, JSON.stringify(interceptedRequests, null, 2), {
      flag: "w",
    }).then(() => {
      console.log("Network log saved to", logFilePath);
    });
  });
  it("1.Verify Adding new Customer Definition (All fields are filled)", () => {
    CustomerDefinition.landing();
    cy.wait(1500);

    cy.getInitItemsCountInListView();
    CustomerDefinition.clickAddNewButton();
    // Essential Header Data
    CustomerDefinition.setBirthDate();
    CustomerDefinition.setName(SalesData.cName);
    CustomerDefinition.setCustomerCategoryId();
    // CustomerDefinition.uploadAttachment(SalesData.attachPath);
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
    // CustomerDefinition.setContactPersonEmail();
    // Address Tab
    CustomerDefinition.switchToAddressTab();
    CustomerDefinition.setCountryId();
    CustomerDefinition.setCityId();
    CustomerDefinition.setState(SalesData.cState);
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
    CustomerDefinition.setCustomerTagIds();
    CustomerDefinition.clickSaveButton();
    cy.wait(6000);
    cy.assertnewItemAddedToListView();
  });
});
