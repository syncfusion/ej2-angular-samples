import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { ChatUIModule, ChatUIComponent, MessageModel, UserModel, ToolbarSettingsModel, MessageSendEventArgs, TypingEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { chatMessagedata, defaultChatSuggestions } from './messageData';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChatUIModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ChatUIDefaultComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.component.css'];
    }

    @ViewChild('defaultChatUI1')
    public defaultChatUI1: ChatUIComponent;

    @ViewChild('defaultChatUI2')
    public defaultChatUI2: ChatUIComponent;

    public chatMessage: MessageModel[] = chatMessagedata;
    public suggestions: string[] = defaultChatSuggestions;
    public user1: UserModel = { id: 'user2', user: 'Reena', avatarUrl: './assets/chat-ui/images/reena.png' };
    public user2: UserModel = { id: 'user1', user: 'Albert', avatarUrl: './assets/chat-ui/images/andrew.png' };
    public headerToolbar1: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="dduser1Menu" style="border: none; background: none !important;"></button>', align: 'Right' }
        ]
    };
    public headerToolbar2: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="dduser2Menu" style="border: none; background: none !important;"></button>', align: 'Right' }]
    };
    messageSendOne = (args: MessageSendEventArgs) => {
        this.defaultChatUI1.suggestions = [];
        this.defaultChatUI2.addMessage(args.message);
    };
    messageSendTwo = (args: MessageSendEventArgs) => {
        this.defaultChatUI2.suggestions = [];
        this.defaultChatUI1.addMessage(args.message);
    };
    userOneTyping = (args: TypingEventArgs) => {
        this.handleUserTyping(args,this.defaultChatUI2);
    };
    userTwoTyping = (args: TypingEventArgs) => {
        this.handleUserTyping(args,this.defaultChatUI1);
    };
    handleUserTyping(args: TypingEventArgs, otherChatUser: ChatUIComponent) {
        if (!args.isTyping) {
            otherChatUser.typingUsers = otherChatUser.typingUsers.filter(userItem => userItem.user !== args.user.user);
        } else {
            if (!otherChatUser.typingUsers.some(userItem => userItem.user === args.user.user)) {
                otherChatUser.typingUsers = [...otherChatUser.typingUsers, args.user];
            }
        }
    }
    userOneCreated = () => {
        var dropdown: DropDownButton = new DropDownButton({
            items: [
                { text: 'Mute', iconCss: 'e-icons e-eye-slash' },
                { separator: true },
                { text: 'Delete', iconCss: 'e-icons e-trash' }
            ],
            iconCss: 'e-icons e-more-horizontal-1',
            cssClass: 'e-caret-hide',
            select: (args) => {
                if (['Mute', 'Unmute'].includes(args.item.text)) {
                    args.item.text = args.item.text === 'Mute' ? 'Unmute' : 'Mute';
                }
                if (args.item.text === 'Delete') {
                    this.defaultChatUI1.messages = [];
                }
            }
        }, '#dduser1Menu');
    };
    userTwoCreated = () => {
        var dropdown: DropDownButton = new DropDownButton({
            items: [
                { text: 'Mute', iconCss: 'e-icons e-eye-slash' },
                { separator: true },
                { text: 'Delete', iconCss: 'e-icons e-trash' }
            ],
            iconCss: 'e-icons e-more-horizontal-1',
            cssClass: 'e-caret-hide',
            select: (args) => {
                if (['Mute', 'Unmute'].includes(args.item.text)) {
                    args.item.text = args.item.text === 'Mute' ? 'Unmute' : 'Mute';
                }
                if (args.item.text === 'Delete') {
                    this.defaultChatUI2.messages = [];
                }
            }
        }, '#dduser2Menu');
    };
}
