import { Component, OnInit } from '@angular/core';
import { formulaData } from './data';
import { EditService, FormulaService, GridModule, SelectionService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
	selector: 'ej-gridformula-cell',
	templateUrl: 'formula-cell.html',
	providers: [EditService, FormulaService, SelectionService],
	standalone: true,
	imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FormulaCellComponent implements OnInit {
	public data: Object[];
	public editSettings: Object;
	public selectionSettings: Object;
	public filterSettings: Object;

	public ngOnInit(): void {
		this.data = formulaData;
		this.editSettings = { allowEditing: true, mode: 'Cell' };
		this.selectionSettings = { mode: 'Cell', cellSelectionMode: 'Box', type: 'Multiple' };
		this.filterSettings = { type: 'CheckBox' };
	}	
}
