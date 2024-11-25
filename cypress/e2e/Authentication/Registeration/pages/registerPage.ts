import { generateRandomEmail } from "../../../../support/utils";
import { AuthData } from "../../data/auth_data";

export class RegisterationPage {

  static visit() {
    // Catch uncaught exceptions specific to the "children" error
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Cannot read properties of null (reading 'children')")) {
        return false;
      }
      return true;
    });

    cy.viewport(1920, 1080);
    cy.visit(AuthData.registerationUrl);

    cy.wait(3000); // Initial wait for page load

    cy.url().then((currentUrl) => {
      if (currentUrl.includes("2004")) {
        cy.reload();
        cy.log("You Are In: " + AuthData.registerationUrl);
      } else {
        this.visit(); // Retry if not on the correct page
      }
    });
  }

  static clickLangButton() {
    cy.get("a.lang-btn").eq(0).click({ force: true });
  }

  static getPageHeader(head: string) {
    cy.get("h4").contains(head);
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
  static checkFullNameLabel(fullName: string) {
    cy.get('label[for="fullName"]').contains(fullName);
    cy.visibilityOfRequiredStar('label[for="fullName"]');
  }
  static typeFullName(fullName: string) {
    cy.get('input[name="fullName"]').clear().type(fullName).should("have.value", fullName);
  }
  static checkEmailLabel(label: string) {
    cy.get('label[for="email"]').contains(label);
    cy.visibilityOfRequiredStar('label[for="email"]');
  }
  static inputEmail() {
    cy.confirmEmailRegExCompatibility('input[name="email"]', generateRandomEmail());
  }

  static checkCountryLabel(CountryLabel: string) {
    cy.get("label").contains(CountryLabel).should("be.visible");
  }

  static clickDropDownCountryList() {
    cy.get("#select2-dropDownCountry-container").click();
  }

  static inputCountry(country: String) {
    cy.get('input[class="select2-search__field"]')
      .clear()
      .type(country + "{enter}");
  }

  static checkPasswordLabel(passLabel: string) {
    cy.get('label[for="Password"]').contains(passLabel);
    cy.visibilityOfRequiredStar('label[for="Password"]');
  }

  static inputPassword(pass: string) {
    cy.get("#inputPassword")
      .clear()
      .type(pass)
      .type("{enter}")
      .should("have.value", pass);
  }
  static checkConfirmPasswordLabel(conPassLabel: string) {
    cy.get('label[for="confirmPassword"]').contains(conPassLabel);
    cy.visibilityOfRequiredStar('label[for="confirmPassword"]');
  }
  static inputConfirmPassword(pass: string) {
    cy.get("#inputConfirmPassword")
      .clear()
      .type(pass)
      .type("{enter}")
      .should("have.value", pass);
  }
  static verifyPasswordCompatibility() {
    cy.checkRegExCompatibility(
      'input[name="password"]',
      AuthData.correctPassword,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass1,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass2,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass3,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass4,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass5,
      AuthData.passwordRegex
    );
    cy.checkRegExInCompatibility(
      'input[name="password"]',
      AuthData.inCorrectPass6,
      AuthData.passwordRegex
    );
  }
  static verifyPasswordAndConfirmPasswordEquality() {
    cy.get('input[name="password"]')
      .invoke("val")
      .then((passwordValue) => {
        cy.get('input[name="confirmPassword"]')
          .invoke("val")
          .should("eq", passwordValue);
      });
  }
  static validatePassordAndConfirmPasswordDifference() {
    cy.get("span#inputConfirmPassword-error").should("be.visible");
    cy.contains(AuthData.diffPassMsg).should("be.visible");
  }
  static verifyEncryptedPassword(passSelector: string) {
    // Input The Password
    cy.get(passSelector).clear().type(AuthData.pass);
    // Check Its Existance in the form text field
    cy.get(passSelector)
      .clear()
      .invoke("val")
      .then((enteredPassword) => {
        expect(enteredPassword).not.to.equal(AuthData.pass);
      });
  }
  static checkPhoneLabel(phone: string) {
    cy.get('label[for="mobileNumber"]').contains(phone);
    cy.visibilityOfRequiredStar('label[for="mobileNumber"]');
  }

  static inputPhoneNumber(phone: string) {
    cy.get('input[name="mobileNumber"]').clear().type(phone).should("have.value", phone);
  }

  static checkCountryCode(code: string) {
    cy.get('span[id="select2-dropDownMobile-container"]')
      .should("have.attr", "title")
      .and("include", code);
  }

  static checkAgreeStatementLabel(stri: string) {
    cy.get("label").contains(stri);
  }
  static checkHaveAnAccount(stri: string) {
    cy.get("span").contains(stri);
  }
  static confirmCheckBox() {
    cy.get("input#termsBox").click();.should("be.checked");
  }

  static checkSignInButton(label: string) {
    cy.get("a").contains(label);
  }

  static checkRegisterationButton(loginStr: string) {
    cy.get(".custom-btn").contains(loginStr).should("be.visible");
  }
  static clickRegisterationButton() {
    cy.get('button[type="submit"]').should("be.visible").click();
  }
  static checkVerficationEmailSent(label: string, mail: string) {
    cy.get("h4").contains(label);
    cy.get("p.m-0").should("contain.text", mail);
  }
  static validateRegisteration(
    headerStr: any,
    paraString: any,
    registerMail: string
  ) {
    cy.get("h4").contains(headerStr);
    cy.contains("p", paraString).should('be.visible');
    // cy.contains("p",registerMail).should('be.visible');
  }
  static implemntNormalRegSteps(phone: string) {
    RegisterationPage.typeFullName(AuthData.fullName);
    RegisterationPage.inputEmail();
    RegisterationPage.clickDropDownCountryList();
    RegisterationPage.inputCountry(AuthData.country);
    RegisterationPage.inputPassword(AuthData.pass);
    RegisterationPage.inputConfirmPassword(AuthData.pass);
    RegisterationPage.inputPhoneNumber(phone);
    RegisterationPage.checkCountryCode(AuthData.code);
    RegisterationPage.confirmCheckBox();
    RegisterationPage.clickRegisterationButton();
  }
}
