import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, LoadEventArgs, FormFieldsService, FormDesignerService
} from '@syncfusion/ej2-angular-pdfviewer';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'hand-written.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, 
               TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService] ,
    styleUrls: ['pdfviewer.component.css'],
})

export class HandwrittenComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;

    public document: string = 'https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf';
    public resource:string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    ngOnInit(): void {
        // ngOnInit function
    }
    public documentLoad(e: LoadEventArgs): void {
        this.pdfviewerControl.annotationModule.setAnnotationMode('HandWrittenSignature');
    }
    public change(e: any): void {
        if (e.checked) {
            this.pdfviewerControl.serviceUrl = '';
        }
        else {
            this.pdfviewerControl.serviceUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
        }
        this.pdfviewerControl.dataBind();
        this.pdfviewerControl.load(this.pdfviewerControl.documentPath, null);
    }
}
