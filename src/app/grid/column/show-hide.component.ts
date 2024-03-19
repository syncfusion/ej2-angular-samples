import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { orderDetails } from './data';
import { GridComponent, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'show-hide.html',
    styleUrls: ['show-hide.style.css'],
    providers: [SortService, PageService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, GridModule, SBDescriptionComponent]
})
export class ShowHideComponent implements OnInit {
    public data: Object[] = [];
    public flag: boolean = false;
    @ViewChild('grid')
    public grid: GridComponent;

    @ViewChild('toolbar')
    public ToolbarInstance: ToolbarComponent;

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
        const visibleColumns: HTMLElement[] = Array.from(this.ToolbarInstance.element.getElementsByClassName('e-tbar-btn-text'))
        .filter((item) => !((item as HTMLElement).classList.contains('e-ghidden'))) as HTMLElement[];
        const isLastVisibleColumn = visibleColumns.length === 1 && visibleColumns[0].parentElement === element.parentElement;

        if (hidden) {
          classFn([element], 'e-ghidden');
          this.grid.showColumns(element.innerHTML);
        } else {
          if (isLastVisibleColumn) {
            alert("At least one column should be visible.");
            this.flag = true;
            return;
          }
          classFn([element], 'e-ghidden');
          this.grid.hideColumns(element.innerHTML);
        }
        this.flag = true;
    }

    public dataBound(): void {
        this.flag = true;
    }
}