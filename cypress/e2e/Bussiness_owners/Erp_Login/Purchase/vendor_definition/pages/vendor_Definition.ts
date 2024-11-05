import "cypress-file-upload";
import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { PurchaseData } from "../../data/purchase_data";

export class VendorDefinition {
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.zoomOut();
    cy.wait(1000);
    cy.getByTestAttribute("save").scrollIntoView().click();
    cy.wait(2000);
    cy.url().then((url) => {
      if (url.includes("add")) {
        cy.getByTestAttribute("save").scrollIntoView().click({ force: true });
      } else {
        cy.log("Done");
      }
    });
    cy.wait(2000);
  }
  static clickSaveButton2() {
    cy.zoomOut();
    cy.wait(1000);
    cy.get('button[type="submit"]').scrollIntoView().click();
    cy.wait(2000);
    cy.url().then((url) => {
      if (url.includes("add")) {
        cy.get('button[type="submit"]').scrollIntoView().click({ force: true });
      } else {
        cy.log("Done");
      }
    });
    cy.wait(2000);
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  }
  static forceNavigate() {
    cy.visit(PurchaseData.VendorDefinitionUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("vendor")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/purchase/i);
        NavigatesToSideModule.navigatesToTheModule(
          PurchaseData.VendorDefinitionUrl,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(PurchaseData.VendorDefinitionUrl, "vendor");
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
    cy.selectCountryByIndex(1, "eg");
  }
  static setContactPersonalMobileCountryCode() {
    cy.selectCountryByIndex(2, "+20");
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
  static setBirthDate() {
    cy.get('input[role="combobox"]').last().type("08/09/2000");
  }

  static setContactPersonEmail() {
    cy.inputText("contactPersonEmail", "22" + PurchaseData.vContactEmail);
  }

  static setCountryId() {
    cy.selectCountryByIndex(3, "egypt").then(($countryId) => {
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

  static setPriceListId() {
    cy.getFirstItemInDropDownList("priceListId").then(($priceListId) => {
      if ($priceListId != null) {
        cy.wrap($priceListId)
          .invoke("text")
          .then((priceListIdTxt) => {
            cy.log("priceListIdTxt::: " + priceListIdTxt);
            cy.wrap(priceListIdTxt).as("priceListIdTxt");
          });
      } else {
        cy.wrap("").as("priceListIdTxt");
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
