import { Component , OnInit , ViewChild} from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent, TreeGridAllModule, VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'remotevirtual.html',
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent],
     providers: [VirtualScrollService],
})
export class RemoteVirtualComponent  implements OnInit {
   public data: DataManager;
  public pageSetting: Object;

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

  ngOnInit(): void {
    this.data = new DataManager({
      url: 'https://services.syncfusion.com/angular/production/api/TreeUrlDataSource',
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    });
    this.pageSetting = { pageSize: 20 };
  }
}
