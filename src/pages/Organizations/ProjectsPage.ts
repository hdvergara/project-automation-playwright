import { Locator, Page, expect } from '@playwright/test';

export class ProjectsPage {
    private page: Page;
    private titleProject: Locator;
    private buttonCreateProject: Locator;
    private labelSubtitleProject: Locator;
    private inputProjectName: Locator;
    private buttonSave: Locator;
    private popUpMessage: Locator;
    private readonly actionUsers: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titleProject = page.getByText(' Proyectos');
        this.buttonCreateProject = page.getByText('Crear Proyecto');
        this.labelSubtitleProject = page.getByText('Proyecto de la organización');
        this.inputProjectName = page.locator("//span[contains(text(), 'Nombre del proyecto')]/following::input[@type='text'][1]");
        this.buttonSave = page.getByText('Guardar');
        this.popUpMessage = page.locator("//div[@role='dialog']");
        this.actionUsers = page.locator("//a[text()='Usuarios']");
    }
    /**
     * Checks if the title of the project is displayed on the screen.
     *
     * @returns A Promise that resolves to `true` if the title is visible, `false` otherwise.
     * @throws An error if the element is not found or there's an issue with visibility checks.
     */
    async isTitleProjectDisplayed() {
        try {
            await expect(this.titleProject).toBeVisible({ timeout: 10000 });
            return await this.titleProject.isVisible();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error checking project title visibility: ${errorMessage}`);
        }
    }

    /**
 * Clicks on the "Create Project" button.
 *
 * @returns A Promise that resolves when the button is clicked.
 * @throws An error if the element is not found or there's an issue clicking it.
 */
    async clickOnCreateProject() {
        try {
            await this.buttonCreateProject.click();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking "Create Project" button: ${errorMessage}`);
        }
    }

    /**
 * Checks if the subtitle of the project is displayed on the screen.
 *
 * @returns A Promise that resolves to `true` if the subtitle is visible, `false` otherwise.
 * @throws An error if the element is not found or there's an issue with visibility checks.
 */
    async isSubtitleProjectDisplayed() {
        try {
            await expect(this.labelSubtitleProject).toBeVisible({ timeout: 10000 });
            return await this.labelSubtitleProject.isVisible();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error checking project subtitle visibility: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the project name input field.
 *
 * @param projectName The project name to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setProjectName(projectName: string) {
        try {
            await this.inputProjectName.fill(projectName);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting project name to "${projectName}": ${errorMessage}`);
        }
    }

    /**
 * Clicks on the "Save" button.
 *
 * @returns A Promise that resolves when the button is clicked.
 * @throws An error if the element is not found or there's an issue clicking it.
 */
    async clickOnSaveButton(): Promise<void> {
        try {
            await this.buttonSave.click();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking "Save" button: ${errorMessage}`);
        }
    }

    /**
 * Checks if the pop-up message is displayed on the screen.
 *
 * @throws An error if the element is not found or there's an issue with visibility checks.
 */
    async checkPopUpMessage(): Promise<void> {
        try {
            expect(this.popUpMessage, 'Pop-up message is not displayed!').toBeVisible({ timeout: 5000 });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error checking pop-up message visibility: ${errorMessage}`);
        }
    }

    async clickOnUsersAction(): Promise<void> {
        try {
            const projectCount = await this.actionUsers.count();
            if (projectCount > 1) {
                const randomIndex = Math.floor(Math.random() * projectCount);
                const randomElement = this.actionUsers.nth(randomIndex);
                await randomElement.click();
            } else if (projectCount === 1) {
                await this.actionUsers.first().click();
            } else {
                console.log("No projects found");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking on the users action: ${errorMessage}`);
        }
    }
}