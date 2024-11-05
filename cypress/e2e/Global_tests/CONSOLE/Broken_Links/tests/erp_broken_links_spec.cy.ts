// cypress/integration/erp_broken_links_spec.ts

import { getRandomNumber } from "../../../../../support/utils";

describe("ERP System - Broken Links and Component Data", () => {
  let pages: string[] = [];

  before(() => {
    // Load URLs from the pages.txt file
    cy.readFile("cypress/fixtures/pages_links.txt").then((fileContent) => {
      pages = fileContent
        .split("\n")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0);
    });
  });


  it("should check links and save components data for all pages", () => {
    // Loop through each page
    pages.forEach((page) => {
      cy.wait(1000);
      console.log("***************** ${page} " + page);
      console.log("***************** 111 ${Checker} " + page.split("/").pop());
      cy.logMsg("111111111111111111111111111");
      var moduleName = page.split("/").pop()?.toString();
      cy.logMsg(page);
      cy.logMsg("moduleName: " + moduleName);
      cy.LandingToERPModule(page, moduleName ?? "");
      cy.wait(1500);
      var fileName = moduleName ?? "" + getRandomNumber(1, 5000);
      // Check for broken links and pass them to the extract function
      cy.checkPageLinks().then((brokenLinks) => {
        // Extract and save components data, along with the broken links and page URL
        cy.extractComponentsData(page, brokenLinks, fileName ?? "");
      });
    });
  });
});
