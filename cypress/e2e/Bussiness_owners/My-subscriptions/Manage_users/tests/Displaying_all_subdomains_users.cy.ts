import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { ManageUsers } from "../pages/manage_users";

describe("verify Displaying All Subdomain's Users", () => {
  beforeEach(
    'Verify that the system navigates to Users list when user clicks "Manage User" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
      ManageUsers.clickFirstManageUsers();
    }
  );
  it("1.Verify That All The Component of The Grid are Displayed (Rows and Columns)", () => {
    cy.get("table").then(($table) => {
      if ($table.find("thead tr").is(":visible")) {
        // Verify Column Headers
        cy.get("tr th").eq(0).should("include", /name/i);
        cy.get("tr th").eq(1).should("include", /mail/i);
        cy.get("tr th")
          .eq(2)
          .should("include", /last login date/i);
        cy.get("tr th")
          .eq(3)
          .should("include", /licence/i);
        cy.get("tr th")
          .eq(4)
          .should("include", /status/i);
        cy.get("tr th")
          .eq(5)
          .should("include", /actions/i);
      } else {
        cy.log("Missing Table");
      }
    });
  });

  it("2.Verify That The screen Has Search Text Field That Enable The User To Filter or Search For Some Users.", () => {
    cy.verifySearchFunctionalityDots();
  });

  it("3.Verify That The User Can Resend THe Email Invitation", () => {
    //  Check That the first row in the table has Resend Button then click it
    ManageUsers.verifyDisplayingResendButton();
    ManageUsers.clickResendButton();
  });
});
