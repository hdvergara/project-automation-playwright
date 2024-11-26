import { Locator, Page, expect } from '@playwright/test';

export class CyborgOptionsPage{
    readonly page: Page;
    private readonly optCyborg: Locator;
    private readonly attentionConfiguration: Locator;

    constructor(page: Page){
        this.page = page;
        this.optCyborg = page.getByText('CyborgCyborg');
        this.attentionConfiguration = page.getByRole('link', { name: 'Configuración atención' });
    }

    async clickOnCyborgOption(){
        await this.page.waitForTimeout(5000);
        expect(this.optCyborg).toBeVisible()
        await this.optCyborg.click();
    }

    async clickOnAttentionConfiguration(){
        await this.attentionConfiguration.waitFor({ state: "visible", timeout: 50000 })
        const isVisible = await this.attentionConfiguration.isVisible();
        if (isVisible) {
            await this.attentionConfiguration.click();
        } else {
            await this.optCyborg.click();
            await this.attentionConfiguration.click();
        }
    }
}