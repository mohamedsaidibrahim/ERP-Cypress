import { PurchaseData } from "../../data/purchase_data";
import { VendorDefinition } from "../pages/vendor_Definition";

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
    const logFilePath = "cypress/logs/edit_vendor_definition_network_log.json";
    cy.writeFile(logFilePath, JSON.stringify(interceptedRequests, null, 2), {
      flag: "w",
    }).then(() => {
      console.log("Network log saved to", logFilePath);
    });
  });
  it("1.Verify Editing Existing Vendor Definition (All fields are filled)", () => {
    VendorDefinition.landing();
    cy.wait(1500);
    cy.getInitItemsCountInListView();
    cy.clickFirstEditActionButton();
    // Essential Header Data
    VendorDefinition.setBirthDate();
    VendorDefinition.setName(PurchaseData.vName);
    // VendorDefinition.setVendorCategoryId();
    cy.getFirstItemInDropDownList("vendorCategoryId").then(
      (vendorCategoryId) => {
        cy.wrap(vendorCategoryId).as("vendorCategoryId");
      }
    );
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
    // VendorDefinition.setCountryId();
    cy.selectCountryByIndex(3, "egypt").then((countryId) => {
      cy.wrap(countryId).as("countryId");
    });
    VendorDefinition.setCityId();
    VendorDefinition.setState(PurchaseData.vState);
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
    // VendorDefinition.setPaymentTermId();
    cy.getFirstItemInDropDownList("paymentTermId").then(($paymentTermId) => {
      if ($paymentTermId != null) {
        cy.wrap($paymentTermId)
          .invoke("text")
          .then((paymentTermIdTxt) => {
            cy.log("paymentTermIdTxt::: " + paymentTermIdTxt);
            cy.wrap(paymentTermIdTxt).as("paymentTermIdTxt");
          });
      } else {
        cy.wrap("").as("paymentTermIdTxt");
      }
    });
    VendorDefinition.setpricePolicyId();
    VendorDefinition.setCreditLimit(PurchaseData.vCreditLimit);
    VendorDefinition.setCurrencyId();
    // Accounting
    VendorDefinition.switchToAccountingTab();
    VendorDefinition.setPayableAccountId();
    VendorDefinition.setPurchaseAccountId();
    VendorDefinition.setPurchaseReturnAccountId();
    VendorDefinition.setDiscountAccountId();

    VendorDefinition.unCheckAllVendorTagIds();
    VendorDefinition.clickSaveButton();
    cy.assertAfterItemEditedInListView();
    cy.verifyFirstCellInTable(1, PurchaseData.vName);
    cy.verifyFirstCellInTable(3, PurchaseData.vContactEmail);
    cy.get("@paymentTermIdTxt").then((paymentTermIdTxt) => {
      cy.verifyFirstCellInTable(5, getWrappedString(paymentTermIdTxt));
    });
    cy.verifyFirstCellInTable(6, PurchaseData.vCreditLimit);
  });
});
