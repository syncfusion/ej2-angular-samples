import { Component, OnInit } from '@angular/core';
import { ToolbarService, ColumnChooserService, SortService, GridModule, PageService, FilterService, EditService } from '@syncfusion/ej2-angular-grids';
import { data } from './data';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-chooser.html',
    providers: [ToolbarService, ColumnChooserService, SortService, PageService, FilterService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ColumnChooserComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    public filterSettings: Object;
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    ngOnInit(): void {
         this.data = data;
         this.filterSettings = { type: 'Excel' };
         this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
         this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
         this.orderidrules = { required: true, number: true };
         this.customeridrules = { required: true, minLength: 5 };
         this.freightrules = { required: true, min: 0 };
         this.pageSettings ={ pageCount: 5 };
    }
}