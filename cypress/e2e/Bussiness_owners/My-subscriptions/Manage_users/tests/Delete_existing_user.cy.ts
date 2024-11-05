import { trimText } from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { ManageUsers } from "../pages/manage_users";

describe("Delete Existing User", () => {
  beforeEach(
    'Verify that the system navigates to Users list when user clicks "Manage User" in the subdomain card',
    () => {
      LoginPage.visit();
      cy.clickContinueAs();
      cy.wait(1000);
      ManageUsers.clickFirstManageUsers();
    }
  );

  it("1.Verify That The User Can Cancel in the confirmation Pop up", () => {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get("table tbody tr")
          .eq(0)
          .find("td")
          .eq(1)
          .invoke("text")
          .then((tMail) => {
            cy.wrap(tMail.trim()).as("tMail1");
          });
        cy.getInitItemsCountInListView();
        ManageUsers.clickDeleteOnTheLastUser();
        //  Verify The Components of Cancel Pop up
        // ManageUsers.verifyTheComponentsOfCancelPopup();
        //  Click Cancel Button
        ManageUsers.cancelTheDeletePopUp();
        //  Verify that No Data is Deleted
        cy.get("@tMail1").then((tMail1) => {
          cy.get("table tbody tr")
            .eq(0)
            .find("td")
            .eq(1)
            .scrollIntoView()
            .invoke("text")
            .then((tMail2) => {
              expect(trimText(tMail1.toString().trim())).to.equal(
                trimText(tMail2)
              );
            });
        });
        cy.assertItemDeletedFromListView();
      } else {
        cy.log("Table is Empty");
      }
    });
  });

  it("2.Verify That The User Can Delete The User From Delete Button on The User Row an Action. ", () => {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.get("tbody tr")
          .last()
          .find("td")
          .eq(1)
          .invoke("text")
          .then((tMail) => {
            cy.wrap(tMail.trim()).as("tMail1");
          });
        
        
        cy.getInitItemsCountInListView();
        ManageUsers.clickDeleteOnTheLastUser();
        cy.confirmDeletePopUp();
        //  Verify that No Data is Deleted
        cy.get("@tMail1").then((tMail1) => {
          cy.get("tbody tr")
            .last()
            .find("td")
            .eq(1)
            .scrollIntoView()
            .invoke("text")
            .then((tMail2) => {
              expect(trimText(tMail1.toString().trim())).not.to.equal(
                trimText(tMail2)
              );
            });
        });
        cy.assertItemDeletedFromListView();
      } else {
        cy.log("Table is Empty");
      }
    });
  });
});
