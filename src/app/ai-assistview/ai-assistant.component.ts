import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { assistantSuggestions, assistantResponses } from './promptResponseData';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';
import { ListViewComponent, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SidebarComponent, SidebarModule, ToolbarModule  } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';

@Component({
    selector: 'ai-assistant',
    templateUrl: './ai-assistant.html',
    styleUrls: ['./ai-assistant.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, ToolbarModule, ListViewModule, SidebarModule,  SBActionDescriptionComponent, SBDescriptionComponent ]
})
export class AiAssistantComponent {
    @ViewChild('aiAssistViewInst')
    public aiAssistViewInst: AIAssistViewComponent | undefined;
    @ViewChild('grpListObj')
    public grpListObj: ListViewComponent | undefined;
    @ViewChild('sideObj')
    public sideObj: SidebarComponent | undefined;
    public enableAttachments: boolean = true;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    public enableDock: boolean = true;
    public enableGesture: boolean = true;
    public prompts: { [key: string]: string | string[] }[] = assistantResponses;
    public suggestions: string[] = assistantSuggestions;
    public fields: { [ key: string]: Object } = {groupBy: "category", id: "id", text: "text" };
    public selectedConvId: string = '';
    public isFirstPrompt = false;
    public listData = [];

    ngAfterViewInit() {
        this.InitializingApp();
        this.listData = this.getLeftPaneData();
    }

    // Fetch your API_KEY
    public API_KEY = "Your API key";
    // Updat your AI model
    public model = "Your AI model";

    public async GetResult(prompt) {
        let responseObj = this.prompts.find(resp => resp.prompt === prompt);
        const result = responseObj ? responseObj.response : "I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for.";
        return result;
    }

    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
        ]
    };

    public created = () => {
        var dropdown: DropDownButton = new DropDownButton({
            content: "Profile",
            items: [
                { text: 'Settings', iconCss: 'e-icons e-settings' },
                { separator: true },
                { text: 'Log out' }
            ],
            iconCss: 'e-icons e-user',
            cssClass: 'e-caret-hide',
        }, '#ddMenu');
    };

    public promptRequest(args) {
        this.execute(args.prompt);
    }

    public toggle() {
        this.sideObj.toggle();
    }

    public onListViewSelect(args) {
        if (args.event) {
            this.selectedConvId = args.data.id;
            this.updateAIAssistViewData(args.data.id);
            this.updateBannerStyle();
        }
    }

    public getDate(): number {
        return Date.now();
    }

    public getDateFormat(date: number): string {
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm: number | string = today.getMonth() + 1; // Months start at 0!
        let dd: number | string = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

    public getCategory(today: string, key: number): string {
        const date = this.getDateFormat(key);
        if (date == today) {
            return "Today";
        } else {
            return "Previous days";
        }
    }

    public checkInitialLocalStorage(isClear?: boolean): void {
        const aiAssistView = localStorage.getItem('aiassist-view');
        if (!aiAssistView || isClear) {
            const data: Record<string, any> = {};
            localStorage.setItem('aiassist-view', JSON.stringify(data));
        }
    }

    public checkAndUpdateLocalStorage(prompt: string): void {
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const curConvDate = this.getDate();
        const prompts = [];
        const orgPrompts = this.aiAssistViewInst.prompts;
        for (let i = 0; i < orgPrompts.length; i++) {
            const tPrompt = {
                prompt: orgPrompts[i].prompt || "",
                response: orgPrompts[i].response || ""
            };
            prompts.push(tPrompt);
        }
        const pSuggestions: string[] = [];
        const orgPSuggestions = this.aiAssistViewInst.promptSuggestions;
        for (let j = 0; j < orgPSuggestions.length; j++) {
            pSuggestions.push(orgPSuggestions[j]);
        }
        if (this.selectedConvId) {
            const convData = appData[this.selectedConvId];
            if (convData.name === convData.name) {
                const dataSource = this.grpListObj.dataSource as any[];
                if (dataSource) {
                    for (let k = 0; k < dataSource.length; k++) {
                        const item = dataSource[k] as any;
                        if (item && item.id === this.selectedConvId) {
                            item.text = convData.name;
                            break;
                        }
                    }
                }
                this.grpListObj.dataBind();
            }
            convData.prompts = prompts;
            convData.promptSuggestions = pSuggestions;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
        } else {
            this.selectedConvId = curConvDate.toString();
            const convData = {
                name: prompt,
                prompts: prompts,
                promptSuggestions: pSuggestions
            };
            appData[curConvDate] = convData;
            localStorage.setItem('aiassist-view', JSON.stringify(appData));
            this.refreshConversationList();
            const itemToSelect: any = 0;
            this.grpListObj.selectItem(itemToSelect);
        }
    }

    public getLeftPaneData() {
        const today = this.getDateFormat(Date.now());
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const keys = Object.keys(appData);
        const items = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const numericKey = parseInt(key);
            const convData = appData[key];
            const name = convData.name.split('\n')[0];

            items.push({
                text: name,
                id: numericKey,
                numericId: numericKey, // Extra field for sorting
                category: this.getCategory(today, numericKey),
                time: this.getDateFormat(numericKey)
            });
        }
        items.sort(function (a, b) {
            return b.numericId - a.numericId;
        });
        return items;
    }

    public updateBannerStyle(): void {
        const bannerElem = document.querySelector('.banner-content');
        if (this.aiAssistViewInst.prompts && this.aiAssistViewInst.prompts.length) {
            bannerElem.classList.remove('e-no-content');
        } else {
            bannerElem.classList.add('e-no-content');
        }
    }

    public updateConversationName(prompt: string) {
        if (this.isFirstPrompt && this.selectedConvId) {
            const aiAssistView = JSON.parse(localStorage.getItem('aiassist-view'));
            const convData = aiAssistView[this.selectedConvId];
            if (convData?.name === "New Conversation") {
                convData.name = prompt.slice(0, 40).trim();
                localStorage.setItem('aiassist-view', JSON.stringify(aiAssistView));
                const dataSource = this.grpListObj.dataSource as any[];
                const listItem = dataSource.find((item: any) => item.id === this.selectedConvId);
                if (listItem) {
                    listItem.text = convData.name;
                    this.grpListObj.dataBind();
                }
                this.refreshConversationList();
            }
            this.isFirstPrompt = false;
        }
    }

    public refreshConversationList(): void {
        const listData = this.getLeftPaneData();
        this.grpListObj.dataSource = listData;
        this.grpListObj.dataBind();
    }

    public updateAIAssistViewData(id: string | number): void {
        if (id) {
            const aiAssistView = localStorage.getItem('aiassist-view');
            const appData = JSON.parse(aiAssistView);
            const convData = appData[id.toString()];

            this.aiAssistViewInst.prompts = convData.prompts;
            this.aiAssistViewInst.promptSuggestions = convData.promptSuggestions;
        } else {
            this.aiAssistViewInst.prompts = [];
            this.aiAssistViewInst.promptSuggestions = this.suggestions;
        }
    }

    public loadNewAIAssist(): void {
        this.selectedConvId = "";
        this.isFirstPrompt = true;
        const dataSource = this.grpListObj.dataSource as any[];
        if (dataSource.length !== 0) {
            this.aiAssistViewInst.prompts = [];
            this.aiAssistViewInst.promptSuggestions = this.suggestions;
        }
        const curConvDate = this.getDate();
        const aiAssistView = localStorage.getItem('aiassist-view');
        const appData = JSON.parse(aiAssistView);
        const convData = {
            name: "New Conversation",
            prompts: [] as any[],
            promptSuggestions: this.suggestions
        };
        appData[curConvDate] = convData;
        localStorage.setItem('aiassist-view', JSON.stringify(appData));
        this.refreshConversationList();
        this.selectedConvId = curConvDate.toString();
        const itemToSelect = { id: curConvDate };
        this.grpListObj.selectItem(itemToSelect);
        this.updateBannerStyle();
    }

    public InitializingApp(): void {
        this.checkInitialLocalStorage();
        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.grpListObj.dataSource = [];
                this.grpListObj.dataBind();
                localStorage.setItem('aiassist-view', JSON.stringify({}));
                this.selectedConvId = "";
                this.aiAssistViewInst.prompts = [];
                this.aiAssistViewInst.promptSuggestions = this.suggestions;
                this.updateBannerStyle();
            });
        }
    }

    public async execute(prompt: string) {
        try {
            this.aiAssistViewInst.promptSuggestions = [];
            var finalResult: any[] = [];
            var result: any = "";
            
            setTimeout(async () => {
                let suggestionsObj = this.prompts.find((resp: any) => resp.prompt === prompt);
                let suggestionResult = suggestionsObj ? suggestionsObj.suggestions || this.suggestions : this.suggestions;

                for (let i = 0; i < suggestionResult.length; i++) {
                    if (suggestionResult[i]) {
                        finalResult.push(suggestionResult[i].replace("- ", "").replace("* ", "").trim());
                    }
                }
            }, 1000);

            setTimeout(async () => {
                result = await this.GetResult(prompt);
                this.aiAssistViewInst.addPromptResponse(result);
                this.aiAssistViewInst.promptSuggestions = finalResult;
                this.updateBannerStyle();
                this.checkAndUpdateLocalStorage(prompt);
                this.updateConversationName(prompt);
            }, 1000);

        } catch (error) {
            result = error;
            this.aiAssistViewInst.addPromptResponse("I apologize, but I'm experiencing some difficulty processing your request at this moment, which might be due to the complexity of your query or a technical limitation on my end, so I would greatly appreciate it if you could rephrase your question or provide additional context that might help me better understand what you're looking for.");
            this.aiAssistViewInst.promptSuggestions = [];
            this.updateConversationName(prompt);
        }
        const dataSource = this.grpListObj.dataSource as any[];
        if (!dataSource || dataSource.length === 0) {
            this.loadNewAIAssist();
            return;
        }
    }
}