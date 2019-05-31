import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { DataUtil } from '@syncfusion/ej2-data';
import { DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-treegrid';
import { FormGroup } from '@angular/forms';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'templateforms.html',
    providers: [ToolbarService, EditService, PageService]
})
export class TemplateFormsComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public taskdata: ITaskModel;
    @ViewChild('taskForm')
    public taskForm: FormGroup;
    public progressDistinctData: Object;
    public priorityDistinctData: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row', newRowPosition: 'Below'};
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.pageSettings = { pageCount: 5 };
        this.progressDistinctData = DataUtil.distinct(sampleData, 'progress', true);
        this.priorityDistinctData = DataUtil.distinct(sampleData, 'priority', true );
    }

    actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.taskdata = Object.assign({}, args.rowData);
        }
        if (args.requestType === 'save') {
            if (this.taskForm.valid) {
                args.data = this.taskdata;
            } else {
                args.cancel = true;
            }
        }
    }

    actionComplete(args: DialogEditEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('taskID') as HTMLInputElement).focus();
            }

        }
    }

    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }

    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }
}

export interface ITaskModel {
    taskID?: number;
    taskName?: string;
    startDate?: Date;
    duration?: number;
    progress?: number;
    priority?: string;
}



