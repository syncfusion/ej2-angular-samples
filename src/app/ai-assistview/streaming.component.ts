import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { streamingData, streamingSuggestions } from './promptResponseData';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
@Component({
    selector: 'control-content',
    templateUrl: 'streaming.html',
    styleUrls: ['streaming.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistStreamComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['streaming.component.css'];
    }

    @ViewChild('streamAIAssistView')
    public streamAIAssistView: AIAssistViewComponent | undefined;
    public enableStreaming: boolean = true;
    public prompts: { [key: string]: string | string[] } [] = streamingData;
    public suggestions: string[] = streamingSuggestions;
    public toolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item?.iconCss === 'e-icons e-refresh') {
                this.streamAIAssistView!.prompts = [];
                this.streamAIAssistView!.promptSuggestions = this.suggestions;
            }
        }
    };
    public promptRequest = (args: PromptRequestEventArgs) => {
        let streamingResponse: any = this.prompts.find(data => data['prompt'] === args.prompt);
        const defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

         if (streamingResponse) {
            this.streamAIAssistView?.addPromptResponse(streamingResponse.response, true);
            this.streamAIAssistView!.promptSuggestions = streamingResponse?.suggestions || streamingSuggestions;
        } else {
            this.streamAIAssistView?.addPromptResponse(defaultResponse, true);
            this.streamAIAssistView!.promptSuggestions = streamingSuggestions;
        }
    };
}
