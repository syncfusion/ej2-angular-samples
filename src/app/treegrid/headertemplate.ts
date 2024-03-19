import { Component, OnInit, ViewChild } from '@angular/core';
import { headerData } from './jsontreegriddata';
import { TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'headertemplate.html',
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeaderTemplateComponent implements OnInit {
    public data: Object[] = [];
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = headerData;
    }
}
