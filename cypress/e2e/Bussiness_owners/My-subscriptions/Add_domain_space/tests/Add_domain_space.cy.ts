import { LoginPage } from "../../../../Authentication/Login/pages/loginPage";
import { SubDomainData } from "../../../data/sub_domain_data";
import { MySubscriptionsPage } from "../../My_subscriptions_page/pages/my-subscriptions_page";
import { AddDomainSpace } from "../pages/add_domain_space";

describe("Add Domain Space", () => {
  beforeEach("Navigation", () => {
    LoginPage.visit();
    cy.clickContinueAs();
  });

  it("1.Verify Adding Subdomain", () => {
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    // implement Add SubDomain and Monthly
    AddDomainSpace.implementAddSubDomain(
      SubDomainData.count,
      SubDomainData.subDomainName
    );
    AddDomainSpace.clickAddToCartButton();
    cy.wait(30000);
    // Verify That The Saved Data is Stored and Displayed Successfully
    AddDomainSpace.validateNewCardIsAddedOnTheGrid(
      SubDomainData.subDomainName,
      SubDomainData.count,
      SubDomainData.isMonthly
    );
  });
  /// Special Charachters Not Allowed

  it("2.Verify That The System Correctly Calculate The Price Monthly and Yearly", function () {
    cy.clickContinueAs();
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.inputeCount(SubDomainData.count);
    AddDomainSpace.validateYearlyCount(SubDomainData.count);
    AddDomainSpace.clickMonthly();
    AddDomainSpace.validateMonthlyCount(SubDomainData.count);
  });

  it("3.Verify That The Count Can't be Greater Than 12 or Less Than 1", function () {
    var count = 13;
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.clickMonthly();
    AddDomainSpace.inputeCount(count);
    AddDomainSpace.clickDialoge();
    AddDomainSpace.verifyValidSubDomainCount(count);
    count = 0;
    AddDomainSpace.inputeCount(count);
    AddDomainSpace.clickDialoge();
    AddDomainSpace.verifyValidSubDomainCount(count);
  });

  it("4.Verify That The Count accepts Numbers", function () {
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    var count = "A";
    AddDomainSpace.validateStringCount(count);
  });

  it("5.Verify That The System Can't Accept The Existing Domain Space Name", function () {
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.inputeCount(3);
    AddDomainSpace.inputeYourDomainSpace(SubDomainData.subDomainName);
    AddDomainSpace.validateDublicatedDomainSpace();
  });

  it("6.Verify That form validate all the required components before submitting", function () {
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.clearCount();
    AddDomainSpace.inputeYourDomainSpace(SubDomainData.subDomainName);
    AddDomainSpace.validateRequiredComponents(1);
    AddDomainSpace.inputeCount(7);
    AddDomainSpace.inputeYourDomainSpace(SubDomainData.subDomainName);
    AddDomainSpace.validateRequiredComponentsMsgRemoval();
  });

  it("7.Verify Adding Subdomain has Special Characters, Prevent Submission", () => {
    const subDomainNameSpecial =
      "****/***lowerdomain" + SubDomainData.subDomainName;
    MySubscriptionsPage.clickAddDomainSpaceBtn();
    AddDomainSpace.implementAddSubDomain(
      SubDomainData.count,
      subDomainNameSpecial
    );
    AddDomainSpace.clickAddToCartButton();
    cy.wait(300);
    AddDomainSpace.verifyDialogPresistance();
    // Verify That  Special Charachters Not Allowed Displayed Successfully
    AddDomainSpace.validationSpecialCharacters();
  });
});
