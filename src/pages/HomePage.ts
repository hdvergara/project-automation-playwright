import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
  private page: Page;
  private lblWelcome: Locator;
  private optOrganization: Locator;
  private myOrganizations: Locator;
  private crateOrganization: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lblWelcome = page.locator('//span[contains(text(),"Bienvenido")]');
    this.optOrganization = page.locator("//p[contains(text(),'Organizaciones')]");
    this.myOrganizations = page.getByRole('link', { name: 'Mis organizaciones' });
    this.crateOrganization = page.getByRole('link', { name: 'Crear organización' });
  }

  /**
 * Checks if the welcome label is displayed on the screen.
 *
 * @returns A Promise that resolves to `true` if the label is visible, `false` otherwise.
 * @throws An error if the element is not found or there's an issue with visibility checks.
 */
  async verifyWelcomeLabel(): Promise<boolean> {
    try {
      expect(this.lblWelcome).toBeVisible({ timeout: 10000 });
      return await this.lblWelcome.isVisible();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      throw new Error(`Error verifying welcome label visibility: ${errorMessage}`);
    }
  }

  /**
 * Clicks on the "Organizations" option after waiting for 5 seconds.
 *
 * @returns A Promise that resolves when the "Organizations" option is clicked.
 * @throws An error if the element is not found or there's an issue clicking it,
 *         or if the element is not visible within the timeout.
 */
  async clickOnOrganizations(): Promise<void> {
    try {
      await this.page.waitForTimeout(7000); // Wait for 5 seconds (consider adjusting based on application behavior)
      expect(this.optOrganization).toBeVisible({ timeout: 10000 });
      await this.optOrganization.click();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      throw new Error(`Error clicking on "Organizations" option: ${errorMessage}`);
    }
  }

  /**
 * Clicks on the "Create Organization" button after checking its visibility.
 *
 * @returns A Promise that resolves when the "Create Organization" button is clicked.
 * @throws An error if the element is not found or there's an issue clicking it,
 *         or if the element is not visible within the timeout.
 */
  async clikOnCreateOrganization(): Promise<void> { // Corrected typo: clikOnCreateOrganization -> clickOnCreateOrganization
    try {
      expect(this.crateOrganization).toBeVisible({ timeout: 10000 });
      await this.crateOrganization.click();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      throw new Error(`Error clicking on "Create Organization" button: ${errorMessage}`);
    }
  }

  /**
 * Clicks on the "My Organizations" option after checking its visibility.
 *
 * @returns A Promise that resolves when the "My Organizations" option is clicked.
 * @throws An error if the element is not found or there's an issue clicking it,
 *         or if the element is not visible within the timeout.
 */
  async clickOnMyOrganizations(): Promise<void> {
    try {
      expect(this.myOrganizations).toBeVisible({ timeout: 10000 });
      await this.myOrganizations.click();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error';
      throw new Error(`Error clicking on "My Organizations" option: ${errorMessage}`);
    }
  }

}