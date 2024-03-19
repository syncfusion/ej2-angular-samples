import { Component, OnInit } from '@angular/core';
import { EditService, FilterService, GroupService, PageService, SortService, ToolbarService, GridModule } from '@syncfusion/ej2-angular-grids';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { orderDetails } from './data';
import { SBDescriptionComponent } from '../common/dp.component';

@Component({
    selector: '',
    templateUrl: 'keyboard-navigation.html',
    providers: [GroupService, SortService, EditService, FilterService, PageService, ToolbarService],
    standalone: true,
    imports: [GridModule, SBDescriptionComponent]
})
export class GridKeyboardNavigationComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public pageSettings: Object;
    public editparams: Object;
    public filterSettings: Object;
    public selectOptions: Object;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        this.toolbar = ['Add', 'Edit', 'Delete','Update','Cancel'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = { pageCount: 5};
        this.filterSettings = {type: 'Menu'};
        this.selectOptions = { type: 'Multiple' };
    }
}