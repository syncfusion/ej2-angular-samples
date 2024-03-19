import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultMentionComponent } from './default.component';
import { MultipleListMentionComponent } from './multiple-list.component';
import { TemplateMentionComponent } from './template.component';

import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
export const mentionAppRoutes: Object[] = [
    { path: ':theme/mention/default', component: DefaultMentionComponent, name: 'Default Functionalities', description: 'This example demonstrates the default functionalities of Syncfusion TypeScript Mention component with minimum configuration.', order: '01',
		category: 'Mention' },
    { path: ':theme/mention/multiple-list', component: MultipleListMentionComponent, name: 'Multiple List', description: 'This example demonstrates the multiple list functionalities of Syncfusion TypeScript Mention component with minimum configuration.', order: '01',
      category: 'Mention' },
    { path: ':theme/mention/template', component: TemplateMentionComponent, name: 'Template', description: 'This example demonstrates the template functionalities of Syncfusion TypeScript Mention component with minimum configuration.', order: '01',
		category: 'Mention' }
];

export const MentionSampleModule: ModuleWithProviders<any> = RouterModule.forChild(mentionAppRoutes);


