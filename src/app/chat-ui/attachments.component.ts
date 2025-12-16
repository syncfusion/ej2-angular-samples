import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { ChatUIAllModule } from '@syncfusion/ej2-angular-interactive-chat';
@ViewChild('chatUI')
@Component({
    selector: 'control-content',
    templateUrl: 'attachments.html',
    styleUrls: ['attachments.component.css'],
    standalone: true,
    imports: [ ChatUIAllModule ]
})
export class AttachmentsComponent {
    public chatUI?: ChatUIComponent;
    public headerText: string = 'Paul Wilson (You)';
    public headerIconCss: string = 'chat_user_avatar';
    public user: any = {
        id: 'user1',
        user: 'Paul Wilson',
        avatarUrl: './assets/chat-ui/images/paul_wilson.png'
    };
    public enableAttachments: boolean = true;
    public attachmentSettings: any = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    public messages: any[] = [];
    public headerToolbar: any = {
    items: [
      { iconCss: 'e-icons e-refresh', align: 'Right', tooltip: 'Clear Chat' }
    ],
        itemClicked: (args: any) => this.toolbarItemClicked(args)
    };

    toolbarItemClicked(args: any): void {
        this.messages = [];
        if (this.chatUI) {
        (this.chatUI as any).messages = []; 
        }
    }
}