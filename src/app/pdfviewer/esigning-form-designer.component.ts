import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, PdfViewerModule, TextFieldSettings, SignatureFieldSettings } from '@syncfusion/ej2-angular-pdfviewer';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule, SidebarModule, DragEventArgs } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { Draggable, Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'control-content',
  templateUrl: 'esigning-form-designer.html',
  encapsulation: ViewEncapsulation.None,
  providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService,
    TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService],
  styleUrls: ['pdfviewer.component.css'],
  standalone: true,
  imports: [
    SBActionDescriptionComponent,
    PdfViewerModule,
    SBDescriptionComponent,
    DropDownListModule,
    ButtonModule, ToolbarModule,
    CommonModule, SidebarModule
  ],
})

export class ESigningFormDesignerComponent implements OnInit {
  @ViewChild('pdfviewer')
  public pdfviewerControl: PdfViewerComponent;
  @ViewChild('sample')
  public listObj: DropDownListComponent;
  public isMobile: boolean = Browser.isDevice;
  public borderStyle:string = this.isMobile ? 'none' : '1px solid #C4C7C5';
  public fileName: string = "eSign_designMode.pdf";
  public document: string = 'https://cdn.syncfusion.com/content/PDFViewer/Fill+and+Sign.pdf';
  public zoomMode = "FitToPage";
  public resource: string = "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib";
  public currentUser: string = 'andrew@mycompany.com';
  public userColor: string = '#ffefef';
  public currentUserBorderColor: string = 'red';
  public fields: Object = { text: 'Mail', value: 'Id', id: 'fieldIds' };
  public height: string = '220px';
  public pdfViewer = document.getElementById("pdfViewer") as HTMLElement;
  public userDetails: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', Eimg: 'profile2', Id: "ff0000", Mail: "andrew@mycompany.com", fieldIds: [] },
    { Name: 'Anne Dodsworth', Eimg: 'profile1', Id: "00ff00", Mail: "anne@mycompany.com", fieldIds: [] }
  ];
  public defaultFieldWidth:number = 200;
  public defaultFieldHeight:number = 24;
  public checkBoxFieldSize:number = 20;
  public radioFieldSize:number = 20;
  public SignatureFieldSize:number = 66;
  public ListFieldSize:number = 66;
  public defaultZoomFactor:boolean;

  @ViewChild('textboxDiv', { static: false }) textboxDiv:  ButtonComponent;
  @ViewChild('signatureDiv', { static: false }) signatureDiv:  ButtonComponent;
  @ViewChild('passwordDiv', { static: false }) passwordDiv: ButtonComponent;
  @ViewChild('checkboxDiv', { static: false }) checkboxDiv: ButtonComponent;
  @ViewChild('radioButtonDiv', { static: false }) radioButtonDiv: ButtonComponent;
  @ViewChild('dropDownDiv', { static: false }) dropDownDiv: ButtonComponent;
  @ViewChild('listBoxDiv', { static: false }) listBoxDiv: ButtonComponent;
  @ViewChild('initialDiv', { static: false }) initialDiv: ButtonComponent;
  @ViewChild('downloadButton', { static: false }) downloadButton: ElementRef;
  constructor() {}

  ngOnInit() {
  }

  Created(e: any): void {
    const downloadElement = document.getElementById("e-pv-e-sign-download");
    if (this.isMobile) {
      downloadElement.style.border = 'none';
      downloadElement.style.width = '40px';
      downloadElement.removeChild(downloadElement.lastChild);
    } else {
      downloadElement.style.width = '115px';
      downloadElement.style.width = '1px solid #C4C7C5';
    }
  }
  
  public currentFieldType: string = '';
  public isDropped: boolean = false;
  public zoomFactor: any;

  initializeDraggable(element: HTMLElement, fieldType: string) {
      let cloneElement: HTMLElement;
      new Draggable(element, {
        helper: (e) => {
          if(e.sender.type == "mousemove"){
          this.zoomFactor = this.pdfviewerControl.viewerBase.getZoomFactor();
          cloneElement = document.createElement('div');
          cloneElement.style.width = (this.defaultFieldWidth*this.zoomFactor) + 'px';
          cloneElement.style.height = (this.defaultFieldHeight*this.zoomFactor) + 'px';
          cloneElement.style.borderRadius = '0';
          cloneElement.style.opacity = '0.5';
          switch (fieldType) {
            case 'SignatureField':
            case 'InitialField':
              cloneElement.style.height = (this.SignatureFieldSize*this.zoomFactor) + 'px';
              break;
            case 'CheckBox':
              cloneElement.style.height = (this.checkBoxFieldSize*this.zoomFactor) + 'px';
              cloneElement.style.width = (this.checkBoxFieldSize*this.zoomFactor) + 'px';
              break;
            case 'RadioButton':
              cloneElement.style.height = (this.radioFieldSize*this.zoomFactor) + 'px';
              cloneElement.style.width = (this.radioFieldSize*this.zoomFactor) + 'px';
              cloneElement.style.borderRadius = '50%';
              break;
            case 'ListBox':
              cloneElement.style.height = (this.ListFieldSize*this.zoomFactor) + 'px';
              break;
          }   
          cloneElement.style.backgroundColor = this.currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
          cloneElement.style.zIndex = '10001';
          cloneElement.style.position = 'absolute';
          cloneElement.style.pointerEvents = 'none';
          document.body.appendChild(cloneElement);
          return cloneElement;
        }else{
          return null;
        }
        },
        dragStart: (e) => {
          this.currentFieldType = fieldType;
          this.isDropped = true;
          this.getCursorAtPosition(fieldType);
        },
        dragStop: (e) => {
          if (e.helper && e.helper.parentNode) {
            e.helper.parentNode.removeChild(e.helper);
          }  
          this.isDropped = false;
        }, 
        clone: true,    
        cursorAt: this.getCursorAtPosition(fieldType),
        enableTailMode: true,
      });
  }

  getCursorAtPosition(fieldType) {
    if (this.defaultZoomFactor) {
      this.zoomFactor = 1;
    } else {
      this.zoomFactor = this.pdfviewerControl.viewerBase.getZoomFactor();
    }

    var left, top;

    let scaledWidth = this.defaultFieldWidth * this.zoomFactor;
    let scaledHeight = this.defaultFieldHeight * this.zoomFactor;

    switch (fieldType) {
      case 'CheckBox':
      case 'RadioButton':
        scaledWidth = this.checkBoxFieldSize * this.zoomFactor;
        scaledHeight = this.checkBoxFieldSize * this.zoomFactor;
        left = 0;
        top = (this.checkBoxFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
        break;
      case 'ListBox':
        scaledHeight = this.ListFieldSize * this.zoomFactor;
        left = 90;
        top = (this.ListFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
        break;
      case 'SignatureField':
      case 'InitialField':
        scaledHeight = this.SignatureFieldSize * this.zoomFactor;
        left = 90;
        top = (this.SignatureFieldSize / 2) * this.zoomFactor - (scaledHeight / 2);
        break;
      default:
        scaledHeight = this.defaultFieldHeight * this.zoomFactor;
        left = 90;
        top = (this.defaultFieldHeight / 2) * this.zoomFactor - (scaledHeight / 2);
        break;
    }

    left = left / this.zoomFactor - (scaledWidth / 2);
    return { left: left, top: top };
  }

  public userChange = (args: any) => {
    this.currentUser = args.itemData.Mail;
    if (args.itemData.Mail === 'andrew@mycompany.com') {
      this.currentUserBorderColor = 'red';
    } else {
      this.currentUserBorderColor = 'green';
    }
  }

  public textBox(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('Textbox');
  }

  public password(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('Password');
  }

  public checkBox(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('CheckBox');
  }

  public radioButton(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('RadioButton');
  }

  public dropDown(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('DropDown');
  }

  public listBox(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('ListBox');
  }

  public signature(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('SignatureField');
  }

  public initial(e: any) {
    if (e?.originalEvent?.sourceCapabilities?.firesTouchEvents || e?.sourceCapabilities?.firesTouchEvents) 
    this.pdfviewerControl.formDesignerModule.setFormFieldMode('InitialField');
  }

  public pageClick = (args: any) => {      
    if (this.isDropped) {
      this.isDropped = false;
      let width = this.defaultFieldWidth;
      let height: number = this.defaultFieldHeight;
      switch (this.currentFieldType) {
        case 'SignatureField':
        case 'InitialField':
          height = this.SignatureFieldSize;
          break;
        case 'CheckBox':
        case 'RadioButton':
          width = this.checkBoxFieldSize;
          height = this.checkBoxFieldSize;
          break;
        case 'ListBox':
          height = this.ListFieldSize;
          break;
      }
      this.pdfviewerControl?.formDesignerModule.addFormField(this.currentFieldType as any, {
        bounds: { X: args.x, Y: args.y, Width: width, Height: height}
      } as TextFieldSettings);
    }
  }

  public addFormField = (args: any) => {      
     const signIcons = document.querySelectorAll('[id*="signIcon"]');
    signIcons.forEach(element => {
      if (this.pdfviewerControl.zoomPercentage < 65) {
        (element as any).style.fontSize = '5px' 
      } else if (this.pdfviewerControl.zoomPercentage <= 85 && this.pdfviewerControl.zoomPercentage > 65) {
        (element as any).style.fontSize = "7px";
      }
    });
 
    this.userColor = this.currentUser === 'andrew@mycompany.com' ? '#ffefef' : '#eff7ef';
    if (this.currentUser === "andrew@mycompany.com") {
      this.pdfviewerControl.formDesigner.updateFormField(this.pdfviewerControl.retrieveFormFields()[(this.pdfviewerControl.formFieldCollections).length - 1], { backgroundColor: this.userColor, customData:{author :'andrew'} } as any);
    } else {
      this.pdfviewerControl.formDesigner.updateFormField(this.pdfviewerControl.retrieveFormFields()[(this.pdfviewerControl.formFieldCollections).length - 1], { backgroundColor: this.userColor, customData:{author :'anne'} } as any);
    }

    var currentUserDetails = this.userDetails.filter(userDetail => userDetail.Mail === this.currentUser)[0];
    var currentFormField = this.pdfviewerControl.formFieldCollections.filter(formField => formField.id === args.field.id)[0];
    if (currentUserDetails)
      (currentUserDetails.fieldIds as any).push(currentFormField);
  }

  public downloadFile(e :any) {
    this.pdfviewerControl.download();
  }

  public documentLoad(e :any) {
    this.defaultZoomFactor = true;
    this.initializeDraggable(this.textboxDiv.element, 'Textbox');
    this.initializeDraggable(this.signatureDiv.element, 'SignatureField');
    this.initializeDraggable(this.passwordDiv.element, 'Password');
    this.initializeDraggable(this.checkboxDiv.element, 'CheckBox');
    this.initializeDraggable(this.radioButtonDiv.element, 'RadioButton');
    this.initializeDraggable(this.dropDownDiv.element, 'DropDown');
    this.initializeDraggable(this.listBoxDiv.element, 'ListBox');
    this.initializeDraggable(this.initialDiv.element, 'InitialField');
    this.defaultZoomFactor = false;
    this.pdfviewerControl.designerMode = true;
  }
}
