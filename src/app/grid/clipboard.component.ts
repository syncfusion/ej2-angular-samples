import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


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
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    public alertHeader: string = 'Copy with Header';
    public hidden: Boolean = false;
    public target: string = '.control-section';
    public alertWidth: string = '300px';
    public alertContent: string = 'Atleast one row should be selected to copy with header';
    public showCloseIcon: Boolean = false;
    public animationSettings: Object = { effect: 'None' };
    public toolbar: Object[];
    public alertDlgBtnClick = () => {
        this.alertDialog.hide();
    }
    public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
        this.toolbar = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
        { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    }

    clickHandler(args: ClickEventArgs): void {
        if(this.grid.getSelectedRecords().length>0) {
            let withHeader: boolean = false;
            if (args.item.id === 'copyHeader') {
                withHeader = true;
            }
            this.grid.copy(withHeader);
        } else {
            this.alertDialog.show();
        }
    }
}