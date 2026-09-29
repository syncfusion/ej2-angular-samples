import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

type LoadingType = 'dot' | 'spinner' | 'text' | 'textIndicator';
@Component({
    selector: 'control-content',
    templateUrl: 'ai-loading-indicator.html',
    styleUrls: ['ai-loading-indicator.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})
export class AIAssistLoadingIndicatorComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [
            'ai-loading-indicator.html',
            'ai-loading-indicator.component.css',
            'promptResponseData.ts'
        ];
    }
    @ViewChild('loadingAIAssistView')
    public loadingAIAssistView: AIAssistViewComponent;
    public promptSuggestions: string[] = defaultSuggestions;
    public prompts: { [key: string]: string | string[] }[] = defaultPromptResponseData;
    public selectedLoadingType: LoadingType = 'dot';
    public loadingTypeOptions: { text: string; value: string }[] = [
    { text: 'Dot', value: 'dot' },
    { text: 'Spinner', value: 'spinner' },
    { text: 'Text', value: 'text' },
    { text: 'Text with indicator', value: 'textIndicator' }
    ];

    public loadingTypeFields = {
    text: 'text',
    value: 'value'
    };
    public currentAnimationTemplate: string =
        '<div class="assistview-dot-loading"><span></span><span></span><span></span></div>';
    public loadingTypeTemplates: Record<LoadingType, string> = {
        dot: '<div class="assistview-dot-loading"><span></span><span></span><span></span></div>',
        spinner: '<div class="assistview-spinner-loading"><div class="spinner"></div></div>',
        text: '<div class="assistview-status-loading">' +
                '<span class="status-1">🧠 Understanding request...</span>' +
                '<span class="status-2">✍️ Drafting response...</span>' +
                '<span class="status-3">🚀 Almost ready...</span>' +
              '</div>',
        textIndicator: '<div class="assistview-text-indicator">' +
                            '<span>Generating</span>' +
                            '<div class="assistview-dots"><span></span><span></span><span></span></div>' +
                       '</div>'
    };
    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item.iconCss === 'e-icons e-refresh') {
                this.loadingAIAssistView.prompts = [];
                this.loadingAIAssistView.promptSuggestions = this.promptSuggestions;
            }
        }
    };
    private abortController?: AbortController;
    public created = (): void => {
        this.setAnimationTemplate();
    };
    public onLoadingTypeChange(args: ChangeEventArgs): void {
    const value = args.value as LoadingType;

    this.selectedLoadingType = value;
    this.currentAnimationTemplate =
        this.loadingTypeTemplates[value] ||
        this.loadingTypeTemplates.dot;

    this.setAnimationTemplate();
}
    public setAnimationTemplate = (): void => {
        if (this.loadingAIAssistView) {
            const inst: any = this.loadingAIAssistView;
            inst.responseAnimationTemplate = this.currentAnimationTemplate;
            inst.dataBind();
            if (inst.skeletonContainer) {
                inst.skeletonContainer.innerHTML = this.currentAnimationTemplate;
            }
        }
    };
    public promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        this.abortController = new AbortController();
        const foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
        const response = await getAIResponse(args as any, this.abortController);
        this.loadingAIAssistView.addPromptResponse(response);
        this.loadingAIAssistView.promptSuggestions = (foundPrompt?.suggestions as string[]) || this.promptSuggestions;
    };
}
