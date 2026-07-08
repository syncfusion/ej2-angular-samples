import { Component, ViewChild} from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel, ToolbarItemClickedEventArgs, PromptRequestEventArgs, PromptToolbarSettingsModel, ResponseToolbarSettingsModel, PromptModel } from '@syncfusion/ej2-angular-interactive-chat';
import * as Marked from 'marked';
import { getAIResponse } from '../common/ai-service';
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

  private abortController?: AbortController;
  public enableStreaming: boolean = true;
  private stopStreaming: boolean = false;

   public promptsData = [
        {
            prompt: "What is AI?",
            response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
        }
    ];
  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
    ],
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

  public async onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
    if (!args?.prompt?.trim() || !this.assistViewInstance) return;
    this.abortController = new AbortController();
    const response = await getAIResponse(args as any, this.abortController);
    this.assistViewInstance.addPromptResponse(response);
  }
}