import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './jsontreegriddata';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'gridlines.html',
    styleUrls: ['gridlines.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridLinesComponent implements OnInit {
    public data: Object[];
    public lines: any;
    public pageSettings: Object;
    public d1data: Object;
    public ddlfields: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['gridlines.style.css'];
    }

    public ngOnInit(): void {
       this.data = sampleData;
       this.lines = 'Vertical';
       this.pageSettings = { pageSize: 10 };
       this.ddlfields = { text: 'type' , value: 'id'};
       this.d1data= [{ id: 'Horizontal', type: 'Horizontal' },
                     { id: 'Vertical', type: 'Vertical' },
                     { id: 'Both', type: 'Both' },
                     { id: 'None', type: 'None' }]
    }
    change (e: ChangeEventArgs) : void {
        let lines: any = <string>e.value;
        this.treegrid.gridLines = lines;
        this.treegrid.refresh();
    }

}
