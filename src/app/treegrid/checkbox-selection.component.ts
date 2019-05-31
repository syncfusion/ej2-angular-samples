import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { PageService} from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'checkbox-selection.html',
    providers: [ PageService ]

})
export class CheckboxSelectionComponent implements OnInit {
    public data: Object[] = [];
    public selectionsettings: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.selectionsettings = { persistSelection: true };
    }
}
