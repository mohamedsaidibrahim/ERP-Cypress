// Import dependencies
import "cypress-axe";
import { urls } from "../../../../../support/Constants/pages_urls";

// Cypress test suite
describe("Accessibility Tests for All Pages", () => {
  const results = [];

  // Step 1: Perform login and store token (assuming login returns a token)
  before(() => {
    cy.login(); // Ensure that your custom login command works properly
  });

  // Step 2: Loop through URLs and run accessibility tests
  urls.forEach((url) => {
    it(`should run accessibility tests on page: ${url}`, () => {
      const violationResource = {};
      violationResource["Page URL"] = url;

      // Navigate to the page
      if (!url.includes("2004") && !url.includes("2006")) {
        var keyword = url;
        cy.LandingToERPAccessability(url, keyword);
      } else {
        cy.visitAndWait(url, 1000);
      }

      // Inject axe for accessibility testing
      cy.injectAxe();

      // Run the accessibility audit
      cy.checkA11y(null, null, (violations) => {
        // Store violations without failing the test
        violationResource["Violation Count"] = violations.length;

        if (violations.length > 0) {
          violationResource["Violations"] = violations.map(({ id, impact, description, nodes }) => ({
            ViolationID: id,
            Impact: impact,
            Description: description,
            AffectedNodes: nodes.length,
            NodeDetails: nodes.map(node => node.html)
          }));
        } else {
          violationResource["Violations"] = "No accessibility violations found.";
        }

        // Save violation resource to results
        results.push(violationResource);
      });
    });
  });

  after("Save the output report", () => {
    // Save the results as a JSON file
    const directoryPath = "cypress/results/Accessibility/";
    const outputFile = "AccessibilityTestingReport.json";

    // Ensure the directory exists and save the results
    cy.task("checkOrCreateDirectory", directoryPath).then(() => {
      if (results && results.length > 0) {
        return cy.task("saveData", {
          fileType: "json",
          filePath: `${directoryPath}${outputFile}`,
          data: results,
        });
      } else {
        throw new Error("Results are empty or invalid.");
      }
    });
  });
});
