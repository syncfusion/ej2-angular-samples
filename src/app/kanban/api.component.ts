import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { FormValidators, NumericTextBoxComponent, NumericTextBoxModule, TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent, DialogModule, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { kanbanData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, DialogModule, TextBoxModule, DropDownListModule, ButtonModule, NumericTextBoxModule, FormsModule, ReactiveFormsModule]
})
export class APIComponent implements AfterViewInit {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('dropdown') dropdownObj: DropDownListComponent;
    @ViewChild('header') textobj: TextBoxComponent;
    @ViewChild('colIndex') columnObj: NumericTextBoxComponent;
    @ViewChild('columnIndex') deleteObj: NumericTextBoxComponent;
    @ViewChild('Dialog') dialogObj: DialogComponent;
    reactForm: FormGroup;
    orderForm: FormGroup;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['api.style.css'];
        this.reactForm = new FormGroup({
            'check': new FormControl('', [FormValidators.required]),
            'key': new FormControl('', [FormValidators.required]),
            'index': new FormControl('', [FormValidators.required]),
        });
        this.orderForm = new FormGroup({
            'deteteIndex': new FormControl('', [FormValidators.required]),
        });
    }
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public statusData: string[] = ['Testing', 'Review', 'Validate'];
    public fields: Object = { text: 'Status', value: 'Status' };
    public showCloseIcon: Boolean = true;
    public isModal: Boolean = true;
    public visible: Boolean = false;
    public width: string = '350px';
    public dlgBtnClick = (): void => {
        this.dialogObj.hide();
    }
    public dlgButtons: ButtonPropsModel[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    onAdd = (): void => {
        let text: string = this.textobj.value;
        let key: string = this.dropdownObj.value as string;
        let index: number = this.columnObj.value;
        if (this.kanbanObj.columns.length >= index && key && key.length > 0 && text && text.length > 0 && index !== null) {
            this.kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            this.columnObj.max = this.kanbanObj.columns.length;
            this.deleteObj.max = this.kanbanObj.columns.length - 1;
            this.reactForm.reset();
        } else if (!(text && text.length > 0)) {
            this.dialogObj.content = 'Enter Column Header Text';
            this.dialogObj.show();
        } else if (!(key && key.length > 0)) {
            this.dialogObj.content = 'Enter Column Key Field';
            this.dialogObj.show();
        } else if (!index) {
            this.dialogObj.content = 'Enter Column Index';
            this.dialogObj.show();
        }
    };
    onDelete = (): void => {
        let index: number = this.deleteObj.value;
        if (this.kanbanObj.columns.length > 1) {
            if (this.kanbanObj.columns.length >= (index + 1) && index !== null) {
                this.kanbanObj.deleteColumn(index);
                this.columnObj.max = this.kanbanObj.columns.length;
                this.deleteObj.max = this.kanbanObj.columns.length - 1;
                this.orderForm.reset();
            } else {
                this.dialogObj.content = 'Enter Column Index';
                this.dialogObj.show();
            }
        } else {
            this.dialogObj.content = 'Atleast one column must be displayed in kanban';
            this.dialogObj.show();
        }
    };
    ngOnInit(): void {
        document.getElementById('addForm').addEventListener('submit', (e: Event) => { e.preventDefault() });
        document.getElementById('deleteForm').addEventListener('submit', (e: Event) => { e.preventDefault() });
    };
    ngAfterViewInit(): void {
        this.columnObj.max = this.kanbanObj.columns.length;
        this.deleteObj.max = this.kanbanObj.columns.length - 1;
    }
    get check() { return this.reactForm.get('check'); }
    get key() { return this.reactForm.get('key'); }
    get index() { return this.reactForm.get('index'); }
    get deteteIndex() { return this.orderForm.get('deteteIndex'); }
}
