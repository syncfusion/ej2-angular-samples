import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { GridComponent, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';

const SERVICE_URI: string = 'https://services.syncfusion.com/angular/production/';

@Component({
    selector: 'ej2-griddatabind',
    templateUrl: 'remote-data.html',
    styleUrls: ['remote-data.style.css'],
    providers: [PageService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, SwitchAllModule],
    encapsulation: ViewEncapsulation.None,
})
export class DataBindingComponent implements OnInit {
    public data: DataManager;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI + 'api/Orders', adaptor: new WebApiAdaptor });
    }

    public cacheModeChange(args): any {
        this.grid.dataSource = new DataManager({
            url: SERVICE_URI + 'api/Orders',
            adaptor: new WebApiAdaptor,
            enableCache : args.checked
        });
    }
}
