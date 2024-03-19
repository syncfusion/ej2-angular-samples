import { Component, OnInit } from '@angular/core';
import { textWrapData } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'autowrap.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent, TreeGridAllModule]
})
export class AutoWrap implements OnInit {
    public data: Object[] = [];
    public pageSetting: Object;
    ngOnInit(): void {
        this.data = textWrapData;
        this.pageSetting = { pageCount: 8 };
    }
}