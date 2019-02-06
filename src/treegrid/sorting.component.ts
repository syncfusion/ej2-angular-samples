import { Component, OnInit, ViewChild } from '@angular/core';
import { sortData } from './jsontreegriddata';
import { TreeGridComponent , SortService} from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'sorting.html',
    providers: [SortService]
    
})
export class SortComponent implements OnInit {
    public data: Object[] = [];
    public sortSettings: Object;
  
@ViewChild('treegrid')
public treegrid : TreeGridComponent ;
@ViewChild('orderName')
public orderName: CheckBoxComponent;
@ViewChild('category')
public category: CheckBoxComponent;
@ViewChild('orderDate')
public orderDate: CheckBoxComponent;
@ViewChild('units')
public units: CheckBoxComponent;
@ViewChild('price')
public price: CheckBoxComponent;
    ngOnInit(): void {
        this.data = sortData;
        this.sortSettings =  { columns: [{ field: 'Category', direction: 'Ascending'  }, 
                                         { field: 'orderName', direction: 'Ascending' }]
                             }
    }
    public onClick1(e: MouseEvent): void {
        if (this.orderName.checked) {
            this.treegrid.sortByColumn('orderName', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('orderName');
        }

    }
    public onClick2(e: MouseEvent): void {
        if (this.category.checked) {
            this.treegrid.sortByColumn('Category', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('Category');
        }

    }
    public onClick3(e: MouseEvent): void {
        if (this.orderDate.checked) {
            this.treegrid.sortByColumn('orderDate', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('orderDate');
        }

    }
    public onClick4(e: MouseEvent): void {
        if (this.units.checked) {
            this.treegrid.sortByColumn('units', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('units');
        }

    }

    public sort (args: SortEventArgs ): void {
        if (args.requestType === 'sorting') {
            for (let columns of this.treegrid.getColumns()) {
                for (let sortcolumns of this.treegrid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        this.check(sortcolumns.field, true); break;
                    } else {
                        this.check(columns.field, false);
                    }
                }
            }
        }

    }
    public check(field: string, state: boolean): void {
        switch (field) {
            case 'orderName':
                this.orderName.checked = state; break;
            case 'Category':
                this.category.checked = state; break;
            case 'orderDate':
                this.orderDate.checked = state; break;
            case 'units':
                this.units.checked = state; break;
            case 'price':
                this.price.checked = state; break;
        }
    }


}