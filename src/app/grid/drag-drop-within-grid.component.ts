import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { RowDDService, SelectionService, GroupService, SortService, GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'drag-drop-within-grid.html',
    providers: [RowDDService,
        SelectionService, GroupService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, DialogModule, SBDescriptionComponent]
})
export class DragWithinSingle implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    public alertHeader: string = 'Grouping';
    public hidden: Boolean = false;
    public target: string = '.control-section';
    public alertWidth: string = '300px';
    public alertContent: string = 'Grouping is disabled for this column';
    public showCloseIcon: Boolean = false;
    public animationSettings: Object = { effect: 'None' };
    public alertDlgBtnClick = () => {
        this.alertDialog.hide();
    }
    public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    public data: Object[] = [];
    public selectOptions: Object;

    ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
    }
    created() {
        this.grid.on("columnDragStart", this.columnDragStart, this);
    }
    public columnDragStart(args: any) {
        if(args.column.field === "ShipCountry"){
            this.alertDialog.show();
       }
    }
}
