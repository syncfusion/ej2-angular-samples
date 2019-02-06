import { Component, OnInit, ViewChild } from '@angular/core';
import { formatData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListComponent , ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columnformatting.html'
})
export class ColumnFormattingComponent implements OnInit {
    public data: Object[] = [];
    public d1data: Object;
    public ddlfields: Object;
    public d2data: any;
    public d3data: any;
    public pageSettings: Object;
    public format: Object;
    public fields: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    @ViewChild('dropdown2')
    public dropdown2: DropDownListComponent;
    ngOnInit(): void {
        this.data = formatData;
        this.format = { format: 'M/d/yyyy', type: 'date'};
        this.pageSettings= { pageCount: 5 },
        this.ddlfields = { text: 'name' , value: 'id'};
        this.d1data= [{ id: 'price', name: 'Price' }, {id: 'orderDate', name: 'Order Date'}],
        this.d2data= [{ id: 'n2', format: 'n2' }, {id: 'n3', format: 'n3'},
           {id: 'c2', format: 'c2'}, {id: 'c3', format: 'c3'},
           {id: 'p2', format: 'p2'}, {id: 'p3', format: 'p3'} ],
        this.d3data= 
        [{ id: 'M/d/yyyy', format: 'Short Date' },
        { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
        { id: 'MMMM, yyyy', format: 'Month/Year' },
        { id: 'MMMM, dd', format: 'Month/Day' } ],
        this.fields = { text: 'format' , value: 'id'};
    }
    public onChange(e: ChangeEventArgs): void {
        let columnName: string = <string> e.value;
        if ( columnName === 'price' ) {
            this.dropdown2.dataSource = this.d2data;
            this.dropdown2.value = "n2";
        }
        if ( columnName === 'orderDate' ) {
            this.dropdown2.dataSource = this.d3data;
            this.dropdown2.value = "M/d/yyyy";
            
        }
      //  this.dropdown2.index = 0;
     }
     public change(e: ChangeEventArgs): void {
        let formatval: any = <string> e.value;
        let columnName: string = <string> this.dropdown1.value;
        if ( columnName === 'price' ) {
            this.treegrid.getColumnByField( columnName ).format =  formatval;
        }
        if ( columnName === 'orderDate' ) {
            this.treegrid.getColumnByField( columnName ).format = { format : formatval, type: 'date' };
        }
        this.treegrid.refreshColumns();
    }
     
}
