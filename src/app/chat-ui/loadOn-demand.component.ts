import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatUIModule, UserModel, MessageModel } from '@syncfusion/ej2-angular-interactive-chat';

import { Component } from '@angular/core';


@Component({
    selector: 'control-content',
    templateUrl: 'loadOn-demand.html',
    styleUrls: ['loadOn-demand.component.css'],
    standalone: true,
    imports: [ FormsModule, ReactiveFormsModule, ChatUIModule ]
})

export class ChatUILoadOnDemandComponent {
    public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
    public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2', avatarUrl: './assets/chat-ui/images/andrew.png'};
    public chatMessages: MessageModel[] = [];
    public baseDate = new Date();
    public dayIncrement = 24 * 60 * 60 * 1000;
    public authorNames = ["Albert", "Michale"];

    public ngOnInit(): void {
        this.baseDate.setDate(this.baseDate.getDate() - 3);
        for (let i = 1; i <= 200; i++) {
            if (i % 50 === 1 && i !== 1) {
                // Increment the day only every 50 messages except the very first one
                this.baseDate = new Date(this.baseDate.getTime() + this.dayIncrement);
            }
            var authorIndex = i % 2;

            this.chatMessages.push({
                text: 'Message ' + i + ' from ' + this.authorNames[authorIndex],
                author: authorIndex === 0 ? this.michaleUserModel : this.currentUserModel,
                timeStamp: new Date((this.baseDate.getTime() - ((200 * 60 * 1000)) + ((60 * 1000) * i)))
            });
        }
    }
}