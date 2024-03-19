import { Component, ViewEncapsulation, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, PageChangeEventArgs, LoadEventArgs, FormFieldsService, FormDesignerService,PageOrganizerService, AddSignatureEventArgs, PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
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
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, FormFieldsService, FormDesignerService,PageOrganizerService],
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
public document: string = 'InvisibleDigitalSignature.pdf';
public service:string ='https://services.syncfusion.com/angular/production/api/pdfviewer';
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
        this.pdfviewerControl.serverActionSettings.download = 'AddSignature';
        let data: any;
        let base64data: any;
        this.pdfviewerControl.saveAsBlob().then((value) => {
          data = value;
          var reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = () => {
            base64data = reader.result;
            this.documentData = base64data;
            this.pdfviewerControl.load(base64data, null);
            this.downloadVisibility = false;
            this.buttonVisibility = true;
            this.pdfviewerControl.fileName = this.fileName;
            this.pdfviewerControl.downloadFileName = this.fileName;
            this.customToolbar.items[1].disabled = true;
            this.customToolbar.items[2].disabled = false;
          };
      
        });
        this.pdfviewerControl.serverActionSettings.download = 'Download';
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
