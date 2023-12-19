import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule,MenuModule} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { DefaultPdfViewerComponent } from './default.component';
import { CustomToolbarComponent } from './custom-toolbar.component';
import { RightToLeftComponent } from './right-to-left.component';
import { FormFillingComponent } from './form-filling.component';
import { HandwrittenComponent } from './hand-written.component';
import { FormDesignerComponent } from './form-designer.component';
import { AnnotationsComponent } from './annotations.component';
import {InvisibleSignatureComponent} from './invisible-signature.component';
import {ReadOnlyComponent} from './read-only.component';
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DocumentListComponent } from './document-list.component';

export const pdfViewerAppRoutes: Object[] = [
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/default', component: DefaultPdfViewerComponent, name: 'Default functionalities', order: '06', category: 'PDF Viewer', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/read-only', component: ReadOnlyComponent , name: 'Read-Only', type: 'new', order: '07', category: 'Document Security', description: 'This sample demonstrates the Pdf Viewer in Read Only mode'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/document-list', component: DocumentListComponent , name: 'Document List', type: 'new', order: '08', category: 'File Management', description: 'This sample demonstrates to open PDF document in Read-only mode and Editable mode using PDF Viewer in Pop-up dialog'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/custom-toolbar', component: CustomToolbarComponent, name: 'Custom Toolbar',type:'Update' ,order: '09', category: 'Toolbar', description: 'The PDF Viewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/right-to-left', component: RightToLeftComponent, name: 'Right To Left', order: '10', category: 'Localization', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
	// tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/form-filling', component: FormFillingComponent, name: 'Form Filling', order: '11', category: 'PDF Form', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
     // tslint:disable-next-line:max-line-length
     { path: ':theme/pdfviewer/form-designer', component: FormDesignerComponent , name: 'Form Designer', order: '11', category: 'PDF Form', description: 'This sample demonstrates the creation of the supported Form fields in the PDF Viewer such as Textbox, Password, Checkbox, Radio Button, Drop Down, List box, Signature, and Initial. We can also customize these fields and can include new fields through the user interaction by switching to the designer mode.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/annotations', component: AnnotationsComponent , name: 'Annotations', order: '12', category: 'Annotation', description: 'This sample demonstrates the creation of different types of annotations such as Text Markup, Shapes, Measurements, Free text, Stamps, Handwritten signature, ink, and sticky notes in the PDF Viewer. And also we can customize the added annotations or we can include new annotations through user interaction from the PDF Viewer.'},
     // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/hand-written', component: HandwrittenComponent , name: 'Handwritten Signature', order: '13', category: 'Signature', description: 'This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/invisible-signature', component: InvisibleSignatureComponent , name: 'Invisible Signature', order: '13', category: 'Signature', description: 'This sample demonstrates how to digitally sign a PDF document from code behind using Syncfusion PDF Viewer and PDF Library'},
];

export const pdfViewerRouter: ModuleWithProviders<any> = RouterModule.forChild(pdfViewerAppRoutes);

@NgModule({
    imports: [SharedModule,pdfViewerRouter, PdfViewerModule, MenuModule, ToolbarModule, DialogModule,MessageModule,SwitchModule, GridModule],
    declarations: [DefaultPdfViewerComponent,CustomToolbarComponent,RightToLeftComponent,FormFillingComponent, FormDesignerComponent, HandwrittenComponent, AnnotationsComponent, InvisibleSignatureComponent, DocumentListComponent, ReadOnlyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PdfViewerSampleModule { }
