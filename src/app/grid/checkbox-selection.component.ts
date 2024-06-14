import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { EditService, ToolbarService, SelectionService, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'checkbox-selection.html',
    providers: [SelectionService, SortService, EditService, ToolbarService, PageService, FilterService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CheckboxSelectionComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    public filterSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { persistSelection: true };
        this.filterSettings = { type: 'Excel'};
        this.toolbar = ['Delete'];
        this.editSettings = { allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }
}