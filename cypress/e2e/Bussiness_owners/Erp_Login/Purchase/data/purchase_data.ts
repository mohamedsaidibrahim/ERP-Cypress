import {
  generateRandomEmail,
  generateRandomMobileNumber,
  generateRandomString,
  getRandomNumber,
} from "../../../../../support/utils";

export class PurchaseData {
  static VendorCategoryUrl =
    "https://mohamed.microtecdev.com:2050/purchase/masterdata/vendor-category";
  static VendorDefinitionUrl =
    "https://mohamed.microtecdev.com:2050/purchase/masterdata/vendor-definitions";
  static FCname = generateRandomString(5);
  static fromDate = "01/01/2021";
  static correctToDate = "01/01/2022";
  static WrongToDate = "01/01/2020";
  static vName = "Name " + generateRandomString(5);
  static attachPath = "Desktop/national_id.jpg";
  static vContactMobil = generateRandomMobileNumber();
  static vContactPhone = generateRandomMobileNumber();
  static vContactFax = generateRandomMobileNumber();
  static vContactWebsite = "WWW."+  generateRandomString(5)+ ".com";
  static vContactPersonName = "Person Name";
  static vContactPersonMobile = generateRandomMobileNumber();
  static vContactPersonPhone = generateRandomMobileNumber();
  static vState = "State State";
  static vStrat = "Strat Street";
  static vLongitude = getRandomNumber(1, 1096).toString();
  static vLatitude = getRandomNumber(1, 1980).toString();
  static vRadius = getRandomNumber(1, 1230).toString();
  static vCommercialId = getRandomNumber(1, 100).toString();
  static vTaxId = getRandomNumber(1, 1203).toString();
  static vCreditLimit = getRandomNumber(1, 1203).toString();
  static vContactEmail = generateRandomEmail();
}
