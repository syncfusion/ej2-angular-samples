import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SplitterComponent} from '@syncfusion/ej2-angular-layouts';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

/**
 * Splitter outlook layout style
 */
@Component({
    selector: 'control-content',
    templateUrl: 'outlook-style-layout.html',
    encapsulation: ViewEncapsulation.None
})
export class OutlookSplitterComponent {
    @ViewChild('blogRTE') public rteObj: RichTextEditorComponent;
    public localData: Object[] = [
        { id: 1, name: 'Favorites', hasChild: true},
        { id: 2, pid: 1, name: 'Sales Reports', count: '4' },
        { id: 3, pid: 1, name: 'Sent Items'},
        { id: 4, pid: 1, name: 'Marketing Reports ', count: '6'},
        { id: 5, name: 'Andrew Fuller', hasChild: true, expanded: true },
        { id: 6, pid: 5, name: 'Inbox',  selected: true , count: '20'},
        { id: 7, pid: 5,  name: 'Drafts', count: '5'},
        { id: 15, pid: 5, name: 'Archive'},
        { id: 8, pid: 5,  name: 'Deleted Items'},
        { id: 9, pid: 5, name: 'Sent Items'},
        { id: 10, pid: 5, name: 'Sales Reports' , count: '4'},
        { id: 11, pid: 5, name: 'Marketing Reports', count: '6' },
        { id: 12, pid: 5, name: 'Outbox'},
        { id: 13, pid: 5, name: 'Junk Email'},
        { id: 14, pid: 5, name: 'RSS Feed'},
        { id: 15, pid: 5, name: 'Trash' }
    ];
    public field: Object = { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    public dataSource: any = [
        { Name: 'Selma Tally', content: 'Apology marketing email',content2:'Hello Ananya Singleton', id: '1', order: 0 },
        { Name: 'Illa Russo', content: 'Annual conference', content2: 'Hi jeani Moresa', id: '4', order: 0 },
        { Name: 'Camden Macmellon', content: 'Reference request- Camden hester', content2: 'Hello Kerry Best', order: 0 },
        { Name: 'Garth Owen', content: 'Application for job Title', content2:'Hello Illa Russo', id: '2', order: 0 },
        { Name: 'Ursula Patterson', content: 'Programmaer Position Applicant', content2: 'Hello Kerry best', id: '2', order: 0 }
    ];

    onSplitterResize(): void {
        this.rteObj.refresh();
    }
}