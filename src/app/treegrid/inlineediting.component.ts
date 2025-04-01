import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridComponent , TreeGridModule, EditService , ToolbarService , PageService, RowDDService } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'inlineediting.html',
    providers: [EditService , ToolbarService , PageService, RowDDService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule]
})
export class InlineEditing implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar:string[];
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public durationrules: Object;
    public edit: Object;
    public d1data: Object;
    public ddlfields: Object;
    public dateeditparam:Object;
     @ViewChild('treegrid')
     public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Cell"}; 
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel','Indent', 'Outdent'];
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.dateeditparam = { params: { format: 'M/d/yyyy' } };
        this.durationrules = {number: true , min: 0};
        this.edit = { params: {  format: 'n'}};
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ]
    }
    public onChange(e: ChangeEventArgs): void {
        if (e.value === 'CellEditing') {
            this.treegrid.editSettings.mode = 'Cell';
            this.treegrid.toolbar = ['Add', 'Delete', 'Update', 'Cancel','Indent', 'Outdent'];
        } else {
            this.treegrid.editSettings.mode = 'Row';
            this.treegrid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Indent', 'Outdent'];
        }
    }

}
