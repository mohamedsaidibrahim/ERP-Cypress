// cypress/integration/erp_broken_links_spec.ts

import { getRandomNumber } from "../../../../../support/utils";
const brokenLinksData: any = [];

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
      // Extract all links from the page
      cy.get('a').each(($link) => {
        const linkUrl = $link.attr('href');

        if (linkUrl && linkUrl.startsWith('http')) {
          // Check if the link is valid
          cy.checkLink(linkUrl).then((status) => {
            if (status >= 400) {
              // Link is broken, collect wrapping components data
              let wrappingComponents = '';

              // Collect wrapping components data
              cy.wrap($link).parentsUntil('body').each(($parent) => {
                wrappingComponents += $parent.prop('tagName').toLowerCase() + ' > ';
              });

              // Trim trailing ' > '
              wrappingComponents = wrappingComponents.slice(0, -3);

              // Push broken link data to the array
              brokenLinksData.push({
                page: page,
                brokenLink: linkUrl,
                wrappingComponents: wrappingComponents
              });
            }
          });
        }
        else {
          cy.logMsg("The Link URL is Correct ::: " + linkUrl);
        }
      });
    });
  });

  after(() => {
    if (brokenLinksData.length > 0) {
      cy.task('saveData', { fileType: 'csv', filePath: 'cypress/reports/broken_links_report.csv', data: brokenLinksData });
    } else {
      cy.logMsg("The brokenLinksData is Empty");
    }
  });

});
