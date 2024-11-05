export function checkISRequiredMsg(el:string, isEn:boolean){
    let msg=isEn? 'Field is required' :'هذا الحقل مطلوب';
    cy.get(el).clear().type('{enter}');
    cy.get("span").contains(msg).should('be.visible');
    cy.get(el).clear();
  };