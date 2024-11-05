import { AuthData } from "../../../data/auth_data";
import { RegisterationPage } from "../../pages/registerPage";
import { checkISRequiredMsg } from "./functions/is_required_message";
beforeEach("Visit Registeration Page", () => {
  RegisterationPage.visit();
});

describe("Verify Full Name component Status on the Registerion page", () => {
  it("To Verify FullName is Required Message", () => {
    // Arabic
    checkISRequiredMsg("#FullName", false);
    // English
    RegisterationPage.clickLangButton();
    checkISRequiredMsg("#FullName", true);
  });
  it("En", () => {
    RegisterationPage.clickLangButton();
    RegisterationPage.checkFullNameLabel("Full Name");
    RegisterationPage.typeFullName(AuthData.fullNameLower);
    RegisterationPage.typeFullName(AuthData.fullNameUpper);
    RegisterationPage.typeFullName(AuthData.fullNameE100);
  }),
    it("Ar", () => {
      RegisterationPage.checkFullNameLabel("الاسم بالكامل");
      RegisterationPage.typeFullName(AuthData.fullNameLower);
      RegisterationPage.typeFullName(AuthData.fullNameUpper);
      RegisterationPage.typeFullName(AuthData.fullNameE100);
    });
});
