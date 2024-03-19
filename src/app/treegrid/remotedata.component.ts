import { Component , OnInit , ViewChild} from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'remotedata.html',
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RemoteData  implements OnInit {
    public data: DataManager;
    public pageSetting: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data =  new DataManager({ url: 'https://services.syncfusion.com/angular/production/api/SelfReferenceData', adaptor: new WebApiAdaptor });
        this.pageSetting = { pageCount: 3 };
    }
}
