import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService, GridComponent } from '@syncfusion/ej2-angular-grids';
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
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
        this.toolbar = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
        { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    }

    clickHandler(args: ClickEventArgs): void {
        let withHeader: boolean = false;
        if (args.item.id === 'copyHeader') {
            withHeader = true;
        }
        this.grid.copy(withHeader);
    }
}