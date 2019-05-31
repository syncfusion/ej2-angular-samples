import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'events.html',
    styleUrls: ['events.style.css']
})
export class EventComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public numberrules: Object;
    public daterules: Object;
    public pageSettings: Object;
    public numericParams: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        
    }

    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true };
        this.pageSettings = { pageSize: 10 };
        this.numberrules = { number: true, min: 0 };
        this.taskidrules = { required: true, number: true };
        this.tasknamerules = { required: true };
        this.daterules = { date: true};
        this.numericParams = {params: { format: 'n' }};

    }

    beginEdit(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">beginEdit</b> event called<hr>');
    }
    columnDragStart(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">columnDragStart</b> event called<hr>');
    }
    columnDrop(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">columnDrop</b> event called<hr>');
    }
    columnDrag(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">columnDrag</b> event called<hr>');
    }
    load(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">load</b> event called<hr>');
    }
    create(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">create</b> event called<hr>');
    }
    actionBegin(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">actionBegin</b> event called<hr>');
    }
    actionComplete(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">actionComplete</b> event called<hr>');
    }
    dataBound(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">dataBound</b> event called<hr>');
    }
    rowSelecting(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">rowSelecting</b> event called<hr>');
    }
    rowSelected(): void {
        this.appendElement('TreeGrid <b style="color:#388e3c">rowSelected</b> event called<hr>');
    }
    appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    onClick () {
        document.getElementById('EventLog').innerHTML = '';
    }
}
