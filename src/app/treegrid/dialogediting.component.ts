import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-treegrid';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'dialogediting.html',
    providers: [ToolbarService, EditService, PageService]
})
export class DialogEditingComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public editParams: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public enddaterules: Object;
    public durationrules: Object;
    public progressrules: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' , newRowPosition: 'Below'};
        this.toolbar = ['Add', 'Edit', 'Delete'];
        this.pageSettings = { pageCount: 5 };
        this.editParams = {  params: { format: 'n' } };
        this.tasknamerules = { required: true};
        this.startdaterules = { date: true};
        this.enddaterules = { date: true};
        this.durationrules = { number: true , min: 0};
        this.progressrules = { number: true , min: 0};
      
    }
}