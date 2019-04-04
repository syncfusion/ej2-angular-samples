import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ChangeEventArgs, AutoComplete } from '@syncfusion/ej2-dropdowns';
import { TreeGridComponent , EditService , ToolbarService , PageService, Column } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'edittemplate.html',
    providers: [EditService , ToolbarService , PageService]
})
export class EditTemplateComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: Object;
    public validationRules: Object;
    public edit: Object;
    public numericParams: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public durationrules: Object;
    public progressrules: Object;
    public dpParams: Object;
    public autoCompleteObj: AutoComplete;
     @ViewChild('treegrid')
     public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.validationRules = {minLength: 0};
        this.edit = { params: {  format: 'n'}};
        this.numericParams = { params: {  format: 'n'} };
        this.taskidrules = { required: true , number: true};
        this.tasknamerules = { required: true};
        this.startdaterules = { date: true};
        this.durationrules = { number: true , min: 0};
        this.progressrules = { number: true , min: 0};
        this.dpParams = {
            create: () => {
                let elem: HTMLInputElement = document.createElement('input');
                elem.id = 'taskname';
                return elem;
            },
            read: () => {
                return this.autoCompleteObj.value;
            },
            destroy: () => {
                this.autoCompleteObj.destroy();
            },
            write: (args: { rowData: Object, column: Column, element: HTMLElement }) => {
                this.autoCompleteObj = new AutoComplete({
                    dataSource: <{key: string, value: any}[]>this.treegrid.grid.dataSource,
                    fields: { value: 'taskName' },
                    value: args.rowData[args.column.field]
                });
                this.autoCompleteObj.appendTo(args.element);
            }
        };
    }

}