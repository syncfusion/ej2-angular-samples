import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'selection-api.html',
    styleUrls: ['selection.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectionAPIComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public selectionSettings: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('button1')
    public button1: TreeGridComponent;
    @ViewChild('button2')
    public button2: TreeGridComponent;
    @ViewChild('numerictext1')
    public numerictext1: NumericTextBoxComponent;
    @ViewChild('numerictext2')
    public numerictext2: NumericTextBoxComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.selectionSettings = { type: 'Multiple' };
    }
    onClick(): void {
        let startRow: number = this.numerictext1.value;
        let toRow: number = this.numerictext2.value;
        let rows: number[] = [];
        for ( let i: number = startRow ; i <= toRow ; i++ ) {
            rows.push(i);
        }
        this.treegrid.selectRows(rows);
    };
    onClicked(): void {
        this.treegrid.clearSelection();

    };

}
