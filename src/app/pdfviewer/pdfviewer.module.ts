import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule,MenuModule} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RouterModule } from '@angular/router';

import { DefaultPdfViewerComponent } from './default.component';
import { CustomToolbarComponent } from './custom-toolbar.component';
import { CustomContextMenuComponent } from './custom-context-menu.component';
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
import { OrganizePagesComponent } from './organize-pages.component';
import { MultiFormatViewerComponent } from './multi-format-viewer.component';
import { ESigningFormDesignerComponent } from './esigning-form-designer.component';
import { ESigningPdfFormsComponent } from './esigning-pdf-forms.component';
import { RedactionComponent } from './redaction.component';
import { ProgrammaticOperationsComponent } from './programmatic-operations.component';

export const pdfViewerAppRoutes: Object[] = [
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/default', component: DefaultPdfViewerComponent, name: 'Default functionalities', order: '06', category: 'PDF Viewer', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/read-only', component: ReadOnlyComponent , name: 'Read-Only', order: '07', category: 'Document Security', description: 'This sample demonstrates the Pdf Viewer in Read Only mode'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/document-list', component: DocumentListComponent , name: 'Document List', order: '08', category: 'File Management', description: 'This sample demonstrates to open PDF document in Read-only mode and Editable mode using PDF Viewer in Pop-up dialog'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/multi-format-viewer', component: MultiFormatViewerComponent , name: 'Multi-Format Viewer', order: '08', category: 'File Management', description: 'This sample demonstrates to loads various file types like PDFs, images, and Microsoft Office documents (Word, Excel, PowerPoint) into the PDF Viewer'}, 
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/organize-pages', component: OrganizePagesComponent , name: 'Organize Pages', order: '09', category: 'Editor', description: 'This sample demonstrates the page organization features of the PDF Viewer component, allowing users to effortlessly insert, delete, rearrange, copy, undo, redo, and rotate pages.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/redaction', component: RedactionComponent , name: 'Redaction', order: '09', category: 'Editor', description: 'This PDF viewer sample facilitates the permanent removal of sensitive or confidential data from PDF files.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/custom-toolbar', component: CustomToolbarComponent, name: 'Toolbar', order: '10', category: 'Customization', description: 'The PDF Viewer component is used to  view and print pdf documents in web applications.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/custom-context-menu', component: CustomContextMenuComponent, name: 'Context Menu', order: '10', category: 'Customization', description: 'The PDF Viewer component supports custom options for users who use to add custom options in context menu.' },
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/right-to-left', component: RightToLeftComponent, name: 'Right To Left', order: '11', category: 'Localization', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
	// tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/form-filling', component: FormFillingComponent, name: 'Form Filling', order: '12', category: 'PDF Form', description: 'The PdfViewer component is used to  view and print pdf documents in web applications.' },
     // tslint:disable-next-line:max-line-length
     { path: ':theme/pdfviewer/form-designer', component: FormDesignerComponent , name: 'Form Designer', order: '12', category: 'PDF Form', description: 'This sample demonstrates the creation of the supported Form fields in the PDF Viewer such as Textbox, Password, Checkbox, Radio Button, Drop Down, List box, Signature, and Initial. We can also customize these fields and can include new fields through the user interaction by switching to the designer mode.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/esigning-form-designer', component: ESigningFormDesignerComponent , name: 'eSigning Form Designer', order: '12', category: 'PDF Form', hideOnDevice: true, description: 'This sample enables the design of a PDF form that accommodates signatures from two different users. The form includes distinct fields for each user: when the first user is selected, specific fields can be added that apply only to that user. Upon switching the user via the dropdown menu, new fields can be added for the second user. The fields for each user are distinguishable by different background colors.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/esigning-pdf-forms', component: ESigningPdfFormsComponent , name: 'eSigning PDF Forms', order: '12', category: 'PDF Form', description: 'This sample enables the design of a PDF form that accommodates signatures from two different users. The form includes distinct fields for each user: when the first user is selected, specific fields can be added that apply only to that user. Upon switching the user via the dropdown menu, new fields can be added for the second user. The fields for each user are distinguishable by different background colors.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/annotations', component: AnnotationsComponent , name: 'Annotations', order: '13', category: 'Annotation', description: 'This sample demonstrates the creation of different types of annotations such as Text Markup, Shapes, Measurements, Free text, Stamps, Handwritten signature, ink, and sticky notes in the PDF Viewer. And also we can customize the added annotations or we can include new annotations through user interaction from the PDF Viewer.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/programmatic-operations', component: ProgrammaticOperationsComponent , name: 'Programmatic Operations', order: '13', type: 'new', category: 'Annotation', description: 'This example showcases how to programmatically create or edit various types of annotations in the PDF Viewer. These annotations include Text Markup, Shapes, Measurements, Free text, Stamps, Handwritten signature, Ink, and Sticky notes. Additionally, we can programmatically insert new annotations or programmatically update existing ones.'}, 
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/hand-written', component: HandwrittenComponent , name: 'Handwritten Signature', order: '14', category: 'Signature', description: 'This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.'},
    // tslint:disable-next-line:max-line-length
    { path: ':theme/pdfviewer/invisible-signature', component: InvisibleSignatureComponent , name: 'Invisible Signature', order: '14', category: 'Signature', description: 'This sample demonstrates how to digitally sign a PDF document from code behind using Syncfusion PDF Viewer and PDF Library'},
];

export const PdfViewerSampleModule: ModuleWithProviders<any> = RouterModule.forChild(pdfViewerAppRoutes);