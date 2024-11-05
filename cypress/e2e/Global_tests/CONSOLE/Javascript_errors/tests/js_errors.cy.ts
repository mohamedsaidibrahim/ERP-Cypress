import { loadPagesFromFile } from "../../../Functions/helper";

// Store the errorResults of JavaScript errors
const errorResults: any = {};
const exceptions: any = {};

// Helper function to test a single page for JavaScript errors
const testPageForJSErrors = (page: string, jsErrors: string[]): void => {
  const moduleName = page.split("/").pop()?.toString() || "";
  cy.on("window:before:load", (win) => {
    cy.stub(win.console, "error").callsFake((msg) => {
      jsErrors.push(msg);
    });
  });
  cy.wait(1000);
  cy.LandingToERPModule(page, moduleName);
  cy.wait(1000);
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    exceptions[page] =
      err.message +
      "\n" +
      err.stack +
      "\n" +
      runnable.title +
      "\n" +
      runnable.fullTitle;
    return false;
  });
  cy.wait(2000);
  cy.then(() => {
    if (jsErrors.length > 0) {
      errorResults[page] = jsErrors;
    } else {
      errorResults[page] = "No errors";
    }
  });
};

describe("Check for JavaScript errors on system pages", () => {
  let pagesToTest: string[] = [];

  before(() => {
    loadPagesFromFile("cypress/fixtures/pages_links.txt").then((pages) => {
      pagesToTest = pages;
      console.log("Loaded pages count: ", pagesToTest.length);
    });
  });

  it("Should check for JavaScript errors on each page", () => {
    pagesToTest.forEach((page) => {
      let jsErrors: string[] = [];
      cy.wrap(null).then(() => {
        testPageForJSErrors(page, jsErrors);
      });
    });
  });
  afterEach(() => {
    cy.reload();
  });

  after(() => {
    // Save the errorResults to a JSON file
    const errorFilePath = "cypress/reports/javascript_pages_errors_report.json";
    const exceptionFilePath =
      "cypress/reports/javascript_pages_exceptions_report.json";

    cy.task("saveData", {
      fileType: "json",
      filePath: errorFilePath,
      data: errorResults,
    });
    cy.task("saveData", {
      fileType: "json",
      filePath: exceptionFilePath,
      data: exceptions,
    });
  });
});
