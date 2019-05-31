import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ReorderService } from '@syncfusion/ej2-angular-treegrid';
import { TreeGridComponent, Column } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-grids';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'reorder.html',
    providers: [ReorderService]
})
export class ColumnReorderComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public d1data: Object;
    public ddlfields: Object;
    public d2data: Object;
    public fields: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('dropdown2')
    public dropdown2: DropDownListComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 8 };
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [       { id: 'taskID', name: 'Task ID' },
                             { id: 'taskName', name: 'Task Name' },
                             { id: 'startDate', name: 'Start Date' },
                             { id: 'duration', name: 'Duration' },
                             { id: 'progress', name: 'Progress' }],
        this.d2data= [        { id: '0', name: '1' },
                              { id: '1', name: '2' },
                              { id: '2', name: '3' },
                              { id: '3', name: '4' },
                              { id: '4', name: '5' }],
        this.fields = { text: 'name' , value: 'id'}
    }
    public onChange(e: ChangeEventArgs): void {
        let columnName: string = <string>e.value;
        let index: number = this.treegrid.getColumnIndexByField(columnName);
        this.dropdown2.value = index.toString();
     }
     public change(e: ChangeEventArgs): void {
        let columnName: string = <string>this.dropdown1.value;
        let toColumnIndex: number = <number>e.value;
        this.treegrid.reorderColumns(columnName, (<Column>this.treegrid.columns[toColumnIndex]).field);
      }
     public actionComplete (args: ActionEventArgs): void {
        if (args.requestType === 'reorder') {
            let columnName: string = <string>this.dropdown1.value;
            let index: number = this.treegrid.getColumnIndexByField(columnName);
            this.dropdown2.value = index.toString();
        }

    }
}