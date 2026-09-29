import { Component, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorUIComponent, RichTextEditorUIModule, SlashCommandService, SlashCommandSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { ChatUIModule, ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel, MessageToolbarSettingsModel } from '@syncfusion/ej2-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'chat-ui.html',
    styleUrls: ['chat-ui.css'],
    standalone: true,
    providers: [ SlashCommandService ],
    imports: [ CommonModule, ChatUIModule, RichTextEditorUIModule, SBActionDescriptionComponent, SBDescriptionComponent ]
})
export class ChatUiComponent implements OnDestroy {

    @ViewChild('defaultChatUI')
    public defaultChatUI!: ChatUIComponent;

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    public currentUserModel: UserModel = { id: 'user1', user: 'Albert' };

    public michaleUserModel: UserModel = { id: 'user2', user: 'Michale Suyama', avatarUrl: 'https://ej2.syncfusion.com/demos/src/rich-text-editor/images/2.png' };

    public chatMessages: MessageModel[] = [
        { id: 'chat-message-1', author: this.currentUserModel, text: 'Hi Michale, are we on track for the deadline?' },
        { id: 'chat-message-2', author: this.michaleUserModel, text: 'Yes, the design phase is complete.' },
        { id: 'chat-message-3', author: this.currentUserModel, text: 'I will review it and send feedback by today.' },
        { id: 'chat-message-4', author: this.michaleUserModel, text: 'Okay.' }
    ];

    public headerText: string = 'Michale Suyama';
    public headerIconCss: string = 'chat-user2-avatar';
    public showTimeBreak: boolean = true;
    public loadOnDemand: boolean = true;
    public selectedReplyMessage: MessageModel | null = null;
    private messageCount: number = this.chatMessages.length;
    private sendBtn: HTMLElement | null = null;
    private sendBtnClickHandler: (() => void) | null = null;

    public toolbarSettings: ToolbarSettingsModel = {
        position: 'Bottom',
         items: [ 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'BulletFormatList', 'NumberFormatList', '|', 'Formats', 'FontColor', 'FontSize', 'BackgroundColor', '|', 'Quote', 'Link', 'CodeBlock', 'Image', '|',
            {
                align: 'Right',
                id: 'send_tbar',
                tooltipText: 'Send Message',
                actionId: 'sendMessage',
                prefixIcon: 'e-icons e-send'
            }
        ]
    };

    public slashCommandSettings: SlashCommandSettingsModel = {
        enable: true
    };

    public messageToolbarSettings: MessageToolbarSettingsModel = {
        itemClicked: (args: any): void => {
            this.handleMessageToolbarClick(args);
        }
    };

    constructor(private ngZone: NgZone) {}

    public onEditorCreated(): void {
        setTimeout(() => {
            this.sendBtn = this.editor.element.querySelector('#editor_toolbar_send_tbar') as HTMLElement;
            this.sendBtnClickHandler = (): void => {
                this.ngZone.run(() => {
                    this.onSendMessage();
                });
            };
            this.sendBtn.classList.remove('e-tbar-btn');
            this.sendBtn.classList.add('e-primary');
            if (this.sendBtn) {
                this.sendBtn.addEventListener('click', this.sendBtnClickHandler);
            }
        }, 0);
    }

    private handleMessageToolbarClick(args: any): void {
        const item: any = args.item?.properties || args.item;
        const message: MessageModel = (args.message?.properties || args.message) as MessageModel;
        const isReply: boolean =
            item.tooltipText === 'Reply' ||
            item.tooltip === 'Reply' ||
            item.id?.toLowerCase().includes('reply') ||
            item.prefixIcon?.toLowerCase().includes('reply') ||
            item.iconCss?.toLowerCase().includes('reply');
        if (isReply) {
            this.ngZone.run(() => {
                this.selectedReplyMessage = message;
                setTimeout(() => {
                    this.editor?.focusIn();
                }, 0);
            });
        }
    }

    private onSendMessage(): void {
        const html: string = this.editor.getHtml();
        if (!this.isValidContent(html)) {
            this.editor.focusIn();
            return;
        }
        const replyMessage: MessageModel | null = this.selectedReplyMessage;
        const message: any = {
            id: `chat-message-${++this.messageCount}`,
            author: this.currentUserModel,
            text: html
        };
        if (replyMessage) {
            message.replyTo = {
                user: replyMessage.author,
                text: replyMessage.text,
                messageID: replyMessage.id
            };
        }
        this.defaultChatUI.addMessage(message);
        const replyPreview: HTMLElement | null =
            this.defaultChatUI.element.querySelector('.e-footer .e-reply-wrapper') as HTMLElement;
        if (replyPreview) {
            replyPreview.remove();
        }
        this.clearComposer();
    }

    private clearComposer(): void {
        this.selectedReplyMessage = null;
        this.editor.value = '';
        this.editor.dataBind();
        const editableElement: HTMLElement | null = this.editor.element.querySelector('[contenteditable="true"]');
        if (editableElement) {
            editableElement.innerHTML = '';
        }
        this.editor.focusIn();
    }

    public getReplyText(content: string): string {
        const element: HTMLDivElement = document.createElement('div');
        element.innerHTML = content;
        return element.textContent?.trim() || '';
    }
    private isValidContent(html: string): boolean {
        if (!html || html.trim().length === 0) {
            return false;
        }
        const tempDiv: HTMLDivElement = document.createElement('div');
        tempDiv.innerHTML = html;
        const textContent: string = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, '').replace(/<[^>]*>/g, '').trim();
        if (textContent.length > 0) {
            return true;
        }
        const mediaTags: string[] = [ 'img', 'table', 'audio', 'video', 'iframe' ];
        for (const tag of mediaTags) {
            if (tempDiv.getElementsByTagName(tag).length > 0) {
                return true;
            }
        }
        return false;
    }

    public ngOnDestroy(): void {
        if ( this.sendBtn && this.sendBtnClickHandler ) {
            this.sendBtn.removeEventListener('click', this.sendBtnClickHandler);
        }
        this.sendBtn = null;
        this.sendBtnClickHandler = null;
    }
}