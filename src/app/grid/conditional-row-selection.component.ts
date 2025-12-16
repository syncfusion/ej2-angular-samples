import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ordersTrackData } from './data';
import { EditService, VirtualScrollService, ToolbarService, SelectionService, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'conditional-row-selection.html',
    styleUrls: ['conditional-row-selection.style.css'],
    providers: [SelectionService, SortService, EditService, VirtualScrollService, ToolbarService, PageService, FilterService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ConditionalRowSelectionComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    public filterSettings: Object;
    public editSettings: Object;
    public toolbar: string[];

    public ngOnInit(): void {
        this.data = ordersTrackData;
        this.selectOptions = { persistSelection: true, checkboxOnly: true };
        this.filterSettings = { type: 'Excel'};
        this.toolbar = ['Edit', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true };
    }

    isRowSelectable(data: Object): boolean {
        if ((<{ Status?: string }>data).Status === "Canceled" || (<{ Status?: string }>data).Status === "Delivered") {
            return false;
        }
        return true;
    }
}