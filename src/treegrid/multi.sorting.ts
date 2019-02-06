import { Component, OnInit, ViewChild } from '@angular/core';
import { sortData } from './jsontreegriddata';
import { TreeGridComponent , SortService} from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'multi.sorting.html',
    providers: [SortService]
    
})
export class SortComponent implements OnInit {
    public data: Object[] = [];
    public pageOption: Object;
    public initialSort: Object;
    public flag: boolean = false;
   // public sortModule;
   

@ViewChild('treegrid')
public treegrid : TreeGridComponent ;
    ngOnInit(): void {
        this.data = sortData;
        this.pageOption = {pageCount: 5};
        this.initialSort = { columns: [{ field: 'Category', direction: 'Ascending' }, { field: 'orderName', direction: 'Ascending' }] };
    }
    public onClicked(e: MouseEvent): void {
      

        let element: HTMLElement = <HTMLInputElement>e.target;
        
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        this.flag = false;
        let sorted : boolean = element.classList.contains('e-ghidden');
        let classFn: Function = sorted ? removeClass : addClass ;
        classFn([element], 'e-ghidden');
        if(sorted){
            this.treegrid.removeSortColumn(element.innerHTML);
        }
        else{
            this.treegrid.sortByColumn(element.innerHTML, 'Ascending', true);
        }
    }
    public dataBound(): void {
        this.flag = true;
    }

}