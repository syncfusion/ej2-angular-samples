/**
 * Rich Text Editor Blog-post sample
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'blog-posting.html',
    styleUrls: ['blog-posting.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, FormsModule, RichTextEditorModule, ButtonModule, SBDescriptionComponent]
})
export class BlogPostComponent {

    @ViewChild('blogRTE')
    public rteObj: RichTextEditorComponent;

    @ViewChild('rteSubmit')
    public buttonEle: ElementRef;

    @ViewChild('rteCancel')
    public cancelEle: ElementRef;

    public cancelClick = (): void => {
        this.rteObj.refresh();
        this.rteObj.value = '';
    }

    public submitClick = (): void => {
        let empCount = 0;
        const answerElement: HTMLElement = this.rteObj.contentModule.getEditPanel() as HTMLElement;
        const comment: string = answerElement.innerHTML;
        const empList: string[] = ['emp1', 'emp2', 'emp3'];
        const nameListList: string[] = ['Anne Dodsworth', 'Janet Leverling', 'Laura Callahan'];
        if (comment !== null && comment.trim() !== '' && (answerElement.innerText.trim() !== '' ||
        !isNOU(answerElement.querySelector('img')) || !isNOU(answerElement.querySelector('table')))) {
            const answer: HTMLElement = document.querySelector('.answer') as HTMLElement;
            const cloneAnswer: HTMLElement = answer.cloneNode(true) as HTMLElement;
            const authorName: HTMLElement = cloneAnswer.querySelector('.authorname') as HTMLElement;
            const logo: HTMLElement = cloneAnswer.querySelector('.logos') as HTMLElement;
            logo.classList.remove('logos');
            if (empCount < 3) {
                logo.classList.add(empList[empCount]);
                logo.classList.add('blog-avatar');
                authorName.innerHTML = nameListList[empCount];
                empCount++;
            } else {
                logo.classList.add('logo');
                logo.classList.add('blog-avatar');
                authorName.innerHTML = 'User';
            }
            const timeZone: HTMLElement = cloneAnswer.querySelector('.detailsAnswer') as HTMLElement;
            const day: string = this.getMonthName(new Date().getMonth()) + ' ' + new Date().getDate();
            let hr: string = new Date().getHours() + ':' + new Date().getMinutes();
            if (new Date().getHours() > 12) {
                hr = hr + ' PM';
            } else {
                hr = hr + ' AM';
            }
            timeZone.innerHTML = 'Answered on ' + day + ', ' + new Date().getFullYear() + ' ' + hr;
            const postContent: HTMLElement = cloneAnswer.querySelector('.posting') as HTMLElement;
            postContent.innerHTML = comment;
            const postElement: HTMLElement = document.querySelector('.answerSection') as HTMLElement;
            postElement.appendChild(cloneAnswer);
            const countEle: HTMLElement = document.querySelector('.answerCount') as HTMLElement;
            let count: number = parseInt(countEle.innerHTML, null);
            count = count + 1;
            countEle.innerHTML = count.toString() + ' Answers';
            this.rteObj.refresh();
            this.rteObj.value = '';
        }
    }

    public getMonthName(index: number): string {
        const month: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return month[index];
    }
}
