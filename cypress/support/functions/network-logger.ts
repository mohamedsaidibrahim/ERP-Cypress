/// <reference types="cypress" />

export const logNetworkRequests = () => {
  const requests: any[] = [];

  before(() => {
    cy.intercept('**/*', (req) => {
      req.on('response', (res) => {
        requests.push({
          url: req.url,
          method: req.method,
          status: res.statusCode,
          response: res.body,
        });
      });
    });
  });

  after(() => {
    const filename = `network-log-${new Date().toISOString()}.json`;
    const data = JSON.stringify(requests, null, 2);
    cy.task('writeNetworkLog', { filename, data });
  });
};
