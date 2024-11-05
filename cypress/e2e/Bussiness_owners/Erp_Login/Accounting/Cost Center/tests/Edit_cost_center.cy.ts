import { trimText } from "../../../../../../support/utils";
import { AccountingData } from "../../data/accounting_data";
import { CostCenter } from "../pages/cost_center";

describe("Editing Cost Center", () => {
    beforeEach("Navigates to Cost Center", () => {
        cy.visit(AccountingData.CostCenterLink);
    });

    it("1.verify that all Components are visible in Edit Cost Center Screen pf Parent Account", () => {
        CostCenter.landing();
        cy.wait(1500);
        cy.reload();
        cy.wait(1000);
        CostCenter.clickEditButtonDetailAccount();
        CostCenter.verifyAddPanalLabels();
        CostCenter.verifyIsDetailCheckBox();
        CostCenter.verifyCostCenterCode();
        CostCenter.verifyCostCenterName();
        CostCenter.verifyParentCodeDropDownNotEmpty();
    });

    it("2.verify that all Components are visible in Edit Cost Center Screen pf Detail Account", () => {
        CostCenter.landing();
        cy.wait(1500);
        cy.reload();
        cy.wait(1000);
        CostCenter.clickEditButtonDetailAccount();
        CostCenter.verifyAddPanalLabels();
        CostCenter.verifyIsDetailCheckBox();
        CostCenter.verifySaveButton();
        CostCenter.verifyCostCenterCode();
        CostCenter.verifyCostCenterName();
        CostCenter.verifyParentCodeDropDownNotEmpty();
    });

    it("3.Validate TheCost Center Name Required Message", () => {
        CostCenter.landing();
        cy.wait(1500);
        cy.reload();
        cy.wait(1000);
        CostCenter.clickEditButton();
        CostCenter.clearCostCenterName();
        CostCenter.clickSaveButton();
        cy.contains("span", /required/i).should("be.visible");
        CostCenter.inputCostCenterName(AccountingData.costCenterName);
        cy.contains("span", /required/i).should("not.exist");
    });

    it("4.Edit An Existing Cost Center For Cost Center That does not have a related parent account or Transaction", () => {
        CostCenter.landing();
        cy.wait(1500);
        cy.reload();
        cy.wait(1000);
        CostCenter.switchingToListView();
        cy.wait(2000);
        cy.navigateToTheLatestScreen();
        cy.getLastCellInTableValue(1).then((name1) => {
            cy.log('name1 name1 name1 :::: ' + name1);
            cy.wrap(name1).as('name1');
        });
        cy.getLastCellInTableValue(2).then((parent1) => {
            cy.wrap(parent1).as('parent1');
        });
        cy.getLastCellInTableValue(3).then((type1) => {
            cy.wrap(type1).as('type1');
        });
        CostCenter.switchingToTreeView();
        cy.get('@name1').then((name1) => {
            CostCenter.inputSearchTree(trimText(name1.toString().trim()).substring(2));
            CostCenter.clickEditButton();
            CostCenter.inputcostCenterNameInDialog(name1 + 'Editted');
            CostCenter.clickParentDropDown();
            CostCenter.selectTheFirstOption();
            CostCenter.clickIsDetail();
            CostCenter.clickSaveButton();
            CostCenter.verifyTheSuccessMessagePopUp();
        });
        cy.get('@name1').then((name1) => {
            CostCenter.inputSearchTree(name1 + "Editted");
            cy.contains('span[id="label_tree"]', name1 + "Editted").should('be.visible');
        });
    });

    it("5.Verify that the System Prevents Editting Cost Center That has a related parent account or Transaction", () => {
        CostCenter.landing();
        cy.wait(1500);
        cy.reload();
        cy.wait(1000);
        CostCenter.switchingToListView();
        cy.wait(2000);
        cy.navigateToTheLatestScreen();
        cy.getLastCellInTableValue(1).then((name1) => {
            cy.log('name1 name1 name1 :::: ' + name1);
            cy.wrap(name1).as('name1');
        });
        cy.getLastCellInTableValue(2).then((parent1) => {
            cy.wrap(parent1).as('parent1');
        });
        cy.getLastCellInTableValue(3).then((type1) => {
            cy.wrap(type1).as('type1');
        });
        CostCenter.switchingToTreeView();
        cy.get('@name1').then((name1) => {
            CostCenter.inputSearchTree(trimText(name1.toString().trim()).substring(2));
            CostCenter.clickEditButton();
            CostCenter.inputcostCenterNameInDialog(name1 + 'Editted');
            CostCenter.clickParentDropDown();
            CostCenter.selectTheFirstOption();
            CostCenter.clickIsDetail();
            CostCenter.clickSaveButton();
            CostCenter.verifyTheValidationMessagePopUp();
        });
        cy.get('@name1').then((name1) => {
            CostCenter.inputSearchTree(name1 + "Editted");
            cy.contains('span[id="label_tree"]', name1 + "Editted").should('not.exist');
        });
    });

});