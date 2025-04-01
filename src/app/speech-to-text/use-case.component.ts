import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TranscriptChangedEventArgs, ErrorEventArgs, StopListeningEventArgs } from '@syncfusion/ej2-angular-inputs'
import { ChatUIComponent, ChatUIModule, MessageModel, UserModel } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  selector: 'control-content',
  templateUrl: 'use-case.html',
  styleUrls: ['use-case.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SpeechToTextModule, ChatUIModule]
})
export class UseCaseSpeechToTextComponent  {

  @ViewChild('speechToText') speechToTextInstance!: SpeechToTextComponent;
  @ViewChild('chatUI') chatUIInstance!: ChatUIComponent;

  public user: UserModel = { id: 'testing-user', user: 'Testing User' };
  private msgIdx: number = -1;
  private isIndicatorVisible: boolean = false;

  onTranscriptChange(args: TranscriptChangedEventArgs): void {
    const existingMsg: MessageModel = this.chatUIInstance.messages[this.msgIdx];
    if (existingMsg) {
      this.chatUIInstance.updateMessage({ text: args.transcript }, existingMsg.id as string);
      this.chatUIInstance.scrollToBottom();
    } else {
      const newMsg: MessageModel = { id: 'msg-' + (this.msgIdx + 1), text: args.transcript, author: this.user };
      this.chatUIInstance.addMessage(newMsg);
    }

    if (!this.isIndicatorVisible) {
      this.chatUIInstance.typingUsers = [this.user];
      this.isIndicatorVisible = true;
    }

    if (!args.isInterimResult) {
      this.msgIdx++;
      this.speechToTextInstance.transcript = '';
      this.chatUIInstance.typingUsers = [];
      this.isIndicatorVisible = false;
    }
  }

  onListeningStart(): void {
    this.msgIdx = this.chatUIInstance.messages.length;
    this.speechToTextInstance.element.classList.add('stt-listening-state');
    this.updateStatus('Listening... Speak now...');
  }

  onListeningStop(args: StopListeningEventArgs): void {
    this.speechToTextInstance.element.classList.remove('stt-listening-state');
    this.chatUIInstance.typingUsers = [];
    if (args.isInteracted) this.updateStatus('Click the mic button to start speaking...');
  }

  onErrorHandler(args: ErrorEventArgs): void {
    this.updateStatus(args.errorMessage);
    if (args.error === 'unsupported-browser') {
      this.speechToTextInstance.disabled = true;
    }
  }

  private updateStatus(status: string): void {
    const statusElement = document.querySelector('.speech-recognition-status') as HTMLElement;
    statusElement.innerText = status;
  }
}
