import { FinanceData } from "../../data/finance_data";
import { PaymentMethods } from "../pages/payment_methods";

describe("Payment Methods  (Edit)", () => {
  
  beforeEach(() => {
    cy.visit(FinanceData.PaymentMethodsUrl);
  });

  it("1.Verify All components are displaying", () => {
    PaymentMethods.landing();
    cy.wait(3000);
    cy.clickFirstEditActionButton();
    cy.wait(6000);
    // Verify Header
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
    cy.verifyLabelText("paymentPlace", /payment place/i);
    cy.verifyLabelText("paymentMethodType", /payment method type/i);
    cy.verifyLabelText("bankId", /related bank/i);
    cy.verifyLabelText("bankAccountId", /bank account/i);
    cy.verifyLabelText("currency", /currency/i);
    cy.verifyLabelText("commissionType", /commission type/i);
    cy.verifyLabelText("commissionValue", /commission value/i);
    cy.verifyLabelText("commissionAccountId", /commission account/i);
    cy.verifyLabelText("allowVAT", /allow vat/i);
  });

  it('2.Verify Submitting Editted The "Commision Options" Only', () => {
    PaymentMethods.landing();
    cy.wait(3000);
    cy.clickFirstEditActionButton();
    cy.wait(6000);
    cy.verifyDimmidInput("code");
    cy.verifyDimmidInput("name");
    cy.verifyDimmidItemDropDownList("paymentPlace");
    cy.verifyDimmidItemDropDownList("paymentMethodType");
    cy.verifyDimmidItemDropDownList("bankId");
    cy.verifyDimmidItemDropDownList("bankAccountId");
    cy.verifyDimmidInput("currency");
    // Commision Options
    cy.getLastItemInDropDownList("commissionType").then(($commissionType) => {
      if ($commissionType != null) {
        cy.wrap($commissionType)
          .invoke("text")
          .then((commissionTypeTxt) => {
            cy.log("commissionTypeTxt::: " + commissionTypeTxt);
            cy.wrap(commissionTypeTxt).as("commissionTypeTxt");
          });
      } else {
        cy.wrap("").as("commissionTypeTxt");
      }
    });
    cy.getLastItemInDropDownList("commissionAccountId").then(
      ($commissionAccountId) => {
        if ($commissionAccountId != null) {
          cy.wrap($commissionAccountId)
            .invoke("text")
            .then((commissionAccountIdTxt) => {
              cy.log("commissionAccountIdTxt::: " + commissionAccountIdTxt);
              cy.wrap(commissionAccountIdTxt).as("commissionAccountIdTxt");
            });
        } else {
          cy.wrap("").as("commissionAccountIdTxt");
        }
      }
    );
    PaymentMethods.inputCommissionValue();
    cy.get('input[formcontrolname="allowVAT"]').click();
    PaymentMethods.clickSaveButton();
    cy.wait(1500);
  });

  it("3.verify all fields have the Dimed Status if the Place is Treasury OR Method is CHeck", () => {
    PaymentMethods.landing();
    cy.wait(3000);
    cy.clickFirstEditActionButton();
    cy.wait(6000);
    cy.verifyDimmidInput("code");
    cy.verifyDimmidInput("name");
    cy.verifyDimmidItemDropDownList("paymentPlace");
    cy.verifyDimmidItemDropDownList("paymentMethodType");
    cy.verifyDimmidItemDropDownList("bankId");
    cy.verifyDimmidItemDropDownList("bankAccountId");
    cy.verifyDimmidInput("currency");
    cy.verifyDimmidItemDropDownList("commissionType");
    cy.verifyDimmidItemDropDownList("commissionAccountId");
    cy.verifyDimmidInput("commissionValue");
  });
});
