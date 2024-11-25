import {
  generateRandomMobileNumber,
  generateRandomString,
  getRandomNumber,
} from "../../../../../support/utils";

export class InventoryData {
  static ItemCategoryUrl =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/items-category";
  static ItemDefinitionUrl =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/item-definition";
  static UnitOfMeasurementsUrl =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/uom";
  static AttributeUrl =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/attribute-definition";
  static operationalTag =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/operational-tag";
  static WarehouseUrl =
    "https://mohamed.microtecdev.com:2050/inventory/masterdata/warehouse";
  static itemName = "Item" + generateRandomString(5);
  static glAccountCodeAdd = "1101001004";
  static glAccountCodeEdit = "1101001004";
  static itemCategoryNameEn = "ItemCategory" + generateRandomString(5);
  static itemCategoryNameAr = "تصنيف المنتج" + generateRandomString(5);
  static warehouseAdd = "Muhammed Saeed Syed";
  static warehouseEdit = "warehouseEdit";
  static fromDate = "01/01/2021";
  static correctToDate = "01/01/2022";
  static WrongToDate = "01/01/2020";
  static vName = "Name " + generateRandomString(5);
  static uomCode = getRandomNumber(1, 5000).toString();
  static shortName = generateRandomString(4);
  static shortBame = generateRandomString(3);
  static nameHAr = generateRandomString(13);
  static nameHEn = generateRandomString(14);
  static nameBAr = generateRandomString(12);
  static nameBEn = generateRandomString(11);
  static nameAr = generateRandomString(12);
  static nameEn = generateRandomString(8);
  static ratio = getRandomNumber(1, 100).toString();
  static ratio2 = getRandomNumber(1, 500).toString();
  static warranty = getRandomNumber(1, 2000).toString();
  static lifeTime = getRandomNumber(1, 1000).toString();
  static specialCare = "special Care" + getRandomNumber(1, 700).toString();
  static lineFooter = "footer" + getRandomNumber(1, 230).toString();
  static pAccount = "1101001005";
  static prAccount = "1101001002";
  static sAccount = "1101001003";
  static srAccount = "1101001004";
  static attachPath = "Desktop/national_id.jpg";
  static vContactMobil = generateRandomMobileNumber();
  static vContactPhone = generateRandomMobileNumber();
  static vContactFax = generateRandomMobileNumber();
  static iBarcode = "barcode" + generateRandomString(5);
  static iSku = "sku" + generateRandomString(5);
  static vContactPersonMobile = generateRandomMobileNumber();
  static vContactPersonPhone = generateRandomMobileNumber();
  static vState = "State State";
  static vStrat = "Strat Street";
  static physicalType = "Physical";
  static virtualType = "Virtual";
  static vanSalesType = "VanSales";
  static wPhone = generateRandomMobileNumber();
  static wAddressLine = generateRandomString(12);
  static wEmail = generateRandomString(8) + "@test.com";
  static wFax = generateRandomMobileNumber();
  static wPostalCode = getRandomNumber(1, 500).toString();
  static wLongitude = getRandomNumber(1, 100).toString();
  static wLatitude = getRandomNumber(1, 100).toString();
  static wRadius = getRandomNumber(1, 10).toString();
}
