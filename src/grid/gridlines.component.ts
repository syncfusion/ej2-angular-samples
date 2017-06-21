import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base/dom';
import { GridLine, GridComponent } from '@syncfusion/ej2-ng-grids';
import { customerData } from './data';

@Component({
    selector: 'ej-gridlines',
    templateUrl: 'gridlines.html',
    styleUrls: ['./gridlines.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridLinesComponent implements OnInit {
    public data: Object[];
    public lines: GridLine;

    @ViewChild('grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['gridlines.style.css'];
    }

    public ngOnInit(): void {
       this.data = customerData.slice(0, 10);
       this.lines = 'default';
    }

    public onClicked(e: HTMLElement): void {
        let element: HTMLElement = e;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.lines = <GridLine>element.innerHTML.toLowerCase();
        this.grid.renderModule.refresh();
    }

}