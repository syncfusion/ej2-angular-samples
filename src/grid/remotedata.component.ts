import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-ng-grids';

const SERVICE_URI: string = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Products';

@Component({
    selector: 'ej2-griddatabind',
    templateUrl: 'remotedata.html'
})
export class DataBindingComponent implements OnInit {
    public data: DataManager;
    public pageSettings: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI, adaptor: new ODataAdaptor });
        this.pageSettings = { pageCount: 5 };
    }
}