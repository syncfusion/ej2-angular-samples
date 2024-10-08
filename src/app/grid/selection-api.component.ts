import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { orderDetails } from './data';
import { SelectionService, GridComponent, SortService, GridModule, PageService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { CheckBox } from "@syncfusion/ej2-buttons";
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridselect',
    templateUrl: 'selection-api.html',
    providers: [SelectionService, SortService, PageService, FilterService, ToolbarService, EditService],
    styleUrls: ['./selection-api.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SelectionApiComponent implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild("toolbar")
     public toolbar: ToolbarComponent;
    public data: Object[];
    public filterSettings: Object;
    public toolbarSettings: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public selectOptions: { type?: string, mode?: string, allowColumnSelection?: boolean };
    public columnSelectionCheckbox: any = new CheckBox({
        label: "Enable Column Selection",
        checked: false,
        change: this.change.bind(this)
      });

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['selection-api.style.css'];
    }

    public ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
        this.filterSettings = { type: 'Excel' };
        this.toolbarSettings = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }

    public onChangeType(e: MouseEvent): void {
        let element: HTMLElement = <HTMLInputElement>e.target;
        let options: {
            type?: { class: string, val: (mode: string) => string },
            mode?: { class: string, val: (mode: string) => string }
         } = {
             type: { class: '.e-gtype', val: (mode: string) => mode === 'Single' ? 'Multiple' : 'Single' },
             mode: { class: '.e-gmode', val: (mode: string) => mode === 'Row' ? 'Cell' : 'Row' },
         };

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
        let isType: boolean = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt: { class: string, val: (mode: string) => string } = options[isType ? 'type' : 'mode'];
        let parent: Element = document.querySelector('.e-gridlist');
        let typeEle: Element = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type: string = typeEle.innerHTML;
        let val: string = opt.val(type);
        typeEle.innerHTML = val;

        this.selectOptions = isType ? { type: val } : { mode: val };
        if (!isType && val === "Column") {
            this.grid.clearSelection();
            this.grid.selectionSettings.allowColumnSelection = true;
        } else {
            this.selectOptions = isType ? { type: val } : { mode: val, allowColumnSelection: false };
        }
    }

    public selectingEvent(e: any): void {
        if (this.grid.selectionSettings.allowColumnSelection) {
            e.cancel = true;
        }
    }

    public onCreate(e: any) {
        this.columnSelectionCheckbox.appendTo("#columnSelection");
    }

    public change(e: any) {
        this.grid.clearSelection();
        if (e.checked) {
            this.toolbar.enableItems(1, false);
            this.grid.selectionSettings.allowColumnSelection = true;
        } else {
            this.toolbar.enableItems(1, true);
            this.grid.selectionSettings.allowColumnSelection = false;
        }
    }
}