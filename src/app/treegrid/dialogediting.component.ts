import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditService, ToolbarService, PageService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'dialogediting.html',
    providers: [ToolbarService, EditService, PageService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DialogEditingComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public editParams: Object;
    public tasknamerules: Object;
    public taskidrules: Object;
    public startdaterules: Object;
    public enddaterules: Object;
    public durationrules: Object;
    public progressrules: Object;
    public dateeditparam: Object;
    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' , newRowPosition: 'Below'};
        this.toolbar = ['Add', 'Edit', 'Delete'];
        this.pageSettings = { pageCount: 5 };
        this.editParams = {  params: { format: 'n' } };
        this.tasknamerules = { required: true};
        this.taskidrules = { required: true};
        this.startdaterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.enddaterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.dateeditparam = { params: { format: 'M/d/yyyy' } };
        this.durationrules = { number: true , min: 0};
        this.progressrules = { number: true , min: 0};
      
    }
}
