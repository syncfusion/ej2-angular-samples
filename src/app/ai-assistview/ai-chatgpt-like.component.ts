import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, SpeechToTextSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-chatGPT-clone.html',
    styleUrls: ['ai-chatGPT-clone.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AIAssistViewModule,
        CommonModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class AIAssistChatGPTCloneComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [
            'ai-chatGPT-clone.css',
            'ai-chatGPT-clone.html',
            'promptResponseData.ts'
        ];
    }
    @ViewChild('chatgptAIAssistView')
    public chatgptAIAssistView: AIAssistViewComponent;
    public isFirstPrompt: boolean = true;
    public containerClass: string = 'middle-footer';
    private abortController?: AbortController;
    public prompts: { [key: string]: string | string[] }[] = defaultPromptResponseData;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    public speechToTextSettings: SpeechToTextSettingsModel = { enable: true };
    public footerToolbarSettings = {
        toolbarPosition: 'inline',
        items: [
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
            { iconCss: 'e-icons e-assist-speech-to-text', align: 'Right' }
        ]
    };
    public promptRequest = async (args: PromptRequestEventArgs) => {
        if (this.isFirstPrompt) {
            this.containerClass = 'bottom-footer';
            this.isFirstPrompt = false;
        }
        this.abortController = new AbortController();
        const foundPrompt = this.prompts.find((p: any) => p.prompt === args.prompt);
        const response = foundPrompt ? (foundPrompt as any).response : await getAIResponse(args as any, this.abortController);
        this.chatgptAIAssistView.addPromptResponse(response);
    };
}