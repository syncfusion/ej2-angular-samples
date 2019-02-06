import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

const SERVICE_URI: string = 'https://ej2services.syncfusion.com/production/web-services/';

@Component({
    selector: 'ej2-griddatabind',
    templateUrl: 'remote-data.html'
})
export class DataBindingComponent implements OnInit {
    public data: DataManager;
    public pageSettings: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI + 'api/Orders', adaptor: new WebApiAdaptor });
        this.pageSettings = { pageCount: 3 };
    }
}