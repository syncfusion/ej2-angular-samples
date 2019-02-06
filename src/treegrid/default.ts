import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService} from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default.html',
    providers: [ PageService ]

})
export class DefaultComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = sampleData;
    }
}
