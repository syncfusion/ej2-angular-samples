import { Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { stackedHeaderData } from './data';
import { ColumnModel, ResizeService, SortService, GridModule, PageService, FilterService, ToolbarService, EditService, ColumnChooserService, GridComponent, Column} from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';
import { TreeView } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations'
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common'; 
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'stacked-header.html',
    providers: [ ResizeService, SortService, PageService, FilterService, ToolbarService, EditService, ColumnChooserService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, ButtonModule, TreeViewModule, RatingModule, CommonModule, SBDescriptionComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedHeaderComponent implements OnInit {
    @ViewChild('grid')
    public gridInstance: GridComponent | any;
    @ViewChild('treeview')
    public treeview: TreeView | any;
    @ViewChild('locationTemplate', { static: true }) locationTemplate?: any;
    @ViewChild('feedbackTemplate', { static: true }) feedbackTemplate?: any;
    public data: Object[] = [];
    public orderColumns: ColumnModel[];
    public shipColumns: ColumnModel[];
    public paymentColumns: ColumnModel[];
    public deliveryColumns: ColumnModel[];
    public filterSettings: Object;
    public editSettings: Object;
    public columnChooserSettings?: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public enableRTL: boolean;
    public treeDataFields: Object;

    public ngOnInit(): void {
        this.data = stackedHeaderData;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
        this.columnChooserSettings = { enableSearching: true };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.orderColumns = [
            { field: 'OrderID', headerText: 'ID', textAlign: 'Right', width: 90, minWidth: 90 },
            { field: 'OrderDate', headerText: 'Date', textAlign: 'Right', width: 110, minWidth: 100, format: 'yMd', editType: 'datepickeredit' }
        ];
        this.shipColumns = [
            { field: 'ShipCountry', headerText: 'Country', textAlign: 'Left', width: 115, minWidth: 100, editType: 'dropdownedit', template : this.locationTemplate, validationRules: { required: true } },
            { field: 'Freight', headerText: 'Charges', textAlign: 'Right', width: 130, minWidth: 100, format: 'C2', editType: 'numericedit', validationRules: { required: true, number: true } },
        ];
        this.deliveryColumns = [
            { field: 'Status', headerText: 'Status', textAlign: 'Center', width: 110, minWidth: 100, editType: 'dropdownedit', validationRules: { required: true, } },
            { field: 'Feedback', headerText: 'Feedback', allowResizing: false, textAlign: 'Center', width: 130, minWidth: 100, template : this.feedbackTemplate, editType: 'numericedit', validationRules: { required: true, min: 0, max: 5 } }
        ];
    }

    columnChooserSubmit() {
        const checkedElements: any = [];
        const uncheckedElements: any = [];
        var showColumns = this.gridInstance.getVisibleColumns().filter(function (column: any) { return (column.showInColumnChooser === true); });
        showColumns = showColumns.map(function (col: any) { return col.headerText; });
        const treeItems = document.querySelectorAll('.e-list-item');
    
        treeItems.forEach(item => {
          const itemDetails = this.treeview.getNode(item);
          if (!itemDetails.hasChildren) {
            if (item.getAttribute('aria-checked') === 'true') {
              checkedElements.push(itemDetails.text);
            } else {
              uncheckedElements.push(itemDetails.text);
            }
          }
        });
        showColumns = showColumns.filter((col: any) => !uncheckedElements.includes(col));
        checkedElements.forEach(item => {
          if (!showColumns.includes(item)) {
            showColumns.push(item);
          }
        });
        var columnsToUpdate = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
        this.gridInstance.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    };
    
    columnChooserClose() {
        this.gridInstance.columnChooserModule.hideDialog();
    };  

    dataProcess(columns: any) {
        const parentNodes = [
          { id: 1, name: 'Order Details', hasChild: true, expanded: true },
          { id: 2, name: 'Shipping Details', hasChild: true, expanded: true },
          { id: 3, name: 'Delivery Status', hasChild: true, expanded: true },
        ];
        let treeData = [];
        if (columns && columns.length) {
          treeData = columns.map((column: any) => {
            let parentId: number;
            switch (column.field) {
              case 'OrderID':
              case 'OrderDate':
                parentId = 1;
                break;
              case 'ShipCountry':
              case 'Freight':
                parentId = 2;
                break;
              case 'Status':
              case 'Feedback':
                parentId = 3;
                break;
              default :
                break;
            }
            return {
              id: column.uid,
              name: column.headerText,
              pid: parentId,
              isChecked: column.visible
            };
          });
          const uniquePids: string[] = [];
          treeData.forEach((item: any) => {
            if (!uniquePids.includes(item.pid)) {
              uniquePids.push(item.pid);
            }
          });
          const filteredParents = parentNodes.filter((parent: any) => uniquePids.includes(parent.id));
          treeData.push(...filteredParents);
        } else {
          treeData = [];
        }
        this.enableRTL = this.gridInstance && this.gridInstance.enableRtl ? true : false;
        return { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    };
    
    nodeCheck(args: any) {
      let checkedNode = [args.node];
      if (args.event.target.classList.contains('e-fullrow') || args.event.key === "Enter") {
          let getNodeDetails = this.treeview.getNode(args.node);
          if (getNodeDetails.isChecked === 'true') {
            this.treeview.uncheckAll(checkedNode);
          } else {
            this.treeview.checkAll(checkedNode);
          }
      }
    }

    queryCellInfo(args: any) :void {
      if (args.column.field === 'Status') {
        if (args.data['Status'] === 'Delivered') {
            args.cell.classList.remove('e-inprogress');
            args.cell.classList.add('e-delivered');
        } else {
            args.cell.classList.remove('e-delivered');
            args.cell.classList.add('e-inprogress');
        }
      }
    }

    beforeOpenColumnChooser(args: any) :void {
      this.treeDataFields = this.dataProcess(args.columns);
    }

    actionBegin(args: any) :void {
      if (args.requestType === 'columnChooserSearch') {
        const searchVal = (document.querySelector('.e-ccsearch') as any).value;
        let searchedColumns: Column[];
        if (searchVal) { 
            searchedColumns = new DataManager((args.columns as Object[]) as JSON[]).executeLocal(new Query()
            .where('headerText', "startswith", searchVal, true, true)) as Column[];
        } else {
            searchedColumns = args.columns;
        }
        this.treeDataFields = this.dataProcess(searchedColumns);
      }
    }
}
    
