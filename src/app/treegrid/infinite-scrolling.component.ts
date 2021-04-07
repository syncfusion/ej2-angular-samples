import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { InfiniteScrollService, TreeGridComponent, PageService } from '@syncfusion/ej2-angular-treegrid';
import {dataSource, virtualData} from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'infinite-scrolling.html',
    encapsulation: ViewEncapsulation.None,
    providers: [InfiniteScrollService, PageService]
})
export class InfiniteScrollingComponent implements OnInit {
    public vData: Object[] = [];
    public pageSettings: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    public ngOnInit(): void {
        if (virtualData.length === 0) {
            dataSource();
        }
        this.vData = virtualData;
        this.pageSettings= { pageSize: 50 };
    }
}