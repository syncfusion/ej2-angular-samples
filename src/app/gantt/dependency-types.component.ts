import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent, GanttModule, EditService, ToolbarService, SelectionService, DependencyType} from '@syncfusion/ej2-angular-gantt';
import { MultiSelectModule, CheckBoxSelectionService, MultiSelectChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { dependencyData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-dependency-types',
    templateUrl: 'dependency-types.html',
    standalone: true,
    imports: [ GanttModule, MultiSelectModule, SBDescriptionComponent, SBActionDescriptionComponent ],
    providers: [ EditService, ToolbarService, SelectionService, CheckBoxSelectionService ]
})
export class GanttDependencyTypesComponent implements OnInit {
    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public labelSettings: object;
    public editSettings: object;
    public toolbar: string[];
    public columns: object[];
    public projectStartDate: Date = new Date('01/01/2026');
    public dependencyType: DependencyType[] = ['FS', 'SS', 'FF', 'SF'];
    public dependencyTypeData: object[] = [
        {
            text: 'Finish to Start (FS)',
            value: 'FS'
        },
        {
            text: 'Start to Start (SS)',
            value: 'SS'
        },
        {
            text: 'Finish to Finish (FF)',
            value: 'FF'
        },
        {
            text: 'Start to Finish (SF)',
            value: 'SF'
        }
    ];

    public fields: object = {
        text: 'text',
        value: 'value'
    };

    public ngOnInit(): void {
        this.data = dependencyData; 
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentID'
        };
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.splitterSettings = {
            columnIndex: 3
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.columns = [
            {
                field: 'TaskID',
                visible: false
            },
            {
                field: 'TaskName',
                headerText: 'Task Name',
                width: 200
            },
            {
                field: 'Predecessor',
                headerText: 'Dependency',
                width: 140
            },
            {
                field: 'StartDate',
                headerText: 'Start Date',
                width: 130
            },
            {
                field: 'Duration',
                headerText: 'Duration',
                width: 110
            },
            {
                field: 'Progress',
                headerText: 'Progress',
                width: 100
            }
        ];
    }

    public onDependencyTypeChange(args: MultiSelectChangeEventArgs): void {
        this.dependencyType = args.value as DependencyType[];
        this.ganttObj.allowedDependencyTypes = this.dependencyType;
        this.ganttObj.refresh();
    }
}