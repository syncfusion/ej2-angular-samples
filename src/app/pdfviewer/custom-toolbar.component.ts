import { Component, ViewEncapsulation, OnInit, ViewChild, Inject } from '@angular/core';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService,
    ToolbarService, NavigationService, TextSelectionService, PrintService,
    IPageChangeEventArgs,
    ILoadEventArgs
} from '@syncfusion/ej2-angular-pdfviewer';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-toolbar.html',
    encapsulation: ViewEncapsulation.None,
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService],
    styleUrls: ['pdfviewer.component.css'],
})

export class CustomToolbarComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('customToolbar')
    public customToolbar: ToolbarComponent;
    @ViewChild('zoomToolbar')
    public zoomToolbar: ToolbarComponent;
    public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    public document: string = 'Hive_Succinctly.pdf';
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

    public previousClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.navigation.goToPreviousPage();
    }

    public nextClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.navigation.goToNextPage();
    }

    public printClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.print.print();
    }

    public downloadClicked(e: ClickEventArgs): void {
        let fileName: string = (document.getElementById('fileUpload') as HTMLInputElement).value.split('\\').pop();
        if (fileName !== '') {
            this.pdfviewerControl.fileName = fileName;
        }
        this.pdfviewerControl.download();
    }

    public pageFitClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.magnification.fitToPage();
        this.updateZoomButtons();
        this.customToolbar.enableItems(document.getElementById('fitPage'), false);
    }

    public zoomInClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.magnification.zoomIn();
        this.updateZoomButtons();
    }

    public zoomOutClicked(e: ClickEventArgs): void {
        this.pdfviewerControl.magnification.zoomOut();
        this.updateZoomButtons();
    }

    public pageChanged(e: IPageChangeEventArgs): void {
        (document.getElementById('currentPage') as HTMLInputElement).value = this.pdfviewerControl.currentPageNumber.toString();
        this.updatePageNavigation();
    }

    public documentLoaded(e: ILoadEventArgs): void {
        document.getElementById('totalPage').textContent = 'of ' + this.pdfviewerControl.pageCount;
        (document.getElementById('currentPage') as HTMLInputElement).value = this.pdfviewerControl.currentPageNumber.toString();
        this.updatePageNavigation();
    }

    public onCurrentPageBoxClicked(e: ClickEventArgs): void {
        (document.getElementById('currentPage') as HTMLInputElement).select();
    }

    public onCurrentPageBoxKeypress(e: KeyboardEvent): boolean {
        if ((e.which < 48 || e.which > 57) && e.which !== 8 && e.which !== 13) {
            e.preventDefault();
            return false;
        } else {
            // tslint:disable-next-line:radix
            const currentPageNumber: number = parseInt((document.getElementById('currentPage') as HTMLInputElement).value);
            if (e.which === 13) {
                if (currentPageNumber > 0 && currentPageNumber <= this.pdfviewerControl.pageCount) {
                    this.pdfviewerControl.navigation.goToPage(currentPageNumber);
                } else {
                    // tslint:disable-next-line:max-line-length
                    (document.getElementById('currentPage') as HTMLInputElement).value = this.pdfviewerControl.currentPageNumber.toString();
                }
            }
            return true;
        }
    }

    private updatePageNavigation(): void {
        if (this.pdfviewerControl.currentPageNumber === 1) {
            this.customToolbar.enableItems(document.getElementById('previousPage'), false);
            this.customToolbar.enableItems(document.getElementById('nextPage'), true);
        } else if (this.pdfviewerControl.currentPageNumber === this.pdfviewerControl.pageCount) {
            this.customToolbar.enableItems(document.getElementById('previousPage'), true);
            this.customToolbar.enableItems(document.getElementById('nextPage'), false);
        } else {
            this.customToolbar.enableItems(document.getElementById('previousPage'), true);
            this.customToolbar.enableItems(document.getElementById('nextPage'), true);
        }
    }

    private updateZoomButtons(): void {
        if (this.pdfviewerControl.zoomPercentage <= 50) {
            this.zoomToolbar.enableItems(document.getElementById('zoomIn'), true);
            this.zoomToolbar.enableItems(document.getElementById('zoomOut'), false);
            this.zoomToolbar.enableItems(document.getElementById('fitPage'), true);
        } else if (this.pdfviewerControl.zoomPercentage >= 400) {
            this.zoomToolbar.enableItems(document.getElementById('zoomIn'), false);
            this.zoomToolbar.enableItems(document.getElementById('zoomOut'), true);
            this.zoomToolbar.enableItems(document.getElementById('fitPage'), true);
        } else {
            this.zoomToolbar.enableItems(document.getElementById('zoomIn'), true);
            this.zoomToolbar.enableItems(document.getElementById('zoomOut'), true);
            this.zoomToolbar.enableItems(document.getElementById('fitPage'), true);
        }
    }

    // tslint:disable-next-line
    private readFile(args: any): void {
        // tslint:disable-next-line
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                reader.readAsDataURL(uploadedFile);
                // tslint:disable-next-line
                let proxy: any = this;
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    proxy.pdfviewerControl.load(uploadedFileUrl, null);
                };
            }
        }
    }
}
