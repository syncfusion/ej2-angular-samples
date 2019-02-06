import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ResizeService} from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'resizing.html',
    providers:[ ResizeService ]

})
export class ResizingComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
    }
}
