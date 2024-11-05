export class DisplayingMainScreen {
  static verifyAllElementsOnTheTop() {
    cy.get(".p-menuitem-icon").should("be.visible");
    cy.get(".p-menuitem-text").should("be.visible");
    cy.get(".p-menuitem-text").should("include", /Chart of Account/i);

    cy.get(".ng-star-inserted > .btn").should("be.visible");
    cy.get(".ng-star-inserted > .btn").should("be.enabled");
    cy.get(".ng-star-inserted > .btn").should("include", /Configuration/i);

    cy.get(".import").should("be.visible");
    cy.get(".import").should("be.enabled");
    cy.get(".import").should("include", /import/i);

    cy.get(":nth-child(3) > .pi").should("have.class", "pi-bars");
    cy.get(".actions > :nth-child(3)").should("be.visible");

    cy.get(".active > .pi").should("be.visible");
    cy.get(".active > .pi").should("have.class", "pi");
    cy.get(".active > .pi").should("have.class", "pi-sitemap");
  }

  static verifyEmptyViewPanal() {
    cy.get(".md\\:col-8").should("be.visible");
  }

  static verifyTHeTreeHeaders() {
    cy.get(".chart_togel > img").should("be.visible");
    cy.get(".chart_togel > img").should(
      "have.attr",
      "src",
      "assets/images/tree/folder.png"
    );
    cy.get(".text").should("be.visible");
    cy.get("button.pi-plus").should("have.class", "pi-plus");
    cy.get("button.pi-plus").should("have.class", "pi-expand");
    cy.get("button.pi-plus").should("have.class", "btn_add");
  }

  static verifySearchTextField() {
    cy.get(".p-tree-filter").should("be.visible");
    cy.get(".p-tree-filter").should("be.enabled");
    cy.get(".p-tree-filter").should("not.be.checked");
    cy.get("g > path").should("be.visible");
  }

  static verifyTheMainParentAccounts() {
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon > path"
    ).should("be.visible");
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon"
    ).should("be.visible");
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon > path"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon"
    ).should("be.visible");
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon > path"
    ).should("be.visible");
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > .folder"
    ).should("be.visible");
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > .folder"
    ).should("be.visible");
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > .folder"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > .folder"
    ).should("be.visible");
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > .folder"
    ).should("be.visible");
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("be.visible");
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("include", /الأصول/i);
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("be.visible");
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("include", /الخصوم/i);
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("be.visible");
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("include", /حقوق الملكية/i);
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("include", /الإيرادات/i);
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("be.visible");
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree"
    ).should("include", /المصروفات/i);
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.visible");
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.enabled");
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.visible");
    cy.get(
      ":nth-child(2) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.enabled");
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.visible");
    cy.get(
      ":nth-child(3) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.enabled");
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.enabled");
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.visible");
    cy.get(
      ":nth-child(5) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .action > .btn_add"
    ).should("be.enabled");
  }

  static verifyDescendantsAccounts() {
    cy.get(
      ":nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon"
    ).click();
    cy.wait(1000);
    cy.get(
      ".p-treenode-children > :nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon > path"
    ).click({ force: true });
    cy.get(
      '[aria-label="الاصول المتداولة"] > .p-treenode-children > :nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon'
    ).click({ force: true });
    cy.get(
      '[aria-label="النقدية وما في حكمها"] > .p-treenode-children > :nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon'
    ).click({ force: true });
    cy.get(
      '[aria-label="الصندوق "] > .p-treenode-children > :nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description'
    ).should("be.visible");
    cy.get(
      '[aria-label="الصندوق "] > .p-treenode-children > :nth-child(1) > .p-treenode > .p-treenode-content > .p-treenode-label > :nth-child(1) > .ui-tree-node-content > .description > #label_tree'
    ).click();
  }
}
