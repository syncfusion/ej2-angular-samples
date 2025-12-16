import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { supportData } from './data';
import { VirtualScrollService, SelectionService, ContextMenuItem, ContextMenuService, SortService, GridModule, PageService, FilterService, FreezeService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej2-grid-frozen',
    templateUrl: 'pinned-rows.html',
    styleUrls: ['pinned-rows.style.css'],
    providers: [SelectionService, SortService, VirtualScrollService, PageService, ContextMenuService, FilterService, FreezeService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent, NgIf]
})
export class PinnedRowsComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    public filterSettings: Object;
    public pageSettings: Object;
    public contextMenuItems: ContextMenuItem[];
    public ngOnInit(): void {
        this.data = supportData;
        this.filterSettings = { type: 'Excel'};
        this.pageSettings = { pageSize: 20 };
        this.contextMenuItems = ['PinRow', 'UnpinRow'];
    }

    isRowPinned(data: Object): boolean {
        if (data && ((<{ Rating?: string }>data).Rating === "Very Dissatisfied" || (<{ Rating?: string }>data).Rating === 'Dissatisfied')) {
            return true;
        }
        return false;
    }
}