import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { EditService, PageService, CommandColumnService /*, CommandModel*/, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'commandcolumn.html',
    providers: [ EditService, PageService, CommandColumnService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
    public dateeditparam:Object;
    
    ngOnInit(): void {
        this.data = sampleData.slice(0);
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Row',
            allowEditOnDblClick: false
        };
        this.numberrules = { number: true, min: 0 };
        this.pageSettings = { pageSize: 10 };
        this.taskidrules = { required: true, number: true };
        this.tasknamerules = { required: true };
        this.daterules = { date: ['M/d/yyyy', 'Please enter a valid date']};
        this.dateeditparam = { params: { format: 'M/d/yyyy' } };
        this.editparams = {params: { format: 'n' }};
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
}
