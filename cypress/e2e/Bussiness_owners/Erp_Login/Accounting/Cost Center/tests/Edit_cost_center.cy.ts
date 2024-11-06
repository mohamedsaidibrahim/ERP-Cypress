import { trimText } from "../../../../../../support/utils";
import { ChartOfAccounts } from "../../charts_of_accounts/pages/charts_of_accounts";
import { AccountingData } from "../../data/accounting_data";
import { CostCenter } from "../pages/cost_center";
import { getWrappedString } from "../../../../../../support/utils";


describe("Editing Cost Center", () => {
    beforeEach("Navigates to Cost Center", () => {
        cy.visit(AccountingData.CostCenterLink);
    });

    it("1.verify that all Components are visible in Edit Cost Center Screen pf Parent Account", () => {
        CostCenter.landing();
        cy.wait(5000);
        ChartOfAccounts.clickEditButtonDetailAccount();
        CostCenter.verifyAddPanalLabels();
        CostCenter.verifyIsDetailCheckBox();
        CostCenter.verifyCostCenterCode();
        CostCenter.verifyCostCenterName();
        CostCenter.verifyParentCodeDropDownNotEmpty();
    });

    it("2.verify that all Components are visible in Edit Cost Center Screen pf Detail Account", () => {
        CostCenter.landing();
        cy.wait(5000);
        ChartOfAccounts.clickEditButtonDetailAccount();
        CostCenter.verifyAddPanalLabels();
        CostCenter.verifyIsDetailCheckBox();
        CostCenter.verifyCostCenterCode();
        CostCenter.verifyCostCenterName();
        CostCenter.verifyParentCodeDropDownNotEmpty();
        CostCenter.clickCancelButton();
    });

    it("3.Validate TheCost Center Name Required Message", () => {
        CostCenter.landing();
        cy.wait(5000);
        ChartOfAccounts.clickEditButtonDetailAccount();
        CostCenter.clearCostCenterName();
        CostCenter.clickSaveButton();
        cy.contains("span", /required/i).should("be.visible");
        CostCenter.inputCostCenterName(AccountingData.detailCostCenterName);
        cy.contains("span", /required/i).should("not.exist");
    });

    it("4.Edit An Existing Cost Center For Cost Center That does not have a related parent account or Transaction", () => {
        CostCenter.landing();
        cy.wait(3000);
        ChartOfAccounts.SearchAnTreeAccount(AccountingData.detailCostCenterSrch);
        cy.wait(1000);
        ChartOfAccounts.clickEditButtonDetailAccount();
        cy.wait(5500);
        CostCenter.inputcostCenterNameInDialog(AccountingData.detailCostCenterName + 'Editted');
        CostCenter.clickParentDropDown();
        CostCenter.clickIsDetail();
        CostCenter.clickSaveButton();
        CostCenter.verifyTheSuccessMessagePopUp();
        CostCenter.inputSearchTree(AccountingData.detailCostCenterName + "Editted");
        cy.contains('span[id="label_tree"]', AccountingData.detailCostCenterName + "Editted").should('be.visible');
    });

    it("5.Verify that the System Prevents Editting Cost Center That has a related parent account or Transaction", () => {
        CostCenter.landing();
        cy.wait(3000);
        ChartOfAccounts.SearchAnTreeAccount(AccountingData.detailCostCenterSrch);
        cy.wait(1000);
        ChartOfAccounts.clickEditButtonDetailAccount();
        cy.wait(5500);
        CostCenter.inputcostCenterNameInDialog(AccountingData.detailCostCenterName + 'Editted');
        CostCenter.clickParentDropDown();
        CostCenter.clickIsDetail();
        CostCenter.clickSaveButton();
        cy.wait(2000);
        cy.contains('.btn', /save/i).should('be.visible');
        CostCenter.inputSearchTree(AccountingData.detailCostCenterName + "Editted");
        cy.contains('span[id="label_tree"]', AccountingData.detailCostCenterName + "Editted").should('not.exist');
    });
});