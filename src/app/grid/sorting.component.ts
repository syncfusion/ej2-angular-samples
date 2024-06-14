import { Component, OnInit, Inject } from '@angular/core';
import { data } from './data';
import { SortService, GridModule, PageService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridsort',
    templateUrl: 'sorting.html',
    styleUrls: ['sort.style.css'],
    providers: [SortService, PageService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SortComponent implements OnInit {
    public data: Object[];
    public initialSort: Object;
    public pageSettings: Object;
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sort.style.css'];
    }

    public ngOnInit(): void {
        this.data = data;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.initialSort = {
            columns: [{ field: 'Freight', direction: 'Ascending' },
            { field: 'CustomerName', direction: 'Descending' }]
        };
        this.pageSettings = { pageCount: 5 }
    }
}