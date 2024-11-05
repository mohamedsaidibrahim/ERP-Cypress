import { AuthData } from "../../data/auth_data";
import { RegisterationPage } from "../pages/registerPage";

describe("Verify that all the components exist on the Register page", () => {
  beforeEach("visit Registeration Page", () => {
    RegisterationPage.visit();
  });
  it("En", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.getPageHeader("Register");
    RegisterationPage.getPageHeaderPara(
      "Sign Up A new Account for the first time"
    );
    RegisterationPage.getPageSecHeader();
    RegisterationPage.checkFullNameLabel("Full Name");
    RegisterationPage.typeFullName(AuthData.fullName);
    RegisterationPage.inputEmail();
    RegisterationPage.checkCountryLabel("Country");
    RegisterationPage.clickDropDownCountryList();
    RegisterationPage.inputCountry(AuthData.country);
    // cy.checkImageVisibilityBySrc(AuthData.face_img);
    // cy.checkImageVisibilityBySrc(AuthData.mail_img);
    // cy.checkImageVisibilityBySrc(AuthData.google_img);
    // cy.checkImageVisibilityBySrc(AuthData.apple_img);
    RegisterationPage.checkPasswordLabel("Password");
    RegisterationPage.inputPassword(AuthData.pass);
    RegisterationPage.checkConfirmPasswordLabel("Confirm Password");
    RegisterationPage.inputConfirmPassword(AuthData.pass);
    RegisterationPage.checkPhoneLabel("Phone");
    RegisterationPage.inputPhoneNumber(AuthData.authPhone);
    RegisterationPage.checkCountryCode(AuthData.code);
    RegisterationPage.checkRegisterationButton("Register Now");
    RegisterationPage.checkAgreeStatementLabel(
      "I agree the Terms and Conditions"
    );
    RegisterationPage.checkHaveAnAccount("have an account?");
    RegisterationPage.checkSignInButton("Sign In");
    RegisterationPage.confirmCheckBox();
    RegisterationPage.checkRegisterationButton("Register Now");
  }),
    it("Ar", () => {
      RegisterationPage.visit();
      RegisterationPage.getPageHeader("تسجيل مستخدم");
      RegisterationPage.getPageHeaderPara("قم بانشاء حساب جديد لاول مرة");
      RegisterationPage.getPageSecHeader();
      RegisterationPage.checkFullNameLabel("الاسم بالكامل");
      RegisterationPage.typeFullName(AuthData.fullName);
      RegisterationPage.checkEmailLabel("البريد الالكترونى");
      RegisterationPage.inputEmail();
      RegisterationPage.checkCountryLabel("الدولة");
      RegisterationPage.clickDropDownCountryList();
      RegisterationPage.inputCountry(AuthData.country);
      // cy.checkImageVisibilityBySrc(AuthData.face_img);
      // cy.checkImageVisibilityBySrc(AuthData.mail_img);
      // cy.checkImageVisibilityBySrc(AuthData.google_img);
      // cy.checkImageVisibilityBySrc(AuthData.apple_img);
      RegisterationPage.checkPasswordLabel("الرقم السرى");
      RegisterationPage.inputPassword(AuthData.pass);
      RegisterationPage.checkConfirmPasswordLabel("اعادة كتابة الرقم السرى");
      RegisterationPage.inputConfirmPassword(AuthData.pass);
      RegisterationPage.checkPhoneLabel("الهاتف");
      RegisterationPage.inputPhoneNumber(AuthData.authPhone);
      RegisterationPage.checkCountryCode(AuthData.code);
      RegisterationPage.checkSignInButton("تسجل دخول");
      RegisterationPage.checkAgreeStatementLabel(
        "انا موافق على القواعد والشروط"
      );
      RegisterationPage.checkHaveAnAccount("هل لديك حساب ؟");
      RegisterationPage.confirmCheckBox();
      RegisterationPage.checkRegisterationButton("سجل الان");
    });
});
