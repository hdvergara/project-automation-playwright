import { Locator, Page, expect } from '@playwright/test';;

export class UsersPage {
    private page: Page;
    private readonly inviteUserButton: Locator;
    private readonly userNameInput: Locator;
    private readonly firstLastNameInput: Locator;
    private readonly secondLastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly expirationInput: Locator;
    private readonly rolOption: Locator;
    private readonly saveButton: Locator;
    private readonly addUserButton: Locator;
    private readonly userSelect: Locator;
    private readonly rolSelect: Locator;
    private readonly popUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inviteUserButton = page.getByRole('button', { name: 'Invitar usuario' });
        this.userNameInput = page.locator("//span[contains(text(), 'Nombre del usuario')]/following::input[@type='text'][1]");
        this.firstLastNameInput = page.locator("//span[contains(text(), 'Primer apellido')]/following::input[@type='text'][1]");
        this.secondLastNameInput = page.locator("//span[contains(text(), 'Segundo apellido')]/following::input[@type='text'][1]");
        this.emailInput = page.locator("#email");
        this.expirationInput = page.locator("//span[contains(text(), 'Expiración)]//following::input[@type='text'][1]");
        this.rolOption = page.locator("//span[contains(text(), 'Rol')]//following::select");
        this.saveButton = page.getByRole('button', {name: 'Guardar'});
        this.addUserButton = page.getByRole('button', { name: 'Agregar usuario' });
        this.userSelect = page.locator("#users");
        this.rolSelect = page.locator("#projects");
        this.popUp = page.locator("//div[@role='dialog']");
    }

    async validateViewUsers() {
        expect(this.inviteUserButton, 'The Invite user is not visible').toBeVisible();
    }

    async clickOnInviteUserButton() {
        await this.inviteUserButton.click()
    }

    async setUserName(userName: string) {
        await this.userNameInput.fill(userName)
    }

    async setFirtsLastName(firstLastName: string) {
        await this.firstLastNameInput.fill(firstLastName)
    }

    async setSecondLastName(secondLastName: string) {
        await this.secondLastNameInput.fill(secondLastName)
    }

    async setEmail(email: string) {
        await this.emailInput.fill(email)
    }

    async selectRolOption(rol: string){
        await this.rolOption.click();
        await this.rolOption.selectOption(rol);
    }

    async clickOnSaveButton() {
        await this.saveButton.click()
    }

    async clickOnAddUserButton() {
        await this.addUserButton.click()
    }

    async selectUser(index: number){
        await this.userSelect.selectOption({index: index});
    }

    async selectRolList(index: number){
        await this.rolSelect.selectOption({index: index});
    }

    async validatePopUp() {
        expect(this.popUp, 'The PopUp is not visible').toBeVisible();
    }
}