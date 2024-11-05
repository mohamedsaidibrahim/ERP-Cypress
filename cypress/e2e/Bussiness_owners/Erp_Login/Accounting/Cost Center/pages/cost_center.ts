import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { AccountingData } from "../../data/accounting_data";

export class CostCenter {

  static forceNavigate() {
    cy.visit(AccountingData.CostCenterLink);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("center")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/accounting/i);
        NavigatesToSideModule.navigatesToTheModule(
          AccountingData.CostCenterLink,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(AccountingData.CostCenterLink, "center");
  }

  static switchingToListMode() {
    cy.get(".actions > :nth-child(1) > .pi").click();
    cy.wait(1500);
  }
  static inputSearchList(txt: string) {
    cy.get('input[placeholder="Search"]').should('be.visible');
    cy.get('input[placeholder="Search"]').clear().type(txt + "{enter}")
  }

  static inputSearchTree(txt: string) {
    cy.get('input[type="search"]').should('be.visible');
    cy.get('input[type="search"]').clear().type(txt + "{enter}")
  }
  static inputcostCenterNameInDialog(txt: string) {
    cy.get('input[class="p-inputtext p-component p-element ng-star-inserted"]').should('be.visible');
    cy.get('input[class="p-inputtext p-component p-element ng-star-inserted"]').clear().type(txt);
  }
  static clickParentDropDown() {
    cy.get('span[role="combobox"]').should('be.visible');
    cy.get('span[role="combobox"]').click();
  }
  static selectTheFirstOption() {
    cy.get('li[role="option"]').should('be.visible');
    cy.get('li[role="option"]').first().click();
  }
  static clickIsDetail() {
    cy.get('#isDetail').uncheck();

  }
  static clickSaveButton() {
    cy.contains('.btn', /save/i).should('be.visible');
    cy.contains('.btn', /save/i).click();
  }
  static verifyTheSuccessMessagePopUp() {
    cy.get('.p-toast-detail').should('be.visible');
    cy.get('.p-toast-summary').should('be.visible');
    cy.get('.p-toast-message-icon > .p-element > .p-icon').should('be.visible');
  }
  static verifyTheValidationMessagePopUp() {
  }
  static clickEditButton() {
    cy.get('ul[role="tree"]').then((tree) => {
      if (tree.find('.ui-tree-node-content > .action').is(':visible')) {
        cy.get('.ui-tree-node-content > .action')
          .last()
          .trigger("mouseover").then(() => {
            // Get the CSS property of the button and check if it has display: none
            cy.get('.ui-tree-node-content > .action > .btn_edit').last()
              .should(($button) => {
                const display = $button.css("display");
                expect(display).to.equal("none");
              });
            // If the element has display: none, remove the CSS property
            cy.get('.ui-tree-node-content > .action > .btn_edit').last()
              .then(($button) => {
                if ($button.css("display") === "none") {
                  $button.css("display", "block");
                }
              });
            // Click the button after making it visible
            cy.get('.ui-tree-node-content > .action > .btn_edit').last()
              .click({ force: true });
          });
      }
    });
  }

  static clickToggler() {
    cy.get('ul[role="tree"]').then(($tree) => {
      if ($tree.find(".p-treenode").is(":visible")) {
        cy.get(".p-treenode").then(($treenode) => {
          if (
            $treenode.find('button[data-pc-section="toggler"]').is(":visible")
          ) {
            cy.wrap($treenode)
              .find('button[data-pc-section="toggler"]')
              .each(($toggler) => {
                cy.wrap($toggler).click({ force: true });
              });
          }
        });
      }
    });
  }

