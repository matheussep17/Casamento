const { test: base, expect } = require("@playwright/test");
const { site } = require("../shared/test-data");

const RSVP_URL = "**/script.google.com/macros/s/**/exec";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      window.__openedUrls = [];
      window.open = (url) => {
        window.__openedUrls.push(String(url));
        return null;
      };
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => undefined },
      });
    });
    await page.route(RSVP_URL, async (route) => {
      await route.fulfill({ status: 200, contentType: "text/plain", body: "OK" });
    });
    await use(page);
  },
});

module.exports = { test, expect, RSVP_URL, site };
