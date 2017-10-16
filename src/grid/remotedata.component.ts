import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-ng-grids';

const SERVICE_URI: string = 'http://services.odata.org/V4/Northwind/Northwind.svc/Products';

@Component({
    selector: 'ej2-griddatabind',
    templateUrl: 'remotedata.html'
})
export class DataBindingComponent implements OnInit {
    public data: DataManager;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI, adaptor: new ODataV4Adaptor });
    }
}