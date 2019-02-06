import { Component, OnInit, ViewChild } from '@angular/core';
import { headerData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'headertemplate.html'
})
export class HeaderTemplateComponent implements OnInit {
    public data: Object[] = [];
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = headerData;
    }
}
