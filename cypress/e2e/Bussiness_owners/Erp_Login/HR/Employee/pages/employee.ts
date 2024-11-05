import { NavigatesToSideModule } from "../../../../functions/navigates_to_side_module";
import { HRData } from "../../data/hr_data";

export class Employee {
  static clickAddNewButton() {
    cy.contains('button',/create/i).scrollIntoView().click();
  }
  static clickSaveButton() {
    cy.get('button[type="submit"]').scrollIntoView().should("be.visible").click();
  }
  static clickCancelButton() {
    cy.get('button[class="cancel"]').scrollIntoView().should("be.visible").click();
  }
  static clickEditButton(){
    
  }
  static forceNavigate() {
    cy.visit(HRData.hrUrl);
    cy.reload();
    cy.clickContinueAs();
    cy.url().then((currentUrl) => {
      if (currentUrl.includes("employee")) {
        cy.log("You Are In ..");
      } else {
        NavigatesToSideModule.navigatesToAnAppinSubdomain(/hr/i);
        NavigatesToSideModule.navigatesToTheModule(HRData.hrUrl, 1);
      }
    });
  }
  static landing() {
    cy.LandingToERPModule(HRData.hrUrl, "employee");

  }
}
