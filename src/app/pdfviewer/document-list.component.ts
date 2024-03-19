import { Component, ViewEncapsulation, OnInit,ViewChild} from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { pdfdata } from './grid-datasource';
import { GridComponent, CommandColumnService, CommandModel, CommandClickEventArgs, GridModule } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
 
@Component({
    selector: 'document-list',
    templateUrl: 'document-list.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService,
        TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, CommandColumnService, PageOrganizerService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        SwitchModule,
        GridModule,
        DialogModule,
        PdfViewerModule,
        SBDescriptionComponent,
    ],
})
 
export class DocumentListComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;
    @ViewChild('Dialog')
    public dialog: DialogComponent;
 
    public data: any = [];
    @ViewChild('grid') public grid?: GridComponent;
    public commands: CommandModel[];
    public isModal: boolean = true;
   
    public document: string = '';
    public resource:string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    ngOnInit(): void {
        // ngOnInit function
        this.data = pdfdata;
        this.commands = [{ buttonOption: { cssClass: 'e-icons e-eye e-flat' }, title: 'View'}, { buttonOption: { cssClass: 'e-icons e-edit e-flat' } , title: 'Edit'}];
    }
    public change(e: any): void {
        if (e.checked) {
            this.pdfviewerControl.serviceUrl = '';
        }
        else {
            this.pdfviewerControl.serviceUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
        }
    }

    openViewer(args: CommandClickEventArgs): void{
        let mode = args.target.title;
        this.dialog.header = args.rowData['FileName'];
        if (mode === 'View') {
            this.pdfviewerControl.enableStickyNotesAnnotation = false;
            this.pdfviewerControl.enableAnnotationToolbar = false;
            this.pdfviewerControl.isAnnotationToolbarVisible = false;
            this.pdfviewerControl.toolbarSettings = { showTooltip: true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SearchOption', 'PrintOption'] };
            this.pdfviewerControl.annotationSettings = {
                isLock: true,
            };
            this.pdfviewerControl.textFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.radioButtonFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.DropdownFieldSettings = {
                isReadOnly: true,
            }
            this.pdfviewerControl.checkBoxFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.signatureFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.initialFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.listBoxFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.passwordFieldSettings = {
                isReadOnly: true,
            };
            this.pdfviewerControl.contextMenuOption = 'None';
        } else {
            this.pdfviewerControl.enableStickyNotesAnnotation = true;
            this.pdfviewerControl.enableAnnotationToolbar = true;
            this.pdfviewerControl.toolbarSettings = { showTooltip: true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'SearchOption', 'AnnotationEditTool', 'FormDesignerEditTool', 'PrintOption', 'DownloadOption'] };
            this.pdfviewerControl.annotationSettings = {
                isLock: false,
            };
            this.pdfviewerControl.textFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.radioButtonFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.DropdownFieldSettings = {
                isReadOnly: false,
            }
            this.pdfviewerControl.checkBoxFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.signatureFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.initialFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.listBoxFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.passwordFieldSettings = {
                isReadOnly: false,
            };
            this.pdfviewerControl.contextMenuOption ='RightClick';
        }
        this.pdfviewerControl.dataBind();
        this.pdfviewerControl.load(args.rowData['Document'],null);
        this.dialog.show();
    }
}