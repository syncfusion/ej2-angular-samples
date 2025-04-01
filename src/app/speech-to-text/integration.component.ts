import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TranscriptChangedEventArgs, ErrorEventArgs } from '@syncfusion/ej2-angular-inputs'
import { AIAssistViewModule, AIAssistViewComponent, ToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { ToastComponent, ToastModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'control-content',
  templateUrl: 'integration.html',
  styleUrls: ['integration.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SpeechToTextModule, AIAssistViewModule, ToastModule]
})
export class IntegrationSpeechToTextComponent  {

  @ViewChild('assistView') assistViewInstance!: AIAssistViewComponent;
  @ViewChild('speechToText') speechToTextInstance!: SpeechToTextComponent;
  @ViewChild('toast') toastInstance!: ToastComponent;

  public toastPosition = { X: 'Right'};
  public target = ".integration-control-section";
  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.onToolbarItemClicked.bind(this),
  };

  ngAfterViewInit(): void {
    this.setupFooterButtons();
  }

  setupFooterButtons(): void {
    if (this.assistViewInstance) {
      const assistviewElement = this.assistViewInstance.element as HTMLElement;
      const assistviewFooter = assistviewElement.querySelector('#assistview-footer') as HTMLElement;
      const sendButton = assistviewElement.querySelector('#assistview-sendButton') as HTMLElement;
      const speechButton = assistviewElement.querySelector('#speechToText') as HTMLElement;

      sendButton.addEventListener('click', () => this.sendIconClicked());
      assistviewFooter.addEventListener('input', () => this.toggleButtons());
      assistviewFooter.addEventListener('keydown', (e) => this.onKeyDown(e));

      this.toggleButtons();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendIconClicked();
      event.preventDefault(); // Prevent the default behavior of the Enter key
    }
  }

  onTranscriptChange(args: TranscriptChangedEventArgs): void {
    const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    if (assistviewFooter) {
      assistviewFooter.innerText = args.transcript;
    }
  }

  onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistViewInstance.prompts = [];
    }
  }

  toggleButtons(): void {
    const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    const sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;
    const speechButton = document.querySelector('#speechToText') as HTMLElement;

    const hasText = assistviewFooter.innerText.trim() !== '';
    sendButton.classList.toggle('visible', hasText);
    speechButton.classList.toggle('visible', !hasText);

    if (!hasText && (assistviewFooter.innerHTML.trim() === '' || assistviewFooter.innerHTML === '<br>')) {
      assistviewFooter.innerHTML = '';
    }
  }

  sendIconClicked(): void {
    const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
    this.assistViewInstance.executePrompt(assistviewFooter.innerText);
    assistviewFooter.innerText = '';
  }

  onPromptRequest(): void {
    setTimeout(() => {
      this.assistViewInstance.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
      this.toggleButtons();
    }, 2000);
  }

  onErrorHandler(args: ErrorEventArgs): void {
    const toastContent: string = args.errorMessage;
    if (args.error === 'unsupported-browser') {
      this.speechToTextInstance.disabled = true;
      this.toastInstance.show({ content: toastContent, timeOut: 0 });     
    } else {
      this.toastInstance.show({ content: toastContent, timeOut: 5000 });
    }
  }
}
