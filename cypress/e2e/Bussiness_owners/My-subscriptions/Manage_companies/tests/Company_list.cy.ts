import { getWrappedString } from "./../../../../../support/utils";
import { CompanyList } from "../pages/company_list";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { EditCompanyScreen } from "../pages/editCompanyScreenAct";

describe("Company List", () => {
  beforeEach(
    '0.Verify that the system navigates to Company list when user clicks "Manage Companies" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
      EditCompanyScreen.clickLastManageCompanies();
    }
  );

  it("1.Verify That All The Component of The Grid are Displayed (Rows and Columns)", () => {
    cy.get("table thead tr th").eq(0).should("include", /Code/i);
    cy.get("table thead tr th")
      .eq(1)
      .should("include", /Companies Name/i);
    cy.get("table thead tr th")
      .eq(2)
      .should("include", /Companies Type/i);
    cy.get("table thead tr th")
      .eq(3)
      .should("include", /Tax ID/i);
    cy.get("table thead tr th")
      .eq(4)
      .should("include", /Commercial ID/i);
    cy.get("table thead tr th").eq(5).should("include", /Phone/i);
    cy.get("table thead tr th")
      .eq(6)
      .should("include", /Status/i);
    cy.get("table thead tr th")
      .eq(7)
      .should("include", /Actions/i);
  });

  it.skip("2.Verify That The Cells Under Status Column is Actionable (Radio Button)", () => {
    cy.wait(2000);
    cy.get("table").then(($table) => {
      cy.wrap($table)
        .find("tbody tr")
        .last()
        .find("td")
        .eq(6)
        .scrollIntoView()
        .then(($lastActions) => {
          if (
            $lastActions
              .find('p[class="inactive body_b16 ng-star-inserted"]')
              .is(":visible")
          ) {
            cy.wrap("inactive").as("initStatus");
          } else if (
            $lastActions
              .find('p[class="active body_b16 ng-star-inserted"]')
              .is(":visible")
          ) {
            cy.wrap("active").as("initStatus");
          } else {
            cy.log("No Actions are Visible");
          }
        });
      CompanyList.clickLastActivationSliderListView();
      CompanyList.confirmChangeStatusPopUp();
      EditCompanyScreen.clickFirstCompanyToEdit();
      cy.get('div[class="edit_company_page"]').then(($EditScreen) => {
        if (
          $EditScreen
            .find('p[class="inactive body_b16 ng-star-inserted"]')
            .is(":visible")
        ) {
          cy.wrap("inactive").as("finalStatus");
        } else if (
          $EditScreen
            .find('p[class="active body_b16 ng-star-inserted"]')
            .is(":visible")
        ) {
          cy.wrap("active").as("finalStatus");
        } else {
          cy.log("No Activation is Visible in Edit Screen");
        }
      });
      cy.get("@initStatus").then((initStatus) => {
        cy.get("@finalStatus").then((finalStatus) => {
          expect(getWrappedString(initStatus)).not.to.equal(
            getWrappedString(finalStatus)
          );
        });
      });
    });
  });

  it("3.Verify That The Edit is navigate To The Edit Company of The Company Represent on This Row.", () => {
    CompanyList.clickToNavigateCompanyEdit();
  });

  it("4.Verify That The Paginator is Successfully Displayed.", () => {
    CompanyList.CheckPaginator();
  });
});
