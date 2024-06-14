import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { GridLine, GridComponent, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { customerData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridlines',
    templateUrl: 'grid-lines.html',
    styleUrls: ['./grid-lines.style.css'],
    providers: [SortService, PageService, FilterService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, GridModule, SBDescriptionComponent]
})
export class GridLinesComponent implements OnInit {
    public data: Object[];
    public lines: GridLine;
    public filterSettings: Object;
    @ViewChild('grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['grid-lines.style.css'];
    }

    public ngOnInit(): void {
       this.data = customerData;
       this.lines = 'Default';
       this.filterSettings = { type: 'Excel' };
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