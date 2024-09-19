import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import { orderDataSource } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GridModule, ToolbarService, EditService, PageService } from '@syncfusion/ej2-angular-grids';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridemptytemplate',
    templateUrl: 'empty-record-template.html',
    styleUrls: ['empty-record-template.style.css'],
    providers: [ToolbarService, EditService, PageService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class EmptyRecordTemplateComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public customeridrules: Object;
    public orderidrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public formatoptions: Object;

    public imageSrc(): string {
        if (document.body.classList.value.indexOf('dark') > -1 || document.body.classList.value.indexOf('highcontrast') > -1) {
            return './assets/grid/images/emptyRecordTemplate_dark.svg';
        } else {
            return './assets/grid/images/emptyRecordTemplate_light.svg';
        }
    }
    
    ngOnInit(): void {
        this.data = [];        
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editparams = { params: { dataSource: new DataManager(orderDataSource), fields: {text:'ShipCountry',value:'ShipCountry'}}};
        this.pageSettings = { pageCount: 5 };
        this.customeridrules = { required: true };
        this.orderidrules = { required: true, number: true };
        this.freightrules = { required: true, number: true };
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }
    }
}