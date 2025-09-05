import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChatUIComponent, ChatUIModule, MessageToolbarItemClickedEventArgs, MessageToolbarSettingsModel, UserModel, MessageModel } from '@syncfusion/ej2-angular-interactive-chat';
import { ChangeEventArgs, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { RemoveEventArgs, DropDownListModule, SelectEventArgs, MultiSelectModule, ChangeEventArgs as DDLChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { communityMessagedata, communityMessageAdmin, communityMessageUser1, communityMessageUser2, communityMessageUser3, communityMessageUser4 } from './messageData';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChatUIModule,SwitchModule, DropDownListModule, MultiSelectModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ChatUIApiComponent {
    @ViewChild('chatUI') public chatUI: ChatUIComponent;
    public messages = communityMessagedata;
    public user: UserModel = { user: 'Alice', id: 'admin' };
    public headerText = 'Design Community';
    public headerIconCss = 'chat_header_icon';
    public timeStampFormatOptions: Object[] = [
        { text: 'MM/dd hh:mm a', value: 'MM/dd hh:mm a' },
        { text: 'dd/MM/yy hh:mm a', value: 'dd/MM/yy hh:mm a' },
        { text: 'hh:mm a', value: 'hh:mm a' },
        { text: 'MMMM hh:mm a', value: 'MMMM hh:mm a' }
    ];
    public typingUserOptions: Object[] = [
        { text: 'Michale', value: 'Michale' },
        { text: 'Laura', value: 'Laura' },
        { text: 'Charlie', value: 'Charlie' },
        { text: 'Jordan', value: 'Jordan'}
    ];
    public mentionUsers: UserModel[] = [
        communityMessageAdmin,
        communityMessageUser1,
        communityMessageUser2,
        communityMessageUser3,
        communityMessageUser4
    ];
    public mentionUserOptions: Object[] = [
        { text: 'Alice Brown', value: 'Alice Brown' },
        { text: 'Michale Suyama', value: 'Michale Suyama' },
        { text: 'Charlie', value: 'Charlie' },
        { text: 'Janet', value: 'Janet' },
        { text: 'Jordan Peele', value: 'Jordan Peele' }
    ];
    public mentionUserValues: string[] = ['Alice Brown', 'Michale Suyama', 'Charlie', 'Janet', 'Jordan Peele'];
    public typingUsers: UserModel[] = [];
    public toolbarSettings: MessageToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward', },
            { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
            { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' },
            { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
        ],
        itemClicked: (args: MessageToolbarItemClickedEventArgs) => {
            if (args.item.prefixIcon === 'e-icons e-chat-forward') {
                    const newMessageObj : MessageModel = {
                        id: 'chat-message-' + (this.chatUI.messages.length + 1).toString(),
                        isForwarded: true,
                        isPinned: args.message.isPinned,
                        author: args.message.author,
                        mentionUsers: args.message.mentionUsers,
                        text: args.message.text,
                        timeStamp: args.message.timeStamp,
                        timeStampFormat: args.message.timeStampFormat,
                        status: args.message.status,
                        replyTo: args.message.replyTo
                    } ;
                    this.chatUI.addMessage(newMessageObj);
            }
        }
    }
    private mentionUsersMap = {
        'Alice Brown': communityMessageAdmin,
        'Michale Suyama': communityMessageUser1,
        'Charlie': communityMessageUser2,
        'Janet': communityMessageUser3,
        'Jordan Peele': communityMessageUser4
    };

    onTimeStampSwitchChange(args: ChangeEventArgs) {
        this.chatUI.showTimeStamp = args.checked;
    }

    onTimeBreakSwitchChange(args: ChangeEventArgs) {
        this.chatUI.showTimeBreak = args.checked;
    }

    onHeaderSwitchChange(args: ChangeEventArgs) {
        this.chatUI.showHeader = args.checked;
    }

    onFooterSwitchChange(args: ChangeEventArgs) {
        this.chatUI.showFooter = args.checked;
    }

    onTimeStampFormatChange(args: DDLChangeEventArgs) {
        this.chatUI.timeStampFormat = args.value.toString();
    }

    onCompactModeSwitchChange(args: ChangeEventArgs) {
        this.chatUI.enableCompactMode = args.checked;
    }

    onTypingUsersSelect(args: SelectEventArgs) {
        const user = this.createUserForTyping(args.itemData.value);
        this.typingUsers = [...this.typingUsers, user];
        this.chatUI.typingUsers = this.typingUsers;
    }

    onTypingUsersRemove(args: RemoveEventArgs) {
        this.typingUsers = this.typingUsers.filter(user => user.user !== args.itemData.value);
        this.chatUI.typingUsers = this.typingUsers;
    }
    
     onMentionUsersSelect(args: SelectEventArgs) {
        const user = this.mentionUsersMap[args.itemData.value];
        this.mentionUsers = [...this.mentionUsers, user];
        this.chatUI.mentionUsers = this.mentionUsers;
        this.chatUI.dataBind();
    }

    onMentionUsersRemove(args: RemoveEventArgs) {
        this.mentionUsers = this.mentionUsers.filter(user => user.user !== args.itemData.value);
        this.chatUI.mentionUsers = this.mentionUsers;
        this.chatUI.dataBind();
    }

    private createUserForTyping(userName: string) {
        let avatarBgColor: string = '#87cefa';
        let avatarUrl: string;
        
        if (userName === 'Laura') {
            avatarBgColor = '#dec287';
            avatarUrl = './assets/chat-ui/images/laura.png';
        } else if (userName === 'Charlie') {
            avatarBgColor = '#e6cdde';
            avatarUrl = './assets/chat-ui/images/charlie.png';
        }

        return { user: userName, avatarBgColor, avatarUrl };
    }
}
