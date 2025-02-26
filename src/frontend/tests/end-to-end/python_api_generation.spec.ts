import { expect, test } from "@playwright/test";

test("python_api_generation", async ({ page, context }) => {
  await page.goto("/");
  let modalCount = 0;
  try {
    const modalTitleElement = await page?.getByTestId("modal-title");
    if (modalTitleElement) {
      modalCount = await modalTitleElement.count();
    }
  } catch (error) {
    modalCount = 0;
  }

  while (modalCount === 0) {
    await page.getByText("New Project", { exact: true }).click();
    await page.waitForTimeout(5000);
    modalCount = await page.getByTestId("modal-title")?.count();
  }
  await page.getByRole("heading", { name: "Basic Prompting" }).click();
  await page.waitForTimeout(2000);
  await page.getByText("API", { exact: true }).click();
  await page.getByRole("tab", { name: "Python API" }).click();
  await page.getByTestId("icon-Copy").click();
  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText()
  );
  const clipboardContent = await handle.jsonValue();
  expect(clipboardContent.length).toBeGreaterThan(0);
});
