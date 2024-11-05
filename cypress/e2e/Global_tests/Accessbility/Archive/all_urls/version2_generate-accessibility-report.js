const { exec } = require('child_process');
const fs = require('fs');

// Read the URLs from the file
const urls = fs.readFileSync(path.join(__dirname, "Input", 'pages_links.txt')).split('\n');

// Open a file to write the report
const reportStream = fs.createWriteStream(path.join(__dirname, "Output", 'v2_axe-unified-report.md'), { flags: 'a' });

urls.forEach(url => {
  exec(`axe ${url.trim()} --quiet --json`, (error, stdout, stderr) => {
    if (error) {
      reportStream.write(`# ${url}\n\n`);
      reportStream.write(`Error running axe on ${url}: ${error.message}\n\n`);
      return;
    }

    try {
      const result = JSON.parse(stdout);
      // Process and write the results to the report
      if (result.violations && result.violations.length > 0) {
        reportStream.write(`# ${url}\n\n`);
        result.violations.forEach(v => {
          reportStream.write(`### ${v.description}\n`);
          reportStream.write(`**Impact**: ${v.impact}\n`);
          reportStream.write(`**Help**: ${v.helpUrl}\n\n`);
        });
      } else {
        reportStream.write(`# ${url}\n\nNo violations found in the Page URL.\n\n`);
      }
    } catch (parseError) {
      reportStream.write(`# ${url}\n\nError parsing JSON output: ${parseError.message}\n\n`);
    }
  });
});