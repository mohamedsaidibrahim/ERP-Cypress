import { AuthData } from "./../../data/auth_data";
import { LoginPage } from "../pages/loginPage";

describe("Verify that all the components exist on the Login page", () => {
  // beforeEach("Visit Login Page", () => {
  //   LoginPage.visit();
  // });
  it("En", () => {
    LoginPage.visit();
    LoginPage.getPageHeader("Login");
    LoginPage.getPageSecHeader();
    LoginPage.checkUserNameLabel("Email Or Phone*");
    LoginPage.inputEmail(AuthData.loginMail);
    LoginPage.checkPasswordLabel("Password");
    LoginPage.inputPassword(AuthData.pass);
    LoginPage.checkUserForgetPasswordLink();
    LoginPage.checkDoNotHaveAccountLink("Don't have an account?");
    LoginPage.checkLangButton();
    LoginPage.checkLoginButton("Login");
  }),
    it("Ar", () => {
      LoginPage.visit();
      LoginPage.clickLangButton();
      cy.wait(1500);
      LoginPage.getPageHeader("تسجيل الدخول");
      LoginPage.getPageSecHeader();
      LoginPage.checkUserNameLabel("البريد الالكتروني او رقم الهاتف*");
      LoginPage.inputEmail(AuthData.loginMail);
      LoginPage.checkPasswordLabel("كلمة المرور");
      LoginPage.inputPassword(AuthData.pass);
      LoginPage.checkUserForgetPasswordLink();
      LoginPage.checkDoNotHaveAccountLink("ليس لديك حساب؟");
      LoginPage.checkLoginButton("تسجيل الدخول");
    });
});
