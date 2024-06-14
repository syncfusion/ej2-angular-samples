import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { EditService, ToolbarService, PageService, SortService, GridModule, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridbatchedit',
    templateUrl: 'batch-editing.html',
    providers: [ToolbarService, EditService, PageService, SortService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BatchEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public orderdaterules: Object;
    public editparams: Object;
    public pageSettings: Object;
    public filterSettings: Object;

    public ngOnInit(): void {
        this.data = orderData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules =  { required: true, min: 0, number: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = {pageCount: 5};
        this.filterSettings = { type: 'Excel'}
    }
}
