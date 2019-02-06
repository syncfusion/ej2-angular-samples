import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { Browser } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';
import { DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-treegrid';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'reactiveforms.html',
    providers: [ToolbarService, EditService, PageService]
})
export class ReactiveFormsComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public taskForm: FormGroup;
    public progressDistinctData: Object;
    public priorityDistinctData: Object;
    public submitClicked: boolean = false;

    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' , newRowPosition: 'Below'};
        this.toolbar = ['Add', 'Edit', 'Delete'];
        this.pageSettings = { pageCount: 5 };
        this.progressDistinctData = DataUtil.distinct(sampleData, 'progress', true);
        this.priorityDistinctData = DataUtil.distinct(sampleData, 'priority', true );
    
    }

    createFormGroup(data: ITaskModel): FormGroup {
        return new FormGroup({
            taskID: new FormControl(data.taskID, Validators.required),
            startDate: new FormControl(data.startDate, this.dateValidator()),
            taskName: new FormControl(data.taskName, Validators.required),
            duration: new FormControl(data.duration),
            progress: new FormControl(data.progress),
            priority: new FormControl(data.priority),
        });
    }

    dateValidator() {
        return (control: FormControl): null | Object  => {
            return control.value && control.value.getFullYear &&
            (1900 <= control.value.getFullYear() && control.value.getFullYear() <=  2099) ? null : { OrderDate: { value : control.value}};
        };
    }

    actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.submitClicked = false;
            this.taskForm = this.createFormGroup(args.rowData);
        }
        if (args.requestType === 'save') {
            this.submitClicked = true;
            if (this.taskForm.valid) {
                args.data = this.taskForm.value;
            } else {
                args.cancel = true;
            }
        }
    }

    actionComplete(args: DialogEditEventArgs): void {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                (<Dialog>args.dialog).dataBind();
            }
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('taskID') as HTMLInputElement).focus();
            }
        }
    }

    get taskID(): AbstractControl  { return this.taskForm.get('taskID'); }

    get taskName(): AbstractControl { return this.taskForm.get('taskName'); }

    get startDate(): AbstractControl { return this.taskForm.get('startDate'); }

}

export interface ITaskModel {
    taskID?: number;
    taskName?: string;
    startDate?: Date;
    duration?: number;
    progress?: number;
    priority?: string;
}



