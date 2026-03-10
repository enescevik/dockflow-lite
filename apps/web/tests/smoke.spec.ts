import { expect, test } from '@playwright/test';

test('home page renders and shows API health label', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Warehouse Dock Appointment Scheduling' }),
  ).toBeVisible();
  await expect(page.getByText(/API health:/)).toBeVisible();
});
