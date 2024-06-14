import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { PageService, SortService, FilterService, ToolbarService, EditService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridlocal',
    templateUrl: 'local-data.html',
    providers: [PageService, SortService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class LocalDataComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    ngOnInit(): void {
        this.data = data;
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }
}