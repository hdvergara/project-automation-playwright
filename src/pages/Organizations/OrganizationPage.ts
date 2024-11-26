import { Locator, Page, expect } from '@playwright/test';


export class OrganizationPage {
    private page: Page;
    private optOrganization: Locator;
    private crateOrganization: Locator;

    private titleNewOrganization: Locator;
    private titleMyOrganizations: Locator;
    private inputOrganizationName: Locator;
    private inputBillingEmail: Locator;
    private inputPhone: Locator;
    private selectCountry: Locator;
    private inputState: Locator;
    private inputCity: Locator;
    private inputAddress: Locator;
    private inputZipCode: Locator;
    private buttonSave: Locator;
    private editOrganization: Locator;
    private projectOrganization: Locator;
    private actionDelete: Locator;
    private countCards: Locator;
    private buttonAccept: Locator;
    private popUpMessage: Locator;
    private amountInitialCards: number = 0;
    private actionUsers: Locator;
    private actionProjects: Locator;


    constructor(page: Page) {
        this.page = page;
        this.optOrganization = page.locator("//p[contains(text(),'Organizaciones')]");
        this.crateOrganization = page.getByRole('link', { name: 'Crear organización' });
        this.titleNewOrganization = page.getByText('Nueva organización');
        this.titleMyOrganizations = page.locator("//span[contains(text(), 'Mis organizaciones')]");
        this.inputOrganizationName = page.locator("//span[contains(text(), 'Nombre de la organización')]/following::input[@type='text'][1]");
        this.inputBillingEmail = page.locator('div').filter({ hasText: /^Correo de facturación\*$/ }).getByRole('textbox');
        this.inputPhone = page.locator('div').filter({ hasText: /^Teléfono\*$/ }).getByRole('textbox');
        this.selectCountry = page.getByRole('combobox').nth(3);
        this.inputState = page.locator("//span[contains(text(), 'Estado / Provincia')]/following::input[@type='text'][1]");
        this.inputCity = page.locator("//span[contains(text(), 'Ciudad')]/following::input[@type='text'][1]");
        this.inputAddress = page.locator("//span[contains(text(), 'Dirección')]/following::input[@type='text'][1]");
        this.inputZipCode = page.locator("//span[contains(text(), 'Código Postal')]/following::input[@type='text'][1]");
        this.buttonSave = page.getByRole('button', { name: 'Guardar' });
        this.editOrganization = page.locator("//a[text()='Editar' and contains(@class, 'text-sm text-left cursor-pointer border-r pr-3 text-primarySense')]");
        this.projectOrganization = page.locator("//a[text()='Proyectos' and contains(@class, 'text-sm text-left cursor-pointer border-r pr-3 text-primarySense')]");
        this.actionDelete = page.locator("//a[text()='Eliminar' and contains(@class, 'text-sm text-left cursor-pointer')]");
        this.countCards = page.locator(".py-2.px-2.grid.gap-6.grid-cols-min-20rem-fill > div");
        this.buttonAccept = page.getByRole('button', { name: 'Aceptar' });
        this.popUpMessage = page.locator(".styleModal");
        this.actionUsers = page.locator("//a[text()='Usuarios']");
        this.actionProjects = page.locator("//a[text()='Proyectos']");
    }

    async clickOnOrganizations() {
        await this.page.waitForTimeout(5000);
        expect(this.optOrganization).toBeVisible()
        await this.optOrganization.click();
    }

    async clikOnCreateOrganization() {
        await this.crateOrganization.waitFor({ state: "visible", timeout: 50000 })
        const isVisible = await this.crateOrganization.isVisible();
        if (isVisible) {
            await this.crateOrganization.click();
        } else {
            await this.optOrganization.click();
            await this.crateOrganization.click();
        }
    }

