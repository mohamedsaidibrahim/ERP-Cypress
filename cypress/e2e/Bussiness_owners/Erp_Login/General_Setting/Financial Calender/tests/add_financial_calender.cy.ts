import {
  getWrappedNumber,
  parseDate,
  isAscendingOrder,
} from "../../../../../../support/utils";
import { GeneralSettingsData } from "../../data/general_settings_data";
import { FinancialCallender } from "../pages/financial_calender";

describe("Financial Calender", () => {
  beforeEach(() => {
    cy.visit(GeneralSettingsData.FinancialCalenderUrl);
  });

  it("1.Verify All components are displaying", () => {
    FinancialCallender.landing();
    cy.wait(1500);
    FinancialCallender.clickAddNewButton();
    cy.verifyLabelText("year", /select year/i);
    cy.verifyLabelText("code", /code/i);
    cy.verifyLabelText("fromDate", /from date/i);
    cy.verifyLabelText("toDate", /to date/i);
    cy.verifyLabelText("name", /name/i);
  });

  it("2.Verify All the Add Screen has not any casehed data After Landing", () => {
    FinancialCallender.landing();
    FinancialCallender.clickAddNewButton();
    // Select Year
    cy.getByTestAttribute("year").find(".p-dropdown-label").should("have.class", "p-dropdown-label-empty");
    cy.getByTestAttribute("year").find(".p-dropdown-label").should("have.text", " ");
    // Code
    cy.get('[data-testid="code"]').should("be.visible");
    cy.get('[data-testid="code"]').should("be.disabled");
    cy.get('[data-testid="code"]').should("not.be.checked");
    // From Date
    cy.get('input[role="combobox"]').eq(0).should("not.have.value");
    // To Date
    cy.get('input[role="combobox"]').eq(1).should("not.have.value");
    // Name
    cy.get('[data-testid="name"]').should("be.visible");
    cy.get('[data-testid="name"]').should("be.enabled");
    cy.get('[data-testid="name"]').should("not.be.checked");
  });

  it("3.should display the text of the last Year in the readonly input", () => {
    FinancialCallender.landing();
    FinancialCallender.clickAddNewButton();
    FinancialCallender.clickSelectYearDropDownList();
    // Open the dropdown
    FinancialCallender.clickSelectYearDropDownList();
    FinancialCallender.verifyYearIsDisplayedInDimmedInput();
  });

  // Note: The Adjcent Valid Year from previos Submission should be the first Item in Dropdown List and should be itself selected
  it("4.Verify Submitting new Financial Calender", () => {
    FinancialCallender.landing();
    cy.wait(3000);
    
    cy.getInitItemsCountInListView();
    FinancialCallender.clickAddNewButton();
    cy.wait(1500);
    // Select Year
    FinancialCallender.clickSelectYearDropDownList();
    FinancialCallender.clearName();
    cy.contains("span", /required/i).should("be.visible");
    FinancialCallender.inputName();
    cy.get("@initCount").then((initCount) => {
      var initCountVal = getWrappedNumber(initCount);
      if (initCountVal > 0) {
        cy.log(
          "**************** initCountVal > 0 111111111111111111111111******************//"
        );
        FinancialCallender.inputFollowingToDate(1);
      } else {
        cy.log("**************** 22222222222222222222 ******************//");
        FinancialCallender.inputFollowingToDate(0);
      }
    });
    // Verify the Presence of the Required Validation
    FinancialCallender.clickGeneratePeriods();
    FinancialCallender.clickSaveButton();
    // Assertion
    cy.wait(2500);
    cy.visit(GeneralSettingsData.FinancialCalenderUrl);
    cy.clickContinueAs();
    cy.wait(1500);
    cy.zoomOut();
    cy.zoomIn();
    cy.wait(1500);
    cy.assertnewItemAddedToListView();
  });

  it("5.Displaying related data in ascending order based on Date from and Date To columns", () => {
    FinancialCallender.landing();
    cy.wait(3000);
    
    cy.getInitItemsCountInListView();
    FinancialCallender.clickAddNewButton();
    cy.wait(3000);
    cy.get("@initCount").then((initCount) => {
      var initCountVal = getWrappedNumber(initCount);
      if (initCountVal > 0) {
        FinancialCallender.inputFollowingToDate(1);
      } else {
        FinancialCallender.inputFollowingToDate(0);
      }
      FinancialCallender.clickGeneratePeriods();
      // Wait for the table to update (adjust timeout as needed)
      cy.wait(1000);
      // Verify that the table rows are displayed correctly
      cy.get("table").should("be.visible");
      
      cy.get("table").then(($table) => {
        if ($table.find("tbody").is(":visible")) {
          cy.wrap($table)
            .find("tbody")
            .then(($tbody) => {
              if ($tbody.find("tr").is(":visible")) {
                cy.wrap($tbody)
                  .find("tr")
                  .then((rows) => {
                    const dateFromValues = Cypress.$(rows)
                      .map((i, row) =>
                        parseDate(
                          Cypress.$(row).find("td").eq(3).text().trim(),
                          "yyyy-mm-dd"
                        )
                      )
                      .get() as Date[];
                    const dateToValues = Cypress.$(rows)
                      .map((i, row) =>
                        parseDate(
                          Cypress.$(row).find("td").eq(4).text().trim(),
                          "yyyy-mm-dd"
                        )
                      )
                      .get() as Date[];
                    // Check if both "Date from" and "Date To" columns are in ascending order
                    expect(isAscendingOrder(dateFromValues)).to.be.true;
                    expect(isAscendingOrder(dateToValues)).to.be.true;
                  });
              } else {
                cy.log("No Any ROW");
              }
            });
        } else {
          cy.log("The Table has not body");
        }
      });
    });
  });
});
