import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptModel, ToolbarSettingsModel, PromptRequestEventArgs, ResponseToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FabComponent, FabModule } from '@syncfusion/ej2-angular-buttons';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-dialog.html',
    styleUrls: ['ai-dialog.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FabModule, SplitterModule, DialogModule, AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistDialogComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['ai-dialog.component.css'];
    }

    @ViewChild('Fab')
    public Fab: FabComponent;

    @ViewChild('Dialog')
    public Dialog: DialogComponent;

    @ViewChild('dialogAIAssistView')
    public dialogAIAssistView: AIAssistViewComponent;

    public promptsData: PromptModel[] = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];

    public prompts: { [key: string]: string | string[] } [] = defaultPromptResponseData;

    public suggestions: string[] = defaultSuggestions;

    public toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-close') {
            this.dialogOpenClose();
        }
        if (args.item.iconCss === 'e-icons e-assist-copy') {
            var targetElem = document.querySelector('.right-content .content');
            var response = this.dialogAIAssistView.prompts[args.dataIndex].response;
            if (targetElem) {
                targetElem.innerHTML += response + '<br />';
                this.dialogOpenClose();
            }
        }
    };

    public dialogOpenClose = () => {
        this.Dialog.visible = !this.Dialog.visible;
    };

    public assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-close', align: 'Right' } ],
        itemClicked: this.toolbarItemClicked
    };

    public responseToolbarSettings: ResponseToolbarSettingsModel = {
        itemClicked: this.toolbarItemClicked
    };

    private abortController?: AbortController;

    public promptRequest = async (args: PromptRequestEventArgs) => {
        this.abortController = new AbortController();
        var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
        var response = foundPrompt ? foundPrompt.response : await getAIResponse(args as any, this.abortController);
        this.dialogAIAssistView.addPromptResponse(response);
        this.dialogAIAssistView.promptSuggestions = foundPrompt?.suggestions as string[] || this.suggestions;
    };
}