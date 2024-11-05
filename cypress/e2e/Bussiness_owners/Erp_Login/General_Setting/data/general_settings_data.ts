import {
  generateRandomString,
  getRandomNumber,
} from "../../../../../support/utils";

export class GeneralSettingsData {
  static GeneralSettingsApp = /general settings/i;
  static FinancialCalenderUrl =
    "https://mohamed.microtecdev.com:2050/erp/masterdata/financial-calendar";
  static CurrencyConversionUrl =
    "https://mohamed.microtecdev.com:2050/erp/masterdata/currency-conversion";
  static CurrencyDefinitionsUrl =
    "https://mohamed.microtecdev.com:2050/erp/masterdata/currency-definition";
  static tagsUrl = "https://mohamed.microtecdev.com:2050/erp/masterdata";
  static TaxGroupLink = "https://mohamed.microtecdev.com:2050/erp/masterdata/tax-group";
  static TaxDefinitionsLink = "https://mohamed.microtecdev.com:2050/erp/masterdata/tax-definition";
  static FCname = generateRandomString(7);
  static fromDate = "01/01/2021";
  static correctToDate = "01/01/2022";
  static WrongToDate = "01/01/2020";
  static tagName= generateRandomString(7);
  static cSubunit = "miniCurr";
  static cSymbol = "@$";
  static cSubunitE = generateRandomString(4);
  static cSymbolE = "@$%";
  static ccReversedRate = getRandomNumber(1, 100).toString();
  static ccFromCurrencyRate = getRandomNumber(1, 100).toString();
  static ccNote = generateRandomString(12);
  static newCurrency = "currency" + generateRandomString(12);
  static newCurrencySearch = "currency";
  static currency1 = "saud";
  static currency2 = "eg";
  static taxesGroupCode = getRandomNumber(1, 9999).toString();
  static taxesGroupName = "TG_" + generateRandomString(3);
  static taxesDefinitionsCode = getRandomNumber(1, 999).toString();
  static taxesDefinitionsName = "Taxa" + generateRandomString(3);
  static taxesDefinitionsRatio = getRandomNumber(0,10).toString();
  static taxesDefinitionsRatioEdit = getRandomNumber(0,10).toString();
}
