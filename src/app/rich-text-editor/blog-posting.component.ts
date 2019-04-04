/**
 * RichTextEditor Blog-post sample
 */
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'blog-posting.html',
    styleUrls: ['blog-posting.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class BlogPostComponent {
    @ViewChild('blogRTE')
    public rteObj: RichTextEditorComponent;
    public onCreate(): void {
        let buttonEle: HTMLElement = document.getElementById('rteSubmit');
        let cancelEle: HTMLElement = document.getElementById('rteCancel');
        cancelEle.addEventListener('click', (e: any) => {
            let answerElement: Element = this.rteObj.contentModule.getEditPanel();
            answerElement.innerHTML = '';
        });
        let empCount: number = 0;
        buttonEle.addEventListener('click', (e: any) => {
            let answerElement: HTMLElement = this.rteObj.contentModule.getEditPanel() as HTMLElement;
            let comment: string = answerElement.innerHTML;
            let empList: string[] = ['emp1', 'emp2', 'emp3'];
            let nameListList: string[] = ['Anne Dodsworth', 'Janet Leverling', 'Laura Callahan'];
            if (comment !== null && comment.trim() !== '' && answerElement.innerText.trim() !== '') {
                let answer: HTMLElement = document.querySelector('.answer') as HTMLElement;
                let cloneAnswer: HTMLElement = answer.cloneNode(true) as HTMLElement;
                let authorName: HTMLElement = cloneAnswer.querySelector('.authorname') as HTMLElement;
                let logo: HTMLElement = cloneAnswer.querySelector('.logos') as HTMLElement;
                logo.classList.remove('logos');
                if (empCount < 3) {
                    logo.classList.add(empList[empCount]);
                    authorName.innerHTML = nameListList[empCount];
                    empCount++;
                } else {
                    logo.classList.add('logo');
                    authorName.innerHTML = 'User';
                }
                let timeZone: HTMLElement = cloneAnswer.querySelector('.detailsAnswer') as HTMLElement;
                let day: string = getMonthName(new Date().getMonth()) + ' ' + new Date().getDate();
                let hr: string = new Date().getHours() + ':' + new Date().getMinutes();
                if (new Date().getHours() > 12) {
                    hr = hr + ' PM';
                } else {
                    hr = hr + ' AM';
                }
                timeZone.innerHTML = 'Answered on ' + day + ', ' + new Date().getFullYear() + ' ' + hr;
                let postContent: HTMLElement = cloneAnswer.querySelector('.posting') as HTMLElement;
                postContent.innerHTML = comment;
                let postElement: HTMLElement = document.querySelector('.answerSection') as HTMLElement;
                postElement.appendChild(cloneAnswer);
                let countEle: HTMLElement = document.querySelector('.answerCount') as HTMLElement;
                let count: number = parseInt(countEle.innerHTML, null);
                count = count + 1;
                countEle.innerHTML = count.toString() + ' Answers';
                answerElement.innerHTML = '';
            }
        });
        function getMonthName(index: number): string {
            let month: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'];
            return month[index];
        }
    }
}