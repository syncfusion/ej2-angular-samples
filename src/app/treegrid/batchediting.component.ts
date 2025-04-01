import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent , EditService , ToolbarService, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'batchediting.html',
    providers: [EditService , ToolbarService ],
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent, TreeGridAllModule]
})
export class BatchEditingComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar:string[];
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public durationrules: Object;
    public numericParams: Object;
    public dateeditparam: Object;
     @ViewChild('treegrid')
     public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Batch", newRowPosition: 'Below'}; 
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.dateeditparam = { params: { format: 'M/d/yyyy' } };
        this.durationrules = {number: true , min: 0};
        this.numericParams = { params: {  format: 'n'}};
    }
}
