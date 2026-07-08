import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, AttachmentSettingsModel, SpeechToTextSettingsModel, FooterToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, DropDownButton, MenuEventArgs, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
  selector: 'control-content',
  imports: [AIAssistViewModule, ButtonModule, DropDownButtonModule, CommonModule],
  standalone: true,
  templateUrl: 'ai-gemini-like.html',
  styleUrls: ['ai-gemini-like.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AIAssistGeminiCloneComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['ai-gemini-like.component.css'];
  }

  @ViewChild('geminiAIAssistViewRef')
  public geminiAIAssistView: AIAssistViewComponent;

  public isFirstPrompt: boolean = true;
  public showHeader: boolean = false;
  public containerClass: string = 'middle-footer';
  public enableAttachments: boolean = true;
  public attachmentSettings: AttachmentSettingsModel = {
    saveUrl: 'https://ej2services.syncfusion.com/angular/development/api/FileUploader/Save',
    removeUrl: 'https://ej2services.syncfusion.com/angular/development/api/FileUploader/Remove'
  };
  public speechToTextSettings: SpeechToTextSettingsModel = { enable: true };
  public promptPlaceholder: string = 'Ask Gemini';
  public footerToolbarSettings: FooterToolbarSettingsModel = {
            toolbarPosition: 'Bottom',
            items: [
                {
                    iconCss: 'e-icons e-assist-attachment-icon',
                    align: 'Left'
                },
                {
                    align: 'Right',
                    template: '<button id="custombtn">Fast</button>'
                },
                {
                    iconCss: 'e-icons e-assist-speech-to-text',
                    align: 'Right'
                }
            ]
        };
  private abortController?: AbortController;

  public promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    if (this.isFirstPrompt) {
      this.containerClass = 'bottom-footer';
      this.isFirstPrompt = false;
    }

    this.abortController = new AbortController();
    let foundPrompt = defaultPromptResponseData.find((p: any) => p.prompt === args.prompt);
    let response = foundPrompt ? foundPrompt.response : await getAIResponse(args as any, this.abortController);
    this.geminiAIAssistView.addPromptResponse(response);
    this.toggleButtons();
  };

  public toggleButtons(): void {
    const sendBtn = (this.geminiAIAssistView.element.querySelector('.e-assist-send') as any)?.parentElement;
    const audioBtn = this.geminiAIAssistView.element.querySelector('.e-assistview-speech-to-text') as HTMLElement;

    const hasPrompt =
      this.geminiAIAssistView.prompt &&
      this.geminiAIAssistView.prompt.replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, '').replace(/\s+/g, '').trim();

    if (hasPrompt) {
      if (sendBtn) (sendBtn as any).style.display = 'block';
      if (audioBtn) audioBtn.style.display = 'none';
    } else {
      if (sendBtn) (sendBtn as any).style.display = 'none';
      if (audioBtn) audioBtn.style.display = 'block';
    }
  }

  public created(): void {
    const descriptions: Record<string, string> = {
      Fast: 'Answers quickly',
      Thinking: 'Solve complex problems',
      Pro: 'Advanced maths and code with 3.1 Pro'
    };

    const items: ItemModel[] = [
      { text: 'Fast' },
      { text: 'Thinking' },
      { text: 'Pro' }
    ];

    let currentModel = 'Fast';

    const btnObj = new DropDownButton({
      content: currentModel,
      cssClass: 'e-flat gemini_model',
      items: items,

      beforeItemRender: (args: MenuEventArgs) => {
        const text = args.item.text || '';
        const description = descriptions[text] || '';

        // Remove default text
        args.element.innerHTML = '';

        // Build custom structure
        args.element.innerHTML = `
          <div class="model-item">
            <div class="model-content">
              <div class="model-name">${text}</div>
              <div class="model-description">${description}</div>
            </div>
          </div>
        `;

        // Highlight selected item
        if (currentModel === text) {
          args.element.classList.add('e-selected');
        }
      },

      select: (args: MenuEventArgs) => {
        currentModel = args.item.text || 'Fast';
        btnObj.content = currentModel;
        btnObj.dataBind();
      }
    });
    btnObj.appendTo('#custombtn');

    this.toggleButtons();
}
}