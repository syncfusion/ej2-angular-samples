import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { PageService} from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'checkbox-column.html',
    providers: [ PageService ]

})
export class CheckboxColumnComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = sampleData;
    }
}
