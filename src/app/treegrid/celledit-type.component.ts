import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditService, ToolbarService, PageService, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'celledit-type.html',
    providers: [ToolbarService, EditService, PageService],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CellEditTypeComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public numericParams: Object;
    public dpParams: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public priorityrules: Object;
    public durationrules: Object;
    public progressrules: Object;
    public format: Object;

    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Row' , newRowPosition: 'Below' };
        this.toolbar = ['Add', 'Edit', 'Delete' , 'Update' , 'Cancel'];
        this.pageSettings = { pageCount: 5 };
        this.numericParams = { params: {  format: 'n' } };
        this.format= {format: 'M/d/y hh:mm a', type: 'dateTime'},
        this.dpParams = {  params: { format: 'M/d/y hh:mm a' } };
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: ['M/d/y hh:mm a', 'Please enter a valid date']};;
        this.priorityrules = { required: true};
        this.progressrules = { number: true , min: 0};
    }
}
