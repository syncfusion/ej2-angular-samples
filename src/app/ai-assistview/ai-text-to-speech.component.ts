import { Component, ViewChild} from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel, ToolbarItemClickedEventArgs, PromptRequestEventArgs, PromptToolbarSettingsModel, ResponseToolbarSettingsModel, PromptModel } from '@syncfusion/ej2-angular-interactive-chat';
import * as Marked from 'marked';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-openai-service';
import {AIToastComponent} from '../common/ai-toast.component';

@Component({
  standalone: true,
  imports: [AIAssistViewModule, AIToastComponent],
  selector: 'app-root',
  templateUrl: './ai-text-to-speech.html',
  styleUrl: './ai-text-to-speech.component.css'
  })

  export class TextToSpeechAssistComponent {
  @ViewChild('assistView') assistViewInstance!: AIAssistViewComponent;

  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.onToolbarItemClicked.bind(this),
  };

    // Azure OpenAI config (fill with your values)
  private azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
  private azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
  private azureDeployment: string = ''; // Your_Deployment_Name
  private azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version

  private stopStreaming: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

   public promptsData = [
        {
            prompt: "What is AI?",
            response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
        }
    ];
  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
    ],
    itemClicked: this.onResponseToolbarItemClicked.bind(this)
  };

  public streamResponse = async (response: string) => {
    let lastResponse = "";
    const responseUpdateRate = 10;
    let i = 0;
    const responseLength = response.length;
    while (i < responseLength && !this.stopStreaming) {
      lastResponse += response[i];
      i++;
      if (i % responseUpdateRate === 0 || i === responseLength) {
        const htmlResponse = Marked.parse(lastResponse);
        this.assistViewInstance.addPromptResponse(htmlResponse, i === responseLength);
        this.assistViewInstance.scrollToBottom();
      }
      await new Promise(resolve => setTimeout(resolve, 15)); // Delay for streaming effect
    }
  };

  public onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistViewInstance.prompts = [];
    }
  }

  public onResponseToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    const responseHtml = this.assistViewInstance.prompts[args.dataIndex].response;
    if (responseHtml) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = responseHtml;
      const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
      if (args.item.iconCss === 'e-icons e-audio' || args.item.iconCss === 'e-icons e-assist-stop') {
        if (this.currentUtterance) {
          speechSynthesis.cancel();
          this.currentUtterance = null;
          // Reset icon and tooltip to 'Read Aloud'
          this.assistViewInstance.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
          this.assistViewInstance.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
        } else {
          // Create a new speech synthesis utterance with the extracted text
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.onend = () => {
            this.currentUtterance = null;
            this.assistViewInstance.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
            this.assistViewInstance.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
          };
          // Start speaking the text
          speechSynthesis.speak(utterance);
          this.currentUtterance = utterance;
          // Update icon and tooltip to indicate 'Stop' option
          this.assistViewInstance.responseToolbarSettings.items[1].iconCss = 'e-icons e-assist-stop';
          this.assistViewInstance.responseToolbarSettings.items[1].tooltip = 'Stop';
        }
      }
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
'⚠️ Something went wrong while connecting to Azure OpenAI. ' +
            'Verify endpoint, API key, deployment name, API version, and CORS settings.');
      this.stopStreaming = true;
    }
  }
}
