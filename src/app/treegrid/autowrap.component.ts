import { Component, OnInit } from '@angular/core';
import { wrapData } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TreeGridAllModule, FilterService, SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'autowrap.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent, TreeGridAllModule],
    providers:[FilterService, SortService]
})
export class AutoWrap implements OnInit {
    public data: Object[] = [];
    public pageSetting: Object;
    public filterSettings: Object;
    ngOnInit(): void {
        this.data = wrapData;
        this.filterSettings= {type:'Excel', heirarchyMode:'Parent'};
        this.pageSetting = { pageCount: 8 };
    }
}