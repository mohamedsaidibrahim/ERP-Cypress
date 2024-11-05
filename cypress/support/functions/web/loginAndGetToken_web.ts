import { AuthData } from "../../../e2e/authentication/data/auth_data";
import { LoginPage } from "../../../e2e/authentication/login/pages/loginPage";
import { storeAccessToken } from "./web_login_then_store_token";

// Function to login and provide access token
export const loginAndGetTokenWeb = () => {
    cy.wait(500);
    LoginPage.inputUserName(AuthData.tempMail);
    LoginPage.inputPassword(AuthData.pass);
    LoginPage.clickLoginButton("Login");
    cy.wait(1000);
    storeAccessToken();
    cy.wait(500);
};