// import { generateRandomString, getWrappedNumber } from "../../../../../../support/utils";
// import { GeneralSettingsData } from "../../data/general_settings_data";
// import { CurrencyDefinitions } from "../pages/currency_definition";

// describe("Currency Definitions (Add)", () => {
//     beforeEach(() => {
//         cy.visit(GeneralSettingsData.CurrencyDefinitionsUrl);
//     });
//     it("1.Verify All components are displaying", () => {
//         CurrencyDefinitions.landing();
//         cy.wait(1500);
//         cy.clickAddNewButton();
//         // Verify Header
//         cy.contains(
//             'span',
//             /add Currency Definitions/i
//         ).should("be.visible");
//         // Verify Labels
//         cy.verifyLabelText("code", /currency code/i);
//         cy.verifyLabelText("name", /currency name/i);
//         cy.verifyLabelText("subUnit", /currency subunit/i);
//         cy.verifyLabelText("symbol", /currency symbol/i);
//         cy.verifyLabelText("countryCode", /currency country/i);
//         cy.verifyLabelText("currency difference account", /differenceAccount/i);
//         // Verify The Dimmed Code
//         cy.getByTestAttribute("code").should("be.visible");
//         cy.getByTestAttribute("code").should("have.class", "read")
//         cy.getByTestAttribute("code").should("have.attr", "readonly")
//         cy.getByTestAttribute("code").should("have.attr", "disabled");
//         cy.getByTestAttribute("name").should("be.visible");
//         cy.getByTestAttribute("subUnit").should("be.visible");
//         cy.getByTestAttribute("symbol").should("be.visible");
//         cy.getByTestAttribute("differenceAccount").should("be.visible");
//         // Verify All Dropdown Buttons
//         cy.get('span[role="combobox"]').should('have.length', 2);
//         // Verify Save Button
//         cy.getByTestAttribute("save").should("be.visible");
//         // Verify Cancel Button
//         cy.getByTestAttribute("cancel").should("be.visible");

//     });

//     it("2.Verify Submitting new Currency Definitions", () => {
//         CurrencyDefinitions.landing();
        
//          cy.getAllItemsCount("table", "tbody tr").then((initCount) => {
//             cy.wrap(initCount).as("initCount");
//         });
//         cy.clickAddNewButton();
//         cy.getFirstElementDropDownList(0);
//         cy.getFirstItemInDropDownList("differenceAccount");
//         cy.getByTestAttribute("name").clear().type(generateRandomString(7));
//         cy.getByTestAttribute("subUnit").clear().type(GeneralSettingsData.cSubunit);
//         cy.getByTestAttribute("symbol").clear().type(GeneralSettingsData.cSymbol);
//         CurrencyDefinitions.clickSaveButton();
//         // Assertion
//         cy.wait(1000);
//         cy.reload();
//         cy.wait(1000);
//         cy.clickContinueAs();
//         cy.wait(1000);
        
//         cy.get("@initCount").then((initCount) => {
//              cy.getAllItemsCount("table", "tbody tr").then((finalCount) => {
//                 expect(finalCount).to.equal(getWrappedNumber(initCount) + 1);
//             });
//         });
//     });
//     it("3.Verify Cancel Submitting new Currency Definitions", () => {
//         CurrencyDefinitions.landing();
        
//          cy.getAllItemsCount("table", "tbody tr").then((initCount) => {
//             cy.wrap(initCount).as("initCount");
//         });
//         cy.clickAddNewButton();
//         cy.get('span[role="combobox"]').eq(1).click();
//         cy.getFirstElementDropDownList(0);
//         cy.getFirstItemInDropDownList("differenceAccount");
//         cy.getByTestAttribute("name").clear().type(generateRandomString(7));
//         cy.getByTestAttribute("subUnit").clear().type(GeneralSettingsData.cSubunit);
//         cy.getByTestAttribute("symbol").clear().type(GeneralSettingsData.cSymbol);
//         CurrencyDefinitions.clickCancelButton();
//         // Assertion
//         cy.wait(1000);
//         cy.reload();
//         cy.wait(1000);
//         cy.clickContinueAs();
//         cy.wait(1000);
        
//         cy.get("@initCount").then((initCount) => {
//              cy.getAllItemsCount("table", "tbody tr").then((finalCount) => {
//                 expect(finalCount).to.equal(getWrappedNumber(initCount));
//             });
//         });
//     });
//     it("4.Verify Required Validation and The name Field is Required", () => {
//         CurrencyDefinitions.landing();
//         cy.clickAddNewButton();
//         cy.contains('span', /required/i).should('not.exist');
//         CurrencyDefinitions.clickSaveButton();
//         cy.contains('span', /required/i).should('have.length',3);
//         cy.get('span[role="combobox"]').eq(1).click();
//         cy.getFirstElementDropDownList(0);
//         cy.contains('span', /required/i).should('have.length',2);
//         cy.getFirstItemInDropDownList("differenceAccount");
//         cy.contains('span', /required/i).should('have.length');
//         cy.getByTestAttribute("name").clear().type(generateRandomString(7));
//         cy.contains('span', /required/i).should('not.exist'); 
//         CurrencyDefinitions.clickSaveButton();
//         cy.wait(1500);
//         cy.get('div[role="dialog"]').should('not.exist');
//     });
// });