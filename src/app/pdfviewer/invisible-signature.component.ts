import { Component, ViewEncapsulation, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, PageChangeEventArgs, LoadEventArgs, FormFieldsService, AnnotationService, FormDesignerService,PageOrganizerService, AddSignatureEventArgs, PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { ToolbarComponent, Toolbar, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { Message } from '@syncfusion/ej2-notifications/src/message/message';
import { MessageComponent, MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Toolbar as Tool, TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'invisible-signature.html',
    encapsulation: ViewEncapsulation.None,
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService,PageOrganizerService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        ToolbarModule,
        MessageModule,
        PdfViewerModule,
        SBDescriptionComponent,
    ],
})

export class InvisibleSignatureComponent implements OnInit{
     
@ViewChild('pdfviewer')
public pdfviewerControl: PdfViewerComponent;
public document: string = 'https://cdn.syncfusion.com/content/pdf/InvisibleDigitalSignature.pdf';
public resource: string ='https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib';
public url: string ="https://services.syncfusion.com/angular/production/api/pdfviewer/AddSignature";
public msgWarning=  "The document has been digitally signed and at least one signature has problem ";
public  msgError="The document has been digitally signed, but it has been modified since it was signed and at least one signature is invalid .";
public msgSuccess="The document has been digitally signed and all the signatures are valid";
//Specifies the visibility of the complete signing.
public buttonVisibility: boolean = true;
//Specifies the visibility of the download icon
public downloadVisibility: boolean = true;
public successVisible: boolean = false;
public errorVisible: boolean = false;
public warningVisible: boolean = false;
public  documentData  :any;
public fileName :any;
// Specifies whether the document has a digital signature or not.
public  hasDigitalSignature: boolean = false;
    @ViewChild('customToolbar')
    public customToolbar: ToolbarComponent;
    
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['pdfviewer.component.css'];
    }
 
    ngOnInit(): void {
        // ngOnInit function
        document.getElementById('fileUpload').addEventListener('change', this.readFile.bind(this));
    }

    public openDocument(e: ClickEventArgs): void {
        document.getElementById('fileUpload').click();
    }

 //Downloads the PDF document being loaded in the PDFViewer.
    public downloadClicked(e: ClickEventArgs): void {
        let fileName: string = (document.getElementById('fileUpload') as HTMLInputElement).value.split('\\').pop();
        if (fileName !== '') {
            this.pdfviewerControl.fileName = fileName;
        }
        this.pdfviewerControl.download();
    }
    readFile(args: any): void {
        // tslint:disable-next-line
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                this.fileName = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    this.customToolbar.items[2].disabled = true;
                    let uploadedFileUrl: string = e.currentTarget.result;
                    this.documentData = uploadedFileUrl;
                    this.pdfviewerControl.load(uploadedFileUrl, null);
                    this.pdfviewerControl.fileName = this.fileName;
                    this.pdfviewerControl.downloadFileName = this.fileName;
                };
            }
        }
    }
//Triggers while adding the signature in signature field.
    addSignature(args){
        let field: any;
        //To retrieve the form fields in the loaded PDF Document.
        field = this.pdfviewerControl.retrieveFormFields();
        let signatureFieldCount = 0;
        let signaturesCount = 0;
        for (var i = 0; i < field.Count; i++) {
            if (field[i].Type.ToString() == ("SignatureField")) {
                signatureFieldCount++;
            }
            if (field[i].Value != "" && field[i].Value != null && field[i].Type.ToString() == ("SignatureField")) {
                signaturesCount++;
            }
        }
        // Checks whether all the signature fields are signed or not.
        if (signatureFieldCount == signaturesCount) {
            //Checks whether the document has a digital signature or not.
            if (!this.hasDigitalSignature) {
                this.buttonVisibility = false;
                this.customToolbar.items[1].disabled = false;
            }
        }
    }
 //Triggers while validating the signature in the document.
    public signDocument(e: ClickEventArgs): void {
        this.pdfviewerControl.saveAsBlob().then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e: ProgressEvent<FileReader>) => {
              const base64String = e.target?.result;
              const xhr = new XMLHttpRequest();
              xhr.open('POST', this.url, true);
              xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
              const requestData = JSON.stringify({ base64String });
              xhr.onload = () => {
                if (xhr.status === 200) {
                    this.documentData = xhr.responseText;
                    this.pdfviewerControl.load(xhr.responseText, null);
                    this.customToolbar.items[1].disabled = true;
                    this.customToolbar.items[2].disabled = false;
                    this.pdfviewerControl.fileName = this.fileName;
                    this.pdfviewerControl.downloadFileName = this.fileName;
                } else {
                    console.error('Error in AddSignature API:', xhr.statusText);
                }
              };
              xhr.onerror = () => {
                console.error('Error reading Blob as Base64.', xhr.statusText);
            };
            xhr.send(requestData);
            };
          }).catch((error) => {
            console.error('Error saving Blob:', error);
          });
      }
//Reloads the PDF document with digital signature.
    documentLoad(args){
        this.fileName = args.documentName;
        const postData: any = {
            documentData: this.documentData
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };
        const apiUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer/ValidateSignature';
        fetch(apiUrl, options)
            .then(response => response.json())
            .then(body => {
                if (body.successVisible || body.warningVisible || body.errorVisible)
                    this.customToolbar.items[1].disabled = true;
                if (!body.downloadVisibility)
                    this.customToolbar.items[2].disabled = false;
                if ((body.successVisible)) {
                    setTimeout(() => {
                        this.msgSuccess = body.message;
                        this.successVisible = true;
                    }, 1000);
                    setTimeout(() => {
                        this.successVisible= false;
                    }, 5000);
                }
                if ((body.warningVisible)) {
                    this.msgWarning= body.message;
                    this.warningVisible= true;
                }
                if (body.errorVisible) {
                    this.msgError = body.message;
                    this.errorVisible = true;
                }

            });


    };
}
