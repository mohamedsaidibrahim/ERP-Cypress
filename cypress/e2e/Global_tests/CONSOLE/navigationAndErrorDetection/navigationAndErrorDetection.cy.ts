import { loadPagesFromFile } from "../../Functions/helper";

// cypress/integration/navigationAndErrorDetection.spec.ts
describe("System Navigation and Error Detection", () => {
  let pagesToTest: string[] = [];

  before(() => {
    loadPagesFromFile("cypress/fixtures/pages_links.txt").then((pages: any) => {
      pagesToTest = pages;
      console.log("Loaded pages count: ", pagesToTest.length);
    });
  });

  // Function to check for console errors
  const checkForConsoleErrors = (pageLink: string) => {
    const moduleName = pageLink.split("/").pop()?.toString() || "";
    const errors: string[] = [];
    const logs: string[] = [];
    const improvements: string[] = [];

    cy.wait(1000);
    cy.LandingToERPModule(pageLink, moduleName);
    cy.wait(1000);

    cy.window().then((win) => {
      const originalConsoleError = win.console.error;
      // Overriding console.error to capture errors
      win.console.error = (...args) => {
        errors.push(...args);
        originalConsoleError.apply(win.console, args);
      };
      // Optional: You could also include logic to identify possible improvements here
      // e.g. checking for deprecated APIs, performance warnings, etc.
      // For this example, we'll assume a simple placeholder improvement.
      if (pageLink.includes("page1")) {
        improvements.push("Consider optimizing images on this page.");
      }
    });
    return { errors, improvements };
  };

  // Loop through the URLs
  it(`test each page for errors `, () => {
    pagesToTest.forEach((url) => {
      const results = checkForConsoleErrors(url);
      // Saving results to a JSON file
      const jsonData = {
        "Page Link": url,
        "Page Errors": results.errors,
        "Possible Improvements": results.improvements,
      };
      cy.writeFile(
        `cypress/results/page_errors/${url.replace(/[^a-zA-Z0-9]/g, "_")}.json`,
        jsonData
      );
    });
  });
});
