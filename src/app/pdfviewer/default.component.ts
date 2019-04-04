import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService
} from '@syncfusion/ej2-angular-pdfviewer';

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService]
})

export class DefaultPdfViewerComponent implements OnInit {
    public service: string = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    public document: string = 'PDF_Succinctly.pdf';
    ngOnInit(): void {
        // ngOnInit function
    }
}
