import { GeneralSettingsData } from "../../data/general_settings_data";
import { TaxsGroup } from "../pages/TaxsGroup";

describe("Add New Taxs Group", () => {
  beforeEach("Navigates to Taxs Group", () => {
    cy.visit(GeneralSettingsData.TaxGroupLink);
  });

  it("1.Verify all the components are displayed on the Add New Tax Group", () => {
    TaxsGroup.landing();
    cy.wait(1500);
    cy.reload();
    cy.wait(1000);
    TaxsGroup.clickAddNewButton();
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("name", /name/i);
  });

  it("2.Verify Displaying Of Required Messsages", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    TaxsGroup.clickAddNewButton();
    TaxsGroup.submitDialog();
    TaxsGroup.verifyRequiredMessages("2");
    cy.get(".pop_up_footer").invoke("hide");
    TaxsGroup.inputCode("123");
    TaxsGroup.verifyRequiredMessages("1");
    TaxsGroup.inputName("name");
    TaxsGroup.verifyInExistenceOfRequiredMessage();
  });

  it("3.Verify canceling Adding New Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    TaxsGroup.clickAddNewButton();
    TaxsGroup.inputCode(GeneralSettingsData.taxesGroupCode);
    TaxsGroup.inputName(GeneralSettingsData.taxesGroupName);
    TaxsGroup.cancelDialog();
    cy.wait(1000);
    cy.assertAfterItemEditedInListView();
  });

  it("4.Verify Adding New Taxes Group", () => {
    TaxsGroup.landing();
    cy.wait(2000);
    cy.getInitItemsCountInListView();
    TaxsGroup.clickAddNewButton();
    TaxsGroup.inputCode(GeneralSettingsData.taxesGroupCode);
    TaxsGroup.inputName(GeneralSettingsData.taxesGroupName);
    TaxsGroup.submitDialog();
    cy.wait(1000);
    cy.assertnewItemAddedToListView();
    cy.verifyFirstCellInTable(0, GeneralSettingsData.taxesGroupCode);
    cy.verifyFirstCellInTable(1, GeneralSettingsData.taxesGroupName);
  });
});
