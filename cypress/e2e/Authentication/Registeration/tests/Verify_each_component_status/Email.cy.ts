import { AuthData } from "../../../data/auth_data";
import { RegisterationPage } from "../../pages/registerPage";
import { checkISRequiredMsg } from "./functions/is_required_message";

describe("Verify Email component Status on the Registerion page", () => {
  beforeEach("Visit Registeration Page", () => {
    RegisterationPage.visit();
  });
  it("To Verify Email is Required Message", () => {
    // Arabic
    checkISRequiredMsg("#FullName", false);
    // English
    RegisterationPage.clickLangButton();
    checkISRequiredMsg("#FullName", true);
  });

  it("checkEmailRegExFormatEn", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.checkEmailLabel("Email");
    RegisterationPage.inputEmail();
  }),
    it("checkEmailRegExFormatAr", () => {
      RegisterationPage.checkEmailLabel("البريد الالكترونى");
      RegisterationPage.inputEmail();
    });
  it("checkRegisterationWithUsedEmail", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.checkEmailLabel("Email");
    RegisterationPage.inputEmail();
  });
});
