import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';



@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'cellalignment.html'
})
export class CellAlignmentComponent implements OnInit {
    public data: Object[] = [];
    public d1data: Object;
    public ddlfields: Object;
    public d2data: Object;
    public fields: Object;
    public pageSettings: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('dropdown2')
    public dropdown2: DropDownListComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [{ id: 'taskID', name: 'Task ID' }, {id: 'startDate', name: 'Start Date'}, 
          {id: 'duration', name: 'Duration'}, {id: 'progress', name: 'Progress'} ],
        
        this.d2data= [{ id: 'Right', name: 'Right' }, {id: 'Left', name: 'Left'},
           {id: 'Center', name: 'Center'}, {id: 'Justify', name: 'Justify'} ],
        
        this.fields = { text: 'name' , value: 'id'};
        this.pageSettings = { pageSize: 10 };
    }
   public onChange(e: ChangeEventArgs): void {
       let columnName: string = <string>e.value;
       let alignment: any = this.treegrid.getColumnByField(columnName).textAlign;
       this.dropdown2.value = alignment;
    }
    public change(e: ChangeEventArgs): void {
        let alignment: any = e.value;
        let columnName: string = <string>this.dropdown1.value;
        this.treegrid.getColumnByField(columnName).textAlign = alignment;
        this.treegrid.refreshColumns();
     }
}
