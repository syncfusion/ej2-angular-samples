import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultSpeedDialComponent } from './default.component';
import { LinearSpeedDialComponent } from './linear.component';
import { RadialSpeedDialComponent } from './radial.component';
import { StylesComponent } from './styles.component';
import { TemplateComponent } from './template.component';
import { ModalComponent } from './modal.component';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { BrowserModule } from '@angular/platform-browser';


export const speedDialAppRoutes: Object[] = [
    {
        path: ':theme/speed-dial/default',
        component: DefaultSpeedDialComponent,
        name: 'Default Functionalities',
        category: 'SpeedDial',
        description: "This sample demonstrates default functionalities of SpeedDial"

        },
        {
            path: ':theme/speed-dial/linear',
            component: LinearSpeedDialComponent,
            name: 'Position (Linear)',
            category: 'SpeedDial',
            description: "This sample demonstrates linear opening direction of actions of a SpeedDial"
        },
        {
            path: ':theme/speed-dial/radial',
            component: RadialSpeedDialComponent,
            name: 'Radial Menu',
            category: 'SpeedDial',
            description: "This sample demonstrates radial opening direction of action of a SpeedDial"
               
        },
        {
            path: ':theme/speed-dial/styles',
            component: StylesComponent,
            name: 'Styles',
            category: 'SpeedDial',
            description: "This sample demonstrates common appearances of speed dial control."
               
        },
        {
            path: ':theme/speed-dial/template',
            component: TemplateComponent,
            name: 'Template',
            category: 'SpeedDial',
            description: "This sample demonstrates the popup and item templates"
               
        },
        {
            path: ':theme/speed-dial/modal',
            component: ModalComponent,
            name: 'Modal',
            category: 'SpeedDial',
            description: "This sample demonstrates the modal view which is added to prevent background interaction and displayed as modal"
               
        }
];

export const SpeedDialSampleModule: ModuleWithProviders<any> = RouterModule.forChild(speedDialAppRoutes);


