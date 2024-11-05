import { AuthData } from "../../data/auth_data";
import { RegisterationPage } from "../pages/registerPage";

describe("Verify Happy Scenario Registeration", () => {
  beforeEach("visit Registeration Page", () => {
    RegisterationPage.visit();
  }),
    it("VerifyHappyScenarioRegisterationTestAr", () => {
      RegisterationPage.implemntNormalRegSteps("010"+AuthData.authPhone);
      RegisterationPage.validateRegisteration(
        "تم ارسال ايميل التاكيد",
        "برجاء مراجعة بريدك الالكترونى",
        AuthData.authMail
      );
    });
  it("VerifyHappyScenarioRegisterationTestEN", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.implemntNormalRegSteps("011"+AuthData.authPhone);
    RegisterationPage.validateRegisteration(
      /Verification Email Sent/i,
      /Check Your Email/i,
      AuthData.authMail
    );
  });
});


