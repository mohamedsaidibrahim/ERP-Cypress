import { AccountingData } from "../../data/accounting_data";
import { CostCenter } from "../pages/cost_center";

describe("Adding Cost Center", () => {
  beforeEach("Navigates to Cost Center", () => {
    cy.visit(AccountingData.CostCenterLink);
  });
  
  it("1.Verify Empty Data Cost Center", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    cy.get(".p-tree").should("be.visible");
    cy.get(".p-tree").should("have.class", "p-tree");
    cy.get(".p-tree").should("have.text", " No results found ");
  });

  it("2.Verify that all Components are visible in Add Cost Center Screen", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.clickTreeAddButton();
    CostCenter.verifyAddPanalLabels();
    CostCenter.verifyIsDetailCheckBox();
    CostCenter.verifyCostCenterCode();
    CostCenter.verifyCostCenterName();
    CostCenter.verifyParentCodeDropDownNotEmpty();
  });

  it("3.Validate The Cost Center Name Required Message", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.clickTreeAddButton();
    CostCenter.clickSaveButton();
    cy.contains("span", /required/i).should("be.visible");

    CostCenter.inputCostCenterName(AccountingData.costCenterName);
    cy.contains("span", /required/i).should("not.exist");

    CostCenter.clickSaveButton();
    CostCenter.verifyDialogeDisappears();
  });

  it("4.Verify Adding Parent Cost Centre On The Tree", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.clickTreeAddButton();
    CostCenter.inputCostCenterName(AccountingData.costCenterName);
    CostCenter.clickSaveButton();
    CostCenter.verifyDialogeDisappears();
    cy.reload();
    cy.wait(1500);
    cy.clickContinueAs();
    CostCenter.switchingToListMode();
    cy.navigateToTheLatestScreen();
    cy.verifyFirstCellInTable(1, AccountingData.costCenterName);
    cy.verifyLastCellParagraoghInTable(3, /main/i);
  });

  it("5.Verify Adding Detail Cost Centre On The Tree Without Assigned Parent Account", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.clickTreeAddButton();
    CostCenter.inputCostCenterName(AccountingData.costCenterName);
    CostCenter.clickIsDetailCheckBox();
    CostCenter.clickSaveButton();
    CostCenter.verifyDialogeDisappears();
    cy.reload();
    cy.wait(1500);
    cy.clickContinueAs();
    CostCenter.switchingToListMode();
    cy.navigateToTheLatestScreen();
    cy.verifyFirstCellInTable(1, AccountingData.costCenterName);
    cy.verifyLastCellParagraoghInTable(3, /detail/i);
  });

  it("6.Verify Adding Detail Cost Centre On The Tree with Selected Parent Code", () => {
    CostCenter.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    CostCenter.clickTreeAddButton();
    CostCenter.inputCostCenterName(AccountingData.costCenterName);
    CostCenter.selectParent();
    CostCenter.clickIsDetailCheckBox();
    CostCenter.clickSaveButton();
    CostCenter.verifyDialogeDisappears();
    cy.reload();
    cy.wait(1500);
    cy.clickContinueAs();
    CostCenter.switchingToListMode();
    cy.navigateToTheLatestScreen();
    cy.verifyFirstCellInTable(1, AccountingData.costCenterName);
    cy.verifyLastCellParagraoghInTable(3, /detail/i);
  });
});
