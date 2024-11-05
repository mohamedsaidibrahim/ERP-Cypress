import { AuthData } from "../../data/auth_data";
import { LoginPage } from "../pages/loginPage";

describe("InvalidCredentials", () => {
  beforeEach("Visit Login Page", () => {
    // LoginPage.visitAuth();
    LoginPage.visit();
  });
  it("EntersWrongPassword", () => {
    LoginPage.inputEmail(AuthData.loginMail);
    // Wrong Password
    LoginPage.inputPassword(AuthData.pass + "Wrong");
    LoginPage.clickLoginButton();
    cy.get('div[data-valmsg-summary="true"]').should("be.visible");
  });
  it("MissingPassword", () => {
    LoginPage.inputEmail(AuthData.loginMail);
    LoginPage.clickLoginButton();
    cy.get('div[data-valmsg-summary="true"]').should("be.visible");
    cy.get("li").contains(/The Password Field Is Required./i);
  });
  it("Enter Wrong Email", () => {
    LoginPage.inputEmail("testtest@test.ccc");
    LoginPage.inputPassword(AuthData.pass);
    LoginPage.clickLoginButton();
    cy.get('div[data-valmsg-summary="true"]').should("be.visible");
  });
  it("MissingEmail", () => {
    LoginPage.inputPassword(AuthData.pass);
    LoginPage.clickLoginButton();
    cy.get('div[data-valmsg-summary="true"]').should("be.visible");
    cy.get("li").contains(/The email Field Is Required./i);
  });
});
