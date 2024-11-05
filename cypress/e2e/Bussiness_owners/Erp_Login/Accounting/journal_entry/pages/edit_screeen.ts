export class JDEditScreen {

  static verifyEditScreenHeaders() {
    cy.get(".grid > :nth-child(1) > lib-label > .form-label").should(
      "be.visible"
    );
    cy.get(".grid > :nth-child(1) > lib-label > .form-label").should(
      "include",
      "   Journal Code "
    );
    cy.get(":nth-child(1) > .view").should("be.visible");
    cy.get(":nth-child(2) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(2) > lib-label > .form-label").should(
      "include",
      "   Journal Status "
    );
    cy.get(":nth-child(2) > .view").should("be.visible");
    cy.get(":nth-child(3) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(3) > lib-label > .form-label").should(
      "include",
      "   Journal Reference "
    );
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should("be.visible");
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should("be.enabled");
    cy.get(":nth-child(3) > .ng-untouched > .p-inputtext").should(
      "not.be.checked"
    );
    cy.get(".group > lib-label > .form-label").should("be.visible");
    cy.get(".group > lib-label > .form-label").should("include", /Date */i);
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("be.enabled");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("not.be.checked");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("be.visible");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("be.enabled");
    cy.get(
      ":nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext"
    ).should("not.be.checked");
    cy.get(":nth-child(5) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(5) > lib-label > .form-label").should(
      "include",
      "   Journal Period "
    );
    cy.get(":nth-child(5) > .view").should("be.visible");
    cy.get(":nth-child(6) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(6) > lib-label > .form-label").should(
      "include",
      "   Journal Type "
    );
    cy.get(":nth-child(6) > .view").should("be.visible");
    cy.get(":nth-child(7) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(7) > lib-label > .form-label").should(
      "include",
      "   Source Document Name "
    );
    cy.get(":nth-child(7) > .view").should("be.visible");
    cy.get(":nth-child(8) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(8) > lib-label > .form-label").should(
      "include",
      "   Source Document Code "
    );
    cy.get(":nth-child(8) > .view").should("be.visible");
    cy.get(":nth-child(9) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(9) > lib-label > .form-label").should(
      "include",
      "   Reversed Journal "
    );
    cy.get(":nth-child(9) > .view").should("be.visible");
    cy.get(":nth-child(10) > lib-label > .form-label").should("be.visible");
    cy.get(":nth-child(10) > lib-label > .form-label").should(
      "include",
      "   Journal Description "
    );
    cy.get(":nth-child(10) > .ng-untouched > .p-inputtext").should(
      "be.visible"
    );
    cy.get(":nth-child(10) > .ng-untouched > .p-inputtext").should(
      "be.enabled"
    );
    cy.get(":nth-child(10) > .ng-untouched > .p-inputtext").should(
      "not.be.checked"
    );
  }
  static verifyEditScreenTableColumnHeaders() {
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)").should(
      "include",
      "Id"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)").should(
      "include",
      "Account Code"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)").should(
      "include",
      "Account Name"
    );
    cy.get('[style="width: 20%;"]').should("be.visible");
    cy.get('[style="width: 20%;"]').should("include", "Line Description");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)").should(
      "include",
      "Db Amount"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)").should(
      "include",
      "CR Amount"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(7)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(7)").should(
      "include",
      "Currency"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(8)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(8)").should(
      "include",
      "Rate"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(9)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(9)").should(
      "include",
      "DB Amount Local"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(10)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(10)").should(
      "include",
      "CR Amount Local"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(11)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(11)").should(
      "include",
      "Cost Center"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > .ng-star-inserted")
      .scrollIntoView()
      .should("be.visible");
    cy.get(
      ".p-datatable-thead > tr.ng-star-inserted > .ng-star-inserted"
    ).should("include", /Actions/i);
  }
  static verifyAddNewLine() {
    cy.get(".add_new > .btn").should("be.visible");
    cy.get(".add_new > .btn").should("be.enabled");
    cy.get(".add_new > .btn").should("include", /Add New Line/i);
  }
  static verifycancelButton() {
    cy.getByTestAttribute("cancel").should("be.visible");
    cy.getByTestAttribute("cancel").should("be.enabled");
    cy.getByTestAttribute("cancel").should("include", /cancel/i);
  }
  static verifycancelButtonDisAppearing() {
    cy.getByTestAttribute("cancel").should("not.exist");
  }
  static verifySaveButton() {
    cy.get(".btn_group > :nth-child(2) > .btn").should("be.visible");
    cy.get(".btn_group > :nth-child(2) > .btn").should("be.enabled");
    cy.get(".btn_group > :nth-child(2) > .btn").should("include", "Save");
  }
  static verifySubmitButton() {
    cy.get(":nth-child(3) > .btn").should("be.visible");
    cy.get(":nth-child(3) > .btn").should("be.enabled");
    cy.get(":nth-child(3) > .btn").should("include", /Submit/i);
  }
  static verifySubmittingUnbalancedPOpUp() {
    cy.get("#swal2-title").should("be.visible");
    cy.get("#swal2-title").should(
      "include",
      "One or more validation failures have occurred."
    );
    cy.get("#swal2-html-container").should("be.visible");
    cy.get("#swal2-html-container").should(
      "include",
      "Journal entry not balanced"
    );
    cy.get(".swal2-x-mark-line-right").should("be.visible");
    cy.get(".swal2-confirm").should("be.visible");
    cy.get(".swal2-confirm").should("be.enabled");
    cy.get(".swal2-confirm").should("include", "OK");
    cy.get(".swal2-confirm").click();
  }
  static verifySubmittingBalanced() {
    cy.get(".swal2-confirm").click();
    cy.get(".btn_group > :nth-child(2) > .btn").click();
    cy.get(".swal2-confirm").click();
  }
  static verifyAfterPosting() {
    cy.contains("button", /post/i).should("not.exist");
  }
  static verifyJDDisplayColumnHeaders() {
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)").should(
      "include",
      " Id "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)").should(
      "include",
      " Journal Code "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)").should(
      "include",
      " Reference "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(4)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(4)").should(
      "include",
      " Date "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)").should(
      "be.visible"
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)")
      .scrollIntoView()
      .should("include", /Type/i);
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)")
      .scrollIntoView()
      .should("include", /Document Name/i);
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(7)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(7)").should(
      "include",
      " Document Code "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(8)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(8)").should(
      "include",
      " Repeated "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(9)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(9)").should(
      "include",
      " Reversed "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(10)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(10)").should(
      "include",
      " Status "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(11)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(11)").should(
      "include",
      " Debit "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(12)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(12)").should(
      "include",
      " Credit "
    );
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(13)")
      .scrollIntoView()
      .should("be.visible");
    cy.get(".p-datatable-thead > tr.ng-star-inserted > :nth-child(13)").should(
      "include",
      " Actions "
    );
  }
}
