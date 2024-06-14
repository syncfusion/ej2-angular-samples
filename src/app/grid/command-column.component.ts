import { Component, OnInit } from '@angular/core';
import { orderDatas } from './data';
import { EditService, PageService, CommandColumnService, CommandModel, SortService, FilterService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-grid-commandcolumn',
    templateUrl: 'command-column.html',
    providers: [ EditService, PageService, CommandColumnService, SortService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CommandColumnComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public pageSettings: Object;
    public filterSettings: Object;
    public commands: CommandModel[];

    public ngOnInit(): void {
        this.data = orderDatas;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
        this.orderidrules = { required: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = {pageCount: 5};
        this.filterSettings = { type: 'Excel'};
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
}
