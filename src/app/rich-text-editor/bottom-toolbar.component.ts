import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel, MessageToolbarSettingsModel } from '@syncfusion/ej2-interactive-chat';
import { RichTextEditorAllModule, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Component, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';


@Component({
    imports: [ChatUIModule, RichTextEditorAllModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: 'bottom-toolbar.html',
    styleUrls: ['bottom-toolbar.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})

export class BottomToolbarComponent {
    public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
    public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2', avatarUrl: '//ej2.syncfusion.com/demos/src/chat-ui/images/andrew.png' };

    public chatMessages: MessageModel[] = [
        { author: this.currentUserModel, text: 'Hi Michale, are we on track for the deadline?' },
        { author: this.michaleUserModel, text: 'Yes, the design phase is complete.' },
        { author: this.currentUserModel, text: 'I will review it and send feedback by today.' },
        { author: this.michaleUserModel, text: 'Okay' },
    ];

    public toolbarSettings: MessageToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
        ]
    }

    public rteTools: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'InlineCode', '|', 'FontColor', 'BackgroundColor', '|',
            'Alignments', 'Blockquote', '|', 'Orderedlist', 'UnOrderedlist', '|', 'CreateLink',
            'Image', 'CreateTable', 'EmojiPicker'
        ]
    };
    sendMessage(rte: RichTextEditorComponent) {
        const message = rte.value;
        if (message && message.trim().length > 0) { 
            rte.value = "";
            rte.dataBind();
            this.chatMessages = [
                ...this.chatMessages,
                { author: this.currentUserModel, text: message }
            ];
            rte.clearUndoRedo();
            rte.focusIn();
        }
    }

    cancelMessage(rte: RichTextEditorComponent) {
        rte.value = "";
        rte.dataBind();
        rte.clearUndoRedo();
        rte.focusIn();
    }
}