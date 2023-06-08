import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, LoadEventArgs, FormFieldsService, FormDesignerService
} from '@syncfusion/ej2-angular-pdfviewer';

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'hand-written.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService] 
})

export class HandwrittenComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;

    public service: string = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
    public document: string = 'HandwrittenSignature.pdf';
    ngOnInit(): void {
        // ngOnInit function
    }
    public documentLoad(e: LoadEventArgs): void {
        this.pdfviewerControl.annotationModule.setAnnotationMode('HandWrittenSignature');
    }
}
