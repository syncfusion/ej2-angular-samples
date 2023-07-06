import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SharedModule } from '../common/shared.module';
import { DefaultImageEditorComponent } from './default.component';
import { ProfilePictureImageEditorComponent } from './profile-picture.component';

export const ImageEditorAppRoutes: Object[] = [
    {
        path: ':theme/image-editor/default',
        component: DefaultImageEditorComponent,
        order: '01',
        name: 'Default Functionalities',
        category: 'Image Editor',
        type: 'update'
    },
    {
        path: ':theme/image-editor/profile-picture',
        component: ProfilePictureImageEditorComponent,
        order: '01',
        name: 'Profile Picture',
        category: 'Image Editor'
    }
];

export const ImageEditorRouter: ModuleWithProviders<any> = RouterModule.forChild(ImageEditorAppRoutes);

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, ImageEditorRouter, DialogModule, SharedModule, CommonModule, ImageEditorModule],
    declarations: [
        DefaultImageEditorComponent,
        ProfilePictureImageEditorComponent
    ],
    exports: [DefaultImageEditorComponent, ProfilePictureImageEditorComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageEditorSampleModule { }
