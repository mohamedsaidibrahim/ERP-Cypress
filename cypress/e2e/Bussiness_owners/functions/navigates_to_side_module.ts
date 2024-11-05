export class NavigatesToSideModule {
  static clickSlderSideButton() {
    cy.get(
      'i.pi.pi-angle-double-right.arrowIcon::before'
    ).should("be.visible");
    for (var i = 0; i < 3; i++) {
      cy.get(
        'i.pi.pi-angle-double-right.arrowIcon::before'
      ).first().click({ force: true });
    }
  }
  static clickMasterDataDropDown() {
    cy.get(
      'i.arrow.pi.pi-sort-down-fill::before'
    ).should("be.visible");
    for (var i = 0; i < 3; i++) {
      cy.get(
        'i.arrow.pi.pi-sort-down-fill::before'
      ).click({ force: true });
    }
  }
  static clickSideMasterData() {
    cy.get(
      'i.arrow.pi.pi-sort-down-fill::before'
    ).should("be.visible");
    cy.get(
      'i.arrow.pi.pi-sort-down-fill::before'
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
  static clickModuleFromSideMenu(index: number) {
    cy.get(".sub-menuu2 > :nth-child(" + index + ") > .ng-star-inserted").click(
      {
        force: true,
      }
    );
  }

  static navigatesToTheModule(link: string, index: number) {
    cy.wait(2000);
    cy.clickContinueAs();
    cy.visit(link);
    cy.wait(1000);
    cy.clickContinueAs();
    cy.wait(1000);
    // Click Side Bar
    this.clickSlderSideButton();
    // Click Master Data Drop down list
    this.clickMasterDataDropDown();
    // :nth-child(3) for Taxes Definition
    this.clickModuleFromSideMenu(index);
  }
  static clickAppsModeButton() {
    // Click Apps Mode Button
    cy.get('button[class="btn_mod_select"]').should("be.visible");
    cy.get('button[class="btn_mod_select"]').last().click();
  }
  static selectAnApp(appName: any) {
    // Select an App
    cy.get('p[class="heading_b16"]').should("be.visible");
    cy.contains('p[class="heading_b16"]', appName).click();
  }
  static closeAppModeDialog() {
    // Close the Dialoge
    cy.get('div[class="cancel"]').should("be.visible");
    cy.get('div[class="cancel"]').click();
  }
  static navigatesToAnAppinSubdomain(appName: any) {
    this.clickAppsModeButton();
    cy.wait(500);
    cy.get('div[role="dialog"]').should("be.visible");
    cy.get('div[role="dialog"]').then(($dialog) => {
      if ($dialog.find('p[class="heading_b16"]').is(':visible')) {
        this.selectAnApp(appName);
      } else {
        this.closeAppModeDialog();
        this.navigatesToAnAppinSubdomain(appName);
      }
    });
  }
}
