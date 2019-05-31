import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditService, PageService, CommandColumnService /*, CommandModel*/ } from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'commandcolumn.html',
    providers: [ EditService, PageService, CommandColumnService]
})
export class CommandColumnComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public numberrules: Object;
    public daterules: Object;
    public editparams: Object;
    public commands: Object[];
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Row'
        };
        this.numberrules = { number: true, min: 0 };
        this.pageSettings = { pageSize: 10 };
        this.taskidrules = { required: true, number: true };
        this.tasknamerules = { required: true };
        this.daterules = { date: true};
        this.editparams = {params: { format: 'n' }};
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
}
