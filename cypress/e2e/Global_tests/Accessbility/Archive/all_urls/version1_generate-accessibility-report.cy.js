const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Path to the URLs text file
const urlsFilePath = path.join(__dirname, "Input", "pages_links.txt");

// Path to save the markdown report
const reportFilePath = path.join(
  __dirname,
  "Output",
  "v1_axe-unified-report.md"
);

// Function to run axe-cli for a given URL
function runAxeCli(url) {
  try {
    // Run axe-cli and capture the output
    const axeReport = execSync(`axe ${url} --quiet --json`, {
      encoding: "utf-8",
    });
    const parsedReport = JSON.parse(axeReport);

    return parsedReport.violations.length > 0
      ? parsedReport.violations
      : "No violations found";
  } catch (error) {
    console.error(`Error running axe on ${url}:`, error.message);
    return "Error running axe";
  }
}

// Function to generate the markdown report
function generateMarkdownReport(urls) {
  let markdownContent = `# Accessibility Report\n\n`;

  urls.forEach((url) => {
    // Run axe-cli for each URL and get the violations or "No violations found"
    const result = runAxeCli(url);

    markdownContent += `## ${url}\n\n`;

    if (typeof result === "string") {
      markdownContent += `**${result}**\n\n`;
    } else {
      result.forEach((violation) => {
        markdownContent += `- **Violation:** ${violation.description}\n`;
        markdownContent += `  - **Impact:** ${violation.impact}\n`;
        markdownContent += `  - **Help URL:** [${violation.helpUrl}](${violation.helpUrl})\n\n`;
      });
    }

    markdownContent += "\n---\n\n";
  });

  // Write the markdown content to the file
  fs.writeFileSync(reportFilePath, markdownContent);
  console.log(`Report generated at ${reportFilePath}`);
}

// Main function to read URLs from file and generate the report
describe("Axa", () => {
  const urls = [];
  before("Prepare", () => {
    urls = fs.readFileSync(urlsFilePath, "utf-8").split("\n").filter(Boolean);
  });

  it("Accessability Test", () => {
    try {
      if (urls.length === 0) {
        console.error("No URLs found in the pages_links.txt file.");
        return;
      }

      generateMarkdownReport(urls);
    } catch (error) {
      console.error("Error reading URLs file:", error.message);
    }
  });
});
