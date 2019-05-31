import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'showhide.html',
    styleUrls: ['showhide.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ShowHideComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public d1data: Object;
    public ddlfields: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('button1')
    public button1: ButtonComponent;
    @ViewChild('button2')
    public button2: ButtonComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
    }

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [{ id: 'taskID', name: 'Task ID' },
                      { id: 'startDate', name: 'Start Date' },
                      { id: 'duration', name: 'Duration' },
                      { id: 'progress', name: 'Progress' }]
    }
    
    change (e: ChangeEventArgs) : void {
        let columnName: string = <string>e.value;
        let column  = this.treegrid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.button2.disabled = true;
            this.button1.disabled = false;
        } else {
            this.button1.disabled = true;
            this.button2.disabled = false;
        }
    }
    public clicked(e: MouseEvent): void {
        let columnName: string = <string>this.dropdown1.value;
        let column  = this.treegrid.getColumnByField(columnName);
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
        this.treegrid.grid.showColumns(column.headerText, 'headerText');
        this.button2.disabled = true;
        this.button1.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    }
    onClicked(): void {
        let columnName: string = <string>this.dropdown1.value;
        let column = this.treegrid.getColumnByField(columnName);
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;

        if (this.treegrid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        } else {
            this.treegrid.grid.hideColumns(column.headerText, 'headerText');
            this.button1.disabled = true;
            this.button2.disabled = false;
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    };

}
