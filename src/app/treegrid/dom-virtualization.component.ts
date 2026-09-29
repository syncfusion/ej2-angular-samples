import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { TreeGridAllModule, DomVirtualizationService, SortService} from '@syncfusion/ej2-angular-treegrid';
import { domVirtualizationData, domVirtualizationDataSource } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'dom-virtualization.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ DomVirtualizationService, SortService],
    standalone: true,
    styleUrls: ['dom-virtualization.style.css'],
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
  export class DomVirtualizationComponent implements OnInit {
    public data: any[] = [];

    public getStatusClass(status: string): string {
        const normalizedStatus: string = (status || '').toLowerCase();
        if (normalizedStatus.indexOf('discontinued') === 0) {
            return 'rg-badge-stock-discontinued';
        }
        if (normalizedStatus.indexOf('low stock') === 0) {
            return 'rg-badge-stock-low';
        }
        if (normalizedStatus.indexOf('out of stock') === 0) {
            return 'rg-badge-stock-out';
        }
        return 'rg-badge-stock-available';
    }

    public ngOnInit(): void {
        console.log(domVirtualizationData.length);
        if (domVirtualizationData.length === 0) {
            domVirtualizationDataSource();
        }
        this.data = domVirtualizationData;
    }
}