import { AuthData } from "../../data/auth_data";
import { LoginPage } from "../pages/loginPage";
import { validateLogin } from "./functions/validateLogin";

describe("Verify The Happy Scenario on the Login page", () => {
  beforeEach("Visit Login Page", () => {
    LoginPage.visit();
  });

  it("LoginAndSaveAccessTokenEn", () => {
    LoginPage.inputEmail(AuthData.loginMail);
    LoginPage.inputPassword(AuthData.pass);
    LoginPage.clickLoginButton();
    cy.wait(1000);
    validateLogin();
  }),
    it("LoginAndSaveAccessTokenAr", () => {
      LoginPage.clickLangButton();
      LoginPage.inputEmail(AuthData.loginMail);
      LoginPage.inputPassword(AuthData.pass);
      LoginPage.clickLoginButton();
      cy.wait(1000);
      validateLogin();
    });
});
