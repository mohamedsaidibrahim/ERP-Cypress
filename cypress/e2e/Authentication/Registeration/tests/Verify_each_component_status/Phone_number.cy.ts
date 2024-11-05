import { AuthData } from "../../../data/auth_data";
import { RegisterationPage } from "../../pages/registerPage";
import { checkISRequiredMsg } from "./functions/is_required_message";

beforeEach("visit Registeration Page", () => {
  RegisterationPage.visit();
});

describe("Verify Phone component Status on the Registerion page", () => {
  it("should verify the presence of the red star symbol next to the label title", () => {
    cy.visibilityOfRequiredStar('label[for="mobileNumber"]');
  });
  it("En", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.checkPhoneLabel("Phone");
    RegisterationPage.inputPhoneNumber(AuthData.authPhone);
  }),
    it("Ar", () => {
      RegisterationPage.checkPhoneLabel("الهاتف");
      RegisterationPage.inputPhoneNumber(AuthData.authPhone);
    });

  it("To Verify Confirm Password is Required Message ", () => {
    // Arabic Language
    checkISRequiredMsg("#mobileNumber", false);
    // English Language
    RegisterationPage.clickLangButton();
    checkISRequiredMsg("#mobileNumber", true);
  });
});
