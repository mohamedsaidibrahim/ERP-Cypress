/// <reference types="cypress" />

// List of All Customized Generated Commands [index]
/*
checkAllOptions
clickExportIconButton
clickAddNewButton
clickFirstEditActionButton
clickLastDeleteActionButton
clickFirstDeleteActionButton
confirmDeletePopUp
cancelDeletePopUp
verifyLabelText
validateLabelTexts
getByTestAttribute
checkAndNavigate
login
loginSession
clickContinueAs
logOut
removeDimmedStatus
clickInputtedSearchDropDownList
verifyDimmidItemDropDownList
getLastItemInDropDownList
getFirstItemInDropDownList
getCountOfDetailAccount
getCountOfParentAccount
getCountOfCardsinGrid
findAppCardAndValidate
displayingInvalidEmailMessage
displayingRequiredMessage
increaseScreenItemsMaxCount
navigateToTheLatestScreen
scrollToElement
scrollToLastElement
verifyCorrectColumnsHeaders
getFirstCellInTableValue
getLastCellInTableValue
verifyFirstCellInTable
verifyLastCellInTable
verifyFirstCellInTableNotEqual
verifyLastCellInTableNotEqual
verifyCustomCellInTable
verifyLastCellParagraoghInTable
verifyText
verifyPlaceholderText
inputText
checkRegExInCompatibility
checkRegExCompatibility
visibilityOfRequiredStar
validateRequiredComponents
getAllItemsCount
checkImageVisibilityBySrc
zoomOut
zoomIn
getMaxDateFromColumnAndAddOneDay
validateTableHeaders
verifySearchFunctionality
verifySearchFunctionalityDots
getFirstElementDropDownList
landing
clickInputtedSearchDropDownList
selectCountryByIndex
getLastElementDropDownList
getFirstItemInDropDownList
getLastItemInDropDownList
verifyDisplayingTheRequiredValidationMsgsCount
confirmEmailRegExCompatibility
verifyNotExistanceTheRequiredValidation
clickFirstErpLogin
hideDialogFooter
displayDialogFooter
inputFollowingToDate
verifyPlaceholderValueAttr
*/
// cypress/support/commands.ts
// cypress/support/commands.ts

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to check for broken links on a page and return an array of broken links.
     * @param brokenLinks - Callback function to process the broken links
     */
    checkPageLinks(): Chainable<Array<LinkIssue>>;
  }
}

// Define the type for the broken links
interface LinkIssue {
  link: string;
  status: number;
}

// Define the Cypress command
Cypress.Commands.add("checkPageLinks", () => {
  const linksWithIssues: Array<LinkIssue> = [];
  cy.get("a")
    .each((link) => {
      const href = link.prop("href");
      if (href) {
        cy.request({ url: href, failOnStatusCode: false }).then((response) => {
          if (response.status < 200 || response.status >= 400) {
            linksWithIssues.push({ link: href, status: response.status });
          }
        });
      }
    })
    .then(() => {
      // Return the array of broken links
      return cy.wrap(linksWithIssues);
    });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    extractComponentsData(
      pageUrl: string,
      brokenLinks: Array<any>,
      fileName: string
    ): Chainable<any>;
  }
}

// cypress/support/commands.ts

