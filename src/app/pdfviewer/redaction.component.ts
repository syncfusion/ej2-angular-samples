import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, PageChangeEventArgs, LoadEventArgs, AnnotationService, FormDesignerService, PageOrganizerService, TextSearchService, PdfViewerModule, AnnotationAddEventArgs, AnnotationRemoveEventArgs, CreateArgs } from '@syncfusion/ej2-angular-pdfviewer';
import { ToolbarComponent, ToolbarModule, MenuModule, AppBarModule, ChangeEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { ButtonComponent, ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'redaction.html',
    encapsulation: ViewEncapsulation.None,
    providers: [LinkAnnotationService, BookmarkViewService, TextSearchService, TextSelectionService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, AnnotationService, FormDesignerService, PageOrganizerService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SwitchModule,
        AppBarModule,
        ToolbarModule,
        MenuModule,
        PdfViewerModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
        ButtonModule,
        DialogModule,
        UploaderModule,
        ComboBoxModule
    ],
})

export class RedactionComponent implements OnInit {

    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;

    @ViewChild('primaryToolbar')
    public primaryToolbar: ToolbarComponent;

    @ViewChild('secondaryToolbar')
    public secondaryToolbar: ToolbarComponent;

    @ViewChild('defaultButtonDownload') downloadBtn: ButtonComponent;

    @ViewChild('dialogComponent')
    public dialog: DialogComponent;

    @ViewChild('cancelButton')
    public cancelButton: ButtonComponent;
    public showCloseIcon: Boolean = true;
    public height = '482px';
    public target = '#e-pv-redact-sb-panel';
    public width = '477px';
    public visible: Boolean = false;
    public isModal: Boolean = true;

    @ViewChild('defaultupload')
    public uploadObj: UploaderComponent;
    public path: Object = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    public dropElement: HTMLElement = document.getElementsByClassName('drop-area-wrap')[0] as HTMLElement;
    public allowedExtensions = '.png, .jpg, .jpeg';
    public imageSrc: any;

    public onFileChange(args: any): void {
        var file = args.file[0].rawFile;
        let imageElement = document.getElementById('imageView');
        let imageElementContainer = document.getElementById('imageContainer');
        let base64String: any;
        var reader = new FileReader();
        reader.onload = (e) => {
            base64String = e.target?.result as string;
            this.imageSrc = base64String;
            this.customStampSource = this.imageSrc;
            (imageElement as any).src = this.imageSrc;
            imageElementContainer.className =
                'image-container e-pv-redact-sb-image-container-selected';
            (imageElement as any).style.display = 'block';
            // Bind click event to the image element
            imageElement.addEventListener('click', this.handleImageClick.bind(this));
        };
        reader.readAsDataURL(file);
    }

    public handleImageClick() {
        this.customStampSource = this.imageSrc;
        this.dialog.hide();
        this.addImage();
    }

    public ngAfterViewInit(): void {
        this.downloadBtn.element.setAttribute("aria-label", "menu");
    }

    public document: string = "https://cdn.syncfusion.com/content/pdf/programmatical-annotations.pdf";
    public resource: string = "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib"; 
    public url: string = "https://ej2services.syncfusion.com/angular/development/api/pdfviewer/Redaction";

    //zoom value
    public data: string[] = ['10%', '25%', '50%', '75%', '100%', '200%', '400%'];
    ngOnInit(): void {
        document.getElementById('fileUpload').addEventListener('change', this.readFile.bind(this));
    }

