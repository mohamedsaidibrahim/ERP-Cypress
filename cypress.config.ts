import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";
import * as fastcsv from "fast-csv";

export default defineConfig({
  defaultCommandTimeout: 25000, // 25 seconds
  pageLoadTimeout: 60000, // 60 seconds for page load timeout
  requestTimeout: 15000, // 15 seconds for request timeout
  responseTimeout: 30000, // 30 seconds for response timeout
  screenshotOnRunFailure: true,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports", // Directory to store reports
    overwrite: false, // Whether to overwrite existing reports
    html: false, // Generate HTML report
    json: true, // Generate JSON report
  },
  video: false, // Enable video recording
  videoCompression: 32, // Compress video for smaller file size

  retries: {
    runMode: 1, // Retry twice in CI mode
    openMode: 0, // No retries in open mode
  },
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://intmicrotec.neat-url.com:2006/bussiness-owners/",
    redirectionLimit: 50, // Increase the redirection limit
    supportFile: "cypress/support/e2e.ts",
    chromeWebSecurity: false,
    env: {
      preserveCookies: true,
    },
    setupNodeEvents(on, config) {
      on("after:run", (results) => {
        // Cast the results to CypressRunResult
        const runResults = results as CypressCommandLine.CypressRunResult;
        if (runResults.totalFailed === 0) {
          const videosFolder = config.videosFolder;
          fs.readdir(videosFolder, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(videosFolder, file), (err) => {
                if (err) throw err;
              });
            }
          });
        }
      });
      on("task", {
        // Old task to check or create directory
        checkOrCreateDirectory(dirPath) {
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          return null;
        },

        // Old task to save data to a JSON file
        saveFile({ filePath, data }) {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          return null;
        },

        // New task to save data to a CSV file
        saveToCsv(data) {
          const dirPath = path.join(__dirname, "cypress", "reports");
          const filePath = path.join(dirPath, "broken_links_report.csv");

          // Check or create directory for the CSV file
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          const ws = fs.createWriteStream(filePath);
          fastcsv.write(data, { headers: true }).pipe(ws);

          return null;
        },

        // Generic save task that determines the format (CSV or JSON) based on input
        saveData({ fileType, filePath, data }) {
          if (fileType === "json") {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          } else if (fileType === "csv") {
            const ws = fs.createWriteStream(filePath);
            fastcsv.write(data, { headers: true }).pipe(ws);
          }
          return null;
        },
      });
    },
    specPattern: [
      // // Authentication Authentication  Authentication Authentication  Authentication Authentication
      "cypress/e2e/Authentication/Registeration/tests/Verify_happy_scenario.cy.ts",
      "cypress/e2e/Authentication/Registeration/tests/Verify_all_components_displaying.cy.ts",
      "cypress/e2e/Authentication/Registeration/tests/Verify_each_component_status/Email.cy.ts",
      "cypress/e2e/Authentication/Registeration/tests/Verify_each_component_status/Full_name.cy.ts",
      "cypress/e2e/Authentication/Registeration/tests/Verify_each_component_status/Password_component_status.cy.ts",
      "cypress/e2e/Authentication/Registeration/tests/Verify_each_component_status/Phone_number.cy.ts",
      "cypress/e2e/Authentication/Login/tests/Invalid_credentials.cy.ts",
      "cypress/e2e/Authentication/Login/tests/Verify_alll_components_displaying.cy.ts",
      "cypress/e2e/Authentication/Login/tests/Verify_happy_scenario.cy.ts",

      // Manage Subdomain  Manage Subdomain  Manage Subdomain  Manage Subdomain  Manage Subdomain
      "cypress/e2e/Bussiness_owners/My-subscriptions/Add_domain_space/tests/Add_domain_space.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_companies/tests/AddCompanyDialoge.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_companies/tests/EditCompanyScreen.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_companies/tests/Company_list.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/manage_branches/tests/Add_branch_dialoge.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/manage_branches/tests/Edit_branch_dialoge.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/manage_branches/tests/Display_all_branches_list.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_users/tests/Add_new_user.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_users/tests/Displaying_all_subdomains_users.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_users/tests/Delete_existing_user.cy.ts",
      "cypress/e2e/Bussiness_owners/My-subscriptions/Manage_apps/tests/Manage_apps.cy.ts",


      // General_Setting General_Setting  General_Setting General_Setting  General_Setting General_Setting
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Tags/tests/tags.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Group/tests/Add_taxes_group.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Group/tests/Edit_taxes_group.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Group/tests/Taxes_group_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Definition/tests/Add_taxes_definitions.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Definition/tests/Edit_taxes_definitions.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Taxs Definition/tests/Taxes_definitions_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_definitions/tests/currency_definitions_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_definitions/tests/currency_definitions_listview.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_definitions/tests/currency_definitions_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_definitions/tests/currency_definitions_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_conversion/tests/currency_conversion_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_conversion/tests/currency_conversion_listview.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/currency_conversion/tests/currency_conversion_edit.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Financial Calender/tests/add_financial_calender.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/General_Setting/Financial Calender/tests/listview_financial_calendar.cy.ts",

      // Accounting  Accounting  Accounting  Accounting  Accounting  Accounting
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Displaying.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/charts_of_accounts/tests/Configuration.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/charts_of_accounts/tests/add_chart_of_account.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/charts_of_accounts/tests/Edit_Chart_Of_account.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/charts_of_accounts/tests/Displaying_account_screen.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/charts_of_accounts/tests/Displaying_main_screen.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Add_cost_center.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Edit_cost_center.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/Cost Center/tests/Displaying_cost_center.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Accounting/journal_entry/tests/Journal_entry.cy.ts",


      // Finance Finance  Finance Finance  Finance Finance  Finance Finance  Finance Finance  Finance Finance
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/treasury_definition/tests/treasury_definition_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/treasury_definition/tests/treasury_definition_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/treasury_definition/tests/treasury_definition_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/bank_definition/tests/bank_definition_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/bank_definition/tests/bank_definition_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/bank_definition/tests/bank_definition_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_term/tests/add_payment_term.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_term/tests/edit_payment_term.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_term/tests/payment_term_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_methods/tests/payment_methods_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_methods/tests/payment_methods_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/payment_methods/tests/payment_methods_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentIN/tests/sequence.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentIN/tests/payment_in_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentIN/tests/payment_in_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentIN/tests/payment_in_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentOUT/tests/sequence.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentOUT/tests/payment_out_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentOUT/tests/payment_out_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Finance/PaymentOUT/tests/payment_out_listview.cy.ts",


      // Sales  Sales Sales  Sales Sales  Sales Sales  Sales Sales  Sales Sales  Sales Sales  Sales
      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/Customer_Category/tests/customer_category_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/Customer_Category/tests/customer_category_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/Customer_Category/tests/customer_category_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/customer_definition/tests/customer_definition_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/customer_definition/tests/customer_definition_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Sales/customer_definition/tests/customer_definition_listview.cy.ts",


      // Purchase  Purchase  Purchase  Purchase  Purchase  Purchase  Purchase  Purchase
      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/Vendor_Category/tests/vendor_category_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/Vendor_Category/tests/vendor_category_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/Vendor_Category/tests/vendor_category_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/vendor_definition/tests/vendor_definition_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/vendor_definition/tests/vendor_definition_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Purchase/vendor_definition/tests/vendor_definition_listview.cy.ts",

      // // Inventory  Inventory  Inventory  Inventory  Inventory  Inventory  Inventory
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Warehouses/tests/warehouse_add_quick.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Warehouses/tests/warehouse_continue.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Warehouses/tests/warehouse_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Warehouses/tests/warehouse_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Operation_Tags/tests/operation_tags_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Operation_Tags/tests/operation_tags_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Operation_Tags/tests/operation_tags_listview.cy.ts",


      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_Category/tests/add_item_category.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_Category/tests/Displaying_Item_category_screen.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_Category/tests/Edit_item_category.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_Category/tests/Displaying_main_screen.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Attributes/tests/attribute_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Attributes/tests/attribute_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Attributes/tests/attribute_listview.cy.ts",

      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Unit_of_measurments/tests/uom_add.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Unit_of_measurments/tests/uom_edit.cy.ts",
      "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Unit_of_measurments/tests/uom_listview.cy.ts",

      // "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_definition/tests/item_definition_add_quick.cy.ts",
      // "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_definition/tests/item_definition_add_continue.cy.ts",
      // "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_definition/tests/item_definition_edit_continue.cy.ts",
      // "cypress/e2e/Bussiness_owners/Erp_Login/Inventory/Item_definition/tests/item_definition_listview.cy.ts",

      // HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR  HR HR
      // "cypress/e2e/Bussiness_owners/Erp_Login/HR/Employee/tests/add_employee.cy.ts",

      // // CONSOLE CONSOLE CONSOLE CONSOLE CONSOLE
      // "cypress/e2e/Global_tests/CONSOLE/navigationAndErrorDetection/navigationAndErrorDetection.cy.ts",
      // "cypress/e2e/Global_tests/CONSOLE/Javascript_errors/tests/js_errors.cy.ts",
      // "cypress/e2e/Global_tests/CONSOLE/Broken_Links/tests/erp_broken_links_spec.cy.ts",
      // "cypress/e2e/Global_tests/CONSOLE/Broken_Links/tests/erp_broken_links_csv.cy.ts",
      // "cypress/e2e/Global_tests/CONSOLE/Broken_Links/tests/erp_broken_links_json.cy.ts",

      // // PERFORMANCE  PERFORMANCE  PERFORMANCE  PERFORMANCE  PERFORMANCE
      // 'cypress/e2e/Global_tests/PERFORMANCE/page_load_time/auth/page_load_time.cy.ts',
      // 'cypress/e2e/Global_tests/PERFORMANCE/page_load_time/page_load_time.cy.ts'
      "cypress/e2e/Global_tests/Accessbility/Archive/all_urls/version1_generate-accessibility-report.cy.js"
    ],
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
