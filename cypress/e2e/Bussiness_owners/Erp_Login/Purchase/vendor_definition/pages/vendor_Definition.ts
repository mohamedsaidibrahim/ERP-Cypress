import "cypress-file-upload";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { PurchaseData } from "../../data/purchase_data";

export class VendorDefinition {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains('button',/save/i).scrollIntoView().click();
  }

  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  }


  static landing() {
    cy.LandingToERPModule(PurchaseData.VendorDefinitionUrl, "vendor");
    cy.wait(6500);
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
      .find('button[class="swal2-confirm swal2-styled swal2-default-outline"]')
      .scrollIntoView()
      .click({ force: true });
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
    cy.clickInputtedSearchDropDownList("ContactMobileCode", "+20");
  }
  static setContactPersonalMobileCountryCode() {
    cy.clickInputtedSearchDropDownList("ContactPersonMobileCode", "+20");
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
    cy.inputText("radius", str);
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

  static setVendorCategoryId() {
    cy.getFirstItemInDropDownList("vendorCategoryId").then(
      ($vendorCategoryId) => {
        if ($vendorCategoryId != null) {
          cy.wrap($vendorCategoryId)
            .invoke("text")
            .then((vendorCategoryIdTxt) => {
              cy.log("vendorCategoryIdTxt::: " + vendorCategoryIdTxt);
              cy.wrap(vendorCategoryIdTxt).as("vendorCategoryIdTxt");
            });
        } else {
          cy.wrap("").as("vendorCategoryIdTxt");
        }
      }
    );
  }
  static setBirthDate(str: string) {
    cy.getByTestAttribute("birthDate").find('input').clear().last().type(str);
  }

  static setContactPersonEmail() {
    cy.inputText("contactPersonEmail", "22" + PurchaseData.vContactEmail);
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

  static setPayableAccountId() {
    cy.getFirstItemInDropDownList("payableAccountId").then(
      ($payableAccountId) => {
        if ($payableAccountId != null) {
          cy.wrap($payableAccountId)
            .invoke("text")
            .then((payableAccountIdxt) => {
              cy.log("payableAccountIdxt::: " + payableAccountIdxt);
              cy.wrap(payableAccountIdxt).as("payableAccountIdxt");
            });
        } else {
          cy.wrap("").as("payableAccountIdxt");
        }
      }
    );
  }

  static setPurchaseAccountId() {
    cy.getFirstItemInDropDownList("purchaseAccountId").then(
      ($purchaseAccountId) => {
        if ($purchaseAccountId != null) {
          cy.wrap($purchaseAccountId)
            .invoke("text")
            .then((purchaseAccountIdTxt) => {
              cy.log("purchaseAccountIdTxt::: " + purchaseAccountIdTxt);
              cy.wrap(purchaseAccountIdTxt).as("purchaseAccountIdTxt");
            });
        } else {
          cy.wrap("").as("purchaseAccountIdTxt");
        }
      }
    );
  }

  static setPurchaseReturnAccountId() {
    cy.getFirstItemInDropDownList("purchaseReturnAccountId").then(
      ($purchaseReturnAccountId) => {
        if ($purchaseReturnAccountId != null) {
          cy.wrap($purchaseReturnAccountId)
            .invoke("text")
            .then((purchaseReturnAccountIdTxt) => {
              cy.log(
                "purchaseReturnAccountIdTxt::: " + purchaseReturnAccountIdTxt
              );
              cy.wrap(purchaseReturnAccountIdTxt).as(
                "purchaseReturnAccountIdTxt"
              );
            });
        } else {
          cy.wrap("").as("purchaseReturnAccountIdTxt");
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
  static checkAllVendorTagIds() {
    cy.checkAllMultiSelect(0);
  }
  static unCheckAllVendorTagIds() {
    cy.unCheckTheFirstOfMultiOptions();
  }

  static setcategoryId() {
    cy.getFirstItemInDropDownList("categoryId").then(($categoryId) => {
      if ($categoryId != null) {
        cy.wrap($categoryId)
          .invoke("text")
          .then((categoryIdTxt) => {
            cy.log("categoryIdTxt::: " + categoryIdTxt);
            cy.wrap(categoryIdTxt).as("categoryIdTxt");
          });
      } else {
        cy.wrap("").as("categoryIdTxt");
      }
    });
  }
  static checkAllItemTagIds() {
    cy.checkAllMultiSelect(0);
  }
}
