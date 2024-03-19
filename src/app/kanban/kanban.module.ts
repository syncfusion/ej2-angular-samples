import { NgModule, Type, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';



import { OverviewComponent } from './overview.component';
import { DefaultComponent } from './default.component';
import { SwimlaneComponent } from './swimlane.component';
import { WorkflowComponent } from './workflow.component';
import { StackedHeaderComponent } from './stacked-header.component';
import { DialogEditingComponent } from './dialog-editing.component';
import { SearchFilterComponent } from './search-filter.component';
import { SortingComponent } from './sorting.component';
import { LocalDataComponent } from './local-data.component';
import { RemoteDataComponent } from './remote-data.component';
import { HeaderTemplateComponent } from './header-template.component';
import { SwimlaneTemplateComponent } from './swimlane-template.component';
import { CardTemplateComponent } from './card-template.component';
import { TooltipTemplateComponent } from './tooltip-template.component';
import { ToggleColumnsComponent } from './toggle-columns.component';
import { ShowHideComponent } from './show-hide.component';
import { WIPValidationComponent } from './wip-validation.component';
import { EventsComponent } from './events.component';
import { APIComponent } from './api.component';
import { VirtualScrollingComponent } from './virtual-scrolling.component';



export const kanbanRouteConfig: Object[] = [
  { 'path': ':theme/kanban/overview', component: OverviewComponent, name: 'Overview', order: '01', category: 'Kanban', description: 'The example is designed to enable most essential features such as templating, swimlane, toggling columns, tooltip, and more in JS Kanban board.' },
  { 'path': ':theme/kanban/default', component: DefaultComponent, name: 'Default Functionalities', order: '01', category: 'Kanban', description: 'This demo for Essential JS2 Kanban component shows how the flat Kanban looks like with its default set of minimal configurations.' },
  { 'path': ':theme/kanban/swimlane', component: SwimlaneComponent, name: 'Swimlane', order: '01', category: 'Kanban', description: 'The example explains how to configure swimlane and its related settings (sorting order, drag-and-drop, and more) in JavaScript Kanban board.' },
  { 'path': ':theme/kanban/workflow', component: WorkflowComponent, name: 'Workflow', order: '01', category: 'Kanban', description: 'The example demonstrates a workflow feature that controls the flow of cards while drag-and-drop the cards between the columns.' },
  { 'path': ':theme/kanban/stacked-header', component: StackedHeaderComponent, name: 'Stacked Header', order: '01', category: 'Kanban', description: 'The example explains how to add a stacked header to group logically related columns above a column header in JS Kanban.' },
  { 'path': ':theme/kanban/dialog-editing', component: DialogEditingComponent, name: 'Dialog Editing', order: '01', category: 'Kanban', description: 'The example explains how to handle the CRUD (Create, Read, Update, and Delete) actions on the JS Kanban cards from the application end.' },
  { 'path': ':theme/kanban/search-filter', component: SearchFilterComponent, name: 'Search and Filter Cards', order: '01', category: 'Kanban', description: 'The example demo shows how to filter the cards and make searching when more number of cards on a JavaScript Kanban board that helps you to focus.' },
  { 'path': ':theme/kanban/sorting', component: SortingComponent, name: 'Sorting Cards', order: '01', category: 'Kanban', description: 'The example demonstrates how to sort the cards in the ascending or descending based on the data source order or indexing or custom field on the Kanban board.' },
  { 'path': ':theme/kanban/virtual-scrolling', component: VirtualScrollingComponent, name: 'Virtual Scrolling', order: '01', category: 'Kanban', description: 'The example demonstrates how to load a large number of cards in the Kanban board with optimal load time using the virtual scrolling feature.' },
  { 'path': ':theme/kanban/local-data', component: LocalDataComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: 'The example demonstrates how to bind data to the JavaScript Kanban board from the array of JavaScript objects (JSON) or instances of Data Manager.' },
  { 'path': ':theme/kanban/remote-data', component: RemoteDataComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: 'The example demonstrates how to load data source from remote seervice to the JavaScript Kanban board using data manager.' },
  { 'path': ':theme/kanban/header-template', component: HeaderTemplateComponent, name: 'Header Template', order: '03', category: 'Templates', description: 'The example demonstrates how to customize the column headers of the JS Kanban board with text, images, badges, and count using HTML templates.' },
  { 'path': ':theme/kanban/swimlane-template', component: SwimlaneTemplateComponent, name: 'Swimlane Template', order: '03', category: 'Templates', description: 'The example demonstrates how to customize the swimlane headers of the JS Kanban board using HTML templates, which is applicable to all swimlane headers.' },
  { 'path': ':theme/kanban/card-template', component: CardTemplateComponent, name: 'Card Template', order: '03', category: 'Templates', description: 'This sample demonstrates how to customize the Kanban cards using templates. In this demo, the cards are customized with icons, images, and tags.' },
  { 'path': ':theme/kanban/tooltip-template', component: TooltipTemplateComponent, name: 'Tooltip Template', order: '03', category: 'Templates', description: 'The example demonstrates how to enable and disable the tooltip messages on JavaScript Kanban cards, and customize using templates.' },
  { 'path': ':theme/kanban/toggle-columns', component: ToggleColumnsComponent, name: 'Toggle Columns', order: '04', category: 'Columns', description: 'This sample demonstrates the toggle column of JS Kanban, which is helpful to expand and collapse the columns and can be collapsed on page load also.' },
  { 'path': ':theme/kanban/show-hide', component: ShowHideComponent, name: 'Show/Hide Columns', order: '04', category: 'Columns', description: 'The example demonstrates how to show or hide the columns of JavaScript Kanban board dynamically, which is achieved from code using the public methods.' },
  { 'path': ':theme/kanban/wip-validation', component: WIPValidationComponent, name: 'WIP Validation', order: '05', category: 'Validation', description: 'The Work-in-progress (WIP) validation demo demonstrates the minimum and maximum limit of card per column or swimlane in JavaScript Kanban board.' },
  { 'path': ':theme/kanban/api', component: APIComponent, name: 'API', order: '06', category: 'Miscellaneous', description: 'The example showcases the important APIs of JavaScript Kanban in the property panel, which are used to manipulate the Kanban board dynamically.' },
  { 'path': ':theme/kanban/events', component: EventsComponent, name: 'Events', order: '06', category: 'Miscellaneous', description: 'The sample showcases the client- side events of JavaScript Kanban with event tracer, which is helpful to customize the Kanban board from application end.' }
];

export const KanbanSampleModule: ModuleWithProviders<any> = RouterModule.forChild(kanbanRouteConfig);

