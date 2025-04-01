import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChatUIComponent, ChatUIModule, UserModel } from '@syncfusion/ej2-angular-interactive-chat';
import { ChangeEventArgs, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { RemoveEventArgs, DropDownListModule, SelectEventArgs, MultiSelectModule, ChangeEventArgs as DDLChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { communityMessagedata } from './messageData';
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
        { text: 'Charlie', value: 'Charlie' }
    ];
    public typingUsers: UserModel[] = [];

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

    onTypingUsersSelect(args: SelectEventArgs) {
        const user = this.createUserForTyping(args.itemData.value);
        this.typingUsers = [...this.typingUsers, user];
        this.chatUI.typingUsers = this.typingUsers;
    }

    onTypingUsersRemove(args: RemoveEventArgs) {
        this.typingUsers = this.typingUsers.filter(user => user.user !== args.itemData.value);
        this.chatUI.typingUsers = this.typingUsers;
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
