import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { addClass, removeClass } from '@syncfusion/ej2-base';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'show-hide.html',
    styleUrls: ['show-hide.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ShowHideComponent implements OnInit {
    public data: Object[] = [];
    public flag: boolean = false;

    @ViewChild('grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['show-hide.style.css'];
    }

    public ngOnInit(): void {
        this.data = orderDetails;
    }

    public onClicked(e: MouseEvent): void {
        if (!this.flag) { return; }

        let element: HTMLElement = <HTMLInputElement>e.target;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        this.flag = false;
        let hidden: boolean = element.classList.contains('e-ghidden');
        let classFn: Function = hidden ? removeClass : addClass;
        classFn([element], 'e-ghidden');

        if (hidden) {
            this.grid.showColumns(element.innerHTML);
        } else {
            this.grid.hideColumns(element.innerHTML);
        }
        this.flag = true;
    }

    public dataBound(): void {
        this.flag = true;
    }
}