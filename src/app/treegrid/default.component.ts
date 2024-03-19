import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService, TreeGridModule} from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default.html',
    providers: [ PageService ],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]

})
export class DefaultComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = sampleData;
    }
}
