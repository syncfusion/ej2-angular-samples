import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistDefaultComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.component.css'];
    }

    @ViewChild('defaultAIAssistView')
    public defaultAIAssistView: AIAssistViewComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item.iconCss === 'e-icons e-refresh') {
                this.defaultAIAssistView.prompts = [];
                this.defaultAIAssistView.promptSuggestions = this.suggestions;
            }
        }
    };

    public prompts: { [key: string]: string | string[] } [] = defaultPromptResponseData;

    public suggestions: string[] = defaultSuggestions;

    public promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

            this.defaultAIAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            this.defaultAIAssistView.promptSuggestions = foundPrompt?.suggestions as string [] || this.suggestions;
        }, 2000);
    };
}
