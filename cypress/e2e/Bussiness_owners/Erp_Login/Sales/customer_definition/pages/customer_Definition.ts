import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { SalesData } from "../../data/sales_data";

export class CustomerDefinition {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewButton() {
    // cy.contains('button',/create/i).scrollIntoView().click();
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).click({ force: true });
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click({ force: true });
  }
  static forceNavigate() {
    cy.visit(SalesData.CustomerDefinitionUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("Customer")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/sales/i);
        NavigatesToSideModule.navigatesToTheModule(
          SalesData.CustomerDefinitionUrl,
          2
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(SalesData.CustomerDefinitionUrl, "ustomer");
  }
  static clickFirstDeleteButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-trash pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-trash pointer"]').first().click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static clickFirstEditButton() {
    cy.wait(1000);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get('i[class="pi pi-pencil pointer"]').first().scrollIntoView();
        cy.get('i[class="pi pi-pencil pointer"]')
          .first()
          .click({ force: true });
      } else {
        cy.log("The Table is Empty");
      }
    });
  }
  static confirmDeleteDialog() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/yes/i)
      .scrollIntoView()
      .click({ force: true });
  }
  static assertSuccessfulDeletion() {
    cy.assertItemDeletedFromListView();
  }
  static setName(str: any) {
    cy.inputText("name", str);
  }
  static clearName() {
    cy.getByTestAttribute("name").clear();
  }
  static uploadAttachment(imagePath: string) {
    cy.get('input[type="file"]').attachFile(imagePath);
  }
  static setContactMobileCountryCode() {
    cy.clickInputtedSearchDropDownList("contactMobileCode", "+20");
  }
  static setContactPersonalMobileCountryCode() {
    cy.clickInputtedSearchDropDownList("contactPersonMobileCode", "+20");
  }
  static setContactMobile(str: any) {
    cy.inputText("contactMobile", str);
  }

  static setContactPhone(str: any) {
    cy.inputText("contactPhone", str);
  }

  static setContactFax(str: any) {
    cy.inputText("contactFax", str);
  }

  static setContactEmail(str: any) {
    cy.inputText("contactEmail", str);
  }

  static setContactWebsite(str: any) {
    cy.inputText("contactWebsite", str);
  }

  static setContactPersonName(str: any) {
    cy.inputText("contactPersonName", str);
  }

  static setContactPersonMobile(str: any) {
    cy.inputText("contactPersonMobile", str);
  }

  static setContactPersonPhone(str: any) {
    cy.inputText("contactPersonPhone", str);
  }

  static setState(str: any) {
    cy.inputText("state", str);
  }

  static setStreet(str: any) {
    cy.inputText("street", str);
  }

  static setLongitude(str: any) {
    cy.inputText("longitude", str);
  }

  static setLatitude(str: any) {
    cy.inputText("latitude", str);
  }

  static setRadius(str: any) {
    cy.inputText("errorRadius", str);
  }

  static setCommercialId(str: any) {
    cy.inputText("commercialId", str);
  }

  static setTaxId(str: any) {
    cy.inputText("taxId", str);
  }

  static setCreditLimit(str: any) {
    cy.inputText("creditLimit", str);
  }

  static setCustomerCategoryId() {
    cy.getFirstItemInDropDownList("categoryId").then(($categoryId) => {
      if ($categoryId != null) {
        cy.wrap($categoryId)
          .invoke("text")
          .then((CategoryIdTxt) => {
            cy.log("CategoryIdTxt::: " + CategoryIdTxt);
            cy.wrap(CategoryIdTxt).as("CategoryIdTxt");
          });
      } else {
        cy.wrap("").as("CategoryIdTxt");
      }
    });
  }
  static setBirthDate() {
    cy.get('input[role="combobox"]').last().type("08/09/2000");
  }

  static setCustomerTagIds() {
    cy.checkAllMultiSelect(0);
  }

  static setContactPersonEmail() {
    cy.inputText("contactPersonEmail", "22" + SalesData.cContactEmail);
  }

  static setCountryId() {
    cy.clickInputtedSearchDropDownList("countryId", "egypt").then(($countryId) => {
      if ($countryId != null) {
        cy.wrap($countryId)
          .invoke("text")
          .then((countryIdTxt) => {
            cy.log("countryIdTxt::: " + countryIdTxt);
            cy.wrap(countryIdTxt).as("countryIdTxt");
          });
      } else {
        cy.wrap("").as("countryIdTxt");
      }
    });
  }
  static setCityId() {
    cy.getFirstItemInDropDownList("cityId").then(($cityId) => {
      if ($cityId != null) {
        cy.wrap($cityId)
          .invoke("text")
          .then((cityIdTxt) => {
            cy.log("cityIdTxt::: " + cityIdTxt);
            cy.wrap(cityIdTxt).as("cityIdTxt");
          });
      } else {
        cy.wrap("").as("cityIdTxt");
      }
    });
  }

  static setPaymentTermId() {
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
  }

  static setpricePolicyId() {
    cy.getFirstItemInDropDownList("pricePolicyId").then(($pricePolicyId) => {
      if ($pricePolicyId != null) {
        cy.wrap($pricePolicyId)
          .invoke("text")
          .then((pricePolicyIdTxt) => {
            cy.log("pricePolicyIdTxt::: " + pricePolicyIdTxt);
            cy.wrap(pricePolicyIdTxt).as("pricePolicyIdTxt");
          });
      } else {
        cy.wrap("").as("pricePolicyIdTxt");
      }
    });
  }

  static setCurrencyId() {
    cy.getFirstItemInDropDownList("currencyId").then(($currencyId) => {
      if ($currencyId != null) {
        cy.wrap($currencyId)
          .invoke("text")
          .then((currencyIdTxt) => {
            cy.log("currencyIdTxt::: " + currencyIdTxt);
            cy.wrap(currencyIdTxt).as("currencyIdTxt");
          });
      } else {
        cy.wrap("").as("currencyIdTxt");
      }
    });
  }

  static setReceivableAccountId() {
    cy.getFirstItemInDropDownList("receivableAccountId").then(
      ($receivableAccountId) => {
        if ($receivableAccountId != null) {
          cy.wrap($receivableAccountId)
            .invoke("text")
            .then((receivableAccountIdTxt) => {
              cy.log("receivableAccountIdTxt::: " + receivableAccountIdTxt);
              cy.wrap(receivableAccountIdTxt).as("receivableAccountIdTxt");
            });
        } else {
          cy.wrap("").as("receivableAccountIdTxt");
        }
      }
    );
  }

  static setSalesAccountId() {
    cy.getFirstItemInDropDownList("salesAccountId").then(($salesAccountId) => {
      if ($salesAccountId != null) {
        cy.wrap($salesAccountId)
          .invoke("text")
          .then((salesAccountIdTxt) => {
            cy.log("salesAccountIdTxt::: " + salesAccountIdTxt);
            cy.wrap(salesAccountIdTxt).as("salesAccountIdTxt");
          });
      } else {
        cy.wrap("").as("salesAccountIdTxt");
      }
    });
  }

  static setSalesReturnAccountId() {
    cy.getFirstItemInDropDownList("salesReturnAccountId").then(
      ($salesReturnAccountId) => {
        if ($salesReturnAccountId != null) {
          cy.wrap($salesReturnAccountId)
            .invoke("text")
            .then((salesReturnAccountIdTxt) => {
              cy.log("salesReturnAccountIdTxt::: " + salesReturnAccountIdTxt);
              cy.wrap(salesReturnAccountIdTxt).as("salesReturnAccountIdTxt");
            });
        } else {
          cy.wrap("").as("salesReturnAccountIdTxt");
        }
      }
    );
  }

  static setDiscountAccountId() {
    cy.getFirstItemInDropDownList("discountAccountId").then(
      ($discountAccountId) => {
        if ($discountAccountId != null) {
          cy.wrap($discountAccountId)
            .invoke("text")
            .then((discountAccountIdTxt) => {
              cy.log("discountAccountIdTxt::: " + discountAccountIdTxt);
              cy.wrap(discountAccountIdTxt).as("discountAccountIdTxt");
            });
        } else {
          cy.wrap("").as("discountAccountIdTxt");
        }
      }
    );
  }
  static switchToInformationTab() {
    cy.get('li[role="presentation"]').eq(0).click();
  }
  static switchToAddressTab() {
    cy.get('li[role="presentation"]').eq(1).click();
  }
  static switchToLegalTab() {
    cy.get('li[role="presentation"]').eq(2).click();
  }
  static switchToFinancialTab() {
    cy.get('li[role="presentation"]').eq(3).click();
  }
  static switchToAccountingTab() {
    cy.get('li[role="presentation"]').eq(4).click();
  }
}
