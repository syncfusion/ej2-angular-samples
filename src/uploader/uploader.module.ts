import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
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
import { CustomDropAreaComponent } from './custom-drop-area.component';
import { ChunkUploadComponent } from './chunk-upload.component';
import { SharedModule } from '../common/shared.module';
import { FieldErrorDisplayComponent } from './field-error-display.component';

export const uploaderAppRoutes: Object[] = [
    { path: ':theme/uploader/default', component: DefaultUploaderComponent, name: 'Default Functionalities', category: 'Uploader' },
    { path: ':theme/uploader/chunk-upload', component:ChunkUploadComponent, name: 'Chunk Upload', category: 'Uploader', type: 'new' },
    { path: ':theme/uploader/custom-file-list', component: TemplateUploaderComponent, name: 'Template', category: 'Uploader' },
    { path: ':theme/uploader/preload-files', component: PreloadFileUploaderComponent, name: 'Preload Files', category: 'Uploader' },
    { path: ':theme/uploader/file-validation', component: ValidateUploaderComponent, name: 'Validation', category: 'Uploader' },
    { path: ':theme/uploader/image-preview', component: PreviewUploaderComponent, name: 'Image Preview', category: 'Uploader', type: 'update' },
    { path: ':theme/uploader/custom-drop-area', component: CustomDropAreaComponent, name: 'Custom Drop Area', category: 'Uploader', type: 'new' },
    { path: ':theme/uploader/file-upload-with-template-driven-forms', component: TemplateDrivenComponent, name: 'Template-driven Forms', category: 'Forms', order: '04', type: 'new'},
    { path: ':theme/uploader/file-upload-with-reactive-forms', component: ReactiveComponent, name: 'Reactive Forms', category: 'Forms', order: '04', type: 'new'}
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