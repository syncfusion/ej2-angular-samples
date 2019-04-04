import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { GridLine, GridComponent } from '@syncfusion/ej2-angular-grids';
import { customerData } from './data';

@Component({
    selector: 'ej-gridlines',
    templateUrl: 'grid-lines.html',
    styleUrls: ['./grid-lines.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GridLinesComponent implements OnInit {
    public data: Object[];
    public lines: GridLine;

    @ViewChild('grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['grid-lines.style.css'];
    }

    public ngOnInit(): void {
       this.data = customerData;
       this.lines = 'Default';
    }

    public onClicked(e: HTMLElement): void {
        let element: HTMLElement = e;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.lines = <GridLine>element.innerHTML;
        this.grid.renderModule.refresh();
    }

}