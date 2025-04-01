import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ChatUIComponent, ChatUIModule, UserModel, MessageSendEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { templateMessagedata } from './messageData';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'control-content',
  templateUrl: 'template.html',
  styleUrls: ['template.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ChatUIModule, SBActionDescriptionComponent, SBDescriptionComponent, CommonModule],
})
export class ChatUITemplateComponent implements AfterViewInit {
  @ViewChild('chatTemplate') public chatTemplate: ChatUIComponent;

  public user: UserModel = { id: 'admin', user: 'Admin', avatarUrl: './assets/chat-ui/images/bot.png' };

  public templateMessagedata = templateMessagedata;

  ngAfterViewInit() {
    this.bindInitialBotMessage();
  }

  onMessageSend(args: MessageSendEventArgs) {
    setTimeout(() => {
      const defaultResponse = "Unfortunately, I don't have information on that. Use any real-time data streaming service to provide chat updates.";
      const message = {
        author: { id: 'bot', user: 'Bot', avatarUrl: './assets/chat-ui/images/bot.png' },
        text: defaultResponse
      };
      this.chatTemplate.addMessage(message);
    }, 500);
  }

  private bindClickAction() {
    this.chatTemplate.element.querySelectorAll('.suggestion-button').forEach(suggestion => {
      suggestion.addEventListener('click', () => this.handleSuggestionClick(suggestion as HTMLElement));
    });
  }

  private handleSuggestionClick(suggestion: HTMLElement) {
    const message = this.templateMessagedata.find(m => m.text === suggestion.innerText);
    if (message) {
      this.chatTemplate.addMessage(message.text);
      setTimeout(() => {
        const messageModel = {
          author: { id: 'bot', user: 'Bot', avatarUrl: './assets/chat-ui/images/bot.png' },
          text: message.reply,
          suggestions: message.suggestions
        };
        this.chatTemplate.addMessage(messageModel);
        setTimeout(() => {
            this.bindClickAction();
            if (message.suggestions.length === 0) { 
              this.chatTemplate.showFooter = true; 
            }
          }, 0);
        if (message.suggestions.length === 0) { this.chatTemplate.showFooter = true; }
      }, 500);
      suggestion.parentElement.innerHTML = '';
    }
  }

  private bindInitialBotMessage() {
    setTimeout(() => {
      const message = {
        author: { id: 'bot', user: 'Bot', avatarUrl: './assets/chat-ui/images/bot.png' },
        text: this.templateMessagedata[0].text,
        suggestions: this.templateMessagedata[0].suggestions
      };
      this.chatTemplate.addMessage(message);
      setTimeout(() => {
        this.bindClickAction();
      }, 0);
    }, 1500);
  }
  public formatDate(messageDate: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCompare = new Date(messageDate);
    dateToCompare.setHours(0, 0, 0, 0);
    
    return dateToCompare.getTime() === today.getTime() ? 'Today' : messageDate.toDateString();
  }
}
