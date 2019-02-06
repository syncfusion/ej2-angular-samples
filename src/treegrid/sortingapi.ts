import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, SortService} from '@syncfusion/ej2-angular-treegrid';
import { SortDirection } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'sortingapi.html',
    providers:[SortService]
})
export class SortingAPIComponent implements OnInit {
    public data: Object[] = [];
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
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [{ id: 'taskID', name: 'Task ID' }, {id: 'taskName', name: 'Task Name'}, 
          {id: 'duration', name: 'Duration'}, {id: 'progress', name: 'Progress'} ],
        this.d2data= [{ id: 'Ascending', name: 'Ascending' }, {id: 'Descending', name: 'Descending'},],
        this.fields = { text: 'name' , value: 'id'}
    }
    onClicked(): void {
        let columnName: string = <string>this.dropdown1.value;
        let sortType: string = <string>this.dropdown2.value;
        this.treegrid.sortByColumn(columnName, <SortDirection>sortType, false);
    };
    public clicked(e: MouseEvent): void {
        this.treegrid.clearSorting();
    }


};