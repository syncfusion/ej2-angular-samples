import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AIAssistViewModule],
  standalone: true,
  templateUrl: 'ai-attachments.html',
  styleUrls: ['ai-attachments.component.css']
})

export class AIAssistAttachmentComponent {
  @ViewChild('attachmentAIAssistView')
  public attachmentAIAssistView: AIAssistViewComponent | undefined;
  public enableAttachments: boolean = true;
  public attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };
  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if ((args as any).item.iconCss === 'e-icons e-refresh') {
        (this.attachmentAIAssistView as AIAssistViewComponent).prompts = [];
        (this.attachmentAIAssistView as AIAssistViewComponent).promptSuggestions = this.suggestions;
      };
    }

  };

  public prompts: { [key: string]: string | string[] }[] = defaultPromptResponseData;

  public suggestions: string[] = defaultSuggestions;

  private abortController?: AbortController;

  public promptRequest = async (args: PromptRequestEventArgs) => {
    this.abortController = new AbortController();
    const foundPrompt = this.prompts.find((promptObj) => (promptObj as any).prompt === args.prompt);
    const response = foundPrompt ? (foundPrompt as any).response : await getAIResponse(args as any, this.abortController);
    this.attachmentAIAssistView.addPromptResponse(response);
    this.attachmentAIAssistView.promptSuggestions = (foundPrompt as any)?.suggestions || this.suggestions;
  };
}