import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { stackedData } from './jsontreegriddata';
import { TreeGridAllModule, TreeGridComponent, PageService, ToolbarService, ColumnChooserService } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TreeViewModule, TreeView } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'stackedheader.html',
    styleUrls: ['stackedheader.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule, TreeViewModule, NgIf ],
    providers: [PageService, ToolbarService, ColumnChooserService],
})
export class StackedHeaderComponent implements OnInit {
    public data: Object[] = [];
    public orderColumns: Object[];
    public shipColumns: Object[];
    public priceColumns: Object[];
    public columnChooserSettings?: Object;
   
    @ViewChild('stackedHeadertreegrid')
    public treegrid?: TreeGridComponent | any;
    @ViewChild('treeview')
    public treeview?:TreeView | any;
    public toolbar?: string[];
    ngOnInit(): void {
        this.data = stackedData;
        this.toolbar = ['ColumnChooser'],
        this.columnChooserSettings = { enableSearching : true},
        this.orderColumns = [
            { field: 'orderID', headerText: 'Order ID', textAlign: 'Right', width: 90, showInColumnChooser: false },
            { field: 'orderName', headerText: 'Order Name', textAlign: 'Left', width: 220 },
            { field: 'orderDate', headerText: 'Order Date', textAlign: 'Right', width: 120, format: 'yMd'}
        ];
        this.shipColumns = [
            { field: 'shipMentCategory', headerText: 'Shipment Category', textAlign: 'Left', width: 150 },
            { field: 'shippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 120, format: 'yMd' },
            { field: 'units', headerText: 'Units', textAlign: 'Right', width: 80 }
        ];
        this.priceColumns = [
            { field: 'unitPrice', headerText: 'Price per unit', format: 'C0', type: 'number', width: 120, textAlign: 'Right' },
            { field: 'price', headerText: 'Total Price', width: 110, format: 'C0', type: 'number', textAlign: 'Right' }
        ];
    }
    
   
    // Apply the column chooser selection
    columnChooserSubmit() {
        const treeGridInstance = (document.getElementById('TreeGrid') as any).ej2_instances[0];
        const checkedElements: any = [];
        const uncheckedElements: any = [];
        var showColumns = treeGridInstance.getVisibleColumns().filter(function (column: any) { return (column.showInColumnChooser === true); });
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
    checkedElements.forEach((item: any) => {
      if (!showColumns.includes(item)) {
        showColumns.push(item);
      }
    });
    var columnsToUpdate = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
    treeGridInstance.grid.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    };
    columnChooserClose() {
      const treeGridInstance = (document.getElementById('TreeGrid') as any).ej2_instances[0];
      treeGridInstance.grid.columnChooserModule.hideDialog();
    };
    
  // Render TreeView in the column chooser's Content
  dataProcess(args: any) {
    
    const parentNodes = [
      { id: 1, name: 'Order Details', hasChild: true, expanded: true },
      { id: 2, name: 'Shipping Details', hasChild: true, expanded: true },
      { id: 3, name: 'Price Details', hasChild: true, expanded: true },
    ];
    let treeData = [];
    if (args.columns && args.columns.length) {
      treeData = args.columns.map((column: any) => {
        let parentId: number = 0;
        switch (column.field) {
          case 'orderName':
          case 'orderDate':
            parentId = 1;
            break;
          case 'shipMentCategory':
          case 'shippedDate':
          case 'units':
            parentId = 2;
            break;
          case 'unitPrice':
          case 'price':
            parentId = 3;
            break;
          default:
            break;
        }
        return {
          id: column.uid,
          name: column.headerText,
          pid: parentId,
          isChecked: column.visible
        };
      });
      const uniquePids: any[] = [];
      treeData.forEach((item: any) => {
        if (!(uniquePids as any).includes(item.pid)) {
          uniquePids.push(item.pid);
        }
      });
      const filteredParents = parentNodes.filter((parent: any) => (uniquePids as any).includes(parent.id));
      treeData.unshift(...filteredParents);
    } else {
      treeData = [];
    }
    
    const fields = { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    return fields;
  };    
  // Handle checking/unchecking nodes in the TreeView (column chooser)
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
}
