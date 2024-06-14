import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService, GridComponent, SortService, GridModule, FilterService, EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';6
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej-gridclipboard',
    templateUrl: 'clipboard.html',
    providers: [SelectionService, SortService, FilterService, EditService, ToolbarService, PageService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, DialogModule, SBDescriptionComponent]
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
    public filterSettings: Object;
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public alertDlgBtnClick = () => {
        this.alertDialog.hide();
    }
    public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
        this.filterSettings = { type: 'Excel' };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
        { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    }

    clickHandler(args: ClickEventArgs): void {
        if (args.item.id === 'copy' || args.item.id === 'copyHeader'){
            if(this.grid.getSelectedRecords().length>0) {
                let withHeader: boolean = args.item.id === 'copyHeader' ? true : false;
                this.grid.copy(withHeader);
            } else {
                this.alertDialog.show();
            }
        }
    }
}