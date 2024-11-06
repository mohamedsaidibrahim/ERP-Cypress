import { InventoryData } from "../../../Inventory/data/inventory_data";
import { FinanceData } from "../../data/finance_data";
import { TreasuryDefinition } from "../pages/treasury_definition";

describe("Treasury Definition (edit)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.TreasuryDefinitionUrl);
  });

  it("1.Verify All components are displaying", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();  
    cy.zoomOut();
    cy.wait(3500);
    cy.verifyDimmidInput("code");
    // Verify Labels
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
    cy.verifyLabelText("currencyId", /currency/i);
    cy.verifyLabelText("branches", /branches/i);
    cy.verifyLabelText("accountId", /gl account/i);
    cy.get('label[for="openingBalance"]')
      .first()
      .should("include", /opening account balance/i);
    cy.get('label[for="openingBalance"]')
      .last()
      .should("include", /treasury opening balance/i);
  });

  it("2.Verify Submitting new Treasury Definition", () => {
    TreasuryDefinition.landing();
    cy.getInitItemsCountInListView();
    cy.clickFirstEditActionButton();   
    cy.zoomOut();
    cy.wait(3500);
    cy.clickInputtedSearchDropDownList("accountId",FinanceData.edittedAccount);
    cy.clickInputtedSearchDropDownList(
      "currencyId",
      FinanceData.correctCurrency
    );
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    // TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    cy.assertAfterItemEditedInListView();
    cy.verifyFirstCellInTable(1, FinanceData.treasuryName);
    cy.get("table tbody")
      .find("tr")
      .first()
      .find("td")
      .eq(2)
      .then(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((txtEx) => {
            expect(txtEx.trim().split(" ").join("")).to.include(
              FinanceData.correctCurrency.substring(1)
            );
          });
      });
    cy.verifyFirstCellInTable(3, FinanceData.edittedAccount);
  });

  it("3.Verify Required Validation and The name Field is Required", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();
    cy.zoomOut();
    cy.wait(3500);
    cy.contains("span", /required/i).should("not.exist");
    cy.getByTestAttribute("name").clear();
    cy.contains("span", /required/i).should("be.visible");
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    cy.contains("span", /required/i).should("not.exist");
  });

  it("4.Verify Different Currency Validation", () => {
    TreasuryDefinition.landing();
    cy.clickFirstEditActionButton();
    cy.zoomOut();
    cy.wait(3500);
    cy.clickInputtedSearchDropDownList("currencyId", FinanceData.wrongCurrency);
    cy.getByTestAttribute("name").clear().type(FinanceData.treasuryName);
    cy.clickInputtedSearchDropDownList("accountId",FinanceData.edittedAccount);
    // TreasuryDefinition.inputOpeningBalance();
    TreasuryDefinition.clickSaveButton();
    cy.get('div[role="dialog"]').should("be.visible");
  });

});
