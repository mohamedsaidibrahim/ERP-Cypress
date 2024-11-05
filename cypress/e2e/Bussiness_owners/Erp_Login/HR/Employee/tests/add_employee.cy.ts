import { HRData } from "../../data/hr_data";
import { Employee } from "../pages/employee";

describe("Add Employee", () => {
  beforeEach(() => {
    cy.visit(HRData.hrUrl);
  });
  it("1.Verify All components are displaying", () => {
    Employee.landing();
    cy.wait(1500);
    Employee.clickAddNewButton();
    // Verify Header
    cy.validateLabelTexts("label", HRData.addEmp1SectionsHeaders);
    cy.validateLabelTexts(
      'div[class="md:col-12 info"]',
      HRData.addEmp1TextLabels
    );
    cy.getByTestAttribute("attendanceCode").should("be.visible");
    cy.getByTestAttribute("employeeName").should("be.visible");
    cy.getByTestAttribute("birthDate").should("be.visible");
    cy.getByTestAttribute("birthCity").should("be.visible");
    cy.getByTestAttribute("gender").should("be.visible");
    cy.getByTestAttribute("maritalStatus").should("be.visible");
    cy.getByTestAttribute("religion").should("be.visible");
    cy.getByTestAttribute("militaryStatus")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestAttribute("militaryNumber")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestAttribute("bloodType").scrollIntoView().should("be.visible");
    cy.get('span[role="combobox"]').last().scrollIntoView();
    cy.get('span[role="combobox"]').should("have.length", 8);
    cy.get('p-checkbox[inputid="withSpecialNeedsCheckbox"]')
      .scrollIntoView()
      .should("be.visible");
    cy.verifyLabelText("withSpecialNeeds", /with special needs/i);
  });

  // // span[role="combobox"]

  // Country of Birth *
  // Birth City *
  // Nationality *
  // Gender
  // Marital Status *
  // Religion
  // Military Status *
  // Blood Type

  it("2.Verify Submitting new Employee The First Tab", () => {
    Employee.landing();
    cy.wait(1500);
    // Get Initial Count
    
    cy.getInitItemsCountInListView();
    Employee.clickAddNewButton();
    cy.zoomOut();
    // Not Required
    cy.getFirstItemInDropDownList("bloodType");
    cy.getByTestAttribute("militaryNumber")
      .scrollIntoView()
      .clear({ force: true })
      .type(HRData.militaryNumber);
    cy.get('p-checkbox[inputid="withSpecialNeedsCheckbox"]').click();
    // Required
    cy.getByTestAttribute("attendanceCode").clear().type(HRData.attendanceCode);
    cy.getByTestAttribute("employeeName").clear().type(HRData.employeeName);
    cy.getFirstItemInDropDownList("militaryStatus");
    cy.getFirstItemInDropDownList("gender");
    cy.getFirstElementDropDownList(2);
    cy.getFirstItemInDropDownList("religion");
    cy.getByTestAttribute("birthDate").scrollIntoView().click();
    cy.getByTestAttribute("birthDate").clear().type(HRData.birthDate);
    cy.selectCountryByIndex(0, "egy");
    cy.clickInputtedSearchDropDownList("birthCity", "cair");
    cy.getFirstItemInDropDownList("maritalStatus");
    Employee.clickSaveButton();
    // Assertion
    cy.wait(1000);
    
    cy.assertnewItemAddedToListView();
  });
});
