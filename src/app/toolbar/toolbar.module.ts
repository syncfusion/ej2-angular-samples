import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultToolbarComponent } from './default.component';
import { PopupToolbarComponent } from './popup.component';
import { TemplateToolbarComponent } from './template.component';
import { AlignToolbarComponent } from './alignment.component';
import { KeyboardToolbarComponent } from './keyboard-interaction.component';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';


export const toolbarAppRoutes: Object[] = [
    { path: ':theme/toolbar/default', component: DefaultToolbarComponent, name: 'Default Functionalities', description: 'The sample demonstrates the default functionalities of the Toolbar component which place commands with the scrollable mode in Angular platform.', category: 'Toolbar' },
    { path: ':theme/toolbar/popup', component: PopupToolbarComponent, name: 'Popup', description: 'The sample exposes popup mode of Toolbar component which configures overflowing toolbar commands inside a popup based on priority in Angular platform.', category: 'Toolbar' },
    { path: ':theme/toolbar/template', component: TemplateToolbarComponent, name: 'Template', description: 'The sample demonstrates the customizing toolbar with other components using the template functionalities.', category: 'Toolbar' },
    { path: ':theme/toolbar/alignment', component: AlignToolbarComponent, name: 'Alignment', description: 'This sample demonstrates how to align commands in left, right and center position in Toolbar component in Angular platform.', category: 'Toolbar' },
    { path: ':theme/toolbar/keyboard-interaction', component: KeyboardToolbarComponent, name: 'Keyboard Interaction', description: ' This sample showcases the keyboard shortcuts applicable on Toolbar component in Angular platform.', category: 'Toolbar' }

];

export const ToolbarSampleModule: ModuleWithProviders<any> = RouterModule.forChild(toolbarAppRoutes);

