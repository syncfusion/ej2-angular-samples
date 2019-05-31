import { Component, OnInit, ViewChild } from '@angular/core';
import { inventoryData } from './data';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


@Component({
    selector: 'ej-gridgroup',
    templateUrl: 'grouping.html',
    providers: [GroupService, SortService]
})
export class GroupComponent implements OnInit {
    public data: Object[];
    public groupOptions: Object;
    public pageSettings: Object;
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
        this.data = inventoryData;
        this.groupOptions = { showGroupedColumn: false, columns: ['Country'] };
        this.pageSettings = { pageCount: 5 };
    }
    dataBound() {
        if(this.refresh){
            this.grid.groupColumn('Country');
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
        if(args.column.field === "Mainfieldsofinvention"){
            this.alertDialog.show();
       }
    }
}