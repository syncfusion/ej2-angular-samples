import { Component, OnInit, ViewChild } from '@angular/core';
import { EditService, ExcelExportService, FilterService, GridComponent, GridModule, LoadEventArgs, PdfExportService, SortService, ToolbarService, VirtualScrollService } from '@syncfusion/ej2-angular-grids';
import { groceryProducts } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
	selector: 'ej2-gridrownumber',
	templateUrl: 'row-number.html',
	providers: [SortService, FilterService, EditService, ToolbarService, VirtualScrollService, PdfExportService, ExcelExportService],
	standalone: true,
	imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class RowNumberComponent implements OnInit {
	public data: Object[] = [];
	public filterSettings: Object;
	public pageSettings: Object;
	public toolbar: string[];
	public editSettings: Object;
	public productRules: Object;
	public stockRules: Object;
	@ViewChild('grid')
	public grid: GridComponent;

	public ngOnInit(): void {
		this.data = groceryProducts;
		this.filterSettings = { type: 'CheckBox' };
		this.pageSettings = { pageSize: 50 };
		this.toolbar = ['Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport'];
		this.editSettings = { allowEditing: true, allowDeleting: true, mode: 'Cell' };
		this.productRules = { required: true };
		this.stockRules = { required: true, min: 0 };
	}
	public onLoad(args: LoadEventArgs): void {
		if (args) {
			args.enableSeamlessScrolling = true;
		}
	}
	toolbarClick(args: ClickEventArgs): void {
		if (args.item.id === 'RowNumber_excelexport') {
			this.grid.excelExport();
		}
		if (args.item.id === 'RowNumber_pdfexport') {
			this.grid.pdfExport();
		}
	}
	actionBegin(args: any): void {
		if (args.requestType === 'save' && args.action === 'add') {

			if (args.data.Category === 'Beverages' ||
				args.data.Category === 'Dairy Products') {
				args.data.Unit = 'Litre';
			}
			else if (
				args.data.Category === 'Fruits' ||
				args.data.Category === 'Vegetables' ||
				args.data.Category === 'Nuts' ||
				args.data.Category === 'Rices'
			) {
				args.data.Unit = 'Kg';
			}
			else {
				args.data.Unit = 'Pack';
			}
		}
	}
}
