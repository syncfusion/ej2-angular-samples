import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService} from '@syncfusion/ej2-angular-treegrid';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default-paging.html',
    providers: [ PageService ]
})
export class Page implements OnInit {
    public data: Object[] = [];
    public pageSetting: Object;
    
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSetting = { pageCount: 2, pageSizes: true } ;
    }
}