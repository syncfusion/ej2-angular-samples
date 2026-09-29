import { Component } from '@angular/core';

import {
    FilterService,
    ToolbarItems,
    ToolbarService,
    EditService ,
    TreeGridAllModule
} from '@syncfusion/ej2-angular-treegrid';

import { QueryCellInfoEventArgs, GridAllModule } from '@syncfusion/ej2-angular-grids';

import {
    ChangeEventArgs,
    FieldSettingsModel,
    DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';

import { showCheckBoxData } from './jsontreegriddata';

import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

type HierarchyCheckboxMode =
    | 'self'
    | 'hierarchy'
    | 'filteredHierarchy';

interface HierarchyModeItem {
    id: string;
    name: string;
}

interface TaskData {
    taskID: number;
    taskName: string;
    assignee: string;
    designation: string;
    priority: string;
    status: string;
    progress: string;
    expanded?: boolean;
    subTasks?: TaskData[];
}

/**
* Hierarchy Checkbox Mode TreeGrid sample.
*/
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'checkbox-column.html',
    styleUrls: ['checkbox-column.css'],
    providers: [
        FilterService,
        ToolbarService,
       EditService
    ],
    imports: [TreeGridAllModule, GridAllModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent],
    standalone: true
})
export class CheckboxColumnComponent {
    public data: TaskData[] =
        showCheckBoxData as TaskData[];

    public toolbarOptions: ToolbarItems[] = [
        'Search', 'Delete'
    ];
    public editSettings: Object = {allowDeleting: true};
    public hierarchyCheckboxMode:
        HierarchyCheckboxMode = 'self';

    public hierarchyModeData: HierarchyModeItem[] = [
        {
            id: 'Self',
            name: 'Self'
        },
        {
            id: 'Hierarchy',
            name: 'Hierarchy'
        },
        {
            id: 'FilteredHierarchy',
            name: 'Filtered Hierarchy'
        }
    ];

    public hierarchyModeFields: FieldSettingsModel = {
        text: 'name',
        value: 'id'
    };

    public hierarchyModeChange(
        args: ChangeEventArgs
    ): void {
        if (args.value === 'Hierarchy') {
            this.hierarchyCheckboxMode = 'hierarchy';
        } else if (
            args.value === 'FilteredHierarchy'
        ) {
            this.hierarchyCheckboxMode =
                'filteredHierarchy';
        } else {
            this.hierarchyCheckboxMode = 'self';
        }
    }
    public getStatusClass(status: string): string {
        return status.toLowerCase().replace(/\s+/g, '-');
    }
}