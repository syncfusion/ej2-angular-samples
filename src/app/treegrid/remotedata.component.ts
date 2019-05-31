import { Component , OnInit , ViewChild} from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'remotedata.html'
})
export class RemoteData  implements OnInit {
    public data: DataManager;
    public pageSetting: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data =  new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData', adaptor: new WebApiAdaptor });
        this.pageSetting = { pageCount: 3 };
    }
}