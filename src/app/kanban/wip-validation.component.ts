import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { FormValidators, NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { KanbanComponent, CardSettingsModel, SwimlaneSettingsModel, ConstraintType, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { kanbanData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'wip-validation.html',
    styleUrls: ['wip-validation.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ DialogModule, KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule, NumericTextBoxModule, FormsModule, ReactiveFormsModule]
})
export class WIPValidationComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('dropdownHeader') keyObj: DropDownListComponent;
    @ViewChild('min') minimum: NumericTextBoxComponent;
    @ViewChild('max') maximum: NumericTextBoxComponent;
    @ViewChild('Dialog') dialogObj: DialogComponent;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['wip-validation.style.css'];
        this.reactForm = new FormGroup({
            'check': new FormControl('', [FormValidators.required]),
            'minIndex': new FormControl('', [FormValidators.required]),
            'maxIndex': new FormControl('', [FormValidators.required]),
        });
    }
    public reactForm: FormGroup;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
    public columnType: string[] = ['Column', 'Swimlane'];
    public statusData: { [key: string]: Object }[] = [
        { Id: 0, text: 'To Do' },
        { Id: 1, text: 'In Progress' },
        { Id: 2, text: 'Done' }
    ];
    public fields: Object = { text: 'text', value: 'Id' };
    public header: string = 'Validation';
    public showCloseIcon: Boolean = true;
    public isModal: Boolean = true;
    public visible: Boolean = false;
    public width: string = '350px';
    public dlgBtnClick = (): void => {
        this.dialogObj.hide();
    }
    public dlgButtons: ButtonPropsModel[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    changeContraintType(args: ChangeEventArgs): void {
        this.kanbanObj.constraintType = args.value as ConstraintType;
    }

    changeColumns(args: ChangeEventArgs): void {
        const changeIndex: number = args.value as number;
        if (changeIndex !== null) {
            this.minimum.value = this.kanbanObj.columns[changeIndex].minCount;
            this.maximum.value = this.kanbanObj.columns[changeIndex].maxCount;
        }
    }

    onclick(): void {
        const colindex: number = this.keyObj.index;
        const colText: string = this.keyObj.text;
        const colmin: number = this.minimum.value;
        const colmax: number = this.maximum.value;
        if (colText === null) {
            this.dialogObj.content = 'Select column Header Text';
            this.dialogObj.show();
        } else if (colText !== null && this.minimum.value === null && this.maximum.value === null) {
            this.dialogObj.content = 'Enter column min-count or max-count';
            this.dialogObj.show();
        } else {
            this.kanbanObj.columns[colindex].headerText = colText;
            if (this.minimum.value !== null) {
                this.kanbanObj.columns[colindex].minCount = colmin;
            }
            if (this.minimum.value !== null) {
                this.kanbanObj.columns[colindex].maxCount = colmax;
            }
            this.reactForm.reset();
        }
    }

    ngOnInit(): void {
        const formId: HTMLElement = <HTMLElement>document.getElementById('column');
        formId.addEventListener('submit', (e: Event) => { e.preventDefault(); });
    }

    get check() { return this.reactForm.get('check'); }
    get minIndex() { return this.reactForm.get('minIndex'); }
    get maxIndex() { return this.reactForm.get('maxIndex'); }

}
