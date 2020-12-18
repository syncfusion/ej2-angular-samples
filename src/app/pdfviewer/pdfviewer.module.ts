import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { DefaultPdfViewerComponent } from './default.component';
import { CustomToolbarComponent } from './custom-toolbar.component';
import { RightToLeftComponent } from './right-to-left.component';
import { FormFillingComponent } from './form-filling.component';
import { HandwrittenComponent } from './hand-written.component';

export const pdfViewerAppRoutes: Object[] = [
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/default', component: DefaultPdfViewerComponent, name: 'Default functionalities', order: '06', category: 'PDF Viewer', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/custom-toolbar', component: CustomToolbarComponent, name: 'Custom Toolbar', order: '06', description: 'The PDF Viewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/right-to-left', component: RightToLeftComponent, name: 'Right To Left', order: '06', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
	// tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/form-filling', component: FormFillingComponent, name: 'Form Filling', order: '06', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/hand-written', component: HandwrittenComponent , name: 'Handwritten Signature', order: '06', type: 'new', description: 'The sample demonstrates the Handwritten Signature support of  PDF Viewer. The Handwritten signature reduces the paperwork of reviewing the contents and its verified its digitally.'}
];

export const pdfViewerRouter: ModuleWithProviders<any> = RouterModule.forChild(pdfViewerAppRoutes);

@NgModule({
    imports: [SharedModule,pdfViewerRouter, PdfViewerModule, ToolbarModule, DialogModule],
    declarations: [DefaultPdfViewerComponent, CustomToolbarComponent, RightToLeftComponent, FormFillingComponent, HandwrittenComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PdfViewerSampleModule { }
