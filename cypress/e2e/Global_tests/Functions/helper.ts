// Helper function to load page URLs from a file
export const loadPagesFromFile = (
  filePath: string
): Cypress.Chainable<string[]> => {
  return cy.readFile(filePath).then((fileContent) => {
    return fileContent
      .split("\n")
      .map((url: string) => url.trim())
      .filter((url: string) => url.length > 0);
  });
};
