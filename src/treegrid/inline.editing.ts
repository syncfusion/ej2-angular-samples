import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGridComponent , EditService , ToolbarService , PageService } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'inline.editing.html',
    providers: [EditService , ToolbarService , PageService]
})
export class InlineEditing implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: Object;
    public validationRules: Object;
    public edit: Object;
    public d1data: Object[] = [];
    public ddlfields: Object;
    public numericParams: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public durationrules: Object;
    public progressrules: Object;
     @ViewChild('treegrid')
     public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell' };
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.validationRules = {minLength: 0};
        this.edit = { params: {  format: 'n'}};
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data = [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ];
        this.numericParams = { params: {  format: 'n'} };
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: true};
        this.durationrules = { number: true , min: 0};
        this.progressrules = { number: true , min: 0};
    }
  public onChange(e: ChangeEventArgs): void {
        this.treegrid.editSettings.mode = e.value === 'CellEditing' ? 'Cell' : 'Row';
        if (e.value === 'CellEditing') {
            this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        } else {
            this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        }
    }
}