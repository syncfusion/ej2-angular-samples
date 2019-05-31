import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'selection.html'
})
export class SelectionComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public selectionSettings: Object;
    public d1data: Object;
    public fields1: Object;
    public d2data: Object;
    public fields2: Object;
    public d3data: Object;
    public fields3: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;

    @ViewChild('dropdown2')
    public dropdown2: DropDownListComponent;

    @ViewChild('dropdown3')
    public dropdown3: DropDownListComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.selectionSettings = { type: 'Multiple' };
        this.fields1 = { text: 'type' , value: 'id'};
        this.d1data= [{ id: 'Single', type: 'Single' },
                      { id: 'Multiple', type: 'Multiple' }],
        this.fields2 = { text: 'mode' , value: 'id'};
        this.d2data= [{ id: 'Row', mode: 'Row' },
                      { id: 'Cell', mode: 'Cell' },],
        this.fields3 = { text: 'mode' , value: 'id'};
        this.d3data= [{ id: 'Flow', mode: 'Flow' },
                      { id: 'Box', mode: 'Box' }]

    }
    change1 (e: ChangeEventArgs) : void {
        let type: any = <string>e.value;
        let mode: any = <string>this.dropdown2.value;
        this.treegrid.selectionSettings.type = type;
        if ( type === 'Multiple' && mode === 'Cell' ) {
            document.getElementById('cellselection').style.display = 'table-row';
        } else {
            document.getElementById('cellselection').style.display = 'none';
        }
    }
    change2 (e: ChangeEventArgs) : void {
        let mode: any = e.value;
            let type: any = <string>this.dropdown1.value;
            this.treegrid.selectionSettings.mode = mode;
            if ( type === 'Multiple' && mode === 'Cell' ) {
                document.getElementById('cellselection').style.display = 'table-row';
            } else {
                document.getElementById('cellselection').style.display = 'none';
            }
    }
    change3 (e: ChangeEventArgs) : void {
        let cellmode: any = <string>e.value;
        this.treegrid.selectionSettings.cellSelectionMode = cellmode;
    }
}
