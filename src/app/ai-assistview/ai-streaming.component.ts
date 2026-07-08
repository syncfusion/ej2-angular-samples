import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { streamingData, streamingSuggestions } from './promptResponseData';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { getAIResponse } from '../common/ai-service';
@Component({
    selector: 'control-content',
    templateUrl: 'ai-streaming.html',
    styleUrls: ['ai-streaming.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistStreamComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['ai-streaming.component.css'];
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
    private abortController?: AbortController;

    public promptRequest = async (args: PromptRequestEventArgs) => {
        this.abortController = new AbortController();
        let streamingResponse: any = this.prompts.find(data => data['prompt'] === args.prompt);
        const response = streamingResponse ? streamingResponse.response : await getAIResponse(args as any, this.abortController);
        this.streamAIAssistView?.addPromptResponse(response);
        this.streamAIAssistView!.promptSuggestions = streamingResponse ? streamingResponse.suggestions : this.suggestions;
    };
}