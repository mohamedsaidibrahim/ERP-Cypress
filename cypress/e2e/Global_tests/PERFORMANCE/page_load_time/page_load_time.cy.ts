describe('Page Load Time Metrics', () => {
    var pageLaodTimeData: any = [];
    let pages: string[] = [];

    before(() => {
        // Load URLs from the pages.txt file
        cy.readFile("cypress/fixtures/pages_links.txt").then((fileContent) => {
            pages = fileContent
                .split("\n")
                .map((url: string) => url.trim())
                .filter((url: string) => url.length > 0);
        });
    });

    it('should measure different page load metrics ', () => {
        for (var i = 0; i < pages.length; i++) {

            var URL = pages[i];
            cy.visit(URL);
            cy.window().then((win) => {
                const [navigationTiming] = win.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

                if (navigationTiming) {
                    const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;
                    const ttfb = navigationTiming.responseStart - navigationTiming.startTime;
                    const fcp = navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
                    const responseTime = navigationTiming.responseEnd - navigationTiming.requestStart;
                    const throughput = navigationTiming.encodedBodySize / (navigationTiming.responseEnd - navigationTiming.responseStart) || 0;

                    pageLaodTimeData.push({
                        URL: URL,
                        pageLoadTime: pageLoadTime,
                        ttfb: ttfb,
                        fcp: fcp,
                        responseTime: responseTime,
                        throughput: throughput,
                        StartTime: navigationTiming.startTime,
                        UnloadEventStart: navigationTiming.unloadEventStart,
                        UnloadEventEnd: navigationTiming.unloadEventEnd,
                        RedirectStart: navigationTiming.redirectStart,
                        RedirectEnd: navigationTiming.redirectEnd,
                        FetchStart: navigationTiming.fetchStart,
                        DomainLookupStart: navigationTiming.domainLookupStart,
                        DomainLookupEnd: navigationTiming.domainLookupEnd,
                        ConnectStart: navigationTiming.connectStart,
                        ConnectEnd: navigationTiming.connectEnd,
                        SecureConnectionStart: navigationTiming.secureConnectionStart,
                        RequestStart: navigationTiming.requestStart,
                        ResponseStart: navigationTiming.responseStart,
                        ResponseEnd: navigationTiming.responseEnd,
                        DOMInteractive: navigationTiming.domInteractive,
                        DOMContentLoadedEventStart: navigationTiming.domContentLoadedEventStart,
                        DOMContentLoadedEventEnd: navigationTiming.domContentLoadedEventEnd,
                        DOMComplete: navigationTiming.domComplete,
                        LoadEventStart: navigationTiming.loadEventStart,
                        LoadEventEnd: navigationTiming.loadEventEnd,
                        TransferSize: navigationTiming.transferSize,
                        EncodedBodySize: navigationTiming.encodedBodySize,
                        DecodedBodySize: navigationTiming.decodedBodySize,
                        NextHopProtocol: navigationTiming.nextHopProtocol,

                    });
                }
                else {
                    pageLaodTimeData.push({
                        URL: "URL",
                        loadTime: "loadTime",
                        ttfb: "ttfb",
                        fcp: "fcp"
                    });
                }
            });
        }
    });



    after(() => {
        if (pageLaodTimeData.length > 0) {
            cy.task('saveData', { fileType: 'csv', filePath: 'cypress/reports/performance/page_load_time.csv', data: pageLaodTimeData });
        } else {
            cy.logMsg("The brokenLinksData is Empty");
        }
    });


});