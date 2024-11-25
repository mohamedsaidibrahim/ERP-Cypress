import { trimText } from "../../../../../support/utils";
import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { EditCompanyScreen } from "../../Manage_companies/pages/editCompanyScreenAct";
import { BranchesManagmentData } from "../data/branches_managment__data";
import { BranchesManagment } from "../pages/branches_management";

describe("Display All Branches", () => {
  beforeEach("Navigate", () => {
    LoginPage.visit();
    cy.clickContinueAs();
    cy.wait(1000);
    EditCompanyScreen.clickLastManageCompanies();
    EditCompanyScreen.clickFirstCompanyToEdit();
    EditCompanyScreen.clickBranchesTab();
  });

  it("1. Verift that all the table COLUMNS Headers ARE Successfully displayed", () => {
    cy.verifyCorrectColumnsHeaders(BranchesManagmentData.tableHeaders);
  });

  it("2. Verify That All Branches are Displayed Under Branches Tab.", () => {
    cy.get("table").then((table) => {
      cy.wrap(table).find("th").eq(0).contains(/code/i).should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(1)
        .contains(/branch name/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(2)
        .contains(/branch region/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(3)
        .contains(/branch city/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(4)
        .contains(/branch address/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(5)
        .scrollIntoView()
        .contains(/phone/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(6)
        .scrollIntoView()
        .contains(/branch email/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(7)
        .scrollIntoView()
        .contains(/status/i)
        .should("be.visible");
      cy.wrap(table)
        .find("th")
        .eq(8)
        .scrollIntoView()
        .contains(/actions/i)
        .should("be.visible");
    });
  });

  it.skip("3. Checks if a row row has right data is inserted and the table  increases by one after submitting new data", () => {
    cy.logMsg("Before Submission");
    
    cy.getInitItemsCountInListView();
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(1)
      .invoke("text")
      .then((tName1) => {
        cy.wrap(tName1.trim()).as("tName1");
      });
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(2)
      .invoke("text")
      .then((tRegion1) => {
        cy.wrap(tRegion1.trim()).as("tRegion1");
      });
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(3)
      .invoke("text")
      .then((tCity1) => {
        cy.wrap(tCity1.trim()).as("tCity1");
      });
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(4)
      .invoke("text")
      .then((tAddress1) => {
        cy.wrap(tAddress1.trim()).as("tAddress1");
      });
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(5)
      .invoke("text")
      .then((tPhone1) => {
        cy.wrap(tPhone1.trim()).as("tPhone1");
      });
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(6)
      .invoke("text")
      .then((tMail1) => {
        cy.wrap(tMail1.trim()).as("tMail1");
      });
    //  Submit A new Branch
    BranchesManagment.implementAddNewBranch();
    BranchesManagment.clickSaveButton();
    //  After Submission
    cy.wait(500);
    cy.reload();
    cy.wait(500);
    cy.get("@tName1").then((tName1) => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(1)
        .scrollIntoView()
        .invoke("text")
        .then((tName2) => {
          expect(trimText(tName1.toString().trim())).not.to.equal(
            trimText(tName2)
          );
        });
    });
    cy.get("@tRegion1").then((tRegion1) => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(2)
        .scrollIntoView()
        .invoke("text")
        .then((tRegion2) => {
          expect(trimText(tRegion1.toString().trim())).not.to.equal(
            trimText(tRegion2)
          );
        });
    });
    cy.get("@tCity1").then((tCity1) => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(3)
        .scrollIntoView()
        .invoke("text")
        .then((tCity2) => {
          expect(trimText(tCity1.toString().trim())).not.to.equal(
            trimText(tCity2)
          );
        });
    });
    cy.get("@tAddress1").then((tAddress1) => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(1)
        .scrollIntoView()
        .invoke("text")
        .then((tAddress2) => {
          expect(trimText(tAddress1.toString().trim())).not.to.equal(
            trimText(tAddress2)
          );
        });
    });
    cy.get("@tPhone1").then((tPhone1) => {
      cy.get("table tbody tr")
        .last()
        .find("td")
        .eq(1)
        .scrollIntoView()
        .invoke("text")
        .then((tPhone2) => {
          expect(trimText(tPhone1.toString().trim())).not.to.equal(
            trimText(tPhone2)
          );
        });
    });
    cy.get("@tMail1").then((tMail1) => {
      cy.get("table tbody tr")
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
    
    cy.assertnewItemAddedToListView();
  });

  it("4. Checks if the last row has the newly correct data values after submitting new data", () => {
    cy.verifyFirstCellInTable(1, BranchesManagmentData.branchName);
    cy.verifyFirstCellInTable(2, BranchesManagmentData.branchRegion);
    cy.verifyFirstCellInTable(3, BranchesManagmentData.branchCity);
    cy.verifyFirstCellInTable(4, BranchesManagmentData.branchAddress);
    cy.verifyFirstCellInTable(5, BranchesManagmentData.mobileNumber);
    cy.verifyFirstCellInTable(6, BranchesManagmentData.branchMail);
    BranchesManagment.checkVisibilityOfEditIcon();
    BranchesManagment.checkVisibilityOfDeleteIcon();
  });

  it("5. Verify That The User Can cancel Delete Branch From Cancel Button on Delete Branch Dialog.", () => {
    BranchesManagment.clickDeleteTheLastItem();
    BranchesManagment.CancelDeleteBranchDialog();
  });

  it("6. Verify That The User Can Delete Branch From Delete Button on Each Branch Row.", () => {
    cy.wait(1000);
    
    cy.getInitItemsCountInListView();
    //  Perform Delete Branch
    BranchesManagment.clickDeleteTheLastItem();
    BranchesManagment.ConfirmDeleteBranchDialog();
    cy.reload();
    cy.get("table tbody tr").should("be.visible");
    
    cy.assertItemDeletedFromListView();
  });
});
