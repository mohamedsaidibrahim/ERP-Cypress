import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { AccountingData } from "../../data/accounting_data";

export class ChartOfAccounts {
  static forceNavigate() {
    cy.visit(AccountingData.ChartOfAccountsLink);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("chart")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/accounting/i);
        NavigatesToSideModule.navigatesToTheModule(
          AccountingData.ChartOfAccountsLink,
          1
        );
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(AccountingData.ChartOfAccountsLink, "chart");
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
    cy.get('i[class="pi pi-sitemap"]').should("be.visible");
    cy.get('i[class="pi pi-sitemap"]').click();
    cy.get("table").should("not.exist");
  }
  static switchingToListView() {
    cy.get("table").should("not.exist");
    cy.get('i[class="pi pi-bars"]').should("be.visible");
    cy.get('i[class="pi pi-bars"]').click();
  }
  static SearchAListAccount(txt: string) {
    cy.get('input[placeholder="Search"]').should("be.visible");
    cy.get('input[placeholder="Search"]')
      .clear()
      .type(txt + "{enter}");
  }

  static SearchAnTreeAccount(account: string) {
    cy.get(".p-tree-filter").should("be.visible");
    cy.get(".p-tree-filter").clear();
    cy.get(".p-tree-filter").type(account + "{enter}");
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