  static clickSideMasterData() {
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > .arrow'
    ).should("be.visible");
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > .arrow'
    ).click();
    cy.wait(1000);
  }

  static continueClickingSideMasterData() {
    cy.wait(1000);
    cy.get('ul[class="nav-links"] li')
      .first()
      .then(($el) => {
        while ($el.find('ul[class="sub-menuu2"]').is(":not(:visible)")) {
          cy.reload();
          this.clickSideMasterData();
        }
      });
  }
 
  static clickMasterDataDropDown() {
    cy.get(
      ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > .arrow'
    ).should("be.visible");
    for (var i = 0; i < 3; i++) {
      cy.get(
        ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > .arrow'
      ).click({ force: true });
    }
  }
  static clickTaxesDefinitionFromSideMenu() {
    cy.get(".sub-menuu2 > :nth-child(4) > .ng-star-inserted").click({
      force: true,
    });
  }

  static clickSideCostCenter() {
    this.continueClickingSideMasterData();
    cy.get(".sub-menuu2 > :nth-child(4) > .ng-star-inserted").as(
      "costCenterButton"
    );
    // Wait for any potential asynchronous updates
    cy.wait(1000);
    // Click on the Cost Centers button
    cy.get("@costCenterButton").click({ force: true });
    cy.get(".p-menuitem-text").should("be.visible");
  }

  static verifyTreeAddButton() {
    cy.get("button.pi-plus").should("be.visible");
    cy.get("button.pi-plus").should("be.enabled");
    cy.get("button.pi-plus").should("have.class", "btn_add");
    cy.get("button.pi-plus").should("have.class", "pi-plus");
  }
  static clickTreeAddButton() {
    cy.get("button.pi-plus").should("be.visible");
    cy.get("button.pi-plus").should("be.enabled");
    cy.get("button.pi-plus").click();
  }
  static clickEditButtonParentAccount() {
    cy.get('button[class="btn_tree_item btn_edit pi pi-pencil"]').should(
      "not.be.visible"
    );
    cy.get('div[class="ui-tree-node-content label_text tree-item-container"]')
      .last()
      .trigger("mouseover");

    // Get the CSS property of the button and check if it has display: none
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .should(($button) => {
        const display = $button.css("display");
        expect(display).to.equal("none");
      });
    // If the element has display: none, remove the CSS property
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .then(($button) => {
        if ($button.css("display") === "none") {
          $button.css("display", "block");
        }
      });
    // Click the button after making it visible
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .click({ force: true });
  }
  static clickEditButtonDetailAccount() {
    cy.get(
      " .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon"
    )
      .last()
      .click();
    cy.get('button[class="btn_tree_item btn_edit pi pi-pencil"]').should(
      "not.be.visible"
    );
    cy.get('div[class="ui-tree-node-content label_text tree-item-container"]')
      .last()
      .trigger("mouseover");

    // Get the CSS property of the button and check if it has display: none
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .should(($button) => {
        const display = $button.css("display");
        expect(display).to.equal("none");
      });
    // If the element has display: none, remove the CSS property
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .then(($button) => {
        if ($button.css("display") === "none") {
          $button.css("display", "block");
        }
      });
    // Click the button after making it visible
    cy.get(
      'div[class="ui-tree-node-content label_text tree-item-container"] div button[class="btn_tree_item btn_edit pi pi-pencil"]'
    )
      .last()
      .click({ force: true });
  }

  static verifyAddPanalLabels() {
    cy.get(".cost_add_page").should("be.visible");
    cy.get(":nth-child(1) > lib-form-group > .group > .paragraph_b18").should(
      "be.visible"
    );
    cy.get(":nth-child(1) > lib-form-group > .group > .paragraph_b18").should(
      "include",
      /code/i
    );
    cy.get(
      ":nth-child(2) > lib-form-group > .group > lib-label > .form-label"
    ).should("be.visible");
    cy.get(
      ":nth-child(2) > lib-form-group > .group > lib-label > .form-label"
    ).should("include", /Name/i);
    cy.get(
      ":nth-child(3) > lib-form-group > .group > lib-label > .form-label"
    ).should("be.visible");
    cy.get(
      ":nth-child(3) > lib-form-group > .group > lib-label > .form-label"
    ).should("include", /Parent Account/i);
    cy.get(":nth-child(4) > lib-form-group > .group > p.paragraph_b18").should(
      "be.visible"
    );
    cy.get(":nth-child(4) > lib-form-group > .group > p.paragraph_b18").should(
      "include",
      /is detail/i
    );
  }
  static verifyIsDetailCheckBox() {
    cy.get(
      ":nth-child(4) > lib-form-group > .group > lib-label > .form-label"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > lib-label > .form-label"
    ).should("have.text", "   yes ");
    cy.get("#isDetail").should("be.visible");
    cy.get("#isDetail").should("be.enabled");
    cy.get("#isDetail").should("not.be.checked");
  }
  static verifyDialogeDisappears() {
    cy.get("#isDetail").should("not.exist");
  }
  static verifySuccessMessagePopUp() {
    cy.get("#swal2-title").should("be.visible");
    cy.get("#swal2-title").should("have.text", "Success");
    cy.get("#swal2-html-container").should("be.visible");
    cy.get("#swal2-html-container").should(
      "have.text",
      "Data Has Been Added Successfully"
    );
    cy.get(".swal2-success-ring").should("be.visible");
    cy.get(".swal2-success-ring").should("have.class", "swal2-success-ring");
    cy.get(".swal2-confirm").should("be.visible");
    cy.get(".swal2-confirm").should("be.enabled");
    cy.get(".swal2-confirm").should("have.text", "OK");
    cy.get(".swal2-actions").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-actions").should("not.exist");
  }

  static verifydetailCSUnderParentCs(parent: string, child: string) {
    cy.get('li[aria-expanded="true"]')
      .last()
      .then(($mainEl) => {
        cy.wrap($mainEl).within(() => {
          // Ensure the main element is visible
          cy.wrap($mainEl).should("be.visible");
          // Check each parent element
          cy.wrap($mainEl)
            .find('div[class="p-treenode-content"]')
            .each(($pTreenodeContent) => {
              cy.wrap($pTreenodeContent)
                .should("be.visible") // Ensure the p-treenode-content is visible
                .find('span[id="label_tree"]')
                .contains(parent)
                .should("be.visible");
            });

          // Check each child element
          cy.wrap($mainEl)
            .find('ul[class="p-treenode-children"]')
            .each(($pTreenodeChildren) => {
              cy.wrap($pTreenodeChildren)
                .should("be.visible") // Ensure the p-treenode-children is visible
                .find('span[id="label_tree"]')
                .contains(child)
                .should("be.visible");
            });
        });
      });
  }

  static clickIsDetailCheckBox() {
    cy.get("#isDetail").should("be.visible");
    cy.get("#isDetail").check();
  }

  static selectParent() {
    cy.getLastItemInDropDownList("parentId").then(($parentId) => {
      if ($parentId != null) {
        cy.wrap($parentId)
          .invoke("text")
          .then((parentIdTxt) => {
            cy.log("parentIdTxt::: " + parentIdTxt);
            cy.wrap(parentIdTxt).as("parentIdTxt");
          });
      } else {
        cy.wrap("").as("parentIdTxt");
      }
    });
  }

  static verifySaveButton() {
    cy.get(".btn").should("be.visible");
    cy.get(".btn").should("be.enabled");
    cy.get(".btn").should("have.text", " save\n");
  }

  static verifyCostCenterCode() {
    cy.get(
      ":nth-child(1) > lib-form-group > .group > lib-text-input > .p-inputtext"
    ).should("be.visible");
    cy.get(
      ":nth-child(1) > lib-form-group > .group > lib-text-input > .p-inputtext"
    ).should("be.disabled");
    cy.get(
      ":nth-child(1) > lib-form-group > .group > lib-text-input > .p-inputtext"
    ).should("not.be.checked");
    // cy.get(
    //   ":nth-child(1) > lib-form-group > .group > lib-text-input > .p-inputtext"
    // ).should("have.class", "read");
  }
  static verifyCostCenterName() {
    cy.get(
      'input[class="p-inputtext p-component p-element ng-star-inserted"]'
    ).should("be.visible");
    cy.get(
      'input[class="p-inputtext p-component p-element ng-star-inserted"]'
    ).should("be.enabled");
    cy.get(
      'input[class="p-inputtext p-component p-element ng-star-inserted"]'
    ).should("not.be.checked");
  }
  static clearCostCenterName() {
    cy.get(
      'input[class="p-inputtext p-component p-element ng-star-inserted"]'
    ).should("be.visible");
    cy.get('input[class="p-inputtext p-component p-element ng-star-inserted"]')
      .first()
      .clear();
  }
  static inputCostCenterName(txt: string) {
    cy.get(
      'input[class="p-inputtext p-component p-element ng-star-inserted"]'
    ).should("be.visible");
    cy.get('input[class="p-inputtext p-component p-element ng-star-inserted"]')
      .first()
      .clear();
    cy.get('input[class="p-inputtext p-component p-element ng-star-inserted"]')
      .first()
      .type(txt);
  }

  static verifyParentCodeDropDownNotEmpty() {
    cy.get('span[role="combobox"]').click();
    cy.get(".p-dropdown-filter").should("be.visible");
    cy.get(".p-dropdown-filter").should("be.enabled");
    cy.get(".p-dropdown-filter").should("not.be.checked");
  }
  static verifyParentCodeDropDownEmpty() {
    cy.get('span[role="combobox"]').click();
    cy.get(".p-dropdown-filter").should("be.visible");
    cy.get(".p-dropdown-filter").should("be.enabled");
    cy.get(".p-dropdown-filter").should("not.be.checked");
    cy.get("p-dropdownitem li span").should("not.exist");
  }
  static verifyTreeFilter() {
    cy.get(".p-tree-filter").should("be.visible");
    cy.get(".p-tree-filter").should("be.enabled");
    cy.get(".p-tree-filter").should("not.be.checked");
  }
  static verifyMenuHeaders() {
    cy.get(
      ':nth-child(2) > app-layout-page > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select > .icon'
    ).should("be.visible");

    cy.get(".p-menuitem-icon").should("be.visible");

    cy.get(".p-menuitem-text").should("be.visible");
    cy.get(".p-menuitem-text").should("have.text", "Cost Center");

    cy.get(".actions > :nth-child(1) > .pi").should("be.visible");
    cy.get(".active > .pi").should("be.visible");
    cy.get(".chart_togel > img").should("be.visible");

    cy.get(".text").should("be.visible");
    cy.get(".text").should("have.text", "Cost center");
  }
  static verifySideBarButton() {
    cy.get(
      ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi'
    ).should("be.visible");
    cy.get(
      ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi'
    ).should("be.enabled");
    cy.get(".actions > :nth-child(1) > .pi").should("be.visible");
    cy.get(".active > .pi").should("be.visible");
  }

  static verifyListModeIsNotExist() {
    cy.get("table").should("not.exist");
  }
  static verifyPiBarsButton() {
    cy.get('i[class="pi pi-bars"]').should("be.visible");
  }
  static switchingToTreeView() {
    cy.get('i[class="pi pi-sitemap"]').should("be.visible");
    cy.get('i[class="pi pi-sitemap"]').click();
  }
  static switchingToListView() {
    cy.get('i[class="pi pi-bars"]').should("be.visible");
    cy.get('i[class="pi pi-bars"]').click();
  }
  static verifySiteMapButton() {
    cy.get('i[class="pi pi-sitemap"]').should("be.visible");
  }

  static verifyNewParentCostCenter(txt: string) {
    cy.get('span[class="p-treenode-label"]')
      .last()
      .within(() => {
        cy.get('div[class="description"]').within(() => {
          cy.get('span[class="folder"]').should("be.visible");
          cy.get('span[class="folder"]').last().scrollIntoView();
          cy.contains('span[id="label_tree"]', txt).should("be.visible");
        });
        cy.get('div[class="action"]')
          .last()
          .within(() => {
            cy.get("button").should("have.length", 3);
            cy.get("button").eq(0).should("not.be.visible");
            cy.get("button")
              .eq(0)
              .should("have.class", "btn_tree_item btn_edit pi pi-pencil");
            cy.get("button").eq(1).should("not.be.visible");
            cy.get("button")
              .eq(1)
              .should("have.class", "btn_tree_item btn_delet pi pi-trash");
            cy.get("button").eq(2).should("be.visible");
            cy.get("button")
              .eq(2)
              .should("have.class", "btn_add btn_tree_item pi pi-plus");
          });
      });
  }
  static verifyNewDetailCostCenterWithoutParentAccount(txt: string) {
    cy.contains('span[id="label_tree"]', txt).should("be.visible");
    cy.contains('span[id="label_tree"]', txt).should("have.length", 1);
  }
  static verifyNewDetailCostCenter(txt: string) {
    cy.get('span[class="p-treenode-label"]')
      .last()
      .within(() => {
        cy.get('div[class="description"]').each(($description) => {
          cy.wrap($description).within(() => {
            cy.get('span[class="file ng-star-inserted"]').should("be.visible");
            cy.get('span[id="label_tree"]').should("include", txt);
          });
        });
        cy.get('div[class="action"]').each(($action) => {
          cy.wrap($action).within(() => {
            cy.get("button").should("have.length", 2);
            cy.get("button").eq(0).should("be.visible");
            cy.get("button")
              .eq(0)
              .should("have.class", "btn_tree_item btn_edit pi pi-pencil");
            cy.get("button").eq(1).should("be.visible");
            cy.get("button")
              .eq(1)
              .should("have.class", "btn_tree_item btn_delet pi pi-trash");
            cy.get("button").eq(2).should("not.exist");
          });
        });
      });
  }
  static expandTheTree() {
    cy.get('.p-treenode-content > .p-ripple').each(($el) => {
      cy.wrap($el).click({ force: true }).then(() => {
        // Re-query the element to handle the DOM update
        cy.get('.p-treenode-content > .p-ripple').should('exist');
      });
    });
  }

}
