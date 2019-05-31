import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'filtermenu.html',
    styleUrls: ['filter.style.css'],
    providers: [ FilterService ],
    encapsulation: ViewEncapsulation.None
})
export class FilteringMenuComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public filterSettings: Object;
    public d1data: Object;
    public ddlfields: Object;
    public d2data: Object;
    public typefields: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('dropdown2')
    public dropdown2: DropDownListComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['filter.style.css'];
    }

    
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.filterSettings = { type: 'Menu', hierarchyMode: 'Parent' };
        this.ddlfields = { text: 'mode' , value: 'id'};
        this.typefields = { text: 'mode' , value: 'id'};
        this.d1data= [ { id: 'Parent', mode: 'Parent' },
                       { id: 'Child', mode: 'Child' },
                       { id: 'Both', mode: 'Both' },
                       { id: 'None', mode: 'None' },]
        this.d2data= [ { id: 'Menu', mode: 'Menu' },
                       { id: 'Excel', mode: 'Excel' }]
    }
    onChange (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.filterSettings.hierarchyMode = mode;
        this.treegrid.clearFiltering();
    }
        change (e: ChangeEventArgs) : void {
        let type: any = <string>e.value;
        this.treegrid.filterSettings.type = type;
        this.treegrid.clearFiltering();
    }
   
}
