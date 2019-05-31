import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxAllModule, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { GanttDefaultComponent } from './default.component';
import { GanttBaselineComponent } from './baseline.component';
import { GanttEditingComponent } from './editing.component';
import { GanttFilteringComponent } from './filtering.component';
import { GanttRemoteDataComponent } from './remote-data.component';
import { GanttTimelineComponent } from './timeline.component';
import { GanttTaskbarTemplateComponent } from './taskbar-template.component';
import { GanttUnscheduledComponent } from './unscheduled-task.component';

export const GanttAppRoutes: Object[] = [
    {
        path: ':theme/gantt/default', component: GanttDefaultComponent,
        description: 'This example demonstrates the simple Gantt chart with summary task, child tasks, milestone tasks, dependencies with event markers of project',
        name: 'Default Functionalities', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/remote-data', component: GanttRemoteDataComponent,
        description: 'This sample demonstrates the way of binding data to Gantt chart with remote service. The Gantt chart data source is bound to remote data using DataManager.',
        name: 'Remote Data', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/editing', component: GanttEditingComponent,
        description: 'This example demonstrates the cell editing, dialog editing, taskbar editing and dependency editing support in Gantt',
        name: 'Editing', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/filtering', component: GanttFilteringComponent,
        description: 'This example demonstrates the filtering support with filter menu option for various types of columns in Gantt',
        name: 'Filtering', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/timeline', component: GanttTimelineComponent,
        description: 'This example demonstrates the various timeline mode options and properties available to customize the timeline in Gantt',
        name: 'Timeline', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/baseline', component: GanttBaselineComponent,
        description: 'Baselines are enabled to view the deviation between the planned dates of tasks and actual progress of task dates',
        name: 'Baseline', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/taskbar-template', component: GanttTaskbarTemplateComponent,
        description: 'This example demonstrates the taskbar template support with child taskbar template, parent taskbar template and milestone template.',
        name: 'Taskbar Template', order: '01', category: 'Gantt'
    },
    {
        path: ':theme/gantt/unscheduled-task', component: GanttUnscheduledComponent,
        description: 'This example demonstrates the unscheduled tasks in Gantt with custom toolbar item and dynamic add support.',
        name: 'Unscheduled Tasks', order: '01', category: 'Gantt'
    }
];

export const GanttRouter: ModuleWithProviders = RouterModule.forChild(GanttAppRoutes);
let declarations: Type<Object>[] = [
    GanttDefaultComponent,
    GanttBaselineComponent,
    GanttEditingComponent,
    GanttFilteringComponent,
    GanttRemoteDataComponent,
    GanttTimelineComponent,
    GanttTaskbarTemplateComponent,
    GanttUnscheduledComponent
];
@NgModule({
    imports: [CommonModule, GanttRouter, SharedModule, GanttAllModule, DropDownListAllModule, CheckBoxAllModule, TextBoxAllModule, NumericTextBoxAllModule],
    declarations: declarations,
    providers: [GanttAllModule]
})
export class GanttSampleModule {
}