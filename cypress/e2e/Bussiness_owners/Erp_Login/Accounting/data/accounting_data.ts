import {
  generateRandomString,
  getRandomNumber,
} from "../../../../../support/utils";

export class AccountingData {
  static detailAccount = "مخزن المواد الخام";
  static parentAccount = "المبيعات";
  static accountCOde = "TestCC";
  static testParentAccountEditted = "testPEE" + getRandomNumber(1, 9999);
  static testParentAccountAddedd = "testPAA" + getRandomNumber(1, 9999);
  static testParentAccountEdittedSearch = "testPEE";
  static testParentAccountAddedSearch = "testPAA";
  static parentCostCenterSrch = "PCC_";
  static parentCostCenterName = "PCC_" + generateRandomString(5);
  static detailCostCenterSrch = "DCC_";
  static detailCostCenterName = "DCC_" + generateRandomString(5);
  static ChartOfAccountsLink =
    "https://mohamed.microtecdev.com:2050/accounting/masterdata/chartofaccounts";
  static CostCenterLink =
    "https://mohamed.microtecdev.com:2050/accounting/masterdata/cost-center";
  static accountingLink =
    "https://mohamed.microtecdev.com:2050/accounting/";
  static journalEntryLink =
    "https://mohamed.microtecdev.com:2050/accounting/transcations/journalentry";
  static periodicActiveFrom = "2024-01-21";
  static periodicActiveTo = "2025-12-28";
  static currencySrch = "Saudi Riyal";
  static searchAccount = "AAA";
  static ChartOfAccountName = "TestCC" + getRandomNumber(1, 9999).toString();
  static edittedChartOfAccountName =
    "Editted EEE" + getRandomNumber(1, 9999).toString();

  static corCreditAmount = 100;
  static corDebitAmount = 88;
  static numberOne = 1;
  static viewNumList = [2, 3, 5, 6, 7, 9];
  static viewStrList: string[] = [];
  static getViewStrList() {
    return AccountingData.viewStrList;
  }
  static setViewStrList(strList: string[]) {
    AccountingData.viewStrList = strList;
  }
}
