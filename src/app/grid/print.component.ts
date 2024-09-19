import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { hierarchyOrderdata, customerData, employeeData } from './data';
import { GridModel, HierarchyGridPrintMode, DetailRowService, SortService, GridModule, ToolbarService, EditService, FilterService } from '@syncfusion/ej2-angular-grids';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'ej2-grid-hierarchyprint',
    templateUrl: 'print.html',
    styleUrls: ['./grid-lines.style.css'],
    providers: [DetailRowService, SortService, ToolbarService, EditService, FilterService],
    standalone: true,
    imports: [ToolbarModule, GridModule, SBActionDescriptionComponent, SBDescriptionComponent],
    encapsulation: ViewEncapsulation.None,
})
export class PrintComponent implements OnInit {
    public data: Object[] = [];
    public childGrid: GridModel;
    public hierarchyPrintMode: HierarchyGridPrintMode;
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public employeeidrules: Object;
    public firstnamerules: Object;
    public gridCssClass: string;

    ngOnInit(): void {
        this.data = employeeData;
        this.hierarchyPrintMode = "All";
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Print'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.employeeidrules = { required: true, number: true };
        this.firstnamerules = { required: true, minLength: 5 };
        this.childGrid = {
            dataSource: hierarchyOrderdata,
            queryString: 'EmployeeID',
            hierarchyPrintMode: "All",
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: customerData,
                queryString: 'CustomerID',
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', width: 75 },
                    { field: 'ContactName', headerText: 'Name', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            }
        };
        this.gridCssClass = document.querySelector('.fluent2-highcontrast')
            ? 'e-print-fluent2-highcontrast'
            : '';
    }
    public onClicked(e: HTMLElement): void {
        let element: HTMLElement = e;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        removeClass([].slice.apply(document.getElementsByClassName('e-ghidden')), 'e-ghidden');
        addClass([element.parentElement.parentElement], 'e-ghidden');
        this.hierarchyPrintMode = this.childGrid.hierarchyPrintMode = <HierarchyGridPrintMode>element.innerHTML;
    }
}