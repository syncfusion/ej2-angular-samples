import { Component } from '@angular/core';
import { inventoryData } from './data';
import { GridModule, PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-gridcontainer',
    templateUrl: 'auto-wrap.html',
    providers: [PageService, FilterService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class AutoWrapComponent {
    public data: Object[] = inventoryData;
    public pageSettings: Object = { pageCount: 5 };
    public filterSettings: Object = { type: 'Menu' };
}