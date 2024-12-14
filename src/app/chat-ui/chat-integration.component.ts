import { Component, ViewChild, OnInit,ViewEncapsulation } from '@angular/core';
import { ChatUIComponent, ChatUIModule, ToolbarSettingsModel, MessageSendEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { ListViewComponent, ListViewModule, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { integrationMessagedata, integrationListTemplateData, botData, chatSuggestions, botMessagedata, walterMessagedata, lauraMessagedata, teamsMessagedate, suyamaMessagedata } from './messageData';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'control-content',
  templateUrl: 'chat-integration.html',
  styleUrls: ['chat-integration.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ChatUIModule, ButtonModule, CommonModule, ListViewModule,SplitterModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ChatIntegrationComponent implements OnInit {
  @ViewChild('chatUI') public chatUI: ChatUIComponent;
  @ViewChild('listView') public listView: ListViewComponent;

  public data = integrationListTemplateData;
  public chatMessages = {
    user1: integrationMessagedata,
    admin: botMessagedata,
    user2: walterMessagedata,
    user3: lauraMessagedata,
    team: teamsMessagedate,
    user4: suyamaMessagedata,
  };
  public currentUser = { id: 'user1', user: 'Albert', avatarUrl: './assets/chat-ui/images/andrew.png' };
  public currentMessages = this.chatMessages.user1;
  public currentSuggestions = [];
  public headerText = 'Albert';
  public headerIconCss = 'chat_user1_avatar';

  public headerToolbar: ToolbarSettingsModel = {
    items: [ { iconCss: 'sf-icon-phone-call', align: 'Right', tooltip: 'Audio call' }]
  };
  ngOnInit(): void {
    this.selectChatUser(0);
  }
  onChatItemSelected(args: SelectEventArgs): void {
    this.chatMessages[this.chatUI.user.id] = this.chatUI.messages;
    this.chatUI.suggestions = [];
    this.selectChatUser(args.index);
    if(args.index >= 0) this.toggleListView();
  }
  onActionComplete(): void {
    this.listView.selectItem(integrationListTemplateData[0]);
    const chatBtn: HTMLElement = document.getElementById('chatbtn');
    if (chatBtn) {
      chatBtn.addEventListener('click', this.toggleListView);
    }
  }
  private selectChatUser(index: number): void {
    if (!this.chatUI) {
      return;
    }
    const userSettings = [
      { headerText: 'Albert', headerIconCss: 'chat_user1_avatar', user: { id: 'user1', user: 'Albert', avatarUrl: './assets/chat-ui/images/andrew.png' }, messages: this.chatMessages.user1 },
      { headerText: 'Decor bot', headerIconCss: 'chat_bot_avatar', user: { id: 'admin', user: 'Admin', avatarUrl: './assets/chat-ui/images/bot.png' }, messages: this.chatMessages.admin, suggestions: chatSuggestions },
      { headerText: 'Charlie', headerIconCss: 'chat_user2_avatar', user: { id: 'user2', user: 'Charlie', avatarUrl: './assets/chat-ui/images/charlie.png' }, messages: this.chatMessages.user2 },
      { headerText: 'Laura Callahan', headerIconCss: 'chat_user3_avatar', user: { id: 'user3', user: 'Laura', avatarUrl: './assets/chat-ui/images/laura.png' }, messages: this.chatMessages.user3 },
      { headerText: 'New Dev Team', headerIconCss: 'chat_team_avatar', user: { id: 'team', user: 'Admin', avatarUrl: './assets/chat-ui/images/calendar.png' }, messages: this.chatMessages.team },
      { headerText: 'Reena', headerIconCss: 'chat_user4_avatar', user: { id: 'user4', user: 'Albert' }, messages: this.chatMessages.user4 }
    ];

    const selectedUser = userSettings[index];
    Object.assign(this.chatUI, selectedUser);
    this.chatUI.dataBind();
  }
  private toggleListView(): void {
    const listPopup: HTMLElement = document.getElementById('toggle-chat-list');
    if (window.innerWidth < 1200) listPopup.style.display = listPopup.style.display === 'none' || listPopup.style.display === '' ? 'block' : 'none';
  }
  onMessageSend(args: MessageSendEventArgs): void {
    this.chatUI.suggestions = [];
    setTimeout(() => {
      if (args.message.author.id === 'admin') {
        const foundMessage = botData.find(m => m.text === args.message.text);
        const defaultResponse = 'Your message text: ' + args.message.text + '</br></br>' + 'For real-time message processing, connect the Chat UI control to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
        const message = {
          author: { id: !foundMessage ? 'default' : 'bot', user: !foundMessage ? 'Default' : 'Bot', avatarUrl: !foundMessage ? '' : './assets/chat-ui/images/bot.png' },
          text: foundMessage?.reply || defaultResponse
        };
        this.chatUI.addMessage(message);
        this.chatUI.suggestions = foundMessage?.suggestions || [];
      }
    }, 500);
  }
}
