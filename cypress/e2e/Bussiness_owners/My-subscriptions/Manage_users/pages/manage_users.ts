export class ManageUsers {
  static clickFirstManageUsers() {
    cy.get('button[class="mange body_b14 user"]')
      .eq(1)
      .scrollIntoView()
      .should("be.visible");
    cy.get('button[class="mange body_b14 user"]').eq(1).click();
  }

  static clickDeleteOnTheLastUser() {
    cy.get("table tbody tr")
      .last()
      .find("td")
      .eq(5)
      .scrollIntoView()
      .should("be.visible");
    cy.get("table tbody tr").last().find("td").eq(5).scrollIntoView().click();
  }
  static verifyDisplayingResendButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").length > 1) {
        cy.get("tbody tr td")
          .find(".checked > .resend > .ico_mail")
          .last()
          .scrollIntoView()
          .should("be.visible");
        cy.get("tbody tr td")
          .find(".checked > .resend > .title")
          .last()
          .should("have.text", "Resend");
      }
    });
  }
  static inputSearchText(searchTxt: string) {
    cy.get('input[placeholder="Search"]')
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked")
      .clear()
      .type(searchTxt + "{enter}");
  }
  static verifySearchText(searchTxt: string) {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").is(":visible")) {
        cy.contains("table tbody tr", searchTxt).should("be.visible");
      } else {
        cy.log("Table is Empty");
      }
    });
  }
  static clickResendButton() {
    cy.get("table").then(($table) => {
      if ($table.find("tbody tr").length > 1) {
        cy.get("tbody tr td")
          .find(".checked > .resend > .title")
          .last()
          .click();
      }
    });
  }

  static cancelTheDeletePopUp() {
    cy.get('div[role="dialog"]')
      .find("button")
      .contains(/cancel/i)
      .click();
  }

  static inputAllRegularData(mail: string) {
    cy.wait(1000);
    ManageUsers.selectBasicLicence();
    ManageUsers.selectTheLastCompany();
    ManageUsers.inputMail(mail);
    ManageUsers.selectTheFirstAndLastBranch();
  }
  static clickAddNewUser() {
    cy.get('button[icon="pi pi-plus"]').click();
  }
  static clickCancelDialoge() {
    cy.getByTestAttribute('cancel').click();
  }
  static clickBackSubDomainHomeButton() {
    cy.get('span[class="p-menuitem-icon pi pi-home ng-star-inserted"]').click();
  }
  static verifyDialogTitleComponentsAreVisible() {
    cy.contains(".title", /Invite user/i).should("be.visible");
  }
  static verifyDialogCancelIconComponentsAreVisible() {
    cy.get(".invite_user_header > .pi")
      .should("be.visible")
      .should("have.class", "cancel");
  }
  static verifyDialogEmailLabelComponentsAreVisible() {
    cy.get(":nth-child(1) > .group > lib-label > .form-label").should(
      "have.text",
      "   Email *"
    );
  }
  static verifyDialogEmailTextFieldComponentsAreVisible() {
    cy.get(".ng-untouched > .p-inputtext")
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked");
  }
  static verifyDialogCompanyLabelComponentsAreVisible() {
    cy.get(":nth-child(2) > .group > lib-label > .form-label")
      .should("be.visible")
      .should("have.text", "   Company *");
  }
  static verifyDialogCompanyDropDownComponentsAreVisible() {
    cy.get(
      "span.p-element.p-dropdown-label.p-inputtext.p-dropdown-label-empty.ng-star-inserted"
    )
      .should("have.css", "opacity", "0")
      .should("have.class", "p-dropdown-label");
  }
  static verifyDialogBranchesLabelComponentsAreVisible() {
    cy.get(":nth-child(3) > .group > lib-label > .form-label")
      .should("be.visible")
      .should("have.text", "   Branches *");
  }
  static verifyDialogBranchesTextFieldComponentsAreVisible() {
    cy.get(".p-multiselect-label-container")
      .should("be.visible")
      .should("have.class", "p-multiselect-label-container");
  }
  static verifyDialogDomainSpaceLabelComponentsAreVisible() {
    cy.get(".group > label")
      .should("be.visible")
      .should("have.text", " Domain Space ");
  }
  static verifyDialogDomainSpaceTextFieldComponentsAreVisible(
    subDomainName: string
  ) {
    cy.get(".view")
      .should("be.visible")
      .should(($div) => {
        const cleanedText = $div
          .text()
          .replace(/\u00a0/g, " ")
          .trim();
        expect(cleanedText).to.equal(
          subDomainName
            .toString()
            .trim()
            .replace(/.Microtecdev.Com/i, "")
            .replace("&nbsp;", "")
        );
      });
  }
  static verifyDialogLicenceLabelComponentsAreVisible() {
    cy.get(":nth-child(5) > .group > lib-label > .form-label")
      .should("be.visible")
      .should("have.text", "   select Licence *");
  }
  static verifyDialogSelectLicenceTextFieldComponentsAreVisible() {
    cy.get('span[role="combobox"]')
      .eq(2)
      .should("have.css", "opacity", "0")
      .should("have.class", "p-dropdown-label");
  }
  static verifyDialogCancelDialoButtonComponentsAreVisible() {
    cy.getByTestAttribute("cancel")
      .should("be.visible")
      .should("be.enabled")
      .should("have.class", "cancel");
  }
  static verifyDialogSaveDialoButtonComponentsAreVisible() {
    cy.get(".save")
      .should("be.visible")
      .should("be.enabled")
      .should("have.class", "save")
      .should("have.text", " Send User Inviation ");
  }
  static verifyAllComponentsAreVisible(subDomainName: string) {
    //	Check the Dialog Title
    //	Check The Dialoge Title
    ManageUsers.verifyDialogTitleComponentsAreVisible();
    //	Check the Dialog Cancel Icon
    ManageUsers.verifyDialogCancelIconComponentsAreVisible();
    //	Check The Email Label
    ManageUsers.verifyDialogEmailLabelComponentsAreVisible();
    //	Check The Email Text Field
    ManageUsers.verifyDialogEmailTextFieldComponentsAreVisible();
    //	Check The Company Label
    ManageUsers.verifyDialogCompanyLabelComponentsAreVisible();
    //	Check The Company Drop Down
    ManageUsers.verifyDialogCompanyDropDownComponentsAreVisible();
    //	Check The Branches Label
    ManageUsers.verifyDialogBranchesLabelComponentsAreVisible();
    //	Check The Branches Text Field
    ManageUsers.verifyDialogBranchesTextFieldComponentsAreVisible();
    //	Check The Domain Space Label
    ManageUsers.verifyDialogDomainSpaceLabelComponentsAreVisible();
    //	Check The Domain Space Text Field
    ManageUsers.verifyDialogDomainSpaceTextFieldComponentsAreVisible(
      subDomainName
    );
    //	Check The select Licence Label
    ManageUsers.verifyDialogLicenceLabelComponentsAreVisible();
    //	Check The select Licence Text Field
    ManageUsers.verifyDialogSelectLicenceTextFieldComponentsAreVisible();
    //	Check the Dialog Cancel Button
    ManageUsers.verifyDialogCancelDialoButtonComponentsAreVisible();
    //	Check the Dialog Save Button
    ManageUsers.verifyDialogSaveDialoButtonComponentsAreVisible();
  }
  static ensureThatTheCountryDropdownIsEmpty() {
    cy.get('span[role="combobox"]')
      .eq(1)
      .should("have.class", "p-dropdown-label-empty");
  }
  static clickBranchesDropdownButton() {
    cy.get(".p-multiselect-label-container").click({ force: true });
  }
  static validateThatTheBranchesListIsEmpty() {
    cy.get(".p-multiselect-empty-message")
      .should("not.have.value")
      .should("have.text", " No results found ");
  }
  static inputMail(mail: string) {
    cy.getByTestAttribute("email").clear().type(mail);
  }

  static selectTheLastCompany() {
    cy.getLastItemInDropDownList("companyId");
    cy.get('div[role="dialog"]').click();
  }
  static selectTheFirstAndLastBranch() {
    cy.get('p-multiselect[data-testid="branchIds"]').click();
    cy.get('div[class="p-checkbox-box"]').first().click();
  }
  static verifyTheLastBranchText() {
    cy.get(".p-multiselect-label-container").click({ force: true });

    cy.get('li[role="option"]')
      .last()
      .its("text")
      .then((txt) => {
        cy.get('li[role="option"]').last().click();
        cy.get('timesicon[class="p-element p-icon-wrapper ng-star-inserted"]')
          .eq(1)
          .click();
        cy.wait(500);
        cy.get(".p-multiselect-label").should("contains", txt);
      });
  }

  static selectBasicLicence() {
    cy.getFirstItemInDropDownList("tenantLicenseId");
    cy.get('div[role="dialog"]').click();
  }
  static selectAdvancedLicence() {
    cy.getLastItemInDropDownList("tenantLicenseId");
    cy.get('div[role="dialog"]').click();
  }
  static verifyLicenceCount(licence: string, count: number) {
    cy.get('span[role="combobox"]').eq(2).click();
    cy.contains("span", licence).should("contain", count.toString());
    cy.contains("span", licence).click();
    cy.get(".domain_content").click();
  }
  static clickSaveButton() {
    cy.get('button[type="submit  "]').click();
  }
  static cancelAddDialoge() {
    cy.get('div[class="pi pi-times cancel"]').click({ force: true });
  }
}
