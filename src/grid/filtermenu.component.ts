import { Component, ViewChild, OnInit } from '@angular/core';
import { data } from './data';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filtermenu.html',
    providers: [FilterService]
})
export class FilteringMenuComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public filterSettings: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = data;
        this.pageSettings = { pageCount: 8 };
        this.filterSettings = { type: 'menu' };
    }
    public onClicked(e: HTMLElement): void {
        let element: HTMLElement = e;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        document.getElementsByClassName('e-ghidden')[0].classList.remove('e-ghidden');
        element.parentElement.parentElement.classList.add('e-ghidden');
        this.grid.filterSettings.type = <FilterType>element.innerHTML.toLowerCase();
		this.grid.clearFiltering();
    }
}