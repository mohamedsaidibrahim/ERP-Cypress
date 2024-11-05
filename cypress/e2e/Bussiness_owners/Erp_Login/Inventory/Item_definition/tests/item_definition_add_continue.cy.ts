import { InventoryData } from "../../data/inventory_data";
import { ItemDefinition } from "../pages/item_definition";

describe("Item Definition (Add)", () => {
  beforeEach(() => {
    cy.visit(InventoryData.ItemDefinitionUrl);
  });
  it("1.Verify Adding new Item Definition (All fields are filled)", () => {
    ItemDefinition.landing();
    cy.wait(1500);
    
    cy.getInitItemsCountInListView();
    cy.clickAddNewButton();
    // fill All The Required Components in the Quick Dialog .
    cy.logMsg("fill All The Required Components in the Quick Dialog");
    ItemDefinition.setName(InventoryData.itemName);
    ItemDefinition.selectItemCategory();
    ItemDefinition.selectUnitOfMeasureCategory();
    ItemDefinition.selectMainItemUnit();
    ItemDefinition.clickSaveContinueButton();
    // Essential Header Data
    cy.logMsg("(Add) Essential Header Data");
    ItemDefinition.setName(InventoryData.vName);
    cy.wait(750);
    ItemDefinition.setcategoryId();
    cy.wait(750);
    ItemDefinition.checkAllItemTagIds();
    cy.wait(750);
    // ItemDefinition.uploadAttachment(InventoryData.attachPath);
    // General Tab
    cy.logMsg("(Add) General Tab");
    ItemDefinition.setShortName(InventoryData.shortName);
    ItemDefinition.setWarranty(InventoryData.warranty);
    ItemDefinition.setLifeTime(InventoryData.lifeTime);
    ItemDefinition.selectCountry();
    ItemDefinition.checkAllItemTaxes();
    ItemDefinition.switchPriceIncludeVat();
    ItemDefinition.inputSpecialCare(InventoryData.specialCare);
    ItemDefinition.selectColor();
    // UOM Tab
    cy.logMsg("(Add) UOM Tab");
    ItemDefinition.switchToUOMTab();
    ItemDefinition.selectUOMCategory();
    cy.wait(750);
    ItemDefinition.clickAddNewLine();
    ItemDefinition.selectUOMID();
    cy.wait(750);
    ItemDefinition.verifyDimmedUOMCode();
    ItemDefinition.inputLineFooter(InventoryData.lineFooter);
    ItemDefinition.switchDefault();
    ItemDefinition.switchSalesUOM();
    ItemDefinition.switchPurchaseUOM();
    //Attributes & Variants
    cy.logMsg("(Add) Attributes & Variants");
    ItemDefinition.switchToAttributeAndVarientTab();
    ItemDefinition.clickAddNewLine();
    ItemDefinition.verifyAttributeVarientsDialogLabels();
    ItemDefinition.selectAttributeGroupId();
    ItemDefinition.selectattributeGroupDetails();
    cy.verifyDialogCancelButton();
    cy.clickDialogSaveButton();
    ItemDefinition.clickGenerateVariant();
    ItemDefinition.veriftAddingVarientSuccessfully();
    // Barcode Tab
    cy.logMsg("(Add) Barcode Tab");
    ItemDefinition.switchToBarcodeTab();
    ItemDefinition.inputBarcode();
    ItemDefinition.selectUOMIdtxt();
    ItemDefinition.selectItemVariantIdtxt();
    ItemDefinition.inputSKU();
    ItemDefinition.clickQRShowButton();
    ItemDefinition.verifyDisplayingPrintDialog();
    ItemDefinition.clickBarcodeShowButton();
    ItemDefinition.verifyDisplayingPrintDialog();
    // Inventory Tab
    cy.logMsg("(Add) Inventory Tab");
    ItemDefinition.switchToInventoryTab();
    ItemDefinition.checkHasExpiryDate();
    // Accounting Tab
    cy.logMsg("(Add) Accounting Tab");
    ItemDefinition.switchToAccountingTab();
    ItemDefinition.selectPurchaseAccounttxt();
    ItemDefinition.selectPurchaseReturnAccounttxt();
    ItemDefinition.selectSalesAccounttxt();
    ItemDefinition.selectSalesReturnAccounttxt();

    ItemDefinition.clickSaveButton();
    
    cy.assertnewItemAddedToListView();
  });

  it("2.Verify Requird Validation", () => {
    ItemDefinition.landing();
    cy.wait(1000);
    cy.clickAddNewButton();
    // fill All The Required Components in the Quick Dialog
    cy.logMsg("fill All The Required Components in the Quick Dialog");
    ItemDefinition.setName(InventoryData.itemName);
    ItemDefinition.selectItemCategory();
    ItemDefinition.selectUnitOfMeasureCategory();
    ItemDefinition.selectMainItemUnit();
    ItemDefinition.clickSaveContinueButton();
    cy.verifyNotExistanceTheRequiredValidation();
    ItemDefinition.clearName();
    cy.verifyDisplayingTheRequiredValidationMsgsCount(1);
    ItemDefinition.setName(InventoryData.vName);
    cy.verifyNotExistanceTheRequiredValidation();
    ItemDefinition.clickSaveButton();
    cy.url().should("not.include", "add");
  });

  it("3.Verify Labels", () => {
    ItemDefinition.landing();
    cy.wait(1000);
    cy.clickAddNewButton();
    // fill All The Required Components in the Quick Dialog
    cy.logMsg("fill All The Required Components in the Quick Dialog");
    ItemDefinition.setName(InventoryData.itemName);
    ItemDefinition.selectItemCategory();
    ItemDefinition.selectUnitOfMeasureCategory();
    ItemDefinition.selectMainItemUnit();
    ItemDefinition.clickSaveContinueButton();
    // General Tab
    cy.logMsg("Labels General Tab");
    cy.contains("span", /Item Information/i);
    cy.contains("label", /Item Short Name/i);
    cy.contains("label", /Warantly ( Per Month )/i);
    cy.contains("label", /Life Time ( Per Year )/i);
    cy.contains("span", /Country Of Origin/i);
    cy.contains("span", /Vat Applied/i);
    cy.contains("label", /Taxes/i);
    // UOM Tab
    cy.logMsg("Labels UOM Tab");
    ItemDefinition.switchToUOMTab();
    cy.contains("label", /UOM Category/i);
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      if (table.find("th").first().is(":visible")) {
        cy.wrap(table)
          .find("th")
          .eq(0)
          .contains(/UOM Name/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(1)
          .contains(/UOM Code/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(2)
          .contains(/Default/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(3)
          .contains(/Factor/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(4)
          .contains(/Sales UOM/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(5)
          .contains(/Purchase UOM/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(6)
          .contains(/actions/i)
          .should("be.visible");
      } else {
        cy.logMsg("Table Header is not Visible");
      }
    });

    // Attribute & Varients
    cy.logMsg("Labels Attribute & Varients");
    ItemDefinition.switchToAttributeAndVarientTab();
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      if (table.find("th").first().is(":visible")) {
        cy.wrap(table)
          .find("th")
          .eq(0)
          .contains(/Attribute Name	/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(1)
          .contains(/status/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(2)
          .contains(/actions/i)
          .should("be.visible");
      } else {
        cy.logMsg("Table Header is not Visible");
      }
    });
    cy.logMsg("Labels Barcode");
    // Barcode
    ItemDefinition.switchToBarcodeTab();
    cy.get("table").then((table) => {
      // Verify Table Column Headers
      if (table.find("th").first().is(":visible")) {
        cy.wrap(table)
          .find("th")
          .eq(0)
          .contains(/Barcode/i)
          .should("be.visible");
        cy.wrap(table).find("th").eq(1).contains(/Unit/i).should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(2)
          .contains(/Variant/i)
          .should("be.visible");
        cy.wrap(table).find("th").eq(3).contains(/SKU/i).should("be.visible");
        cy.wrap(table).find("th").eq(4).contains(/QR/i).should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(5)
          .contains(/Barcode/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(6)
          .contains(/Status/i)
          .should("be.visible");
        cy.wrap(table)
          .find("th")
          .eq(7)
          .contains(/actions/i)
          .should("be.visible");
      } else {
        cy.logMsg("Table Header is not Visible");
      }
    });
    // Inventory
    cy.logMsg("Labels Inventory");
    ItemDefinition.switchToInventoryTab();
    cy.contains("span", /Item Tracking/i);
    cy.contains("p", /Has Expiry Date/i);
    cy.logMsg("Labels Accounting");
    // Accounting
    ItemDefinition.switchToAccountingTab();
    cy.contains("span", /Purchase/i);
    cy.contains("label", /Purchase Amount/i);
    cy.contains("label", /Purchase Return Amount/i);
    cy.contains("span", /sales/i);
    cy.contains("label", /Sales Amount/i);
    cy.contains("label", /Sales Return Amount/i);
  });
});