    /**
 * Checks if the title for creating a new organization is displayed on the screen.
 *
 * @returns A Promise that resolves to `true` if the title is visible, `false` otherwise.
 * @throws An error if the element is not found or there's an issue with visibility checks.
 */
    async isTitleNewOrganizationDisplayed(): Promise<boolean> {
        try {
            await expect(this.titleNewOrganization).toBeVisible({ timeout: 10000 });
            return await this.titleNewOrganization.isVisible();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error checking new organization title visibility: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the organization name input field.
 *
 * @param orgName The name of the organization to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setOrganizationName(orgName: string): Promise<void> {
        try {
            await this.inputOrganizationName.fill(orgName);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting organization name: ${errorMessage}`);
        }
    }

    /**
  * Sets the value of the billing email input field.
  *
  * @param email The email address to set.
  * @returns A Promise that resolves when the input field is filled.
  * @throws An error if the element is not found or there's an issue setting the value.
  */
    async setEmail(email: string): Promise<void> {
        try {
            await this.inputBillingEmail.fill(email);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting billing email: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the phone number input field.
 *
 * @param phoneNumber The phone number to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setPhone(phoneNumber: string): Promise<void> {
        try {
            await this.inputPhone.fill(phoneNumber);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting phone number: ${errorMessage}`);
        }
    }

    /**
 * Selects a specific country from the country dropdown menu.
 *
 * @param country The name of the country to select.
 * @returns A Promise that resolves when the country is selected.
 * @throws An error if the element is not found or there's an issue selecting the country.
 */
    async setCountry(country: string): Promise<void> {
        try {
            await this.selectCountry.selectOption(country);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error selecting country "${country}": ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the state input field.
 *
 * @param state The state value to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setState(state: string): Promise<void> {
        try {
            await this.inputState.fill(state);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting state: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the city input field.
 *
 * @param city The city value to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setCity(city: string): Promise<void> {
        try {
            await this.inputCity.fill(city);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting city: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the address input field.
 *
 * @param address The address value to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setAddress(address: string): Promise<void> {
        try {
            await this.inputAddress.fill(address);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting address: ${errorMessage}`);
        }
    }

    /**
 * Sets the value of the zip code input field.
 *
 * @param zipCode The zip code value to set.
 * @returns A Promise that resolves when the input field is filled.
 * @throws An error if the element is not found or there's an issue setting the value.
 */
    async setZipCode(zipCode: string): Promise<void> {
        try {
            await this.inputZipCode.fill(zipCode);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error setting zip code: ${errorMessage}`);
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
 * Checks if the title for "My Organizations" is displayed on the screen.
 *
 * @returns A Promise that resolves to `true` if the title is visible, `false` otherwise.
 * @throws An error if the element is not found or there's an issue with visibility checks.
 */
    async isTitleMyOrganizationsDisplayed(): Promise<boolean> {
        try {
            await expect(this.titleMyOrganizations).toBeVisible({ timeout: 10000 });
            return await this.titleMyOrganizations.isVisible();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error checking "My Organizations" title visibility: ${errorMessage}`);
        }
    }

    /**
 * Clicks on the "Edit" button of the first organization card in the list.
 *
 * @returns A Promise that resolves when the "Edit" button is clicked.
 * @throws An error if the element is not found or there's an issue clicking it.
 */
    async clickOnEditOrganizationCard(): Promise<void> {
        try {
            await this.editOrganization.first().click();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking "Edit" button on first organization card: ${errorMessage}`);
        }
    }

    /**
 * Clicks on the first project within an organization (assuming there's a list).
 *
 * @returns A Promise that resolves when the first project is clicked.
 * @throws An error if the element is not found or there's an issue clicking it.
 */
    async clickOnProject(): Promise<void> {
        try {
            const projectCount = await this.projectOrganization.count();
            if (projectCount > 1) {
                const randomIndex = Math.floor(Math.random() * projectCount);
                const randomElement = this.projectOrganization.nth(randomIndex);
                await randomElement.click();
            } else if (projectCount === 1) {
                await this.projectOrganization.first().click();
            } else {
                console.log("No projects found");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking on the first project: ${errorMessage}`);
        }
    }

    async clickOnDeleteAction(): Promise<void> {
        try {
            const projectCount = await this.actionDelete.count();
            if (projectCount > 1) {
                const randomIndex = Math.floor(Math.random() * projectCount);
                const randomElement = this.actionDelete.nth(randomIndex);
                await randomElement.click();
            } else if (projectCount === 1) {
                await this.actionDelete.first().click();
            } else {
                console.log("No projects found");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking on the delete action: ${errorMessage}`);
        }
    }

    async clickOnAcceptButton() {
        try {
            await this.buttonAccept.click();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking on the accept button: ${errorMessage}`);
        }
    }

    async validatePopUp() {
        try {
            await expect(this.popUpMessage).toBeVisible();
            console.log(await this.popUpMessage.textContent());
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'unknown error';
            throw new Error(`Error clicking on the accept button: ${errorMessage}`);
        }
    }

    async validateDelteCard() {
        const amountFinalCards = await this.countCards.count();
        expect(this.amountInitialCards, 'Se encontro la misma cantidad de Organizaciones').toBeLessThan(amountFinalCards)
    }
    /**
     * 
     */
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