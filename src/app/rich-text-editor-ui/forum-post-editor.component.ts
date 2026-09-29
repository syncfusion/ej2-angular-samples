import { Component, ViewChild } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { ListViewComponent, ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface IForumComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    time: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'forum-post-editor.html',
    styleUrls: ['forum-post-editor.css'],
    standalone: true,
    imports: [
        RichTextEditorUIModule,
        ListViewModule,
        ButtonModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class ForumPostEditorComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    @ViewChild('commentsList')
    public commentsList: ListViewComponent;

    public userAvatar: string = 'https://ej2.syncfusion.com/demos/src/rich-text-editor/images/1.png';
    public userName: string = 'Selma Rose';

    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'BulletFormatList', 'NumberFormatList', '|',
            'Link', 'Undo', 'Redo'
        ]
    };

    public comments: IForumComment[] = [
        {
            id: 1,
            author: 'Jane Smith',
            avatar: 'https://ej2.syncfusion.com/demos/src/rich-text-editor/images/2.png',
            content: 'Has anyone tried the new <b>rich text editor</b>? I love how clean the toolbar looks now.',
            date: 'Sep 3, 2026',
            time: '02:10 PM'
        },
        {
            id: 2,
            author: 'Mark Johnson',
            avatar: 'https://ej2.syncfusion.com/demos/src/rich-text-editor/images/3.png',
            content: 'I am also enjoying the updated UI. The <i>inline editing</i> experience feels really smooth!',
            date: 'Sep 3, 2026',
            time: '10:24 AM'
        }
    ];

    public onPost(): void {
        const content: string = this.editor.getHtml();
        if (!content || !content.replace(/<[^>]*>/g, '').trim()) {
            return;
        }
        const now: Date = new Date();
        this.comments = [{
            id: now.getTime(),
            author: this.userName,
            avatar: this.userAvatar,
            content: content,
            date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }, ...this.comments];
        this.commentsList.dataSource = this.comments as any;
        this.clearEditor();
    }

    public onDiscard(): void {
        this.clearEditor();
    }

    public onCommentsClick(event: MouseEvent): void {
        const target: HTMLElement = (event.target as HTMLElement).closest('.action-btn') as HTMLElement;
        if (!target) { return; }
        const item: HTMLElement = target.closest('.e-list-item') as HTMLElement;
        if (!item) { return; }
        const id: number = Number(item.getAttribute('data-uid'));
        const comment: IForumComment | undefined = this.comments.find((c: IForumComment) => c.id === id);
        if (!comment) { return; }

        if (target.classList.contains('copy-btn')) {
            navigator.clipboard.writeText(comment.content.replace(/<[^>]*>/g, ''));
        } else if (target.classList.contains('delete-btn')) {
            this.comments = this.comments.filter((c: IForumComment) => c.id !== id);
            this.commentsList.dataSource = this.comments as any;
        }
    }

    private clearEditor(): void {
        this.editor.value = '';
        this.editor.refresh();
    }
}
