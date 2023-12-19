import { Component, ViewEncapsulation, OnInit,ViewChild} from '@angular/core';
import {
    PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, LoadEventArgs
} from '@syncfusion/ej2-angular-pdfviewer';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'read-only.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, 
                TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService],
    styleUrls: ['pdfviewer.component.css'],

})

export class ReadOnlyComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;

    public annotation={
        isLock: true,
    };    

    public document: string = 'https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf';
    public resource:string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    public toolbarSettings = { showTooltip: true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption'] }
    ngOnInit(): void {
        // ngOnInit function
    };

    Created(e: any): void {
        let viewer = (document.getElementById('pdfViewer') as any).ej2_instances[0];
        viewer.textFieldSettings = {
            isReadOnly: true,
        };
        viewer.radioButtonFieldSettings = {
            isReadOnly: true,
        };
    
        viewer.DropdownFieldSettings = {        
            isReadOnly: true,        
        }
        viewer.checkBoxFieldSettings = {         
            isReadOnly: true,         
        };
        viewer.signatureFieldSettings = {
            isReadOnly:true,
        };
        viewer.initialFieldSettings = {
            isReadOnly: true,
        };
        viewer.listBoxFieldSettings = {
            isReadOnly: true,
        };
        viewer.passwordFieldSettings = {
            isReadOnly: true,
        };
        this.pdfviewerControl.contextMenuOption ='None';
        this.pdfviewerControl.dataBind();
        
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






