import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDataSource } from './data';
import { GroupService, SortService, GridComponent, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


@Component({
    selector: 'ej-gridgroup',
    templateUrl: 'grouping.html',
    providers: [GroupService, ToolbarService, SortService, EditService]
})
export class GroupComponent implements OnInit {
    public data: Object[];
    public groupOptions: Object;
    public pageSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public formatoptions: Object;
    public refresh: Boolean;
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
    ngOnInit(): void {
        this.data = orderDataSource;
        this.groupOptions = { showGroupedColumn: false, columns: ['ShipCountry'] };
        this.pageSettings = { pageCount: 5 };
        this.editSettings = { allowEditing: true };
        this.toolbar = ['Edit', 'Update', 'Cancel'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules = { required: true };
        this.editparams = { params: { popupHeight: '300px' } };
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }
    }
    dataBound() {
        if(this.refresh){
            this.grid.groupColumn('ShipCountry');
            this.refresh =false;
        }
    }
    load() {
        this.refresh = (<any>this.grid).refreshing;
    }
    created() {
        this.grid.on("columnDragStart", this.columnDragStart, this);
    }
    public columnDragStart(args: any) {
        if(args.column.field === "OrderDate"){
            this.alertDialog.show();
       }
    }
}