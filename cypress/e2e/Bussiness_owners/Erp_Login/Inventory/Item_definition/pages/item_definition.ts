import { InventoryData } from "../../data/inventory_data";

export class ItemDefinition {
  static prepare() {
    cy.wait(1000);
    cy.getInitItemsCountInListView();
  }
  static clickAddNewButton() {
    cy.clickAddNewButton();
  }
  static clickSaveButton() {
    cy.contains("button", /save/i).last().click({ force: true });
  }
  static clickSaveContinueButton() {
    cy.contains("button", /continue/i).click({ force: true });
  }
  static clickSCancelButton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click({ force: true });
  }

  static landing() {
    cy.NavigateToAPPModule(6, 0);
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
  static uploadAttachment(imagePath: string) {
    cy.get('input[type="file"]').attachFile(imagePath);
  }
  static setName(str: any) {
    cy.inputText("name", str);
  }
  static clearName() {
    cy.getByTestAttribute("name").clear();
  }

  static selectItemCategory() {
    cy.getFirstItemInDropDownList("typeId").then(($ItemCategory) => {
      cy.wrap($ItemCategory)
        .invoke("text")
        .then((ItemCategoryTxt) => {
          cy.log("ItemCategoryTxt::: " + ItemCategoryTxt);
          cy.wrap(ItemCategoryTxt).as("ItemCategoryTxt");
        });
    });
  }
  static selectUnitOfMeasureCategory() {
    cy.getFirstItemInDropDownList("categoryId").then(($categoryId) => {
      cy.wrap($categoryId)
        .invoke("text")
        .then((categoryIdTxt) => {
          cy.log("categoryIdTxt::: " + categoryIdTxt);
          cy.wrap(categoryIdTxt).as("categoryIdTxt");
        });
    });
  }
  static selectMainItemUnit() {
    cy.getFirstItemInDropDownList("uomId").then(($uomId) => {
      cy.wrap($uomId)
        .invoke("text")
        .then((uomIdTxt) => {
          cy.log("uomIdTxt::: " + uomIdTxt);
          cy.wrap(uomIdTxt).as("uomIdTxt");
        });
    });
  }
  static clickCancelButtton() {
    cy.getByTestAttribute("cancel").scrollIntoView().click();
  }
  static clickCDetailSaveButtton() {
    cy.getByTestAttribute("save").scrollIntoView().click();
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
  static switchToGeneralTab() {
    cy.get('li[role="presentation"]').eq(0).click();
  }
  static switchToUOMTab() {
    cy.get('li[role="presentation"]').eq(1).click();
  }
  static switchToAttributeAndVarientTab() {
    cy.get('li[role="presentation"]').eq(2).click();
  }
  static switchToBarcodeTab() {
    cy.get('li[role="presentation"]').eq(3).click();
  }
  static switchToInventoryTab() {
    cy.get('li[role="presentation"]').eq(4).click();
  }
  static switchToAccountingTab() {
    cy.get('li[role="presentation"]').eq(5).click();
  }
  // General General General General General General
  static setShortName(str: any) {
    cy.inputText("shortName", str);
  }
  static setWarranty(val: any) {
    cy.inputText("warranty", val);
  }
  static setLifeTime(val: any) {
    cy.inputText("lifeTime", val);
  }
  static selectCountry() {
    cy.clickInputtedSearchDropDownList("countryName", "egypt").then(
      ($countryId) => {
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
      }
    );
  }

  static checkAllItemTaxes() {
    cy.checkAllMultiSelect(1);
  }
  static switchPriceIncludeVat() {
    cy.getByTestAttribute("input-switch").scrollIntoView().click();
  }

  static inputSpecialCare(val: any) {
    cy.inputText("specialCare", val);
  }
  static selectColor() {
    cy.getFirstElementDropDownList(1).then(($color) => {
      if ($color != null) {
        cy.wrap($color)
          .invoke("text")
          .then((colorTxt) => {
            cy.log("colorTxt::: " + colorTxt);
            cy.wrap(colorTxt).as("colorTxt");
          });
      } else {
        cy.wrap("").as("colorTxt");
      }
    });
  }
  // UOM UOM UOM UOM UOM UOM

  static selectUOMCategory() {
    cy.getFirstItemInDropDownList("defaultUOMCategoryId").then(
      ($defaultUOMCategoryId) => {
        if ($defaultUOMCategoryId != null) {
          cy.wrap($defaultUOMCategoryId)
            .invoke("text")
            .then((defaultUOMCategoryIdtxt) => {
              cy.log("defaultUOMCategoryIdtxt::: " + defaultUOMCategoryIdtxt);
              cy.wrap(defaultUOMCategoryIdtxt).as("defaultUOMCategoryIdtxt");
            });
        } else {
          cy.wrap("").as("defaultUOMCategoryIdtxt");
        }
      }
    );
  }
  static clickAddNewLine() {
    cy.contains("button", /add line/i)
      .scrollIntoView()
      .click();
  }
  static selectUOMID() {
    cy.get("tbody tr").eq(0).find("td").eq(0).scrollIntoView().click();
    cy.getFirstItemInDropDownList("uomId").then(($uomId) => {
      if ($uomId != null) {
        cy.wrap($uomId)
          .invoke("text")
          .then((uomIdtxt) => {
            cy.log("uomIdtxt::: " + uomIdtxt);
            cy.wrap(uomIdtxt).as("uomIdtxt");
          });
      } else {
        cy.wrap("").as("uomIdtxt");
      }
    });
  }
  static verifyDimmedUOMCode() {
    cy.verifyDimmidInput("uomCode");
  }
  static inputLineFooter(str: string) {
    cy.get("tbody tr").eq(0).find("td").eq(3).scrollIntoView().click();
    cy.inputText("conversionRatio", str);
  }
  static switchDefault() {
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(2)
      .find('[data-testid="input-switch"]')
      .scrollIntoView()
      .click();
  }
  static switchSalesUOM() {
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(4)
      .find('[data-testid="input-switch"]')
      .scrollIntoView()
      .click();
  }
  static switchPurchaseUOM() {
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(5)
      .find('[data-testid="input-switch"]')
      .scrollIntoView()
      .click();
  }
  // Attribute & Varients     Attribute & Varients      Attribute & Varients
  static clickGenerateVariant() {
    cy.contains("button", /Generate Variant/i)
      .scrollIntoView()
      .click();
  }
  static verifyAttributeVarientsDialogLabels() {
    cy.contains("label", /Attribute Name/i).should("be.visible");
    cy.contains("label", /Select Attribute Values/i).should("be.visible");
  }
  static selectAttributeGroupId() {
    cy.getFirstItemInDropDownList("attributeGroupId").then(
      ($attributeGroupId) => {
        if ($attributeGroupId != null) {
          cy.wrap($attributeGroupId)
            .invoke("text")
            .then((attributeGroupIdtxt) => {
              cy.log("attributeGroupIdtxt::: " + attributeGroupIdtxt);
              cy.wrap(attributeGroupIdtxt).as("attributeGroupIdtxt");
            });
        } else {
          cy.wrap("").as("attributeGroupIdtxt");
        }
      }
    );
  }
  static selectattributeGroupDetails() {
    cy.getFirstItemInDropDownList("attributeGroupDetails").then(
      ($attributeGroupDetails) => {
        if ($attributeGroupDetails != null) {
          cy.wrap($attributeGroupDetails)
            .invoke("text")
            .then((attributeGroupDetailstxt) => {
              cy.log("attributeGroupDetailstxt::: " + attributeGroupDetailstxt);
              cy.wrap(attributeGroupDetailstxt).as("attributeGroupDetailstxt");
            });
        } else {
          cy.wrap("").as("attributeGroupDetailstxt");
        }
      }
    );
  }
  static veriftAddingVarientSuccessfully() {
    cy.contains("div", /success/i).should("be.visible");
    cy.contains("div", /Variant Added Successfully/i).should("be.visible");
  }
  // Barcode  Barcode  Barcode  Barcode  Barcode  Barcode  Barcode  Barcode
  static inputBarcode() {
    cy.clickCellInATable(0, 0);
    cy.inputText("barcode", InventoryData.iBarcode);
  }
  static selectUOMIdtxt() {
    cy.clickCellInATable(0, 1);
    cy.getFirstItemInDropDownList("uomId").then(($uomId) => {
      if ($uomId != null) {
        cy.wrap($uomId)
          .invoke("text")
          .then((uomIdtxt) => {
            cy.log("uomIdtxt::: " + uomIdtxt);
            cy.wrap(uomIdtxt).as("uomIdtxt");
          });
      } else {
        cy.wrap("").as("uomIdtxt");
      }
    });
  }

  static selectItemVariantIdtxt() {
    cy.clickCellInATable(0, 2);
    cy.getFirstItemInDropDownList("itemVariantId").then(($itemVariantId) => {
      if ($itemVariantId != null) {
        cy.wrap($itemVariantId)
          .invoke("text")
          .then((itemVariantIdtxt) => {
            cy.log("itemVariantIdtxt::: " + itemVariantIdtxt);
            cy.wrap(itemVariantIdtxt).as("itemVariantIdtxt");
          });
      } else {
        cy.wrap("").as("itemVariantIdtxt");
      }
    });
  }

  static inputSKU() {
    cy.clickCellInATable(0, 3);
    cy.inputText("sku", InventoryData.iSku);
  }
  static clickQRShowButton() {
    cy.get("tbody tr")
      .eq(0)
      .find("td p")
      .contains(/show/i)
      .first()
      .scrollIntoView()
      .click();
  }
  static clickBarcodeShowButton() {
    cy.get("tbody tr")
      .eq(0)
      .find("td p")
      .contains(/show/i)
      .last()
      .scrollIntoView()
      .click();
  }
  static verifyDisplayingPrintDialog() {
    cy.get('div[role="dialog"]')
      .find('[data-testid="print"]')
      .should("be.visible");
    cy.get('div[role="dialog"]')
      .find('div[class="pi cancel"]')
      .scrollIntoView()
      .click();
  }
  // Inventory  Inventory     Inventory     Inventory     Inventory     Inventory
  static selectTrackingIdtxt() {
    cy.getFirstItemInDropDownList("trackingId").then(($trackingId) => {
      if ($trackingId != null) {
        cy.wrap($trackingId)
          .invoke("text")
          .then((trackingIdTxt) => {
            cy.log("trackingIdTxt::: " + trackingIdTxt);
            cy.wrap(trackingIdTxt).as("trackingIdTxt");
          });
      } else {
        cy.wrap("").as("trackingIdTxt");
      }
    });
  }
  static checkHasExpiryDate() {
    cy.get('span[class="p-inputswitch-slider"]').scrollIntoView().click();
  }

  // Accounting  Accounting     Accounting     Accounting     Accounting     Accounting
  static selectPurchaseAccounttxt() {
    cy.clickInputtedSearchDropDownList("pAccount", InventoryData.pAccount).then(
      ($pAccount) => {
        if ($pAccount != null) {
          cy.wrap($pAccount)
            .invoke("text")
            .then((pAccountTxt) => {
              cy.log("pAccountTxt::: " + pAccountTxt);
              cy.wrap(pAccountTxt).as("pAccountTxt");
            });
        } else {
          cy.wrap("").as("pAccountTxt");
        }
      }
    );
  }
  static selectPurchaseReturnAccounttxt() {
    cy.clickInputtedSearchDropDownList(
      "prAccount",
      InventoryData.prAccount
    ).then(($prAccount) => {
      if ($prAccount != null) {
        cy.wrap($prAccount)
          .invoke("text")
          .then((prAccountTxt) => {
            cy.log("prAccountTxt::: " + prAccountTxt);
            cy.wrap(prAccountTxt).as("prAccountTxt");
          });
      } else {
        cy.wrap("").as("prAccountTxt");
      }
    });
  }
  static selectSalesAccounttxt() {
    cy.clickInputtedSearchDropDownList("sAccount", InventoryData.sAccount).then(
      ($sAccount) => {
        if ($sAccount != null) {
          cy.wrap($sAccount)
            .invoke("text")
            .then((sAccountTxt) => {
              cy.log("sAccountTxt::: " + sAccountTxt);
              cy.wrap(sAccountTxt).as("sAccountTxt");
            });
        } else {
          cy.wrap("").as("sAccountTxt");
        }
      }
    );
  }
  static selectSalesReturnAccounttxt() {
    cy.clickInputtedSearchDropDownList(
      "srAccount",
      InventoryData.srAccount
    ).then(($srAccount) => {
      if ($srAccount != null) {
        cy.wrap($srAccount)
          .invoke("text")
          .then((srAccountTxt) => {
            cy.log("srAccountTxt::: " + srAccountTxt);
            cy.wrap(srAccountTxt).as("srAccountTxt");
          });
      } else {
        cy.wrap("").as("srAccountTxt");
      }
    });
  }
}