    public annotation: any;
    public redactionCount: number = 0;
    public fileName: string = "programmatical-annotations.pdf";
    //Updating the number of redaction while the annotation has been added
    annotationAdd = (e: AnnotationAddEventArgs): void => {
        var pdfAnnotationList = new Array();
        pdfAnnotationList = this.pdfviewerControl.annotationCollection;
        var selectedAnnotationIndex = pdfAnnotationList.findIndex(item => item.annotationId == e.annotationId);
        if (selectedAnnotationIndex != -1) {
            this.annotation = pdfAnnotationList[selectedAnnotationIndex];
        }
        if (this.annotation.author == "Redaction" || this.annotation.customStampName == "Image" || this.annotation.author == "Pattern" || this.annotation.author == "Text") {
            this.redactionCount = this.redactionCount + 1;
            this.updateRedaction();
        }

    }
    //Updating the number of redaction while the annotation has been removed
    annotationRemove = (e: AnnotationRemoveEventArgs): void => {
        if (this.annotation.author == "Redaction" || this.annotation.customStampName == "Image" || this.annotation.author == "Pattern" || this.annotation.author == "Text") {
            this.redactionCount = this.redactionCount - 1;
            this.updateRedaction();
        }
    }

    //To enable the redaction button based on count
    public updateRedaction(): void {
        if (this.redactionCount <= 0) {
            this.primaryToolbar.items[8].disabled = true;
        }
        else {
            this.primaryToolbar.items[8].disabled = false;
        }
    }

