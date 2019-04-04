/**
 * ListView Template Sample
 */

import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { dataSource } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateListViewComponent {
    @ViewChild('listviewInstance')
    public listviewInstance: any;

    public headerTitle: string = 'Syncfusion Blog';
    public cssClass: string = 'e-list-template';

    public dataSource: object = dataSource;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }
    onActionComplete(args: any): void {
        let listHeader: HTMLElement = this.listviewInstance.element.childNodes[0] as HTMLElement;
        let header: HTMLElement = listHeader.childNodes[0] as HTMLElement;
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader: HTMLElement = listHeader.childNodes[2] as HTMLElement;
                childHeader.remove();
            }
        } else {
            let headerEle: HTMLElement = this.listviewInstance.element.querySelector('.e-list-header') as HTMLElement;
            let headerElement: HTMLElement = this.listviewInstance.element.querySelector('#list-logo') as HTMLElement;
            let clone: HTMLElement = headerElement.cloneNode(true) as HTMLElement;
            headerEle.appendChild(clone);
        }
        this.postAction();
    }

    postAction() {
        //Customizing the elements to perform our own events
        let share: any = document.getElementsByClassName('share');
        let comments: any = document.getElementsByClassName('comments');
        let bookmark: any = document.getElementsByClassName('bookmark');
        let description: any = document.getElementsByClassName('e-list-content');
        let timeStamp: any = document.getElementsByClassName('timeStamp');

        for (let i: number = 0; i < comments.length; i++) {
            comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            comments[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < bookmark.length; i++) {
            bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            bookmark[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < share.length; i++) {
            share[i].setAttribute('title', 'We can customize this element to perform our own action');
            share[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < description.length; i++) {
            description[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < timeStamp.length; i++) {
            timeStamp[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

    }

}
