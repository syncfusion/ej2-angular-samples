import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-default.html',
    styleUrls: ['ai-default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistDefaultComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['ai-default.component.css'];
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

    private abortController?: AbortController;

    public promptRequest = async (args: PromptRequestEventArgs) => {
        this.abortController = new AbortController();
        var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
        var response = foundPrompt ? foundPrompt.response : await getAIResponse(args as any, this.abortController);
        this.defaultAIAssistView.addPromptResponse(response);
        this.defaultAIAssistView.promptSuggestions = foundPrompt?.suggestions as string[] || this.suggestions;
    };
}