Cypress.Commands.add(
  "extractComponentsData",
  (pageUrl: string, brokenLinks: Array<any>, fileName: string) => {
    const components: any = [];
    // Collect all buttons, inputs, text areas, etc.
    cy.get("body").then(($body) => {
      if ($body.find("button").is(":visible")) {
        cy.get("button").each(($btn) => {
          components.push({ type: "button", text: $btn.text() });
        });
      } else {
        cy.logMsg("button Not Visible");
      }
      if ($body.find("input").is(":visible")) {
        cy.get("input").each(($input) => {
          components.push({
            type: "input",
            name: $input.attr("name"),
            value: $input.val(),
          });
        });
      } else {
        cy.logMsg("input Not Visible");
      }
      if ($body.find("textarea").is(":visible")) {
        cy.get("textarea").each(($textarea) => {
          components.push({
            type: "textarea",
            name: $textarea.attr("name"),
            value: $textarea.val(),
          });
        });
      } else {
        cy.logMsg("textarea Not Visible");
      }
      if ($body.find("select").is(":visible")) {
        cy.get("select").each(($select) => {
          components.push({ type: "select", name: $select.attr("name") });
        });
      } else {
        cy.logMsg("select Not Visible");
      }
    });
    const output = {
      page: pageUrl,
      brokenLinks: brokenLinks,
      components: components,
    };
    const sanitizedFileName = fileName.replace(/[:\/?]/g, "_");
    cy.saveDataToFile(sanitizedFileName, output);
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    saveDataToFile(fileName: any, data: any): Chainable<any>;
  }
}
Cypress.Commands.add("saveDataToFile", (fileName, data) => {
  const directoryPath = "cypress/results/";

  // Ensure the directory exists
  cy.task("checkOrCreateDirectory", directoryPath).then(() => {
    const sanitizedFileName = fileName.replace(/[:\/?]/g, "_");

    // Use the task to save the file
    if (data.length > 0) {
      cy.task("saveData", {
        fileType: "json",
        filePath: "${directoryPath}${sanitizedFileName}.json",
        data: data,
      });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickCellInATable(rowIndex: number, colIndex: number): Chainable<any>;
  }
}

Cypress.Commands.add(
  "clickCellInATable",
  (rowIndex: number, colIndex: number) => {
    cy.get("tbody").then(($tbody) => {
      if ($tbody.find("tr").is(":visible")) {
        cy.wrap($tbody).find("tr").eq(rowIndex).find("td").eq(colIndex).click();
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    clickLastCellInATable(colIndex: number): Chainable<any>;
  }
}

Cypress.Commands.add("clickLastCellInATable", (colIndex: number) => {
  cy.get("tbody").then(($tbody) => {
    if ($tbody.find("tr").is(":visible")) {
      cy.wrap($tbody).find("tr").last().find("td").eq(colIndex).click();
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    clickAddNewLine(): Chainable<any>;
  }
}
Cypress.Commands.add("clickAddNewLine", () => {
  cy.contains("button", /Add New Line/i)
    .scrollIntoView()
    .click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickFirstEditActionButton(): Chainable<any>;
  }
}

Cypress.Commands.add("clickFirstEditActionButton", () => {
  cy.get("table").should("be.visible");
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.getByTestAttribute("table_button_edit")
        .first()
        .scrollIntoView()
        .click({ force: true });
    } else {
      cy.log("Table is Empty");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickLastDeleteActionButton(): Chainable<any>;
  }
}

Cypress.Commands.add("clickLastDeleteActionButton", () => {
  cy.wait(1500);
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.getByTestAttribute("table_button_delete").last().scrollIntoView();
      cy.getByTestAttribute("table_button_delete")
        .last()
        .scrollIntoView()
        .click();
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    clickFirstDeleteActionButton(): Chainable<any>;
  }
}

Cypress.Commands.add("clickFirstDeleteActionButton", () => {
  cy.wait(1500);
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.getByTestAttribute("table_button_delete").first().scrollIntoView();
      cy.getByTestAttribute("table_button_delete")
        .first()
        .scrollIntoView()
        .click();
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    checkAllMultiSelect(index: number): Chainable<any>;
  }
}
Cypress.Commands.add("checkAllMultiSelect", (index: number) => {
  cy.get('div[class="p-multiselect-label p-placeholder"]')
    .eq(index)
    .click({ force: true });
  cy.wait(1500);
  cy.get('div[class="p-checkbox-box"]').first().click({ force: true });
  cy.wait(1000);
  // cy.get("body").click({ force: true });
  // cy.get('timesicon[class="p-element p-icon-wrapper ng-star-inserted"]').first().click({ force: true });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    checkTheLastOfMultiOptions(): Chainable<any>;
  }
}
Cypress.Commands.add("checkTheLastOfMultiOptions", () => {
  cy.get('div[class="p-multiselect-label p-placeholder"]')
    .first()
    .click({ force: true });
  cy.wait(1500);
  cy.get('div[class="p-checkbox-box"]').last().click({ force: true });
  cy.wait(1000);
  cy.get("body").click({ force: true });
  // cy.get('timesicon[class="p-element p-icon-wrapper ng-star-inserted"]').first().click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    unCheckTheFirstOfMultiOptions(): Chainable<any>;
  }
}
Cypress.Commands.add("unCheckTheFirstOfMultiOptions", () => {
  cy.wait(1000);
  cy.get('timescircleicon[data-pc-section="clearicon"]')
    .first()
    .scrollIntoView();
  cy.get('timescircleicon[data-pc-section="clearicon"]').first().click();
  cy.wait(1000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickExportIconButton(): Chainable<any>;
  }
}
Cypress.Commands.add("clickExportIconButton", () => {
  cy.get('img[class="exportImg"]').should("be.visible").click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickAddNewButton(): Chainable<any>;
  }
}
Cypress.Commands.add("clickAddNewButton", () => {
  cy.contains("button", /create/i).scrollIntoView().click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickSequenceButton(): Chainable<any>;
  }
}

Cypress.Commands.add("clickSequenceButton", () => {
  cy.getByTestAttribute("sequence").click();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    getInitItemsCountInListView(): Chainable<any>;
  }
}

Cypress.Commands.add("getInitItemsCountInListView", () => {
  cy.increaseScreenItemsMaxCount(100);
  cy.getAllItemsCount("table", "tbody tr").then((initCount) => {
    cy.wrap(initCount).as("initCount");
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    assertnewItemAddedToListView(): Chainable<any>;
  }
}

Cypress.Commands.add("assertnewItemAddedToListView", () => {
  cy.increaseScreenItemsMaxCount(100);
  cy.get("@initCount").then((initCount) => {
    cy.getAllItemsCount("table", "tbody tr").then((finalCount) => {
      expect(finalCount).to.equal(getWrappedNumber(initCount) + 1);
    });
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    assertAfterItemEditedInListView(): Chainable<any>;
  }
}

Cypress.Commands.add("assertAfterItemEditedInListView", () => {
  cy.increaseScreenItemsMaxCount(100);
  cy.get("@initCount").then((initCount) => {
    cy.getAllItemsCount("table", "tbody tr").then((finalCount) => {
      expect(finalCount).to.equal(getWrappedNumber(initCount));
    });
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    assertItemDeletedFromListView(): Chainable<any>;
  }
}
Cypress.Commands.add("assertItemDeletedFromListView", () => {
  cy.increaseScreenItemsMaxCount(100);
  cy.get("@initCount").then((initCount) => {
    cy.getAllItemsCount("table", "tbody tr").then((finalCount) => {
      expect(finalCount).to.equal(getWrappedNumber(initCount) - 1);
    });
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    logMsg(str: any): Chainable<any>;
  }
}
Cypress.Commands.add("logMsg", (str: any) => {
  cy.log("*****" + str + "*****");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    clickSaveButton(): Chainable<any>;
  }
}
Cypress.Commands.add("clickSaveButton", () => {
  cy.getByTestAttribute("save").scrollIntoView().click();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    clickDialogSaveButton(): Chainable<any>;
  }
}
Cypress.Commands.add("clickDialogSaveButton", () => {
  cy.get('div[role="dialog"]')
    .find('[data-testid="save"]')
    .scrollIntoView()
    .click();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyDialogCancelButton(): Chainable<any>;
  }
}
Cypress.Commands.add("verifyDialogCancelButton", () => {
  cy.get('div[role="dialog"]')
    .find('[data-testid="cancel"]')
    .scrollIntoView()
    .should("be.visible");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    clickDialogCancelButton(): Chainable<any>;
  }
}
Cypress.Commands.add("clickDialogCancelButton", () => {
  cy.get('div[role="dialog"]')
    .find('[data-testid="cancel"]')
    .scrollIntoView()
    .click();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    confirmDeletePopUp(): Chainable<any>;
  }
}
Cypress.Commands.add("confirmDeletePopUp", () => {
  cy.get('div[role="dialog"]').contains("button", /yes/i).scrollIntoView();
  cy.get('div[role="dialog"]')
    .contains("button", /yes/i)
    .click({ force: true });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    InvisiblityofAddEditDialoge(): Chainable<any>;
  }
}
Cypress.Commands.add("InvisiblityofAddEditDialoge", () => {
  cy.get('div[role="dialog"]').should("not.exist");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    cancelDeletePopUp(): Chainable<any>;
  }
}
Cypress.Commands.add("cancelDeletePopUp", () => {
  cy.contains("button", /cancel/i).should("be.visible");
  cy.contains("button", /cancel/i).click();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyLabelText(forAttr: string, txt: any): Chainable<any>;
  }
}
Cypress.Commands.add("verifyLabelText", (forAttr: string, txt: any) => {
  cy.get("label[for=" + forAttr + "]")
    .scrollIntoView()
    .should("include", txt);
});
declare namespace Cypress {
  interface Chainable<Subject> {
    inputFollowingToDate(attr: string): Chainable<any>;
  }
}
Cypress.Commands.add("inputFollowingToDate", (attr: string) => {
  cy.getByTestAttribute(attr).scrollIntoView().click();
  cy.get('button[aria-label="Choose Year"]').first().scrollIntoView().click();
  cy.get('button[aria-label="Next Decade"]').first().scrollIntoView().click();
  cy.get('span[tabindex="-1"]').eq(0).scrollIntoView().click();
  cy.get('span[tabindex="-1"]').eq(0).scrollIntoView().click();
  cy.contains("td span", /16/i).scrollIntoView().click();
  cy.wait(1000);
});
declare namespace Cypress {
  interface Chainable<Subject> {
    validateLabelTexts(selctr: any, expectedTextList: any): Chainable<any>;
  }
}
Cypress.Commands.add(
  "validateLabelTexts",
  (selctr: any, expectedTextList: any) => {
    cy.get(selctr).each(($label, index) => {
      const labelText = $label.text().trim();
      const expectedText = expectedTextList.find((text: any) =>
        labelText.includes(text)
      );
      if (!expectedText) {
        cy.log("Error: Label text " + labelText + " not found in expected list");
      }
      const labelElement = $label[0];
      if (
        labelElement.getBoundingClientRect().top < 0 ||
        labelElement.getBoundingClientRect().bottom > window.innerHeight
      ) {
        cy.scrollTo("top", labelElement.offsetTop);
        cy.wait(200);
      }
    });
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestAttribute(el: String): Chainable<any>;
  }
}
Cypress.Commands.add("getByTestAttribute", (el: String) => {
  return cy.get("[data-testid=" + el + "]");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    logOut(): Chainable<any>;
  }
}
Cypress.Commands.add("logOut", () => {
  cy.get('button[class="btn_profaile"]').then(($el) => {
    if ($el.is(":visible")) {
      cy.wrap($el).click();
      cy.wait(500);
      cy.get('button[class="log_link"]').should("be.visible").click();
    } else {
      cy.log("Element is not visible");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    removeDimmedStatus(el: JQuery<HTMLElement>): Chainable<any>;
  }
}
Cypress.Commands.add("removeDimmedStatus", (el: JQuery<HTMLElement>) => {
  cy.wrap(el).invoke("removeAttr", "readonly");
  cy.wrap(el).invoke("removeAttr", "disabled");
  cy.wrap(el).as("el");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyDimmidInput(attr: string): Chainable<any>;
  }
}
Cypress.Commands.add("verifyDimmidInput", (attr: string) => {
  cy.getByTestAttribute(attr).should("have.attr", "readonly");
  cy.getByTestAttribute(attr).should("have.attr", "disabled");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyDimmidItemDropDownList(attr: string): Chainable<any>;
  }
}
Cypress.Commands.add("verifyDimmidItemDropDownList", (attr: string) => {
  // cy.getByTestAttribute(attr).scrollIntoView();
  cy.getByTestAttribute(attr).click({ multiple: true, force: true });
  cy.wait(1500);
  cy.get('[role="listbox"]').should("not.exist");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getCountOfDetailAccount(): Chainable<any>;
  }
}

Cypress.Commands.add("getCountOfDetailAccount", () => {
  var c = 0;
  cy.get(".p-tree").then(($tree) => {
    if ($tree.find(".p-treenode-content").is(":visible")) {
      cy.get(".p-treenode-content").each(($treenode) => {
        if ($treenode.is(":visible")) {
          if (
            $treenode.find('span[class="file ng-star-inserted"]').is(":visible")
          ) {
            cy.wrap($treenode)
              .find('span[class="file ng-star-inserted"]')
              .last()
              .scrollIntoView();
            cy.wrap($treenode)
              .find('span[class="file ng-star-inserted"]')
              .its(length)
              .then((fileLen1) => {
                c = c + parseInt(fileLen1.toString().trim());
              });
          } else {
            cy.log("There are not any Detail Cost Centers in The Tree");
          }
        }
      });
    } else {
      cy.log("The Tree is in Visible");
    }
    cy.wrap(c).as("count");
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    getCountOfParentAccount(): Chainable<any>;
  }
}

Cypress.Commands.add("getCountOfParentAccount", () => {
  cy.get(".p-tree").then((tree) => {
    let parentCount = 0;
    if (tree.find(".p-treenode-content").is(":visible")) {
      cy.get(".p-treenode-content").each(($treenode) => {
        if ($treenode.is(":visible")) {
          if (
            $treenode
              .find('span[class="folder ng-star-inserted"]')
              .is(":visible")
          ) {
            cy.wrap($treenode)
              .find('span[class="folder ng-star-inserted"]')
              .last()
              .scrollIntoView();
            // Expand all parent nodes
            $treenode.find("button").each(($togglerButton) => {
              cy.wrap($togglerButton).click(); // Assuming clicking the folder icon expands the node
            });
            // Scroll to the last node
            cy.wrap(tree)
              .find('span[class="folder ng-star-inserted"]')
              .last()
              .scrollIntoView();
            // Count all parent nodes
            cy.wrap(tree)
              .find('span[class="folder ng-star-inserted"]')
              .each(() => {
                parentCount++;
              })
              .then(() => {
                cy.log("Number of parent nodes: ", parentCount);
                return parentCount;
              });
          }
        } else {
          cy.log("There are not any Parent Cost Centers in the Tree");
        }
      });
    } else {
      cy.log("The Tree is in Visible");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getCountOfCardsinGrid(
      parentElement: string,
      gridElement: string
    ): Chainable<any>;
  }
}

Cypress.Commands.add(
  "getCountOfCardsinGrid",
  (parentElement: string, gridElement: string) => {
    cy.get(parentElement).then(($body) => {
      if ($body.find(gridElement).length > 0) {
        cy.get(gridElement).then((elements) => {
          cy.wrap(elements.length).as("domainAppCountsInit");
        });
      } else {
        const domainAppCountsInit = 0;
        cy.wrap(domainAppCountsInit).as("domainAppCountsInit");
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    findAppCardAndValidate(
      subdomain: string,
      expectedPrice: any
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "findAppCardAndValidate",
  (subdomain: string, expectedPrice: any) => {
    cy.get('div[class="data_body"] div[class="grid"]').each(($el) => {
      cy.wrap($el)
        .find('div[class="item col-2"]')
        .first()
        .should("contain", subdomain);
      cy.wrap($el)
        .find('div[class="item col-2"]')
        .next()
        .should("contain", expectedPrice);
      return false;
    });
  }
);

const trimTextFun = (text: string) => text.replace(/\s/g, "");

declare namespace Cypress {
  interface Chainable<Subject> {
    displayingInvalidEmailMessage(): Chainable<any>;
  }
}

Cypress.Commands.add("displayingInvalidEmailMessage", () => {
  cy.get(".errorMessage").should(
    "have.text",
    " Invalid Email Address, the pattern should be :ABC@cba.com "
  );
});

declare namespace Cypress {
  interface Chainable<Subject> {
    verifyDisplayingTheRequiredValidationMsgsCount(
      cout: number
    ): Chainable<any>;
  }
}

Cypress.Commands.add(
  "verifyDisplayingTheRequiredValidationMsgsCount",
  (cout: number) => {
    cy.get('div[class="error ng-star-inserted"]').last().scrollIntoView();
    cy.get('div[class="error ng-star-inserted"]').should("have.length", cout);
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    verifyNotExistanceTheRequiredValidation(): Chainable<any>;
  }
}

Cypress.Commands.add("verifyNotExistanceTheRequiredValidation", () => {
  cy.wait(1000);
  cy.get('div[class="error ng-star-inserted"]').should("not.exist");
});
declare namespace Cypress {
  interface Chainable<Subject> {
    displayingRequiredMessage(): Chainable<any>;
  }
}

Cypress.Commands.add("displayingRequiredMessage", () => {
  cy.get("span")
    .contains(/required/i)
    .should("be.visible");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    increaseScreenItemsMaxCount(count: number): Chainable<any>;
  }
}
Cypress.Commands.add("increaseScreenItemsMaxCount", (count: number) => {
  cy.get("table").then(($table) => {
    if ($table.find("tbody").is(":visible")) {
      cy.get("table")
        .find("tr")
        .then((rows) => {
          const itemCount = rows.length;
          cy.log("itemCount ::::: " + itemCount);
          if (itemCount > 25) {
            cy.get('span[aria-label="Rows per page"]').scrollIntoView();
            cy.get('span[aria-label="Rows per page"]').click({ force: true });
            cy.get('li[role="option"]')
              .last()
              .scrollIntoView()
              .should("exist")
              .click({ force: true });
          } else {
            cy.zoomOut();
          }
        });
    } else {
      cy.log("Table is not Exist OR is Empty ");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    navigateToTheLatestScreen(): Chainable<any>;
  }
}
Cypress.Commands.add("navigateToTheLatestScreen", () => {
  cy.get("table").then(($table) => {
    if ($table.find("tbody").is(":visible")) {
      cy.get("tbody").then((tbody) => {
        if (tbody.find("tr").is(":visible")) {
          cy.wrap(tbody).find("tr").last().scrollIntoView();
          if (tbody.find("tr").length >= 10) {
            cy.get("p-paginator").then((paginator) => {
              if (
                paginator.find('button[aria-label="Last Page"]').is(":visible")
              ) {
                cy.get('button[aria-label="Last Page"]').click({ force: true });
              }
            });
          } else {
            cy.log("the count of rows less than 10");
          }
        }
      });
    } else {
      cy.log("Table is not Exist OR is Empty ");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    scrollToElement(
      containerSelector: string,
      elementSelector: string
    ): Chainable<any>;
  }
}

Cypress.Commands.add(
  "scrollToElement",
  (containerSelector: string, elementSelector: string) => {
    cy.get(containerSelector).within(() => {
      cy.get(elementSelector).scrollIntoView().should("be.visible");
    });
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    scrollToLastElementInTable(): Chainable<any>;
  }
}

Cypress.Commands.add("scrollToLastElementInTable", () => {
  cy.get("table").then(($table) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.get("tr").last().scrollIntoView();
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    verifyCorrectColumnsHeaders(expectedHeaders: string[]): Chainable<any>;
  }
}
Cypress.Commands.add(
  "verifyCorrectColumnsHeaders",
  (expectedHeaders: string[]) => {
    const trimTextFun = (text: any) => text.replace(/\s/g, "");
    // Select the table headers
    cy.get("table th").each((header, index) => {
      // Verify the trimmed text of each header
      cy.wrap(header)
        .invoke("text")
        .then((text) => {
          expect(trimTextFun(text)).to.equal(
            trimTextFun(expectedHeaders[index])
          );
        });
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    getFirstCellInTableValue(col: number): Chainable<any>;
  }
}
Cypress.Commands.add("getFirstCellInTableValue", (col: number) => {
  cy.get("table").should("be.visible");
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.get("tbody").then(($bodyT: any) => {
        cy.navigateToTheLatestScreen();
        if ($bodyT.find("tr").first().find("td").eq(col).is(":visible")) {
          cy.wrap($bodyT)
            .find("tr")
            .first()
            .find("td")
            .eq(col)
            .then(($el: any) => {
              cy.wrap($el).invoke("text").as("txt");
            });
        } else {
          cy.wrap($bodyT)
            .find("tr")
            .first()
            .find("td")
            .eq(col)
            .scrollIntoView();
          cy.wrap($bodyT)
            .find("tr")
            .first()
            .find("td")
            .eq(col)
            .invoke("text")
            .then(($el: any) => {
              cy.wrap($el).invoke("text").as("txt");
            });
        }
      });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getLastCellInTableValue(col: number): Chainable<any>;
  }
}
Cypress.Commands.add("getLastCellInTableValue", (col: number) => {
  cy.get("table").should("be.visible");
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      cy.get("tbody").then(($bodyT: any) => {
        cy.navigateToTheLatestScreen();
        if ($bodyT.find("tr").last().find("td").eq(col).is(":visible")) {
          cy.wrap($bodyT)
            .find("tr")
            .last()
            .find("td")
            .eq(col)
            .then(($el: any) => {
              cy.wrap($el).invoke("text").as("txt");
            });
        } else {
          cy.wrap($bodyT).find("tr").last().find("td").eq(col).scrollIntoView();
          cy.wrap($bodyT)
            .find("tr")
            .last()
            .find("td")
            .eq(col)
            .invoke("text")
            .then(($el: any) => {
              cy.wrap($el).invoke("text").as("txt");
            });
        }
      });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    verifyFirstCellInTable(index: number, txt: any): Chainable<any>;
  }
}
Cypress.Commands.add("verifyFirstCellInTable", (index: number, txt: any) => {
  cy.get("table").should("be.visible");
  cy.get("table tbody").then(($bodyT: any) => {
    if ($bodyT.find("tr").is(":visible")) {
      cy.get("table tbody")
        .find("tr")
        .first()
        .scrollIntoView()
        .find("td")
        .eq(index)
        .scrollIntoView()
        .should("be.visible");
      cy.get("table tbody")
        .find("tr")
        .first()
        .find("td")
        .eq(index)
        .then(($el) => {
          cy.wrap($el)
            .invoke("text")
            .then((txtEx) => {
              expect(removeSpacesBetween(txtEx)).to.equal(
                removeSpacesBetween(txt)
              );
            });
        });
    } else {
      cy.log("Row is not visible");
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyLastCellInTable(index: number, txt: any): Chainable<any>;
  }
}
Cypress.Commands.add("verifyLastCellInTable", (index: number, txt: any) => {
  cy.get("table").should("be.visible");
  cy.get("table tbody").then(($bodyT: any) => {
    if ($bodyT.find("tr").is(":visible")) {
      cy.get("table tbody").find("tr").last().scrollIntoView();
      cy.get("table tbody")
        .find("tr")
        .last()
        .scrollIntoView()
        .find("td")
        .eq(index)
        .scrollIntoView()
        .should("be.visible");
      cy.get("table tbody")
        .find("tr")
        .last()
        .find("td")
        .eq(index)
        .then(($el) => {
          cy.wrap($el)
            .invoke("text")
            .then((txtEx) => {
              expect(removeSpacesBetween(txtEx)).to.equal(
                removeSpacesBetween(txt)
              );
            });
        });
    } else {
      cy.log("Row is not visible");
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyFirstCellInTableNotEqual(index: number, txt: any): Chainable<any>;
  }
}
Cypress.Commands.add(
  "verifyFirstCellInTableNotEqual",
  (index: number, txt: any) => {
    cy.get("table").should("be.visible");
    cy.get("table").then(($tableT: any) => {
      if ($tableT.find("tbody").is(":visible")) {
        cy.wrap($tableT)
          .find("tbody")
          .then(($tbody: any) => {
            if ($tbody.find("tr").is(":visible")) {
              cy.wrap($tbody)
                .find("tr")
                .first()
                .find("td")
                .eq(index)
                .should("be.visible");
              cy.wrap($tbody)
                .find("tr")
                .first()
                .find("td")
                .eq(index)
                .then(($el) => {
                  cy.wrap($el)
                    .invoke("text")
                    .then((txtEx) => {
                      expect(txtEx.split(" ").join("")).not.to.equal(
                        txt.split(" ").join("")
                      );
                    });
                });
            } else {
              cy.log("Row is not visible");
            }
          });
      }
    });
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    verifyCustomCellInTable(
      rowIndex: number,
      cellIndex: number,
      txt: any
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "verifyCustomCellInTable",
  (rowIndex: number, cellIndex: number, txt: any) => {
    cy.get("table").should("be.visible");
    cy.get("tbody").then(($bodyT: any) => {
      if ($bodyT.find("tr").is(":visible")) {
        cy.get("table tbody")
          .find("tr")
          .eq(rowIndex)
          .scrollIntoView()
          .find("td")
          .eq(cellIndex)
          .scrollIntoView()
          .should("have.text", txt);
        // .invoke("text")
        // .then((cellTxt) => {
        //   expect(cellTxt).to.include(txt);
        // });
      } else {
        cy.log("Row is not visible");
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyCustomCellInTablePcelleditor(
      rowIndex: number,
      cellIndex: number,
      txt: any
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "verifyCustomCellInTablePcelleditor",
  (rowIndex: number, cellIndex: number, txt: any) => {
    cy.get("table").should("be.visible");
    cy.get("tbody").then(($bodyT: any) => {
      if ($bodyT.find("tr").is(":visible")) {
        cy.get("table tbody")
          .find("tr")
          .eq(rowIndex)
          .scrollIntoView()
          .find("td")
          .eq(cellIndex)
          .find("p-celleditor")
          .scrollIntoView()
          .invoke("text")
          .then((cellTxt) => {
            expect(cellTxt).to.include(txt);
          });
      } else {
        cy.log("Row is not visible");
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyLastCellParagraoghInTable(index: number, txt: any): Chainable<any>;
  }
}
Cypress.Commands.add(
  "verifyLastCellParagraoghInTable",
  (index: number, txt: any) => {
    cy.get("table").should("be.visible");
    cy.get("tbody").then(($bodyT: any) => {
      if ($bodyT.find("tr").is(":visible")) {
        cy.wrap($bodyT)
          .find("tr")
          .last()
          .find("td")
          .eq(index)
          .find("p")
          .should("be.visible")
          .and("include", txt);
      } else {
        cy.log("Row is not visible");
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyText(attr: string, str: string): Chainable<any>;
  }
}

Cypress.Commands.add("verifyText", (attr: string, str: string) => {
  cy.getByTestAttribute(attr)
    .invoke("val")
    .then((val1) => {
      expect(removeSpacesBetween(val1)).to.include(removeSpacesBetween(str));
    });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyPlaceholderText(num: number, str: string): Chainable<any>;
  }
}

Cypress.Commands.add("verifyPlaceholderText", (num: number, str: string) => {
  cy.get("input[disabled]")
    .eq(num)
    .scrollIntoView()
    .should("exist")
    .invoke("attr", "placeholder")
    .then((placeholderText) => {
      expect(placeholderText).to.exist; // Check if the placeholder exists
      expect(removeSpacesBetween(placeholderText)).to.equal(
        removeSpacesBetween(str)
      );
    });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    wrapPlaceholderValueAttr(attr: string): Chainable<string>;
  }
}

Cypress.Commands.add("wrapPlaceholderValueAttr", (attr: string) => {
  cy.getByTestAttribute(attr)
    .scrollIntoView()
    .should("exist")
    .invoke("attr", "placeholder")
    .then((placeholderText) => {
      expect(placeholderText).to.exist; // Check if the placeholder exists
      cy.wrap(placeholderText); // Wrap and return the placeholder text
    });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyPlaceholderValueAttr(
      attr: string,
      index: number,
      txt: string
    ): Chainable<string>;
  }
}

Cypress.Commands.add(
  "verifyPlaceholderValueAttr",
  (attr: string, index: number, txt: string) => {
    cy.getByTestAttribute(attr)
      .eq(index)
      .scrollIntoView()
      .should("exist")
      .invoke("attr", "placeholder")
      .then((placeholderText) => {
        expect(placeholderText).to.exist; // Check if the placeholder exists
        expect(placeholderText).to.include(txt);
      });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    wrapDisabledPlaceholderValue(num: number): Chainable<string>;
  }
}

Cypress.Commands.add("wrapDisabledPlaceholderValue", (num: number) => {
  cy.get("input[disabled]")
    .eq(num)
    .scrollIntoView()
    .should("exist")
    .invoke("attr", "placeholder")
    .then((placeholderText) => {
      expect(placeholderText).to.exist; // Check if the placeholder exists
      cy.wrap(placeholderText); // Wrap and return the placeholder text
    });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifyDisabledPlaceholderValue(num: number, val: any): Chainable<string>;
  }
}

Cypress.Commands.add(
  "verifyDisabledPlaceholderValue",
  (num: number, val: any) => {
    cy.get("input[disabled]")
      .eq(num)
      .scrollIntoView()
      .should("exist")
      .invoke("attr", "placeholder")
      .then((placeholderText) => {
        expect(placeholderText).to.exist; // Check if the placeholder exists
        expect(placeholderText).to.include(val); // Wrap and return the placeholder text
      });
  }
);
const getWrappedNumber = (x: JQuery<HTMLElement>) => {
  var i = 0;
  if (x != null) {
    i = parseInt(trimText(x.toString()).trim());
  }
  return i;
};
declare namespace Cypress {
  interface Chainable<Subject> {
    inputText(attr: string, str: string): Chainable<any>;
  }
}

Cypress.Commands.add("inputText", (attr: string, str: string) => {
  cy.getByTestAttribute(attr).click({ force: true });
  cy.getByTestAttribute(attr).clear().type(str);
});
declare namespace Cypress {
  interface Chainable<Subject> {
    checkRegExInCompatibility(
      fieldSelector: string,
      inputStr: string,
      regEx: RegExp
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "checkRegExInCompatibility",
  (fieldSelector: string, inputStr: string, regEx: RegExp) => {
    cy.get(fieldSelector)
      .clear()
      .type(inputStr)
      .invoke("val")
      .then((val) => {
        expect(val).not.to.match(regEx);
      });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    checkRegExCompatibility(
      fieldSelector: string,
      inputStr: string,
      regEx: RegExp
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "checkRegExCompatibility",
  (fieldSelector: string, inputStr: string, regEx: RegExp) => {
    cy.get(fieldSelector)
      .clear()
      .type(inputStr)
      .invoke("val")
      .then((val) => {
        expect(val).to.match(regEx);
      });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    confirmEmailRegExCompatibility(
      fieldSelector: string,
      validEmail: string
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "confirmEmailRegExCompatibility",
  (fieldSelector: string, validEmail: string) => {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var invalid1 = "mdas@";
    var invalid2 = "mffsdfsa@ddd.";
    var invalid3 = "ffdsf.com";
    var inValidLSt = [invalid1, invalid2, invalid3];
    for (var i = 0; i < inValidLSt.length; i++) {
      cy.get(fieldSelector)
        .clear()
        .type(inValidLSt[i])
        .invoke("val")
        .then((val) => {
          expect(val).not.to.match(emailRegex);
        });
    }
    cy.get(fieldSelector)
      .clear()
      .type(validEmail)
      .invoke("val")
      .then((val) => {
        expect(val).to.match(emailRegex);
      });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    visibilityOfRequiredStar(fieldSelector: string): Chainable<any>;
  }
}
Cypress.Commands.add("visibilityOfRequiredStar", (fieldSelector: string) => {
  cy.get(fieldSelector).should("contain", "*");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    validateRequiredComponents(len: number): Chainable<any>;
  }
}
Cypress.Commands.add("validateRequiredComponents", (len: number) => {
  cy.get("span.errorMessage.ng-star-inserted").should("have.length", len);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getAllItemsCount(
      gridSelector: string,
      itemSelector: string
    ): Chainable<number>;
  }
}

Cypress.Commands.add(
  "getAllItemsCount",
  (gridSelector: string, itemSelector: string) => {
    // Ensure the grid exists
    cy.wait(1500);
    cy.get("body").then(($body) => {
      if ($body.find(gridSelector).is(":visible")) {
        cy.get(gridSelector).then((parent) => {
          if (parent.find(itemSelector).is(":visible")) {
            cy.get(gridSelector).find(itemSelector).last().scrollIntoView();
            // Get the count of items and return it
            return cy
              .get(gridSelector)
              .find(itemSelector)
              .its("length")
              .then((updatedCount) => {
                return updatedCount; // Return the count directly
              });
          } else {
            cy.log("The Main gridSelector is not visible");
            return 0;
          }
        });
      } else {
        cy.log("The Main gridSelector is not visible");
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    checkImageVisibilityBySrc(imgSrc: string): Chainable<any>;
  }
}

Cypress.Commands.add("checkImageVisibilityBySrc", (imgSrc) => {
  cy.get("img[src=" + imgSrc + "]").should("be.visible");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    zoomOut(): Chainable<any>;
  }
}

Cypress.Commands.add("zoomOut", () => {
  cy.viewport(1920, 1080);
  // Adjust the zoom level using JavaScript with type assertion
  cy.window().then((win) => {
    (win.document.body.style as any).zoom = "95%"; // Zoom out to 80%
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    zoomIn(): Chainable<any>;
  }
}

Cypress.Commands.add("zoomIn", () => {
  // Adjust the zoom level using JavaScript with type assertion
  cy.viewport(800, 600); // Adjust the dimensions as needed to simulate zooming in
  cy.viewport(
    Cypress.config("viewportWidth"),
    Cypress.config("viewportHeight")
  );
});
function getMaximumDatePlusOneYear(dates: any) {
  // Find the maximum date
  const maxDate = new Date(
    Math.max(...dates.map((date: any) => date.getTime()))
  );
  // Add one year to the maximum date
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  // Return the date plus one year in "YYYY-MM-DD" format
  const year = maxDate.getFullYear();
  // const month = (maxDate.getMonth() + 1).toString().padStart(2, "0");
  const month = (maxDate.getMonth() + 1).toString();
  // const day = maxDate.getDate().toString().padStart(2, "0");
  const day = maxDate.getDate().toString();
  const nextYearDate = "${year}-${month}-${day}";
  return cy.wrap(nextYearDate);
}
declare namespace Cypress {
  interface Chainable<Subject> {
    getMaxDateFromColumnAndAddOneDay(): Chainable<any>;
  }
}
Cypress.Commands.add("getMaxDateFromColumnAndAddOneDay", () => {
  const dates: any = [];
  cy.get("table").should("be.visible");
  cy.get("table").then((table) => {
    if (table.find("tbody").is(":visible")) {
      cy.get("tbody").then((tbody) => {
        if (tbody.find("tr").is(":visible")) {
          cy.wrap(tbody)
            .find("tr")
            .its("length")
            .then((rowsCount) => {
              for (var i = 0; i < rowsCount; i++) {
                cy.wrap(tbody)
                  .find("tr td")
                  .eq(i)
                  .invoke("val")
                  .then((cellTxt: any) => {
                    const dateText = cellTxt.trim();
                    if (dateText) {
                      dates.push(new Date(dateText));
                      cy.log(
                        "if getMaxDateFromColumnAndAddOneDay dates " + dates
                      );
                    }
                  });
              }
            });
        } else {
          cy.log("TBody Rows are not Visible");
        }
      });
    } else {
      cy.log("TBody ia not Visible");
    }
  });
  cy.log("return getMaxDateFromColumnAndAddOneDay dates " + dates);
  getMaximumDatePlusOneYear(dates);
});
declare namespace Cypress {
  interface Chainable<Subject> {
    validateTableHeaders(
      headerSelector: string,
      expectedHeaders: any
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "validateTableHeaders",
  (headerSelector: string, expectedHeaders: any) => {
    // Select the table headers and validate each one
    cy.get(headerSelector).each((header, index) => {
      cy.wrap(header).invoke("text").should("contains", expectedHeaders[index]);
    });
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    verifySearchFunctionality(): Chainable<any>;
  }
}
Cypress.Commands.add("verifySearchFunctionality", () => {
  // Get the search input and type a search term
  cy.get("table").should("be.visible");
  cy.get("table").then(($table) => {
    if ($table.find("tbody tr").length > 1) {
      cy.getLastCellInTableValue(1).then((last1) => {
        cy.get('input[placeholder="Search"]')
          .clear()
          .type(last1.trim() + "{enter}");
        cy.wrap(last1).as("last1");
      });
      cy.wait(500);
      cy.get("@last1").then((last1) => {
        cy.verifyFirstCellInTable(1, getWrappedString(last1));
      });
      cy.get('input[placeholder="Search"]').clear();
      cy.wait(500);
      cy.getFirstCellInTableValue(1).then((first1) => {
        cy.get('input[placeholder="Search"]')
          .clear()
          .type(first1.trim() + "{enter}");
        cy.wrap(first1).as("first1");
      });
      cy.wait(500);
      cy.get("@first1").then((first1) => {
        cy.verifyFirstCellInTable(1, getWrappedString(first1));
      });
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifySearchFunctionalityDots(): Chainable<any>;
  }
}
Cypress.Commands.add("verifySearchFunctionalityDots", () => {
  // Get the search input and type a search term
  cy.get("table").should("be.visible");
  cy.get("table").then(($table) => {
    if ($table.find("tbody tr").length > 1) {
      cy.getLastCellInTableValue(1).then((last1) => {
        cy.get('input[placeholder="Search..."]')
          .clear()
          .type(last1.trim() + "{enter}");
        cy.wrap(last1).as("last1");
      });
      cy.wait(500);
      cy.get("@last1").then((last1) => {
        cy.verifyFirstCellInTable(1, getWrappedString(last1));
      });
      cy.get('input[placeholder="Search..."]').clear();
      cy.wait(500);
      cy.getFirstCellInTableValue(1).then((first1) => {
        cy.get('input[placeholder="Search..."]')
          .clear()
          .type(first1.trim() + "{enter}");
        cy.wrap(first1).as("first1");
      });
      cy.wait(500);
      cy.get("@first1").then((first1) => {
        cy.verifyFirstCellInTable(1, getWrappedString(first1));
      });
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    verifySearchFunctionality(): Chainable<any>;
  }
}

declare namespace Cypress {
  interface Chainable<Subject> {
    checkLink(urlStr: string): Chainable<any>;
  }
}
Cypress.Commands.add("checkLink", (url) => {
  return cy
    .request({
      url,
      failOnStatusCode: false,
    })
    .then((resp) => {
      return resp.status;
    });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickFirstErpLogin(): Chainable<any>;
  }
}
Cypress.Commands.add("clickFirstErpLogin", () => {
  cy.get('div[class="plan_description"] div[class="mange_erp"]')
    .first()
    .click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickInputtedSearchDropDownList(
      attrName: string,
      srch: string
    ): Chainable<any>;
  }
}
Cypress.Commands.add(
  "clickInputtedSearchDropDownList",
  (attrName: string, srch: string) => {
    cy.getByTestAttribute(attrName).scrollIntoView();
    cy.getByTestAttribute(attrName).click();
    cy.get('input[role="searchbox"]').last().click();
    cy.get('input[role="searchbox"]').last().clear().type(srch);
    cy.wait(1500);
    cy.get('[role="listbox"]').then(($listbox) => {
      if (
        $listbox
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.getByTestAttribute(attrName).click({ force: true });
        // cy.wrap("").as("lastEl");
        cy.log("clickInputtedSearchDropDownList empty listbox");
      } else {
        cy.get('li[role="option"]')
          .first()
          .then(($firstEl) => {
            cy.wrap($firstEl).as("firstEl");
            cy.get("@firstEl").click({ force: true });
          });
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    selectCountryByIndex(index: number, countryStr: string): Chainable<any>;
  }
}

Cypress.Commands.add(
  "selectCountryByIndex",
  (index: number, countryStr: string) => {
    // 1. Click the combobox at the specified index
    cy.get('span[role="combobox"]').eq(index).scrollIntoView();
    cy.get('span[role="combobox"]').eq(index).click({ force: true });
    // 2. Input "EG" into the search box
    cy.get('input[role="searchbox"]').first().click();
    cy.get('input[role="searchbox"]').first().clear().type(countryStr);
    cy.wait(1000);
    // 3. Click the option from the dropdown
    cy.get('[role="listbox"]').then(($listbox) => {
      if (
        $listbox
          .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
          .is(":visible")
      ) {
        cy.get('span[role="combobox"]').eq(index).click({ force: true });
        // cy.wrap("").as("firstEl");
        cy.log("selectCountryByIndex empty listbox");
      } else {
        cy.get('li[role="option"]')
          .first()
          .then(($firstEl) => {
            cy.wrap($firstEl).as("firstEl");
            cy.get("@firstEl").click({ force: true });
          });
      }
    });
  }
);
declare namespace Cypress {
  interface Chainable<Subject> {
    getFirstElementDropDownList(index: number): Chainable<any>;
  }
}
Cypress.Commands.add("getFirstElementDropDownList", (index: number) => {
  cy.get('span[role="combobox"]').eq(index).scrollIntoView();
  cy.get('span[role="combobox"]').eq(index).click({ force: true });
  cy.get('[role="listbox"]').then(($listbox) => {
    if (
      $listbox
        .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
        .is(":visible")
    ) {
      cy.get('span[role="combobox"]')
        .eq(index)
        .scrollIntoView()
        .click({ force: true });
      // cy.wrap("").as("firstEl");
      cy.log("getfirstElementDropDownList empty listbox");
    } else {
      cy.get('li[role="option"]')
        .first()
        .then(($firstEl) => {
          cy.wrap($firstEl).as("firstEl");
          cy.get("@firstEl").click({ force: true });
        });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getLastElementDropDownList(index: number): Chainable<any>;
  }
}
Cypress.Commands.add("getLastElementDropDownList", (index: number) => {
  cy.get('span[role="combobox"]').eq(index).scrollIntoView();
  cy.get('span[role="combobox"]').eq(index).click({ force: true });
  cy.get('[role="listbox"]').then(($listbox) => {
    if (
      $listbox
        .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
        .is(":visible")
    ) {
      cy.get('span[role="combobox"]')
        .eq(index)
        .scrollIntoView()
        .click({ force: true });
      // cy.wrap("").as("lastEl");
      cy.log("getlastElementDropDownList empty listbox");
    } else {
      cy.get('li[role="option"]')
        .last()
        .then(($lastEl) => {
          cy.wrap($lastEl).as("lastEl");
          cy.get("@lastEl").click({ force: true });
        });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    getFirstItemInDropDownList(attrName: string): Chainable<string>;
  }
}
Cypress.Commands.add("getFirstItemInDropDownList", (attrName: string) => {
  cy.getByTestAttribute(attrName).scrollIntoView().should("be.visible");
  cy.getByTestAttribute(attrName).find('[role="combobox"]').click();
  cy.get('[role="listbox"]').then(($listbox) => {
    if (
      $listbox
        .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
        .is(":visible")
    ) {
      cy.getByTestAttribute(attrName).click({ force: true });
      cy.log("getFirstItemInDropDownList empty listbox");
    } else {
      cy.get('li[role="option"]')
        .first()
        .then(($firstEl) => {
          cy.wrap($firstEl).as("firstEl");
          cy.get("@firstEl").click({ force: true });
        });
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    getLastItemInDropDownList(attrName: string): Chainable<any>;
  }
}
Cypress.Commands.add("getLastItemInDropDownList", (attrName: string) => {
  cy.getByTestAttribute(attrName).scrollIntoView().should("be.visible");
  cy.getByTestAttribute(attrName).find('[role="combobox"]').click();
  cy.get('[role="listbox"]').then(($listbox) => {
    if (
      $listbox
        .find('li[class="p-dropdown-empty-message ng-star-inserted"]')
        .is(":visible")
    ) {
      cy.getByTestAttribute(attrName).click({ force: true });
      cy.log("getlastItemInDropDownList empty listbox");
      // cy.wrap("").as("lastElText");
    } else {
      cy.get('li[role="option"]')
        .last()
        .then(($lastEl) => {
          cy.wrap($lastEl).as("lastEl");
          cy.get("@lastEl").click({ force: true });
        });
    }
  });
});
declare namespace Cypress {
  interface Chainable<Subject> {
    hideDialogFooter(): Chainable<any>;
  }
}
Cypress.Commands.add("hideDialogFooter", () => {
  cy.get(".pop_up_footer").invoke("hide");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    displayDialogFooter(): Chainable<any>;
  }
}
Cypress.Commands.add("displayDialogFooter", () => {
  cy.get(".pop_up_footer").invoke("css", "display", "block");
});

declare namespace Cypress {
  interface Chainable<Subject> {
    checkAndNavigate(newUrl: string, callback: () => void): Chainable<any>;
  }
}
Cypress.Commands.add(
  "checkAndNavigate",
  (newUrl: string, callback: () => void) => {
    cy.wait(1000);
    cy.get("body").then(($body) => {
      if ($body.find("#email").length > 0) {
        cy.implementLogin();
      } else {
        cy.url().then((url) => {
          if (url.includes("businessowners")) {
            cy.visit(newUrl);
            cy.clickContinueAs();
          } else {
            callback();
          }
        });
      }
    });
  }
);

declare namespace Cypress {
  interface Chainable<Subject> {
    login(): Chainable<any>;
  }
}
Cypress.Commands.add("login", () => {
  cy.visit(Cypress.env("loginUrl"));
  cy.wait(1500);
  cy.implementLogin();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    loginSession(): Chainable<any>;
  }
}
Cypress.Commands.add("loginSession", () => {
  // Clear cookies and local storage before each test
  cy.session("userSession", () => {
    cy.login();
  });
});

// cypress/support/commands.ts

declare namespace Cypress {
  interface Chainable<Subject> {
    LandingToERPModule(urlStr: string, keywordStr: string): Chainable<any>;
  }
}

Cypress.Commands.add("LandingToERPModule", (urlStr, keywordStr) => {
  // Catch uncaught exceptions specific to the "children" error
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of null (reading 'children')")) {
      return false;
    }
    return true;
  });

  cy.viewport(1920, 1080);
  cy.visit(urlStr);

  cy.wait(3000); // Initial wait for page load

  cy.url().then((currentUrl) => {
    if (currentUrl.includes(keywordStr)) {
      cy.reload();
      cy.clickContinueAs(); // Ensure `clickContinueAs` is defined in your commands
      cy.log("You Are In: " + urlStr);
    } else {
      cy.clickContinueAs();
      cy.LandingToERPModule(urlStr, keywordStr); // Retry if not on the correct page
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    clickContinueAs(): Chainable<any>;
  }
}
Cypress.Commands.add("clickContinueAs", () => {
  cy.get("body").then(($body) => {
    // Add a small wait to handle slow loading elements
    cy.reload();
    cy.wait(2000);

    // Check if email input is visible for login
    if ($body.find("#Email").is(":visible")) {
      cy.log("Login Form is visible, starting login");
      cy.implementLogin();
    } else {
      cy.log("Email input not visible, checking for 'Continue As' button");

      // Check if the "Continue As" button is visible and click it
      if ($body.find(".w-75").is(":visible")) {
        cy.wait(1000);
        cy.get(".w-75").click();
      } else {
        cy.log("Continue As Button is not visible, retrying");
      }
    }
  });
});


declare namespace Cypress {
  interface Chainable<Subject> {
    getCellValueWhenCondition(targetCol: number, conditionCol: number, conditionValue: string): Chainable<any>;
  }
}

Cypress.Commands.add("getCellValueWhenCondition", (targetCol: number, conditionCol: number, conditionValue: string) => {
  cy.get("table").should("be.visible");
  cy.get("table").then(($table: any) => {
    if ($table.find("tbody tr").is(":visible")) {
      // Locate the table rows and find the row where the "Type" column equals "Detail"
      cy.get('table tbody tr').then(($rows) => {
        for (var i = 0; i < $rows.length; i++) {
          var $row = $rows[i];
          // Find the "Type" column within this row (e.g., assuming it's the 2nd column)
          cy.wrap($row).find('td').eq(conditionCol).then(($typeCell) => {
            if ($typeCell.text().trim().includes(conditionValue) ) {
              // Get the text of the first column (e.g., assuming it's the 1st column)
              cy.wrap($row).find('td').eq(targetCol).invoke('text').then((firstColumnText) => {
                cy.wrap(firstColumnText).as("firstColumnText");
                i=$rows.length;
              });
            }
          });
        }
      });
    } else {
      cy.log("Table is Empty");
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    implementLogin(): Chainable<any>;
  }
}
Cypress.Commands.add("implementLogin", () => {
  // Check for the visibility of the email and password fields
  cy.get("body").then(($body) => {
    if ($body.find("#Email").is(":visible")) {
      // Handle email field input
      cy.get("#Email")
        .should("be.visible")
        .then(($email) => {
          cy.wrap($email)
            .clear()
            .type(Cypress.env("mail"))
            .should("have.value", Cypress.env("mail"));
        });

      // Handle password field input
      cy.get("#Password")
        .should("be.visible")
        .then(($password) => {
          cy.wrap($password)
            .clear()
            .type(Cypress.env("pass"))
            .should("have.value", Cypress.env("pass"));
        });

      // Submit the form
      cy.get('button[type="submit"]').last().should("be.visible").click();
    } else {
      cy.log("Login form is not visible.");
    }
  });
});

const getWrappedString = (x: JQuery<HTMLElement>) => {
  var str = "";
  if (x != null) {
    str = trimText(x.toString()).trim();
  }
  return str;
};
function removeSpacesBetween(word: any): string {
  return word.split(" ").join("");
}
const trimText = (text: string) => text.replace(/\s/g, "").toString().trim();
