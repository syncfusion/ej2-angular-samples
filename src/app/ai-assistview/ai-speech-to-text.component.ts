import { Component, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel, ToolbarItemClickedEventArgs, PromptRequestEventArgs, FooterToolbarSettingsModel,AttachmentSettingsModel,SpeechToTextSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import * as Marked from 'marked';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-openai-service';
import {AIToastComponent} from '../common/ai-toast.component';

@Component({
  standalone: true,
  imports: [AIAssistViewModule, AIToastComponent],
  selector: 'app-root',
  templateUrl: './ai-speech-to-text.html',
  styleUrl: './ai-speech-to-text.component.css'
  })
export class SpeechToTextAssistComponent {
   @ViewChild('assistView') assistViewInstance!: AIAssistViewComponent;
  @ViewChild('contentEditor') contentEditor!: ElementRef<HTMLDivElement>;

    // Azure OpenAI config (fill with your values)
  private azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
  private azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
  private azureDeployment: string = ''; // Your_Deployment_Name
  private azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version
  
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  public hasTextInEditor = false;
  public isListening = false;

  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.onToolbarItemClicked.bind(this),
  };

  public footerToolbarSettings: FooterToolbarSettingsModel= {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-assist-send', align: 'Right' },
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
            { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left'}
        ]
    }

  public enableAttachments: boolean = true;
  public attachmentSettings : AttachmentSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };
  public speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true
    }

  private stopStreaming = false;

  public async streamResponse(response: string) {
    let lastResponse = '';
    const responseUpdateRate = 10;
    let i = 0;
    const responseLength = response.length;
    while (i < responseLength && !this.stopStreaming) {
      lastResponse += response[i++];
      if (i % responseUpdateRate === 0 || i === responseLength) {
        const htmlResponse = Marked.parse(lastResponse);
        this.assistViewInstance.addPromptResponse(htmlResponse, i === responseLength);
        this.assistViewInstance.scrollToBottom();
      }
      await new Promise(resolve => setTimeout(resolve, 15));
    }
  }

public async onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
    this.stopStreaming = false;
    if (!this.assistViewInstance) return;
    try {
      const responseText = await getAzureOpenAIAssist({
        apiKey: this.azureApiKey,
        endpoint: this.azureEndpoint,
        deployment: this.azureDeployment,
        apiVersion: this.azureApiVersion,
        prompt: args.prompt || 'Hi',
      } as AzureOpenAIRequest);
      await this.streamResponse(responseText);
    } catch (error: any) {
      this.assistViewInstance.addPromptResponse(
        '⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key or try again later.'
      );
      this.stopStreaming = true;
    }
  }

  public onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistViewInstance.prompts = [];
      const editor = this.contentEditor?.nativeElement;
      if (editor) {
        editor.innerText = '';
      }
    }
  }

  public stopRespondingClick(): void {
    this.stopStreaming = true;
  }
}