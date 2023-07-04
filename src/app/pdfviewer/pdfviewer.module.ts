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
import { FormDesignerComponent } from './form-designer.component';
import { AnnotationsComponent } from './annotations.component';

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
     { path: ':theme/pdfviewer/form-designer', component: FormDesignerComponent , name: 'Form Designer', type: 'update', order: '06', description: 'This sample demonstrates the creation of the supported Form fields in the PDF Viewer such as Textbox, Password, Checkbox, Radio Button, Drop Down, List box, Signature, and Initial. We can also customize these fields and can include new fields through the user interaction by switching to the designer mode.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/annotations', component: AnnotationsComponent , name: 'Annotations', order: '06', description: 'This sample demonstrates the creation of different types of annotations such as Text Markup, Shapes, Measurements, Free text, Stamps, Handwritten signature, ink, and sticky notes in the PDF Viewer. And also we can customize the added annotations or we can include new annotations through user interaction from the PDF Viewer.'},
     // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/hand-written', component: HandwrittenComponent , name: 'Handwritten Signature', order: '06', description: 'This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.'}
];

export const pdfViewerRouter: ModuleWithProviders<any> = RouterModule.forChild(pdfViewerAppRoutes);

@NgModule({
    imports: [SharedModule,pdfViewerRouter, PdfViewerModule, ToolbarModule, DialogModule],
    declarations: [DefaultPdfViewerComponent,CustomToolbarComponent,RightToLeftComponent,FormFillingComponent, FormDesignerComponent, HandwrittenComponent, AnnotationsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PdfViewerSampleModule { }
