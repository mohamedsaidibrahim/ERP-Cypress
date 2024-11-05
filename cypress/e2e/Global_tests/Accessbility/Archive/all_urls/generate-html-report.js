const fs = require('fs');

// Read the JSON report
const rawData = fs.readFileSync('axe-report.json');
const report = JSON.parse(rawData);

// Check if violations exist
if (!report.violations || report.violations.length === 0) {
    console.log("No violations found in the report.");
    return;
}

// Generate a simple HTML report
let htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Report</title>
  <style>
    body { font-family: Arial, sans-serif; }
    h1 { color: #333; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px 12px; border: 1px solid #ccc; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Accessibility Report for ${report.url}</h1>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Impact</th>
        <th>Help URL</th>
      </tr>
    </thead>
    <tbody>`;

report.violations.forEach((violation) => {
  htmlReport += `
    <tr>
      <td>${violation.description}</td>
      <td>${violation.impact}</td>
      <td><a href="${violation.helpUrl}" target="_blank">More Info</a></td>
    </tr>`;
});

htmlReport += `
    </tbody>
  </table>
</body>
</html>`;

// Write the HTML report to a file
fs.writeFileSync('axe-custom-report.html', htmlReport);
console.log('Custom HTML report generated as axe-custom-report.html');
