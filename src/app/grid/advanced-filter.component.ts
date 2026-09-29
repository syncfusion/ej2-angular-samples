import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvancedFilterService, EditService, GridComponent, GridModule, SortService, ToolbarService, VirtualScrollService, EditEventArgs, Column, LoadEventArgs } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ticketdata } from './data';

@Component({
	selector: 'ej2-gridadvancedfilter',
	templateUrl: 'advanced-filter.html',
	providers: [EditService, ToolbarService, AdvancedFilterService, SortService, VirtualScrollService],
	standalone: true,
	imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdvancedFilterComponent implements OnInit {
	public data: Object[];
	public toolbar: string[];
	public editSettings: Object;
	public pageSettings: Object;
	public advancedFilterSettings: Object;
	public initialAdvancedFilterRule: Object;

	@ViewChild('grid') public grid?: GridComponent;
	
	public ngOnInit(): void {
		this.data = ticketdata;
		this.editSettings = { allowEditing: true, allowDeleting: true, mode: 'Dialog' };
		this.pageSettings = { pageSize: 50 };
		this.toolbar = [ 'Edit', 'Delete', 'AdvancedFilter'];
		this.initialAdvancedFilterRule = {
			condition: 'and',
			rules: [{
				field: 'Status',
				label: 'Status',
				type: 'string',
				operator: 'notequal',
				value: 'done'
			}]
		};
		this.advancedFilterSettings = {
			queryBuilderSettings: {
				rule: this.initialAdvancedFilterRule
			}
		};
	}
	public onLoad(args: LoadEventArgs): void {
		if (args) {
            args.enableSeamlessScrolling = true;
        }
	}
	public actionBegin(args: EditEventArgs): void {
		if (args.requestType === 'beginEdit' || args.requestType === 'add') {
			this.setDialogColumnVisibility(false, ['Title', 'TypeofRequest', 'CreatedDate']);
			return;
		}

		if (args.requestType === 'save' || args.requestType === 'cancel') {
			this.setDialogColumnVisibility(true, ['Title', 'TypeofRequest', 'CreatedDate']);
		}
	}
	private setDialogColumnVisibility(isVisible: boolean, fields: string[]): void {
		const columns = (this.grid as GridComponent)?.columns || [];
		for (const col of columns) {
			const column = col as Column;
			if (fields.includes(column.field as string)) {
				column.visible = isVisible;
			}
		}
	}
}
