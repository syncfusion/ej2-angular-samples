import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { PageService, TreeGridAllModule} from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'checkbox-column.html',
    providers: [ PageService ],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]

})
export class CheckboxColumnComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = sampleData;
    }
}