    //to read the file
    // tslint:disable-next-line
    private readFile(args: any): void {
        // tslint:disable-next-line
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            this.fileName = upoadedFiles[0].name;
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                reader.readAsDataURL(uploadedFile);
                // tslint:disable-next-line
                let proxy: any = this;
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    proxy.pdfviewerControl.documentPath = uploadedFileUrl;
                    proxy.pdfviewerControl.fileName = proxy.fileName;
                    proxy.pdfviewerControl.downloadFileName = proxy.fileName;
                };
            }
        }
    }

    //To open a file from viewer
    public openDocumentClicked(e: ClickEventArgs): void {
        document.getElementById('fileUpload').click();
    }

    //when the image button is clicked
    public imageDialog = (): void => {
        this.dialog.show();
    }

    //when cancel button clicked
    public closeDialog(e: ClickEventArgs): void {
        this.dialog.hide();
    }

    //Method to create rectangle annotation when "Text" button is clicked
    public addText(e: ClickEventArgs): void {
        this.pdfviewerControl.rectangleSettings = {
            fillColor: '#a3a2a0',
            strokeColor: '#a3a2a0',
            author: 'Text'
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Rectangle');
    }

    public customStampSource: any = "";
    //Adding the image to the pdf
    public addImage(): void {
        this.pdfviewerControl.stampSettings.author = "Image";
        this.pdfviewerControl.customStampSettings = {
            width: 200,
            author: 'Image',
            height: 125,
            isAddToMenu: false,
            enableCustomStamp: false

        };
        this.pdfviewerControl.customStamp = [
            {
                customStampName: 'Image',
                customStampImageSource: this.customStampSource
            },
        ];
    }

    //Method to create rectangle annotation when the "Pattern" button is clicked
    public addPattern(e: ClickEventArgs): void {
        this.pdfviewerControl.rectangleSettings = {
            fillColor: '#dedfe0',
            strokeColor: '#dedfe0',
            author: 'Pattern'
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Rectangle');
    }

    //Method to create rectangle annotation when the "Blackout" button is clicked
    public addBlackout(e: ClickEventArgs): void {
        this.pdfviewerControl.rectangleSettings = {
            fillColor: '#000000',
            strokeColor: '#000000',
            author: 'Redaction'
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Rectangle');
    }

    //Method to create rectangle annotation when the "Whiteout" button is clicked
    public addWhiteout(e: ClickEventArgs): void {
        this.pdfviewerControl.rectangleSettings = {
            fillColor: '#ffffff',
            strokeColor: '#ffffff',
            author: 'Redaction'
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Rectangle');

    }
    //To download the redacted pdf 
    public download(e: ClickEventArgs): void {
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
                  const responseBase64 = xhr.responseText.split('base64,')[1];
                  if (responseBase64) {
                    const blob = this.createBloburl(responseBase64, 'application/pdf');
                    const blobUrl = URL.createObjectURL(blob);
                    this.downloadDocument(blobUrl);
                  } else {
                    console.error('Invalid base64 response.');
                  }
                } else {
                  console.error('Download failed:', xhr.statusText);
                }
              };
              xhr.onerror = () => {
                console.error('An error occurred during the download:', xhr.statusText);
              };
              xhr.send(requestData);
            };
          }).catch((error) => {
            console.error('Error saving Blob:', error);
          });
    }

    public createBloburl(base64String: string, contentType: string):Blob{
        const sliceSize = 512;
        const byteCharacters = atob(base64String);
        const byteArrays: Uint8Array[] = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = Array.from(slice, char => char.charCodeAt(0));
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        return new Blob(byteArrays, { type: contentType });
    }

    public downloadDocument(blobUrl: string):void{
        const anchorElement = document.createElement('a');
        anchorElement.href = blobUrl;
        anchorElement.target = '_parent';
        this.pdfviewerControl.fileName = this.fileName;
        const downloadFileName = this.pdfviewerControl.fileName || 'downloadedFile.pdf';
        anchorElement.download = downloadFileName.endsWith('.pdf') ? downloadFileName : `${downloadFileName}.pdf`;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(blobUrl);
    }

    //Method for moving to previous page
    public previousClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.navigation.goToPreviousPage();
    }

    //Method for moving to next page 
    public nextClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.navigation.goToNextPage();
    }

    //to get current page
    public pageChanged(e: PageChangeEventArgs): void {
        (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = this.pdfviewerControl.currentPageNumber.toString() + ' ';
        this.updatePageNavigation();
    }

    public onLoad(e: CreateArgs)
    {
        (document.getElementById('e-pv-redact-sb-drop-area-wrap') as HTMLDivElement).style.display="flex";
        (document.getElementById('e-pv-redact-sb-appbar') as HTMLDivElement).style.display="block";
    }

    //while loading document
    public documentLoaded(e: LoadEventArgs): void {
        document.getElementById('e-pv-redact-sb-totalPage').textContent = '/ ' + this.pdfviewerControl.pageCount;
        (document.getElementById('e-pv-redact-sb-currentPage') as HTMLSpanElement).textContent = this.pdfviewerControl.currentPageNumber.toString() + ' ';
        this.updatePageNavigation();
        this.updateRedaction();
    }

    //Zoom values changes when the percentage is selected from the dropdown
    public zoom: any;
    public previousZoom: any;
    public zoomValueChange(e: ChangeEventArgs) {
        this.zoom = (e as any).value;
        this.previousZoom = (e as any).previousItemData.value;
        if (this.zoom !== null || this.previousZoom !== null) {
            var zoomchange = parseInt(this.zoom.replace("%", ""), 10);
            this.pdfviewerControl.magnificationModule.zoomTo(zoomchange);
        }
    }

    //Updating the navigation button based on the page number either "enabled" or "disabled"
    private updatePageNavigation(): void {
        if (this.pdfviewerControl.currentPageNumber === 1) {
            this.secondaryToolbar.items[0].disabled=true;
            this.secondaryToolbar.items[2].disabled=false;
        } else if (this.pdfviewerControl.currentPageNumber === this.pdfviewerControl.pageCount) {
            this.secondaryToolbar.items[0].disabled=false;
            this.secondaryToolbar.items[2].disabled=true;
        } else {
            this.secondaryToolbar.items[0].disabled=false;
            this.secondaryToolbar.items[2].disabled=false;
        }
    }

    //To redact the pdf in server side using the button click event
    public redaction(): void {
        if (this.redactionCount > 0) {
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
                            this.pdfviewerControl.load(xhr.responseText, null);
                        }
                        else {
                            console.error('Redaction failed:', xhr.statusText);
                        }
                    };
                    xhr.onerror = function () {
                        console.error('An error occurred during the redaction:', xhr.statusText);
                    };
                    xhr.send(requestData);
                }
            });
            this.redactionCount = 0;
            this.updateRedaction();
        }
    }

}