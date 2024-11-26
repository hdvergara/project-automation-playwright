import { Locator, Page, expect } from '@playwright/test';

export class AttentionConfigurationPage{
    private page: Page;
    private readonly lblTitleAttentionConfiguration: Locator;
    private readonly buttonCreateNewOrganization: Locator;
    private readonly cardBotBuilder: Locator;
    private readonly cardBotBasic: Locator;
    private readonly inputTitle: Locator;
    private readonly buttonContinue: Locator;
    private readonly selectFlow: Locator;
    private readonly buttonSave: Locator;

    constructor(page: Page){
        this.page = page;
        this.lblTitleAttentionConfiguration = page.getByRole('link', { name: 'Configuración atención' });
        this.buttonCreateNewOrganization = page.getByRole('button', { name: 'Crear nueva configuración' });
        this.cardBotBuilder = page.getByRole('link', { name: 'attention-bot Bot Builder' });
        this.cardBotBasic = page.getByRole('link', { name: 'attention-bot Bot Básico' });
        this.inputTitle = page.getByPlaceholder('Titulo');
        this.buttonContinue = page.getByRole('button', { name: 'Continuar' });
        this.selectFlow = page.locator("//label[contains(text(), 'Flujo')]/following::select");
        this.buttonSave = page.getByRole('button', { name: 'Guardar' });
    }

    async validateTitleNewAttentionConfigurationDisplayed(){
        expect(this.lblTitleAttentionConfiguration, 'The title is not visible').toBeVisible();
    }

    async validateButtonCreateDisplayed(){
        expect(this.buttonCreateNewOrganization, 'The Invite user is not visible').toBeVisible();
    }

    async clickOnCreateNewConfiguration(){
        await this.buttonCreateNewOrganization.click();
    }

    async validateBotbuilderCardDisplayed(){
        await this.cardBotBuilder.waitFor({ state: "visible", timeout: 50000 })
        expect(this.cardBotBuilder, 'The Bot Builder card is not visible').toBeVisible();
    }

    async validateBotBasicCardDisplayed(){
        await this.page.waitForTimeout(1000);
        await this.cardBotBasic.waitFor({ state: "visible", timeout: 50000 })
        expect(this.cardBotBasic, 'The Bot Basic card is not visible').toBeVisible();
    }

    async clickOnBotBuilderCard(){
        await this.cardBotBuilder.click();
    }

    async fillTitle(title: string){
        await this.inputTitle.fill(title);
    }

    async clickOnContinueButton(){
        await this.buttonContinue.click();
       // await this.page.waitForTimeout(1000);
    }

    async clickOnSaveButton(){
        await this.buttonSave.click();
    }

    async setFlow(){
        await this.selectFlow.click();
        await this.selectFlow.selectOption({index: 2});
    }

}