import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { frozenSampleData } from './jsontreegriddata';
import { FreezeService, TreeGridModule, TreeGridComponent, SortService, SelectionService, Column  } from '@syncfusion/ej2-angular-treegrid';
import { freezeDirection} from '@syncfusion/ej2-grids';
import { DropDownListComponent, DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent, DialogModule, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'frozen-api.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ FreezeService, SortService ],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, DialogModule]
})

export class FrozenAPI implements OnInit {
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('columndropdown')
    public columnDropDown: DropDownListComponent;
    @ViewChild('directiondropdown')
    public directionDropDown: DropDownListComponent;
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    public visible: boolean = false;
    public fields: object = { text: 'name', value: 'id' };
    public animationSettings: object = { effect: 'None' };
    public content: string = 'Atleast one Column should be in movable';
    public header: string = 'Frozen';
    public showCloseIcon: boolean = false;
    public target: string = '.control-section';
    public width: string = '300px';
    public data: Object[] = [];
    public refresh: boolean = true;
    public columnData: Object[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'TaskName' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'endDate', name: 'End Date' },
        { id: 'duration', name: 'Duration' },
        { id: 'progress', name: 'Progress' },
        { id: 'priority', name: 'Priority' },
        { id: 'designation', name: 'Designation' },
        { id: 'employeeID', name: 'EmployeeID' },
        { id: 'approved', name: 'Approved'}
    ];
    public directionData: Object[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' }
    ];

    ngOnInit(): void {
        this.data = frozenSampleData;
    }
    public columnChange(e: ChangeEventArgs): void {
        let columnName: string = e.value as string;
        let column: Column = this.treegrid.getColumnByField(columnName);
        let value: string = column.freeze === undefined ? 'Center' : column.freeze;
        this.refresh = this.directionDropDown.value === value;
        this.directionDropDown.value = value;
      }
    
      public directionChange(e: ChangeEventArgs): void {
        if (this.refresh) {
          let columnName: string = this.columnDropDown.value as string;
          let mvblColumns: Column[] = this.treegrid.getMovableColumns();
          if (
            mvblColumns.length === 1 &&
            columnName === mvblColumns[0].field &&
            e.value !== mvblColumns[0].freeze
          ) {
            this.alertDialog.show();
            this.refresh = false;
            this.directionDropDown.value = 'Center';
            this.directionDropDown.refresh();
          } else {
            let columns : Column[] = this.treegrid.getColumns();
            let column = columns.find((col) => col.field === columnName);
            if (column) {
                column.freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
            }
            this.treegrid.columns = columns;
          }
        }
        this.refresh = true;
      }
    
      public alertDialogBtnClick = (): void => {
        this.alertDialog.hide();
      };
    
      public dlgButtons: ButtonPropsModel[] = [
        {
          click: this.alertDialogBtnClick.bind(this),
          buttonModel: { content: 'OK', isPrimary: true }
        }
      ];
}
