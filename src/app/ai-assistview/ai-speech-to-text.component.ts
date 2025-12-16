import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel, ToolbarItemClickedEventArgs, PromptRequestEventArgs, PromptToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import * as Marked from 'marked';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-openai-service';
import {AIToastComponent} from '../common/ai-toast.component';

@Component({
  standalone: true,
  imports: [AIAssistViewModule, SpeechToTextModule, AIToastComponent],
  selector: 'app-root',
  templateUrl: './ai-speech-to-text.html',
  styleUrl: './ai-speech-to-text.component.css'
  })
export class SpeechToTextAssistComponent implements AfterViewInit {
   @ViewChild('assistView') assistViewInstance!: AIAssistViewComponent;
  @ViewChild('speechToText') speechToTextInstance!: SpeechToTextComponent;
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

  public promptToolbarSettings: PromptToolbarSettingsModel = {
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-assist-edit') {
        const editor = this.contentEditor?.nativeElement;
        if (editor) {
          editor.innerHTML = this.assistViewInstance.prompts[args.dataIndex].prompt;
          this.onContentChanged();
          this.blurMicButton();
        }
      }
    }
  };

  private stopStreaming = false;

  ngAfterViewInit(): void {
    this.onContentChanged(); // Initialize button visibility
  }

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
    this.onContentChanged();
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
      this.onContentChanged();
    }
  }

  public onContentChanged(): void {
    const editor = this.contentEditor?.nativeElement;
    if (!editor) return;
    // Treat only real text as content. Ignore non-breaking spaces or stray HTML
    const text = (editor.textContent || '').replace(/\u00A0/g, ' ').trim();
    this.hasTextInEditor = text.length > 0;
    if (!this.hasTextInEditor && (editor.innerHTML.trim() === '' || editor.innerHTML === ' ')) {
      editor.innerHTML = '';
    }
  }

  public onEditorKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      this.sendIconClicked();
    }
  }

  public onTranscriptChange(args: TranscriptChangedEventArgs): void {
    const editor = this.contentEditor?.nativeElement;
    if (!editor) return;
    editor.innerText = args.transcript || '';
    this.onContentChanged();
  }

  public onListeningStart(): void {
    // Ensure state update is inside Angular zone
    this.zone.run(() => {
      this.isListening = true;
      this.cdr.detectChanges();
    });
  }

  public onListeningStop(): void {
    this.zone.run(() => {
      this.isListening = false;
      this.onContentChanged();
      this.cdr.detectChanges();
    });
  }

  public onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistViewInstance.prompts = [];
      const editor = this.contentEditor?.nativeElement;
      if (editor) {
        editor.innerText = '';
      }
      this.stopListeningIfNeeded();
      this.onContentChanged();
    }
  }

  public sendIconClicked(): void {
    const editor = this.contentEditor.nativeElement;
    const promptText = editor.innerText;
    if (promptText.trim()) {
      // Ensure listening is stopped before sending
      this.stopListeningIfNeeded();
      this.assistViewInstance.executePrompt(promptText);
      editor.innerText = '';
      this.onContentChanged();
      this.blurMicButton();
      this.cdr.detectChanges();
    }
  }

  public stopRespondingClick(): void {
    this.stopStreaming = true;
    this.stopListeningIfNeeded();
    this.onContentChanged();
  }

  private stopListeningIfNeeded(): void {
    if (this.isListening) {
      this.speechToTextInstance?.stopListening?.();
      // Make sure UI reflects the stop immediately
      this.zone.run(() => {
        this.isListening = false;
        this.cdr.detectChanges();
      });
    }
  }

  private blurMicButton(): void {
    // Prevent accidental re-triggering of mic due to focus/keyboard
    (this.speechToTextInstance as any)?.element?.blur?.();
  }
}