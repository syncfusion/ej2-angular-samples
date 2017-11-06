import { Component, OnInit } from '@angular/core';
import { orderDatas } from './data';
import { EditService, PageService, CommandColumnService, CommandModel } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-grid-commandcolumn',
    templateUrl: 'command-column.html',
    providers: [ EditService, PageService, CommandColumnService]
})
export class CommandColumnComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public pageSettings: Object;
    public commands: CommandModel[];

    public ngOnInit(): void {
        this.data = orderDatas;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'normal' };
        this.orderidrules = { required: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = {pageCount: 5};
        this.commands = [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
}
