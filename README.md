

```markdown
# eBay Related Products Automation

## Overview
This project automates testing of the **Related Products** feature on eBay using Playwright.  
The tests are derived from the manual test cases (TC-001 to TC-011) created earlier.
```
---

## Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ebay-related-products-tests
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## Running Tests
Run all tests:
```bash
npx playwright test
```

Run a specific test:
```bash
npx playwright test -g "TC-001 Display Related Products"
```

View HTML report:
```bash
npx playwright show-report
```

---

## Project Structure

```
ebayProductsTests/
├── tests/
│   ├── example.spec.js           # Example test (template)
│   └── relatedProducts.spec.js   # Related Products test suite (11 test cases)
├── playwright.config.js          # Playwright configuration (timeouts, reporters, browsers)
├── package.json                  # Dependencies and npm scripts
├── README.md                      # This file
└── playwright-report/            # Generated test reports (after running tests)
```

---

## Test Cases Automated
| TC ID  | Test Case Name                      | Description                                           | Status       |
|--------|-------------------------------------|-------------------------------------------------------|--------------|
| TC-001 | Display Related Products            | Verify related products section is visible            | To be tested |
| TC-002 | Category Validation                 | Verify all products belong to same category (Wallet)  | To be tested |
| TC-003 | Price Range Validation              | Verify products within ±20% price range ($40–$60)     | To be tested |
| TC-004 | Max Six Products                    | Verify maximum six related products displayed         | To be tested |
| TC-005 | Product Info Display                | Verify image, title, and price shown for each product | To be tested |
| TC-006 | Add to Cart Functionality           | Verify "Add to Cart" button works for related items   | To be tested |
| TC-007 | Add to Watchlist Functionality      | Verify "Add to Watchlist" button works                | To be tested |
| TC-008 | Fewer Than Six Products             | Verify correct display when <6 products available     | To be tested |
| TC-009 | No Related Products                 | Verify "No related products found" message displays   | To be tested |
| TC-010 | Wrong Category Negative Case        | Verify unrelated categories (belts, shoes) NOT shown  | To be tested |
| TC-011 | Out-of-Range Price Negative Case    | Verify products outside price range are excluded      | To be tested |

---

```

```
### Test Data

All tests use:
- **Base Product**: Wallet (eBay Item ID: 195060516753)
- **Base Price**: $50 USD
- **Price Range**: $40–$60 (±20%)
- **Expected Category**: Wallet
- **Max Display Count**: 6 products

---

## Running Tests

### Run All Tests

```bash
npm test
```

or

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/relatedProducts.spec.js
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with Headed Browser (See Browser Window)

```bash
npx playwright test --headed
```

### Run Single Test by Name

```bash
npx playwright test -g "TC-001"
```

---

## Test Reports

### View HTML Report

```bash
npx playwright show-report
```

This opens an interactive HTML report showing:
- Test results (pass/fail)
- Execution time
- Screenshots and videos (if enabled)
- Error details

The report is saved in `playwright-report/` after each run.

---

## Configuration

### playwright.config.js

Key settings:

```javascript
testDir: './tests'                  // Location of test files
timeout: 30 * 1000                 // Test timeout (30 seconds)
expect: { timeout: 5000 }          // Assertion timeout (5 seconds)
fullyParallel: true                // Run tests in parallel
reporter: ['list', 'html']         // Output list and HTML reports
headless: true                     // Run in headless mode (no browser UI)
viewport: { width: 1280, height: 720 }  // Browser viewport size
trace: 'on-first-retry'            // Capture trace on first failure
```

---


## Development Guide

### Adding New Tests

1. Create a new file in `tests/` folder: `tests/newFeature.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

/**
 * TC-012: Your New Test
 * Description: ...
 * Test Data: ...
 * Expected Result: ...
 * Steps: ...
 */
test('TC-012 Your New Test Name', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  // Add your test steps here
  await expect(page).toHaveTitle(/eBay/);
});
```

2. Run the new test:

```bash
npx playwright test tests/newFeature.spec.js
```

### Best Practices

- **Use clear test names**: Include TC ID and description
- **Add JSDoc comments**: Document TC ID, description, data, and expected results
- **Use appropriate locators**: Prefer `data-testid` or semantic selectors
- **Avoid hardcoded waits**: Use Playwright's built-in waiting mechanisms
- **Keep tests independent**: Each test should not rely on others
- **Use fixtures**: Leverage Playwright fixtures for common setup/teardown

---

## Troubleshooting

### Tests Fail with "Timeout"
- Increase timeout in `playwright.config.js`
- Check if the website is reachable

### Browser Not Found
```bash
npx playwright install
```

### Clear Cache

```bash
rm -rf node_modules .playwright
npm install
npx playwright install
```

## Framework Maintenance

### Update Playwright

```bash
npm update @playwright/test
```

### Update All Dependencies

```bash
npm update
```

### Run Dependency Audit

```bash
npm audit
```

---

## Resources

- [Playwright Documentation](https://playwright.dev/)

---

## Author & Version

- **Framework Version**: 1.0.0
- **Created**: February 2026
- **Last Updated**: February 24, 2026

---
