import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AIAssistViewModule],
  standalone: true,
  templateUrl: './attachments.html',
  styleUrl: './attachments.component.css'
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

  public promptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      var foundPrompt = this.prompts.find((promptObj) => (promptObj as any).prompt === args.prompt);
      var attachmentResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.attachmentAIAssistView.addPromptResponse(foundPrompt ? (foundPrompt as any).response : attachmentResponse);
      this.attachmentAIAssistView.promptSuggestions = (foundPrompt ? (foundPrompt as any).suggestions as string[] : this.suggestions);
    }, 2000);
  };
}