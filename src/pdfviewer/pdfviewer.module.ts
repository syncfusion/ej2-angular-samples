import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { DefaultPdfViewerComponent } from './default.component';
import { CustomToolbarComponent } from './custom-toolbar.component';

export const pdfViewerAppRoutes: Object[] = [
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/default', component: DefaultPdfViewerComponent, name: 'Default functionalities', order: '06', category: 'PDF Viewer', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/custom-toolbar', component: CustomToolbarComponent, name: 'Custom Toolbar', order: '06', description: 'The PDF Viewer component is used to  view and print pdf documents in web applications.' }
];

export const pdfViewerRouter: ModuleWithProviders = RouterModule.forChild(pdfViewerAppRoutes);

@NgModule({
    imports: [SharedModule, pdfViewerRouter, PdfViewerModule, ToolbarModule, DialogModule],
    declarations: [DefaultPdfViewerComponent, CustomToolbarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PdfViewerSampleModule { }
