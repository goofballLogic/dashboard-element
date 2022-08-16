// @ts-check
const { test, test: { describe, beforeEach }, expect } = require('@playwright/test');

describe("Background", () => {

    beforeEach(async ({ page }) => {

        page.on("console", console.log.bind(console));
        await page.goto("http://localhost:8080/html/blank.html");

    });

    describe("When a dashboard-item element is placed on the page", () => {

        beforeEach(async ({ page }) => {

            await page.locator("body").evaluate(function (body) {

                body.innerHTML = `
                    <dashboard-item-element title="Ignition" states="good,bad,so-so">
                        This is some content
                    </dashboard-item-element>
                `;

            });

        });

        test("Then the item status should render as expected", async ({ page }) => {

            await expect(page.locator("dashboard-item-element")).toHaveClass(/loaded/);
            await expect(page.locator("dashboard-item-element header")).toContainText("Ignition");
            await expect(page.locator("dashboard-item-element .detail")).toContainText("This is some content");

        });

        test("Then the item should have the first status by default", async ({ page }) => {

            await expect(page.locator("dashboard-item-element")).toHaveClass(/good/);

        });

        test("Then the detail should be hidden", async ({ page }) => {

            await page.screenshot({ path: "screenshot.png" });
            await expect(page.locator("dashboard-item-element .detail")).not.toBeVisible();

        });

    });

});
