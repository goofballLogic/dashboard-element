// @ts-check
const { test, test: { describe, beforeEach }, expect } = require('@playwright/test');

describe("Given the dashboard component is mounted", () => {

    beforeEach(async ({ page }) => {

        page.on("console", console.log.bind(console));
        await page.goto("http://localhost:8080/html/blank.html");
        await page.evaluate(function () {

            document.body.innerHTML = `
                <dashboard-element></dashboard-element>
            `;

        });

    });

    test("something", async ({ page }) => {

        await expect(page.locator("dashboard-element")).toContainText("It's a dashboard");

    });

});