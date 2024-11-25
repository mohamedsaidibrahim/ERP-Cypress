import { AuthData } from "../../data/auth_data";

export class LoginPage {
  static visit() {
    // Catch uncaught exceptions specific to the "children" error
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Cannot read properties of null (reading 'children')")) {
        return false;
      }
      return true;
    });

    cy.viewport(1920, 1080);
    cy.visit(AuthData.loginUrl);

    cy.wait(3000); // Initial wait for page load

    cy.url().then((currentUrl) => {
      if (currentUrl.includes("2006")) {
        cy.reload();
        cy.log("You Are In: " + AuthData.loginUrl);
      } else {
       this.visit(); // Retry if not on the correct page
      }
    });
  }

  static visitAuth() {
    cy.visit(AuthData.loginUrl);
    cy.logOut();
    cy.visit(AuthData.loginUrl);
  }
  static getPageHeader(head: string) {
    cy.get("h4").contains(head).should('be.visible');
  }
  static getPageHeaderPara(headerPar: string) {
    cy.get("p").contains(headerPar);
  }
  static getPageSecHeader() {
    cy.get("h3").contains("Hello!").contains("Welcome");
  }

  static checkLogoImg(img: string) {
    cy.checkImageVisibilityBySrc(img);
  }

  // Will BE Replaced by Email
  static checkUserNameLabel(userLabel: string) {
    cy.get('label[for="Username"]')
      .invoke("text")
      .then((txt) => {
        expect(txt.trim().toLowerCase()).to.equal(
          userLabel.trim().toLowerCase()
        );
      });
  }
  // Will BE Replaced by Email
  // static inputUserName(userName: string) {
  //   cy.get("#Username").clear().type(userName).should("have.value", userName);
  // }

  static checkEmailLabel(emailLabel: string) {
    cy.get("label").contains(emailLabel);
  }

  static inputEmail(mail: string) {
    cy.get("#Email")
      .eq(0)
      .clear()
      .type(mail)
      .should("have.value", mail);
  }

  static checkPasswordLabel(passLabel: string) {
    cy.get("label").contains(passLabel);
  }

  static inputPassword(pass: string) {
    cy.get('#Password')
      .clear()
      .type(pass)
      .should("have.value", pass);
  }

  static checkUserForgetPasswordLink() {
    cy.get('div[class=" forget-link"] a')
      .should("have.attr", "href")
      .and("include", "/Account/ForgotPassword");
  }

  static checkDoNotHaveAccountLink(str: string) {
    cy.get("p.register-account").contains(str);
  }

  static checkLangButton() {
    cy.get("a.lang-btn").should("be.visible");
  }
  static clickLangButton() {
    cy.get("a.lang-btn").should("be.visible");
    cy.get('a[class="lang-btn"]').click();
  }
  static checkRememberMe() {
    cy.get('#RememberMe').click();;
  }

  static checkLoginButton(loginStr: string) {
    cy.get('button[type="submit"]')
      .should("be.visible")
      .should("be.enabled");
  }
  static clickLoginButton() {
    cy.get('button[type="submit"]').last().click();
  }
}
