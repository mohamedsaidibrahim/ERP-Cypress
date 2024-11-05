import {
  generateRandomString,
  generateRandomMobileNumber,
  getRandomNumber,
  generateRandomEmail,
} from "../../../../../support/utils";

export class SalesData {
  static GeneralSettingsApp = /sales/i;
  static customerCategoryUrl ="https://mohamed.microtecdev.com:2050/sales/masterdata/customer-category";
  static fromDate = "01/01/2021";

  static correctToDate = "01/01/2022";
  static WrongToDate = "01/01/2020";

  static CustomerDefinitionUrl ="https://mohamed.microtecdev.com:2050/sales/masterdata/customer-definitions";
  static cName = "Name " + generateRandomString(5);
  static attachPath = "C:UsersMicrotec-WebDesktopmessi.jpg";
  static cContactMobil = generateRandomMobileNumber();
  static cContactPhone = generateRandomMobileNumber();
  static cContactFax = generateRandomMobileNumber();
  static cContactWebsite = "WWW."+ generateRandomString(5)+".com";
  static cContactPersonName = "Person Name "+ generateRandomString(5);
  static cContactPersonMobile = generateRandomMobileNumber();
  static cContactPersonPhone = generateRandomMobileNumber();
  static cState = "State "+ generateRandomString(5);
  static cStrat = "Strat "+ generateRandomString(5);
  static cLongitude = getRandomNumber(0, 10).toString();
  static cLatitude = getRandomNumber(0, 10).toString();
  static cRadius = getRandomNumber(0, 10).toString();
  static cCommercialId = getRandomNumber(0, 100).toString();
  static cTaxId = getRandomNumber(0, 123).toString();
  static cCreditLimit = getRandomNumber(0, 12093).toString();
  static cContactEmail = generateRandomEmail();
}
