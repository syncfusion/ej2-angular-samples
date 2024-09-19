import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptModel, ToolbarSettingsModel, PromptRequestEventArgs, ResponseToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FabComponent, FabModule } from '@syncfusion/ej2-angular-buttons';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';

@Component({
    selector: 'control-content',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FabModule, SplitterModule, DialogModule, AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistDialogComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['dialog.component.css'];
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

    public promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            
            this.dialogAIAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            this.dialogAIAssistView.promptSuggestions = foundPrompt?.suggestions as string [] || this.suggestions;
            
        }, 2000);
    };
}
