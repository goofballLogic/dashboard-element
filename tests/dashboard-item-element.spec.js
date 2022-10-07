// @ts-check
const { test, test: { describe, beforeEach }, expect } = require('@playwright/test');

const exampleImgDataUrl = "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

describe("Background", () => {

    beforeEach(async ({ page }) => {

        page.on("console", console.log.bind(console));
        await page.goto("http://localhost:8082/html/blank.html");

    });

    describe("When a dashboard-item element is placed on the page", () => {

        beforeEach(async ({ page }) => {

            await page.locator("body").evaluate(function (body, imgUrl) {

                body.innerHTML = `
                    <dashboard-item-element data-title="Ignition" data-states="good,bad,so-so" data-img="${imgUrl}" data-img-alt="a star">
                        This is some content
                    </dashboard-item-element>
                `;

            }, exampleImgDataUrl);

        });

        test("Then the item status should render as expected", async ({ page }) => {

            await expect(page.locator("dashboard-item-element")).toHaveClass(/loaded/);
            await expect(page.locator("dashboard-item-element header")).toContainText("Ignition");
            await expect(page.locator("dashboard-item-element .detail")).toContainText("This is some content");
            await expect(page.locator("dashboard-item-element header img")).toHaveCSS("background-image", `url("${exampleImgDataUrl}")`);
            await expect(page.locator("dashboard-item-element header img")).toHaveAttribute("alt", "a star");

        });

        test("Then the item should have the first specified status by default", async ({ page }) => {

            await expect(page.locator("dashboard-item-element")).toHaveClass(/good/);
            expect(await page.locator("dashboard-item-element").evaluate(e => e.dataset.state)).toEqual("good");

        });

        test("Then the detail should be hidden", async ({ page }) => {

            await expect(page.locator("dashboard-item-element .detail")).not.toBeVisible();

        });

        describe("And the detailed class is added", () => {

            beforeEach(async ({ page }) => {

                await page.locator("dashboard-item-element").evaluate(e => e.classList.add("detailed"));

            });

            test("Then the detail should be shown", async ({ page }) => {

                await expect(page.locator("dashboard-item-element .detail")).toBeVisible();

            });

        });

        describe("And the state is changed using data attributes", () => {

            beforeEach(async ({ page }) => {

                await page.locator("dashboard-item-element").evaluate(element => { element.dataset.state = "so-so" });

            });

            test("Then the item should display the correct status", async ({ page }) => {

                await expect(page.locator("dashboard-item-element")).toHaveClass(/so-so/);

            });

        });

        describe("And I try to set the state to an invalid state", () => {

            beforeEach(async ({ page }) => {

                await page.locator("dashboard-item-element").evaluate(element => { element.dataset.state = "madness" });

            });

            test("Then the item should still display the previous status", async ({ page }) => {

                await expect(page.locator("dashboard-item-element")).toHaveClass(/good/);

            });

        });

    });

});
