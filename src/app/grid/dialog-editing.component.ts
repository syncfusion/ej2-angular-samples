import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { EditService, ToolbarService, PageService, SortService, FilterService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-griddialogedit',
    templateUrl: 'dialog-editing.html',
    providers: [ToolbarService, EditService, PageService, SortService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DialogEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public pageSettings: Object;
    public filterSettings: Object;
    public editparams: Object;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = { pageCount: 5};
        this.filterSettings = { type: 'Excel'};
    }
}
