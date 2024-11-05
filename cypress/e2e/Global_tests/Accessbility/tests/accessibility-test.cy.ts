// Import dependencies
import 'cypress-axe';
import { getUrls } from '../../../../support/utils';

// Cypress test suite
describe('Accessibility Tests for All Pages', () => {
  const urls = getUrls();

  // Step 1: Perform login and store token (assuming login returns a token)
  before(() => {
    cy.login();
  });

  // Step 2: Loop through URLs from the file and run accessibility tests
  it('should run accessibility tests on all pages', () => {
    const results: { url: string; violations: any[] }[] = [];

    // Loop through each URL
    urls.forEach((url) => {
      const keyword = url.split('/').pop();

      // Visit each page with the authentication token
      cy.LandingToERPModule(url, keyword);

      // Inject axe for accessibility testing
      cy.injectAxe();

      // Run the accessibility audit
      cy.checkA11y({
        rules: {
          // Customize Axe rules if needed
          // Example: 'color-contrast': { enabled: true }
        }
      } as Partial<AxeOptions>).then((result: AxeResult) => {
        results.push({ url, violations: result.violations });
      });
    });

    // Generate MD file
    const mdContent = results.map((result) => {
      const violations = result.violations.length
        ? result.violations.map((violation) => {
            return `- **${violation.id}**: ${violation.message}`;
          }).join('\n')
        : 'No violations detected';

      return `## ${result.url}\n${violations}`;
    }).join('\n\n');

    fs.writeFileSync('accessibility-results.md', mdContent);
  });
});