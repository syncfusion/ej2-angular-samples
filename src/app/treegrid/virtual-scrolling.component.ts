import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import {dataSource, virtualData} from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'virtual-scrolling.html',
    encapsulation: ViewEncapsulation.None,
    // providers: [VirtualScrollService]
})
export class VirtualScrollingComponent implements OnInit {
    public vData: Object[] = [];

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    public ngOnInit(): void {
        dataSource();
        this.vData = virtualData;
    }
}