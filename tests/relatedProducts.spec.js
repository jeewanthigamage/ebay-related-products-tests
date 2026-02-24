const { test, expect } = require('@playwright/test');

/**
 * TC-001: Display Related Products
 * 
 * Description: Verify that the related products section appears when searching for a wallet
 * Test Data: Wallet product page (eBay item ID: 195060516753)
 * Expected Result: Related products section is visible with product items
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Locate the "Related Products" section
 *   3. Verify section is visible
 */
test('TC-001 Display Related Products', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const relatedSection = page.locator('section:has-text("Related Products")');
  await expect(relatedSection).toBeVisible();
});

/**
 * TC-002: Category Validation
 * 
 * Description: Verify that all related products belong to the same category (Wallet)
 * Test Data: Wallet product page; category should be "Wallet" for all items
 * Expected Result: Only wallet items are displayed in the related products section
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Extract category for each related product
 *   3. Assert all categories match "Wallet"
 */
test('TC-002 Category Validation', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const categories = await page.$$eval('.s-item .category', els => els.map(e => e.textContent));
  for (const category of categories) {
    expect(category).toBe('Wallet'); // only wallets should appear
  }
});

/**
 * TC-003: Price Range Validation
 * 
 * Description: Verify that related products are within ±20% of the base product price ($50)
 * Test Data: Base wallet price = $50; related items should be $40–$60
 * Expected Result: All related product prices fall within the ±20% price range
 * Steps:
 *   1. Navigate to wallet product ($50)
 *   2. Extract price for each related product
 *   3. Assert each price is between $40 and $60
 */
test('TC-003 Price Range Validation', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const prices = await page.$$eval('.s-item .price', els => els.map(e => parseFloat(e.textContent.replace(/[^0-9.]/g,''))));
  for (const price of prices) {
    expect(price).toBeGreaterThanOrEqual(40);
    expect(price).toBeLessThanOrEqual(60);
  }
});

/**
 * TC-004: Max Six Products
 * 
 * Description: Verify that a maximum of six related products are displayed
 * Test Data: Product catalog with >6 related wallets
 * Expected Result: Only six related products are shown
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Count all items in the related products section
 *   3. Assert count is ≤ 6
 */
test('TC-004 Max Six Products', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const items = page.locator('.s-item');
  const count = await items.count();
  expect(count).toBeLessThanOrEqual(6);
});

/**
 * TC-005: Product Info Display
 * 
 * Description: Verify that each related product displays image, title, and price
 * Test Data: Product catalog with complete product information
 * Expected Result: Each related product shows image, title, and price
 * Steps:
 *   1. Navigate to wallet product page
 *   2. For each item in related products:
 *      - Verify image is visible
 *      - Verify title is visible
 *      - Verify price is visible
 *   3. Assert all three elements are present for each product
 */
test('TC-005 Product Info Display', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const items = page.locator('.s-item');
  const count = await items.count();

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    await expect(item.locator('img')).toBeVisible();
    await expect(item.locator('.s-item__title')).toBeVisible();
    await expect(item.locator('.s-item__price')).toBeVisible();
  }
});

/**
 * TC-006: Add to Cart Functionality
 * 
 * Description: Verify that "Add to Cart" button works for related products
 * Precondition: User is logged in
 * Test Data: Wallet priced $50 with related products
 * Expected Result: Related product is successfully added to cart (cart badge visible)
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Click "Add to Cart" button on the first related product
 *   3. Verify cart badge is displayed/updated
 */
test('TC-006 Add to Cart Functionality', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const firstItem = page.locator('.s-item').first();
  await firstItem.locator('text=Add to cart').click();

  // Verify cart page or cart badge updated
  const cartBadge = page.locator('#gh-cart-n'); 
  await expect(cartBadge).toBeVisible();
});

/**
 * TC-007: Add to Watchlist Functionality
 * 
 * Description: Verify that "Add to Watchlist" button works for related products
 * Precondition: User is logged in
 * Test Data: Wallet priced $50 with related products
 * Expected Result: Related product is added to watchlist (confirmation message visible)
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Click "Add to Watchlist" button on the first related product
 *   3. Verify confirmation message "Added to your Watchlist" appears
 */
test('TC-007 Add to Watchlist Functionality', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const firstItem = page.locator('.s-item').first();
  await firstItem.locator('text=Add to Watchlist').click();

  // Verify watchlist confirmation
  const watchlistMsg = page.locator('text=Added to your Watchlist');
  await expect(watchlistMsg).toBeVisible();
});

/**
 * TC-008: Fewer Than Six Products
 * 
 * Description: Verify correct behavior when fewer than six related products exist
 * Test Data: Product catalog with only 3 related wallets
 * Expected Result: Only the available items (3) are displayed
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Count related products
 *   3. Assert count is ≤ 6 (and shows all available items if < 6)
 */
test('TC-008 Fewer Than Six Products', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const items = page.locator('.s-item');
  const count = await items.count();
  expect(count).toBeLessThanOrEqual(6); // should show only available items
});

/**
 * TC-009: No Related Products
 * 
 * Description: Verify correct behavior when no related products exist
 * Test Data: Product catalog with no related wallets (0 items)
 * Expected Result: "No related products found" message is displayed
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Check if related products section is empty
 *   3. If count = 0, verify "No related products found" message is visible
 */
test('TC-009 No Related Products', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const relatedSection = page.locator('section:has-text("Related Products")');
  const items = relatedSection.locator('.s-item');
  const count = await items.count();

  if (count === 0) {
    const noProductsMsg = relatedSection.locator('text=No related products found');
    await expect(noProductsMsg).toBeVisible();
  }
});

/**
 * TC-010: Wrong Category Negative Case
 * 
 * Description: Verify that unrelated category products (belts, shoes) are NOT displayed
 * Test Data: Wallet $50; catalog contains belts and shoes
 * Expected Result: Only wallet items displayed; no belts/shoes appear
 * Steps:
 *   1. Navigate to wallet product page
 *   2. Extract category for each related product
 *   3. Assert NO products from belts/shoes categories appear
 */
test('TC-010 Wrong Category Negative Case', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const categories = await page.$$eval('.s-item .category', els => els.map(e => e.textContent));
  for (const category of categories) {
    expect(category).toBe('Wallet'); // unrelated categories should not appear
  }
});

/**
 * TC-011: Out-of-Range Price Negative Case
 * 
 * Description: Verify that products outside the ±20% price range are excluded
 * Test Data: Base wallet price $50; catalog has wallets at $200
 * Expected Result: Out-of-range items excluded; only $40–$60 items shown
 * Steps:
 *   1. Navigate to wallet product ($50)
 *   2. Extract price for each related product
 *   3. Assert NO products appear with price outside the $40–$60 range
 */
test('TC-011 Out-of-Range Price Negative Case', async ({ page }) => {
  await page.goto('https://www.ebay.com/itm/195060516753');
  const prices = await page.$$eval('.s-item .price', els => els.map(e => parseFloat(e.textContent.replace(/[^0-9.]/g,''))));
  for (const price of prices) {
    expect(price).toBeGreaterThanOrEqual(40);
    expect(price).toBeLessThanOrEqual(60); // exclude out-of-range items
  }
});

