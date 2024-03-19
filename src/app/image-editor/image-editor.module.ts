import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { DefaultImageEditorComponent } from './default.component';
import { ProfilePictureImageEditorComponent } from './profile-picture.component';
import { CustomToolbarComponent } from './custom-toolbar.component';

export const ImageEditorAppRoutes: Object[] = [
    {
        path: ':theme/image-editor/default',
        component: DefaultImageEditorComponent,
        order: '01',
        name: 'Default Functionalities',
        category: 'Image Editor'
    },
    {
        path: ':theme/image-editor/profile-picture',
        component: ProfilePictureImageEditorComponent,
        order: '01',
        name: 'Profile Picture',
        category: 'Image Editor'
    },
    {
        path: ':theme/image-editor/custom-toolbar',
        component: CustomToolbarComponent,
        order: '01',
        name: 'Custom Toolbar',
        category: 'Image Editor',
        type: 'new'
    }
];

export const ImageEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(ImageEditorAppRoutes);


