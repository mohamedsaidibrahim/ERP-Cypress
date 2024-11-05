import { AuthData } from "../../../data/auth_data";
import { RegisterationPage } from "../../pages/registerPage";
import { checkISRequiredMsg } from "./functions/is_required_message";
beforeEach("visit Registeration Page", () => {
  RegisterationPage.visit();
});

describe("Verify Password component Status on the Registerion page", () => {
  it("CheckLabelsEn", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.checkPasswordLabel("Password");
    RegisterationPage.checkConfirmPasswordLabel("Confirm Password");
  }),
    it("CheckLabelsAr", () => {
      RegisterationPage.checkPasswordLabel("الرقم السرى");
      RegisterationPage.checkConfirmPasswordLabel("اعادة كتابة الرقم السرى");
    });

  it("Check Is Required Message is Successfully displayed", () => {
    // To Verify Password is Required Message  Arabic
    checkISRequiredMsg("#inputPassword", false);
    // To Verify Confirm Password is Required Message  Arabic
    checkISRequiredMsg("#inputConfirmPassword", false);
    // To Verify Password is Required Message English
    RegisterationPage.clickLangButton();
    checkISRequiredMsg("#inputPassword", true);
    // To Verify Confirm Password is Required Message English
    checkISRequiredMsg("#inputConfirmPassword", true);
  });

  it("should verify the presence of a lock icon in the text field", () => {
    cy.checkImageVisibilityBySrc("/assets/img/login/iconly_light_lock.webp");
  });
  it("should verify password complexity requirements", () => {
    RegisterationPage.verifyPasswordCompatibility();
  });

  it("should verify that password and confirm password fields match", () => {
    RegisterationPage.inputPassword(AuthData.pass);
    RegisterationPage.inputConfirmPassword(AuthData.pass);
    RegisterationPage.verifyPasswordAndConfirmPasswordEquality();
  });
  it("should verify the appearance of a message if confirm password is different", () => {
    RegisterationPage.inputPassword(AuthData.pass);
    RegisterationPage.inputConfirmPassword(AuthData.inCorrectPass5);
    RegisterationPage.validatePassordAndConfirmPasswordDifference();
  });
  it("should verify that the password is encrypted when entered", () => {
    RegisterationPage.verifyEncryptedPassword("#inputPassword");
    RegisterationPage.verifyEncryptedPassword("#inputConfirmPassword");
  });
});
