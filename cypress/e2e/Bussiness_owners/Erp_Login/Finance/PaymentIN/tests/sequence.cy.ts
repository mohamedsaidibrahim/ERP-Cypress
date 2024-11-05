import { FinanceData } from "../../data/finance_data";
import { PaymentIn } from "../pages/payment_in";
import { Sequence } from "../pages/sequence";

describe("Payment In (Seaquence)", () => {
  beforeEach(() => {
    cy.visit(FinanceData.PaymentInUrl);
  });

  it("1. Verify All Components Displaying", () => {
    PaymentIn.landing();
    cy.wait(500);
    cy.clickSequenceButton();
    cy.reload();
    cy.wait(3500);
    Sequence.verifyLabels();
    Sequence.verifyInitDimmedStatus();
    Sequence.verifyTableHeaders();
    Sequence.verifyDisplayingOfTheDefaultBranch();
  });

  it("2.Delete all inserted lines", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.clickSequenceButton();
    cy.reload();
    cy.wait(1500);
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").length > 0) {
        var count = $table.find("tbody tr").length;
        for (var c = 0; c < count; c++) {
          cy.clickFirstDeleteActionButton();
        }
      } else {
        cy.logMsg("There are not any inserted line");
      }
    });
    cy.clickSaveButton();
    Sequence.verifyDisplayingSerialNumberValidation();
    Sequence.addSequenceLineSerialNumber(0);
    Sequence.verifyNotExistanceSerialNumberValidation();
  });

  it("3. Verify Creating the Sequence with Serial number Validation", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.clickSequenceButton();
    cy.wait(1500);
    cy.reload();
    cy.wait(4000);
    cy.get("body").then(($body) => {
      cy.wrap($body);
    });
    // Sequence.changeSequenceType(2);
    // cy.clickSaveButton();
    // Sequence.verifyDisplayingSerialNumberValidation();

    // Sequence.changeSequenceType(0);

    cy.scrollToLastElementInTable();
    cy.getAllItemsCount("table", "tbody tr").then((max) => {
      var row1 = max;
      cy.logMsg("Row1: " + row1);
      Sequence.addSequenceLineText(row1);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row2 = max + 1;
      cy.logMsg("Row2: " + row2);
      Sequence.addSequenceLineYear(row2);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row3 = max + 2;
      cy.logMsg("Row3: " + row3);
      Sequence.addSequenceLineMonth(row3);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row4 = max + 3;
      cy.logMsg("Row4: " + row4);
      Sequence.addSequenceLineDay(row4);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row5 = max + 4;
      Sequence.addSequenceLineSeparator(row5);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row6 = max + 5;
      Sequence.addSequenceLineCompanyCode(row6);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row7 = max + 6;
      Sequence.addSequenceLineBranchCode(row7);
      cy.clickSaveButton();
      Sequence.verifyDisplayingSerialNumberValidation();

      var row8 = max + 7;
      Sequence.addSequenceLineSerialNumber(row8);
      cy.clickSaveButton();
      
      cy.get("body").then(($body) => {
        if ($body.find("div[role='dialog']").is(":visible")) {
          cy.get("div[role='dialog']")
            .find('[data-testid="save"]')
            .scrollIntoView()
            .click();
        }
      });
      Sequence.verifyNotExistanceSerialNumberValidation();
      Sequence.verifyDisplayingOfSuccessMessagen();
    });
  });

  it("Verify that the new Sequence is Saved Successfully", () => {
    PaymentIn.landing();
    cy.wait(1500);
    cy.clickSequenceButton();
    cy.wait(1500);
    cy.reload();
    cy.reload();
    cy.wait(4000);
    cy.reload();
    cy.wait(1500);

    cy.scrollToLastElementInTable();
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include(
          FinanceData.segmentText.substring(0, 2).toString()
        );
      });

    cy.get("tbody tr")
      .eq(1)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include("YYYY");
      });

    cy.get("tbody tr")
      .eq(2)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include("MM");
      });
    cy.get("tbody tr")
      .eq(3)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include("DD");
      });

    cy.get("tbody tr")
      .eq(4)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include(".");
      });
    cy.get("tbody tr")
      .eq(5)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include(FinanceData.companyCode);
      });

    cy.get("tbody tr")
      .eq(6)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1).to.include(FinanceData.branchCode);
      });

    cy.get("tbody tr")
      .eq(7)
      .find("td")
      .eq(2)
      .find("p")
      .invoke("text")
      .then((t1) => {
        expect(t1.trim().length).to.equal(FinanceData.serialNumber.length);
      });
  });
});
