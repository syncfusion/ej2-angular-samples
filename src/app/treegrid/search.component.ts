import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'search.html',
    styleUrls: ['filter.style.css'],
    providers: [ FilterService ],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public searchSettings: Object;
    public toolbar: string[];
    public d1data: Object;
    public ddlfields: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageCount: 5};
        this.searchSettings = { hierarchyMode: 'Parent' };
        this.toolbar = ['Search'];
        this.ddlfields = { text: 'mode' , value: 'id'};
        this.d1data= [ { id: 'Parent', mode: 'Parent' },
                       { id: 'Child', mode: 'Child' },
                       { id: 'Both', mode: 'Both' },
                       { id: 'None', mode: 'None' },]
    }
    change (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.search('');
        this.treegrid.searchSettings.hierarchyMode = mode;
    }

}
