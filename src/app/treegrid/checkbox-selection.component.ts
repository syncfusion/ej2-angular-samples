import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { PageService, TreeGridAllModule} from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'checkbox-selection.html',
    providers: [ PageService ],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]

})
export class CheckboxSelectionComponent implements OnInit {
    public data: Object[] = [];
    public selectionsettings: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.selectionsettings = { persistSelection: true };
    }
}
