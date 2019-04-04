import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { DefaultUploaderComponent } from './default.component';
import { PreloadFileUploaderComponent } from './preload-files.component';
import { ValidateUploaderComponent } from './file-validation.component';
import { PreviewUploaderComponent } from './image-preview.component';
import { TemplateUploaderComponent } from './custom-file-list.component';
import { ReactiveComponent } from './file-upload-with-reactive-forms.component';
import { TemplateDrivenComponent } from './file-upload-with-template-driven-forms.component';
import { FieldErrorDisplayComponent } from './field-error-display.backup';
import { CustomDropAreaComponent } from './custom-drop-area.component';
import { ChunkUploadComponent } from './chunk-upload.component';
import { SharedModule } from '../common/shared.module';

export const uploaderAppRoutes: Object[] = [
    { path: ':theme/uploader/default', component: DefaultUploaderComponent, name: 'Default Functionalities', category: 'File Upload', description: 'This example demonstrates default functionalities of the Angular file uploader component, including automatic upload and asynchronous mode options.' },
    { path: ':theme/uploader/chunk-upload', component:ChunkUploadComponent, name: 'Chunk Upload', category: 'File Upload', description: 'This example demonstrates how to upload files as chunks in the Angular file upload component, which helps when uploading a large file to a server.' },
    { path: ':theme/uploader/custom-file-list', component: TemplateUploaderComponent, name: 'Template', category: 'File Upload', description: 'This example demonstrates how to customize the file list with buttons using a template and upload a file programmatically using the Angular file upload.' },
    { path: ':theme/uploader/preload-files', component: PreloadFileUploaderComponent, name: 'Preload Files', category: 'File Upload', description: 'This example demonstrates how to preload files in the Angular file upload component, which helps users view and manipulate server files.' },
    { path: ':theme/uploader/file-validation', component: ValidateUploaderComponent, name: 'Validation', category: 'File Upload', description: 'The example covers validations in Angular file upload such as allowing/denying file extensions, set min/max file size, duplicate file, and more.' },
    { path: ':theme/uploader/image-preview', component: PreviewUploaderComponent, name: 'Image Preview', category: 'File Upload', description: 'This example demonstrates how to display a preview of an image file before and after uploading it to a server in Angular file upload.' },
    { path: ':theme/uploader/custom-drop-area', component: CustomDropAreaComponent, name: 'Custom Drop Area', category: 'File Upload', description: 'This example demonstrates how to upload a file using drag and drop and how to configure a custom drop area for the Angular file upload component.' },
    { path: ':theme/uploader/file-upload-with-template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the file upload component in an Angular (ng) template-driven form that binds values to a model using ngModel.' },
    { path: ':theme/uploader/file-upload-with-reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', description: 'This example shows how to integrate the file upload component in an Angular (ng) reactive form that works based on form-group, form-builder, and form-control.' }
];

export const UploaderRouter: ModuleWithProviders = RouterModule.forChild(uploaderAppRoutes);

@NgModule({
    imports: [UploaderRouter, SharedModule, CheckBoxModule, UploaderModule, DialogModule, FormsModule, CommonModule, ReactiveFormsModule],
    declarations: [
        DefaultUploaderComponent,
        ChunkUploadComponent,
        PreloadFileUploaderComponent,
        ValidateUploaderComponent,
        PreviewUploaderComponent,
        TemplateUploaderComponent,
        CustomDropAreaComponent,
        TemplateDrivenComponent,
        ReactiveComponent,
        FieldErrorDisplayComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploaderSampleModule {
}