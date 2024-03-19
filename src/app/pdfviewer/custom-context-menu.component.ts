import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { SwitchComponent, SwitchModule, CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MenuItemModel, MenuModule } from '@syncfusion/ej2-angular-navigations';
/**
 * Custom Context Menu PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-context-menu.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService,
        TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        SwitchModule,
        PdfViewerModule,
        SBDescriptionComponent,
        MenuModule,
        CheckBoxModule
    ],
})

export class CustomContextMenuComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;
    @ViewChild('hide')
    public hideObj: CheckBoxComponent;
    @ViewChild('toolbar')
    public toolbarObj: CheckBoxComponent;

    public document: string = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
    public resource: string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    ngOnInit(): void {
        // ngOnInit function
    }
    public menuItems: MenuItemModel[] = [
        {
            text: 'Search In Google',
            id: 'search_in_google',
            iconCss: 'e-icons e-de-ctnr-find'
        },
        {
            text: 'Lock Annotation',
            iconCss: 'e-icons e-lock',
            id: 'lock_annotation'
        },
        {
            text: 'Unlock Annotation',
            iconCss: 'e-icons e-unlock',
            id: 'unlock_annotation'
        },
        {
            text: 'Lock Form Fields',
            iconCss: 'e-icons e-lock',
            id: 'read_only_true'
        },
        {
            text: 'Unlock Form Fields',
            iconCss: 'e-icons e-unlock',
            id: 'read_only_false'
        },
    ]
    public documentLoaded(e: any): void {
        this.pdfviewerControl.addCustomMenu(this.menuItems, false, false);
    }

    public change(e: any): void {
        if (e.checked) {
            this.pdfviewerControl.serviceUrl = '';
        } else {
            this.pdfviewerControl.serviceUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
        }
        this.pdfviewerControl.dataBind();
        this.pdfviewerControl.load(this.pdfviewerControl.documentPath, null);
    }

    public customContextMenuSelect = (e: any): void => {
        switch (e.id) {
            case 'search_in_google':
                for (var i = 0; i < this.pdfviewerControl.textSelectionModule.selectionRangeArray.length; i++) {
                    var content = this.pdfviewerControl.textSelectionModule.selectionRangeArray[i].textContent;
                    if ((this.pdfviewerControl.textSelectionModule.isTextSelection) && (/\S/.test(content))) {
                        window.open('http://google.com/search?q=' + content);
                    }
                }
                break;
            case 'lock_annotation':
                this.lockAnnotations(e);
                break;
            case 'unlock_annotation':
                this.unlockAnnotations(e);
                break;
            case 'read_only_true':
                this.setReadOnlyTrue(e);
                break;
            case 'read_only_false':
                this.setReadOnlyFalse(e);
                break;
            case 'formfield properties':
                break;
            default:
                break;
        }
    }

    public customContextMenuBeforeOpen = (e: any): void => {
        for (var i = 0; i < e.ids.length; i++) {
            var search = document.getElementById(e.ids[i]);
            if (search) {
                search.style.display = 'none';
                if (e.ids[i] === 'search_in_google' && (this.pdfviewerControl.textSelectionModule) && this.pdfviewerControl.textSelectionModule.isTextSelection) {
                    search.style.display = 'block';
                } else if (e.ids[i] === "lock_annotation" || e.ids[i] === "unlock_annotation") {
                    var isLockOption = e.ids[i] === "lock_annotation";
                    for (var j = 0; j < this.pdfviewerControl.selectedItems.annotations.length; j++) {
                        var selectedAnnotation: any = this.pdfviewerControl.selectedItems.annotations[j];
                        if (selectedAnnotation && selectedAnnotation.annotationSettings) {
                            var shouldDisplay = (isLockOption && !selectedAnnotation.annotationSettings.isLock) ||
                                (!isLockOption && selectedAnnotation.annotationSettings.isLock);
                            search.style.display = shouldDisplay ? 'block' : 'none';
                        }
                    }
                }  else if ((e.ids[i] === "read_only_true" || e.ids[i] === "read_only_false") && this.pdfviewerControl.selectedItems.formFields.length !== 0) {
                    var isReadOnlyOption = e.ids[i] === "read_only_true";
                    for (var j = 0; j < this.pdfviewerControl.selectedItems.formFields.length; j++) {
                        var selectedFormFields = this.pdfviewerControl.selectedItems.formFields[j];
                        if (selectedFormFields) {
                            var selectedFormField = this.pdfviewerControl.selectedItems.formFields[j].isReadonly;
                            var displayMenu = (isReadOnlyOption && !selectedFormField) || (!isReadOnlyOption && selectedFormField);
                            search.style.display = displayMenu ? 'block' : 'none';
                        }
                    }
                } else if (e.ids[i] === 'formfield properties' && this.pdfviewerControl.selectedItems.formFields.length !== 0) {
                    search.style.display = 'block';
                }
            }
        }
    }
    
    public lockAnnotations(e: any) {
        for (var i = 0; i < this.pdfviewerControl.annotationCollection.length; i++) {
            if (this.pdfviewerControl.annotationCollection[i].uniqueKey === this.pdfviewerControl.selectedItems.annotations[0].id) {
                this.pdfviewerControl.annotationCollection[i].annotationSettings.isLock = true;
                this.pdfviewerControl.annotationCollection[i].isCommentLock = true;
                this.pdfviewerControl.annotation.editAnnotation(this.pdfviewerControl.annotationCollection[i]);
            }
            e.cancel = false;
        }
    }

    public unlockAnnotations(e: any) {
        for (var i = 0; i < this.pdfviewerControl.annotationCollection.length; i++) {
            if (this.pdfviewerControl.annotationCollection[i].uniqueKey === this.pdfviewerControl.selectedItems.annotations[0].id) {
                this.pdfviewerControl.annotationCollection[i].annotationSettings.isLock = false;
                this.pdfviewerControl.annotationCollection[i].isCommentLock = false;
                this.pdfviewerControl.annotation.editAnnotation(this.pdfviewerControl.annotationCollection[i]);
            }
            e.cancel = false;
        }
    }

    public setReadOnlyTrue(e: any) {
        var selectedFormFields = this.pdfviewerControl.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                this.pdfviewerControl.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: true,
                } as any);
            }
            e.cancel = false;
        }
    }

    public setReadOnlyFalse(e: any) {
        var selectedFormFields = this.pdfviewerControl.selectedItems.formFields;
        for (var i = 0; i < selectedFormFields.length; i++) {
            var selectedFormField = selectedFormFields[i];
            if (selectedFormField) {
                this.pdfviewerControl.formDesignerModule.updateFormField(selectedFormField, {
                    isReadOnly: false,
                } as any);
            }
            e.cancel = false;
        }
    }

    public contextmenuHelper(e: any): void {
        this.pdfviewerControl.addCustomMenu(this.menuItems, this.hideObj.checked, this.toolbarObj.checked);
    }
}