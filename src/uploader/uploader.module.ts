import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { UploaderModule } from '@syncfusion/ej2-ng-inputs';
import { CheckBoxModule  } from '@syncfusion/ej2-ng-buttons';
import { DefaultUploaderComponent } from './default.component';
import { PreloadFileUploaderComponent } from './preloadfiles.component';
import { ValidateUploaderComponent } from './validation.component';
import { PreviewUploaderComponent } from './preview.component';
import { TemplateUploaderComponent } from './template.component';
import { SharedModule } from '../common/shared.module';

export const uploaderAppRoutes: Object[] = [
    { path: ':theme/uploader/default', component: DefaultUploaderComponent, name: 'Default Functionalities', category: 'Uploader' },
    { path: ':theme/uploader/template', component: TemplateUploaderComponent, name: 'Template', category: 'Uploader' },
    { path: ':theme/uploader/preloadfiles', component: PreloadFileUploaderComponent, name: 'Preload Files', category: 'Uploader' },
    { path: ':theme/uploader/validation', component: ValidateUploaderComponent, name: 'Validation', category: 'Uploader' },
    { path: ':theme/uploader/preview', component: PreviewUploaderComponent, name: 'Image Preview', category: 'Uploader' }
];

export const UploaderRouter: ModuleWithProviders = RouterModule.forChild(uploaderAppRoutes);

@NgModule({
    imports: [UploaderRouter, SharedModule, CheckBoxModule, UploaderModule, FormsModule],
    declarations: [
        DefaultUploaderComponent,
        PreloadFileUploaderComponent,
        ValidateUploaderComponent,
        PreviewUploaderComponent,
        TemplateUploaderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploaderSampleModule {
}