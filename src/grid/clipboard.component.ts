import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { data } from './data';
import { SelectionService, GridComponent } from '@syncfusion/ej2-ng-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'ej-gridclipboard',
    templateUrl: 'clipboard.html',
    providers: [SelectionService],
    encapsulation: ViewEncapsulation.None
})
export class ClipboardComponent implements OnInit {
    public data: Object[];
    public selectOptions: Object;
    @ViewChild('grid')
    public grid: GridComponent;
    public toolbar: Object[];
    public ngOnInit(): void {
        this.data = data.slice(0, 30);
        this.selectOptions = { type: 'multiple' };
        this.toolbar = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
            { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    }

    clickHandler(args: ClickEventArgs): void {
        let target: Element = (args.originalEvent.target as HTMLElement).closest('.e-toolbar-item');
        let withHeader: boolean = false;
        if (target.textContent === 'Copy With Header') {
            withHeader = true;
        }
        this.grid.copy(withHeader);
    }
}