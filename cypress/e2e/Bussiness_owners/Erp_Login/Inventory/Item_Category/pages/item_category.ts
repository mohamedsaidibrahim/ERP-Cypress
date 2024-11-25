export class ItemCategory {
  static landing() {
    cy.NavigateToAPPModule(6, 2);
  }

  static shifttingToSiteMap() {
    cy.get(".pi-sitemap").should("be.visible");
    cy.get(".pi-sitemap").click();
  }

  static shifftingToBars() {
    cy.get(".pi-bars").should("be.visible");
    cy.get(".pi-bars").click();
  }
  static switchingToTreeView() {
    cy.get("table").should("be.visible");
    cy.get('i[class="pi pi-sitemap"]').should("be.visible");
    cy.get('i[class="pi pi-sitemap"]').click();
    cy.get("table").should("not.exist");
  }

  static switchingToListView() {
    cy.get("table").should("not.exist");
    cy.get('i[class="pi pi-bars"]').should("be.visible");
    cy.get('i[class="pi pi-bars"]').click();
    cy.get("table").should("be.visible");
  }

  static SearchAListAccount(txt: string) {
    cy.get('input[placeholder="Search"]').should("be.visible");
    cy.get('input[placeholder="Search"]')
      .clear()
      .type(txt + "{enter}");
  }

  static verifyTheListViewHasTheDetailedCategory(str: string) {
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then(
      (out) => {
        var childs = out["childs"];
        expect(childs).deep.include(str);
      }
    );
  }
  static getFirstParentCategoryInTheListView(){
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then(
      (out) => {
        var parents = out["parents"];
        cy.wrap(parents[0]).as("parentCategory");
      }
    );
  }

  static verifyTheListViewHasTheParentCategory(str: string) {
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then(
      (out) => {
        var parents = out["parents"];
        expect(parents).deep.include(str);
      }
    );
  }
  static getDetailedCategoryInTheListViewMissing() {
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then((out) => {
        var childs = out["childs"];
        cy.wrap(childs[0]).as("detailedCategory") ;
      }
    );
  }

  static verifyTheListViewMissingTheDetailedCategory(str: string) {
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then(
      (out) => {
        var childs = out["childs"];
        expect(childs).not.include(str);
      }
    );
  }

  static verifyTheListViewMissingTheParentCategory(str: string) {
    cy.LoopsThroughTableRowsAndProcessesBasedOnCheckboxAttribute().then(
      (out) => {
        var parents = out["parents"];
        expect(parents).not.include(str);
      }
    );
  }

  static displaytheLastCategoryViewMode() {
    cy.get('div[class="description"]').last().scrollIntoView().click();
  }
  static SearchAnTreeAccount(account: string) {
    cy.get(".p-tree-filter").should("be.visible");
    cy.get(".p-tree-filter").clear();
    cy.get(".p-tree-filter").type(account + "{enter}");
  }
  static clickISDetailedSwitch() {
    cy.getByTestAttribute("input-switch").last().scrollIntoView().click();
  }

  static clickActivationStatus() {
    cy.getByTestAttribute("input-switch").first().scrollIntoView().click();
  }

  static clickEditButtonDetailAccount() {
    cy.get(".action")
      .last()
      .trigger("mouseover", { force: true })
      .then(() => {
        // Get the CSS property of the button and check if it has display: none
        cy.get('button[class="btn_tree_item btn_edit pi pi-pencil"]')
          .last()
          .should(($button) => {
            const display = $button.css("display");
            expect(display).to.equal("none");
          });
        // If the element has display: none, remove the CSS property
        cy.get('button[class="btn_tree_item btn_edit pi pi-pencil"]')
          .last()
          .then(($button) => {
            if ($button.css("display") === "none") {
              $button.css("display", "block");
            }
          });
        // Click the button after making it visible
        cy.get('button[class="btn_tree_item btn_edit pi pi-pencil"]')
          .last()
          .click({ force: true });
      });
  }
}
