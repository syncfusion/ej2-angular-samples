import { Component, ViewEncapsulation, OnInit, ViewChild, Inject } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, DynamicStampItem, SignStampItem, StandardBusinessStampItem, PageChangeEventArgs, LoadEventArgs, AnnotationService, FormDesignerService, FormFieldsService, PageOrganizerService, TextSearchService, TextSelection, PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { ToolbarComponent, MenuItemModel, ToolbarModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom-toolbar.html',
    encapsulation: ViewEncapsulation.None,
    providers: [LinkAnnotationService, BookmarkViewService, TextSearchService, TextSelectionService, MagnificationService, ToolbarService, NavigationService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService,PageOrganizerService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SwitchModule,
        ToolbarModule,
        MenuModule,
        PdfViewerModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})

export class CustomToolbarComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('customToolbar')
    public customToolbar: ToolbarComponent;
    @ViewChild('zoomToolbar')
    public zoomToolbar: ToolbarComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;

    public document: string = 'https://cdn.syncfusion.com/content/pdf/hive-succinctly.pdf';
    public resource: string ='https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib';
    public selectedFormField: any;
    public matchCase = false;
    public isInkEnabled = false;
    public searchActive = false;
    public menuItems: MenuItemModel[] = [{
        iconCss: 'e-icons e-stamp',
        items: [
          {
            text: 'Dynamic',
            items: [
              { text: 'Revised', id: 'Dynamic' },
              { text: 'Reviewed', id: 'Dynamic' },
              { text: 'Received', id: 'Dynamic' },
              { text: 'Confidential', id: 'Dynamic' },
              { text: 'Approved', id: 'Dynamic' },
              { text: 'Not Approved', id: 'Dynamic' },
            ],
          },
          {
            text: 'Sign Here',
            items: [
              { text: 'Witness', id: 'Sign Here' },
              { text: 'Initial Here', id: 'Sign Here' },
              { text: 'Sign Here', id: 'Sign Here' },
              { text: 'Accepted', id: 'Sign Here' },
              { text: 'Rejected', id: 'Sign Here' }
            ],
          },
          {
            text: 'Standard Business',
            items: [
              { text: 'Approved', id: 'Standard Business' },
              { text: 'Not Approved', id: 'Standard Business' },
              { text: 'Draft', id: 'Standard Business' },
              { text: 'Final', id: 'Standard Business' },
              { text: 'Completed', id: 'Standard Business' },
              { text: 'Confidential', id: 'Standard Business' },
              { text: 'For Public Release', id: 'Standard Business' },
              { text: 'Not For Public Release', id: 'Standard Business' },
              { text: 'For Comment', id: 'Standard Business' },
              { text: 'Void', id: 'Standard Business' },
              { text: 'Preliminary Results', id: 'Standard Business' },
              { text: 'Information Only', id: 'Standard Business' }
            ],
          },
        ],
      },
      ];

      public signatureMenuItems: MenuItemModel[] = [{
        iconCss: 'e-icons e-signature',
        items: [
          {
            text: 'ADD SIGNATURE'
          },
          {
            text: 'ADD INITIAL'
          }
        ],
      },
      ];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['pdfviewer.component.css'];
    }
    ngOnInit(): void {
        // ngOnInit function
        document.getElementById('fileUpload').addEventListener('change', this.readFile.bind(this));
    }

    public openDocument(e: ClickEventArgs): void {
      this.disableInkAnnotation(); 
      document.getElementById('fileUpload').click();
    }

    public previousClicked(e: ClickEventArgs): void {
      this.disableInkAnnotation(); 
        this.pdfviewerControl.navigation.goToPreviousPage();
    }

    public nextClicked(e: ClickEventArgs): void {
      this.disableInkAnnotation(); 
        this.pdfviewerControl.navigation.goToNextPage();
    }

    public printClicked(e: ClickEventArgs): void {
      this.disableInkAnnotation(); 
        this.pdfviewerControl.print.print();
    }

    public saveClicked(e: ClickEventArgs): void {
      this.disableInkAnnotation(); 
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

    public pageChanged(e: PageChangeEventArgs): void {
        (document.getElementById('currentPage') as HTMLInputElement).value = this.pdfviewerControl.currentPageNumber.toString();
        this.updatePageNavigation();
    }

    fileNameTemplate(): any {
      return `<div ><label id="documentFileName" style="color: white;font-size: 20px;"></label></div>`;
    }
    contentTemplate(): any {
      return `<ejs-menu #menu  (select)="select($event)" [items]='menuItems'></ejs-menu> `;
    }
  
    public select(args: any): void {
      this.disableInkAnnotation(); 
      const stampText = args.element.innerText;
      const stampId = args.element.id;
      const textSearchToolbarElement = document.getElementById('textSearchToolbar');
      if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
        textSearchToolbarElement.style.display = 'none';
      }
  
      const formFieldToolbarElement = document.getElementById('formFieldToolbar');
      if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
        formFieldToolbarElement.style.display = 'none';
        this.pdfviewerControl.designerMode = false;
      }
      if (stampId === 'Dynamic' && stampText != null) {
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        if (stampText === 'Revised') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.Revised);
        } else if (stampText === 'Reviewed') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.Reviewed);
        } else if (stampText === 'Received') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.Received);
        } else if (stampText === 'Confidential') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.Confidential);
        } else if (stampText === 'Approved') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.Approved);
        } else if (stampText === 'Not Approved') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', DynamicStampItem.NotApproved);
        }
      }
  
      if (stampId === 'Sign Here' && stampText != null) {
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        if (stampText === 'Witness') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, SignStampItem.Witness);
        } else if (stampText === 'Initial Here') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, SignStampItem.InitialHere);
        } else if (stampText === 'Sign Here') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, SignStampItem.SignHere);
        } else if (stampText === 'Accepted') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, SignStampItem.Accepted);
        } else if (stampText === 'Rejected') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, SignStampItem.Rejected);
        }
      }
  
      if (stampId === 'Standard Business' && stampText != null) {
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        if (stampText === 'Approved') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Approved);
        } else if (stampText === 'Not Approved') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.NotApproved);
        } else if (stampText === 'Draft') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Draft);
        } else if (stampText === 'Final') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Final);
        } else if (stampText === 'Completed') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Completed);
        } else if (stampText === 'Confidential') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Confidential);
        } else if (stampText === 'For Public Release') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.ForPublicRelease);
        } else if (stampText === 'Not For Public Release') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.NotForPublicRelease);
        } else if (stampText === 'For Comment') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.ForComment);
        } else if (stampText === 'Void') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.Void);
        } else if (stampText === 'Preliminary Results') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.PreliminaryResults);
        } else if (stampText === 'Information Only') {
          this.pdfviewerControl.annotation.setAnnotationMode('Stamp', null, null, StandardBusinessStampItem.InformationOnly);
        }
      }
    }

    public documentLoaded(e: LoadEventArgs): void {
        document.addEventListener('click', this.checkSearchActive.bind(this));
        document.getElementById('totalPage').textContent = 'of ' + this.pdfviewerControl.pageCount;
        (document.getElementById('currentPage') as HTMLInputElement).value = this.pdfviewerControl.currentPageNumber.toString();
        this.updatePageNavigation();
    }

    public textSelection(e: ClickEventArgs) {
      this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.interactionMode = 'TextSelection';
        this.pdfviewerControl.enableTextSelection = true;
    
        const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
        if (editAnnotationToolbarElement?.style.display === 'block') {
          editAnnotationToolbarElement.style.display = 'none';
        }
    
        const textSearchToolbarElement = document.getElementById('textSearchToolbar');
        if (textSearchToolbarElement?.style.display === 'block') {
          textSearchToolbarElement.style.display = 'none';
        }
    
        const formFieldToolbarElement = document.getElementById('formFieldToolbar');
        if (formFieldToolbarElement?.style.display === 'block') {
          formFieldToolbarElement.style.display = 'none';
          this.pdfviewerControl.designerMode = false;
        }
      }
    
      public panMode(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.interactionMode = 'Pan';
        
    
        const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
        if (editAnnotationToolbarElement?.style.display === 'block') {
          editAnnotationToolbarElement.style.display = 'none';
        }
    
        const textSearchToolbarElement = document.getElementById('textSearchToolbar');
        if (textSearchToolbarElement?.style.display === 'block') {
          textSearchToolbarElement.style.display = 'none';
        }
    
        const formFieldToolbarElement = document.getElementById('formFieldToolbar');
        if (formFieldToolbarElement?.style.display === 'block') {
          formFieldToolbarElement.style.display = 'none';
          this.pdfviewerControl.designerMode = false;
        }
      }
      public openEditAnnotation(e: ClickEventArgs): void {
        this.disableInkAnnotation(); 
        const textSearchToolbarElement = document.getElementById('textSearchToolbar');
        if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
          textSearchToolbarElement.style.display = 'none';
        }
    
        const formFieldToolbarElement = document.getElementById('formFieldToolbar');
        if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
          formFieldToolbarElement.style.display = 'none';
          this.pdfviewerControl.designerMode = false;
        }
        const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
        if (editAnnotationToolbarElement !== null) {
          if (editAnnotationToolbarElement.style.display === 'block') {
            editAnnotationToolbarElement.style.display = 'none';
          } else {
            editAnnotationToolbarElement.style.display = 'block';
          }
        }
    
      }
      public highlight(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Highlight');
      }
    
      public underLine(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Underline');
      }
    
      public strikeThrough(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Strikethrough');
      }
    
      public addLine(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Line');
      }
    
      public addArrow(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Arrow')
      }
    
      public addRectangle(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Rectangle');
      }
    
      public addCircle(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Circle');
      }
    
      public addPoligon(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Polygon');
      }
    
      public distance(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Distance');
      }
    
      public perimeter(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Perimeter');
      }
    
      public area(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Area');
      }
    
      public radius(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Radius');
      }
    
      public volume(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('Volume');
      }
    
      public freeText(e: ClickEventArgs) {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        this.pdfviewerControl.annotation.setAnnotationMode('FreeText');
      }
    
      public addEditFormFields(e: ClickEventArgs): void {
        this.disableInkAnnotation(); 
        if(this.pdfviewerControl.tool == 'Ink'){
          this.pdfviewerControl.annotation.setAnnotationMode('Ink');
        }
        const formFieldToolbarElement = document.getElementById('formFieldToolbar');
        if (formFieldToolbarElement !== null) {
          if (formFieldToolbarElement.style.display === 'block') {
            formFieldToolbarElement.style.display = 'none';
            this.pdfviewerControl.designerMode = false;
          } else {
            formFieldToolbarElement.style.display = 'block';
            this.pdfviewerControl.designerMode = true;
          }
        }
    
        const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
        if (editAnnotationToolbarElement !== null && editAnnotationToolbarElement.style.display === 'block') {
          editAnnotationToolbarElement.style.display = 'none';
        }
    
        const textSearchToolbarElement = document.getElementById('textSearchToolbar');
        if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
          textSearchToolbarElement.style.display = 'none';
        }
      }
      
      public ink(e: ClickEventArgs) {
        if(!this.isInkEnabled)
          {
            this.pdfviewerControl.annotation.setAnnotationMode("Ink");
            this.isInkEnabled=true;
          }
          else
          {
            this.pdfviewerControl.annotation.setAnnotationMode("None");
            this.isInkEnabled =false;
          }
      }
      public disableInkAnnotation() {
        if (this.isInkEnabled) {
          this.pdfviewerControl.annotation.setAnnotationMode("None");
            this.isInkEnabled = false;
        }
      }
    
      public textBox(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('Textbox');
      }
    
      public passWord(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('Password');
      }
    
      public checkBox(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('CheckBox');
      }
    
      public radioButton(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('RadioButton');
      }
    
      public dropDown(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('DropDown');
      }
    
      public listBox(e: ClickEventArgs) {
        this.pdfviewerControl.formDesignerModule.setFormFieldMode('ListBox');
      }

      onSignatureClick(event: any): void {
        const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
        if (editAnnotationToolbarElement?.style.display === 'block') {
          if (event.element instanceof HTMLElement) {
            if (event.element.innerText === 'ADD SIGNATURE') {
              this.pdfviewerControl.annotationModule.setAnnotationMode('HandWrittenSignature');
            } else if (event.element.innerText === 'ADD INITIAL') {
              this.pdfviewerControl.annotationModule.setAnnotationMode('Initial');
            }
          }
        }
    
        const formFieldToolbarElement = document.getElementById('formFieldToolbar');
        if (formFieldToolbarElement?.style.display === 'block') {
          if (event.element instanceof HTMLElement) {
            if (event.element.innerText === 'ADD SIGNATURE') {
              this.pdfviewerControl.formDesignerModule.setFormFieldMode('SignatureField');
            } else if (event.element.innerText === 'ADD INITIAL') {
              this.pdfviewerControl.formDesignerModule.setFormFieldMode('InitialField');
            }
          }
        }
      }
    
  public findText(e: ClickEventArgs): void {
    if(this.pdfviewerControl.tool == 'Ink'){
      this.pdfviewerControl.annotation.setAnnotationMode('Ink');
    }
    const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
    if (editAnnotationToolbarElement !== null && editAnnotationToolbarElement.style.display === 'block') {
      editAnnotationToolbarElement.style.display = 'none';
    }

    const textSearchToolbarElement = document.getElementById('textSearchToolbar');
    if (textSearchToolbarElement !== null) {
      if (textSearchToolbarElement.style.display === 'block') {
        textSearchToolbarElement.style.display = 'none';
      } else {
        textSearchToolbarElement.style.display = 'block';
      }
    }

    const formFieldToolbarElement = document.getElementById('formFieldToolbar');
    if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
      formFieldToolbarElement.style.display = 'none';
      this.pdfviewerControl.designerMode = false;
    }
  }
  
  public searchInputKeypressed(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.initiateTextSearch();
    }
  }

  public searchText: string = '';
  public prevMatchCase = false;
  public initiateTextSearch(): void {
    const textsearchPrevElement = document.getElementById('container_prev_occurrence') as HTMLButtonElement;
    const textsearchNextElement = document.getElementById('container_next_occurrence') as HTMLButtonElement;
    var textsearchElement = document.getElementById('container_search_box-icon') as HTMLElement;
    if (textsearchNextElement && textsearchPrevElement && textsearchElement) {
      textsearchElement.classList.add('e-close');
      textsearchElement.classList.remove('e-search');
      textsearchPrevElement.disabled = false;
      textsearchNextElement.disabled = false;
      if (this.searchText !== (document.getElementById('container_search_input') as HTMLInputElement).value || this.prevMatchCase !== this.matchCase) {
        textsearchPrevElement.addEventListener("click", this.previousTextSearch);
        textsearchNextElement.addEventListener("click", this.nextTextSearch);
        this.pdfviewerControl.textSearch.cancelTextSearch();
        this.searchText = (document.getElementById('container_search_input') as HTMLInputElement).value;
        this.searchActive = true;
        this.pdfviewerControl.textSearch.searchText(this.searchText, this.matchCase);
        this.prevMatchCase = this.matchCase;
      }
      else{
        this.nextTextSearch();
      }
    }
  }

  public previousTextSearch(): void {
    this.pdfviewerControl.textSearchModule.searchPrevious();
    this.searchActive = true;
  }

  public checkSearchActive() {
    if(!this.searchActive) {
      this.pdfviewerControl.textSearchModule.clearAllOccurrences();
    }
  }
  
  public searchClickHandler(): void {
    var searchBtn = document.getElementById('container_search_box-icon') as HTMLElement;
    if (searchBtn.classList.contains('e-search')) {
      this.pdfviewerControl.textSearch.cancelTextSearch();
      this.initiateTextSearch();
      this.updateSearchInputIcon(false);
      this.searchText = '';
    }
    else if (searchBtn.classList.contains('e-close')) {
      var searchInput = document.getElementById('container_search_input') as HTMLInputElement;
      this.updateSearchInputIcon(true);
      searchInput.value = '';
      searchInput.focus();
      this.pdfviewerControl.textSearch.cancelTextSearch();
      this.searchText = '';
    }
  }
  
  public updateSearchInputIcon(isEnable: Boolean) {
    var searchBtn = document.getElementById('container_search_box-icon') as HTMLElement;
    if (isEnable) {
      searchBtn.classList.add('e-search');
      searchBtn.classList.remove('e-close');
    } 
    else {
      searchBtn.classList.add('e-close');
      searchBtn.classList.remove('e-search');
    }
  }

  public inputChange(): void {
   this.pdfviewerControl.textSearch.clearAllOccurrences();
    this.searchActive = false;
    var searchInput = document.getElementById('container_search_input') as HTMLInputElement;
    if(searchInput.value == '') {
      this.updateSearchInputIcon(true);
      this.pdfviewerControl.textSearch.cancelTextSearch();
      this.searchText = '';
    }
  }

  public nextTextSearch(): void {
    this.searchActive = true;
    this.pdfviewerControl.textSearch.searchNext();
  }

  public checkBoxChanged(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      const matchcaseElement = document.getElementById('container_match_case') as HTMLInputElement;
      if (matchcaseElement) {
        matchcaseElement.checked = true;
      }
      this.matchCase = true;
      const checkboxSpanElement = document.getElementById('checkboxSpan');
      if (checkboxSpanElement) {
        checkboxSpanElement.classList.add('e-check');
      }
    } else {
      this.matchCase = false;
      const checkboxSpanElement = document.getElementById('checkboxSpan');
      if (checkboxSpanElement) {
        checkboxSpanElement.classList.remove('e-check');
      }
    }
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
            let filename = upoadedFiles[0].name;
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                reader.readAsDataURL(uploadedFile);
                // tslint:disable-next-line
                let proxy: any = this;
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    proxy.pdfviewerControl.documentPath = uploadedFileUrl;
                    proxy.pdfviewerControl.fileName = filename;
                    proxy.pdfviewerControl.downloadFileName = filename;
                };
            }
        }
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
