import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import {
    AIAssistViewModule,
    AIAssistViewComponent,
    PromptRequestEventArgs,
    ToolbarSettingsModel,
    ToolbarItemClickedEventArgs,
    TelemetrySettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { telemetrySuggestions } from './promptResponseData';
import { getOpenAIModelAssistview } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-telemetry.html',
    styleUrls: ['ai-telemetry.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistTelemetryComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [
            'ai-telemetry.html',
            'ai-telemetry.component.css',
            'promptResponseData.ts'
        ];
    }

    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView: AIAssistViewComponent | undefined;
    public enableStreaming: boolean = true;
    public promptSuggestions: string[] = [...telemetrySuggestions];
    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item && args.item.iconCss === 'e-icons e-refresh') {
                if (this.telemetryAIAssistView) {
                    this.telemetryAIAssistView.prompts = [];
                    this.telemetryAIAssistView.promptSuggestions = [...telemetrySuggestions];
                }
            }
        }
    };
    public telemetrySettings: TelemetrySettingsModel = { enable: true };
    private abortController?: AbortController;
    public lastTelemetryData: any;

    public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        this.abortController = new AbortController();
        const result: any = await getOpenAIModelAssistview(args as any, this.abortController);
        if (result && result.usage) {
            this.lastTelemetryData = {
                model: result.model,
                inputTokens: result.usage.prompt_tokens,
                outputTokens: result.usage.completion_tokens,
                reasoningTokens: result.usage.completion_tokens_details
                    ? result.usage.completion_tokens_details.reasoning_tokens
                    : undefined,
                cachedInputTokens: result.usage.prompt_tokens_details
                    ? result.usage.prompt_tokens_details.cached_tokens
                    : undefined
            };
        } else {
            this.lastTelemetryData = undefined;
        }
        if (this.telemetryAIAssistView && result) {
            this.telemetryAIAssistView.addPromptResponse(result.response, true, this.lastTelemetryData);
            this.telemetryAIAssistView.promptSuggestions = [...telemetrySuggestions];
        }
    };
}
