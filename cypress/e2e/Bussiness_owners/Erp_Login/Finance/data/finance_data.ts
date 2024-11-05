import {
  generateRandomEmail,
  generateRandomString,
  getRandomNumber,
} from "../../../../../support/utils";

export class FinanceData {
  static TreasuryDefinitionUrl =
    "https://mohamed.microtecdev.com:2050/finance/masterdata/treasury-list";
  static BankDefinitionUrl =
    "https://mohamed.microtecdev.com:2050/finance/masterdata/bank-definition";
  static paymentTermUrl =
    "https://mohamed.microtecdev.com:2050/finance/masterdata/paymentterm";
  static PaymentMethodsUrl =
    "https://mohamed.microtecdev.com:2050/finance/masterdata/payment-method";
  static PaymentInUrl =
    "https://mohamed.microtecdev.com:2050/finance/transcations/paymentin";
  static PaymentOUTUrl =
    "https://mohamed.microtecdev.com:2050/finance/transcations/paymentout";
  static companyCode = "98c91af6-16f4-477f-9b4a-db046a04b525";
  static branchCode = "d69e6813-2646-41e7-a56c-538b7f91da39";
  static code = getRandomNumber(1, 9999).toString();
  static bankName = "Banko" + generateRandomString(6);
  static treasuryName = "Tree" + generateRandomString(6);
  static cRate = getRandomNumber(1, 12).toString();
  static desc = "Desc" + generateRandomString(6);
  static wrongDueTerm = getRandomNumber(1, 6);
  static pBankMethod = "method1Banko1Transfer";
  static pTreesuryMethod = "treeThoda1";
  static bankReference = getRandomNumber(1, 666).toString();
  static glAccountCode = "1101001004";
  static correctDueTerm = 100;
  static afterValue = getRandomNumber(7, 12);
  static note = generateRandomString(14);
  static shortName = generateRandomString(5);
  static pRate = getRandomNumber(1, 6);
  static serialNumber = getRandomNumber(1, 100).toString();
  static segmentText = "sg" + getRandomNumber(1, 3).toString();
  static segmentSeparator = ".";
  static pAmount = "100";
  static pAmountEditted = "200";
  static bankAddress = generateRandomString(7);
  static contactName = generateRandomString(7);
  static bankEmail = generateRandomEmail();
  static phone = generateRandomString(7);
  static fax = generateRandomString(7);
  static FCname = generateRandomString(5);
  static bankTransfer = "";
  static correctCurrency = "egyptian";
  static edittedCurrency = "saud";
  static wrongCurrency = "eur";
  static edittedAccount = "غرامة تأخير مناقصة";
  static fromDate = "01/01/2021";
  static correctToDate = "01/01/2022";
  static WrongToDate = "01/01/2020";
}
