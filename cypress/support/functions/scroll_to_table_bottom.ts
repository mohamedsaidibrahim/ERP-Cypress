export function scrollToTableBottom(tableSelector:string){
// Wait for the table to load completely (this may require adjusting the selector and wait conditions based on your app's behavior)
cy.get(tableSelector).should('exist'); // Ensure table exists
cy.get(tableSelector)
.find("tr")
.its("length");
cy.get(tableSelector).find('tr').should('have.length.greaterThan', 0); // Ensure rows are present
// Scroll to the bottom of the table container
cy.get(tableSelector).scrollTo('bottom');
// Optionally, verify that the bottom row is visible
cy.get(tableSelector).find('tr').last().should('be.visible');
}
