import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { streamingData, streamingSuggestions } from './promptResponseData';
import * as Marked from 'marked';
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
    public streamAIAssistView: AIAssistViewComponent;
    public stopStreaming: boolean = false;
    public prompts: { [key: string]: string | string[] } [] = streamingData;
    public suggestions: string[] = streamingSuggestions;
    public toolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item.iconCss === 'e-icons e-refresh') {
                this.streamAIAssistView.prompts = [];
                this.streamAIAssistView.promptSuggestions = this.suggestions;
            }
        }
    };
    public handleStopResponse = () => {
        this.stopStreaming = true;
    }
    public promptRequest = (args: PromptRequestEventArgs) => {
        let lastResponse: string = "";
        const streamingResponse: any = this.prompts.find(data => data.prompt === args.prompt);
        const defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        const responseUpdateRate: number = 10; // Update scroll and streaming response every 10 characters

        const streamResponse = async (response: string) => {
            let i = 0;
            const responseLength: number = response.length;
            while (i < responseLength && !this.stopStreaming) {
                lastResponse += response[i];
                i++;
                if (i % responseUpdateRate === 0 || i === responseLength) {
                    let htmlResponse = Marked.marked(lastResponse);
                    this.streamAIAssistView.addPromptResponse(htmlResponse, i === responseLength);
                    this.streamAIAssistView.scrollToBottom();
                }
                await new Promise(resolve => setTimeout(resolve, 15)); // Delay before the next chunk
            }
            this.streamAIAssistView.promptSuggestions = streamingResponse?.suggestions || this.suggestions;
        };

        if (streamingResponse) {
            this.stopStreaming = false;
            streamResponse(streamingResponse.response);
        } else {
            this.streamAIAssistView.addPromptResponse(defaultResponse, true);
            this.streamAIAssistView.promptSuggestions = this.suggestions;
        }
    };
}
