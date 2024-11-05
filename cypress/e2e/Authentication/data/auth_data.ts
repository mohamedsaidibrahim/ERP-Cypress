import { generateRandomEmail, generateValidMobileNumber } from "../../../support/utils";

export class AuthData {
  static loginUrl = "https://intmicrotec.neat-url.com:2006/bussiness-owners/login?culture=en";
  static registerationUrl = "https://intmicrotec.neat-url.com:2004/Register";
  static logoImg = "/assets/img/logo.webp";
  static fullName = "moah mmn";
  static loginMail = "jigex28457@bsidesmn.com";
  static registerMail = "halaga4323@kinsef.com";
  static sessionMail = "jigex28457@bsidesmn.com";
  static usedmail1 = "kepori7824@ahieh.com";
  static pass = "As12345*";
  static passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  static correctPassword = "Test123!";
  static inCorrectPass1 = "test123!";
  static inCorrectPass2 = "TEST123!";
  static inCorrectPass3 = "Test1231";
  static inCorrectPass4 = "Testtest!";
  static inCorrectPass5 = "1234567!";
  static inCorrectPass6 = "/*----====!";
  static diffPassMsg = "تأكد من تطابق كلمتي المرور";
  static code = "20";
  static country = "Egy";
  static authPhone = generateValidMobileNumber();
  static authMail = generateRandomEmail();
  static face_img = "/assets/img/login/social_icon_facebook.webp";
  static google_img = "/assets/img/login/social_icon_google.webp";
  static apple_img = "/assets/img/login/social_icon_apple.webp";
  static mail_img: string = "/assets/img/login/social_icon_emailwebp.webp";
  static fullNameUpper = "MOHAMED SAID";
  static fullNameLower = "mohamed said";
  static fullNameE100 =
    "Mohamed Said Mohamed Said Mohamed Said Mohamed Said Mohamed Said Mohamed Said Mohamed Said Mohamed S";
}
