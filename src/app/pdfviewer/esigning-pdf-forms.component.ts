import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, PdfViewerModule, TextFieldSettings } from '@syncfusion/ej2-angular-pdfviewer';
import { ButtonModel} from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { DialogComponent, AnimationSettingsModel, DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'control-content',
  templateUrl: 'esigning-pdf-forms.html',
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
    DialogModule,
    ButtonModule, ToolbarModule,
    CommonModule, SidebarModule
  ],
})

export class ESigningPdfFormsComponent implements OnInit {
  @ViewChild('pdfviewer') public pdfviewerControl: PdfViewerComponent;
  @ViewChild('userMenu') public userMenu: DropDownListComponent;
  @ViewChild('modalDialog', { static: false }) public modalDialog: DialogComponent;

  public fileName: string = "eSign_designMode.pdf";
  public service = "https://services.syncfusion.com/angular/production/api/pdfviewer";
  public document: string = 'https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
  public currentUser: string = 'andrew@mycompany.com';
  public currentUserBorderColor: string = 'red';
  public andrewBackground: string = '#ffefef';
  public anneBackground: string = '#eff7ef';
  public finishedBackground: string = '#daeaf7ff';
  public fields: Object = { text: 'Mail', value: 'Id', id: 'fieldIds' };
  public height: string = '220px';
  public pdfViewer = document.getElementById("pdfViewer") as HTMLElement;
  public status: boolean = false;
  public preventChange: boolean = false;
  public header: string = 'Dialog Header';
  public width: string = '350px';
  public buttons: { [key: string]: ButtonModel }[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public content: string = '';
  public userDetails: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', Eimg: 'profile2', Id: "ff0000", Mail: "andrew@mycompany.com", fieldIds: [] },
    { Name: 'Anne Dodsworth', Eimg: 'profile1', Id: "00ff00", Mail: "anne@mycompany.com", fieldIds: [] }
  ];

  constructor() { }
  ngOnInit(): void {

  }

  public userChange = (args: any) => {
    this.currentUser = args.itemData.Mail;
    if (args.itemData.Mail === 'andrew@mycompany.com') {
      this.currentUserBorderColor = 'red';
    } else {
      this.currentUserBorderColor = 'green';
    }
    this.updateUserFormField();
    if (this.preventChange) {
      this.currentUserBorderColor = 'red';
      args.cancel = true;
    }
  }

  public updateUserFormField = () => {
    const otherFormFieldDetails = [];
    const currentFormFieldDetails = [];
    
    for (const formField of this.pdfviewerControl.formFieldCollections) {
        if ((formField as any).customData.author === 'anne') {
            otherFormFieldDetails.push(formField);
        } else if ((formField as any).customData.author === 'andrew') {
            currentFormFieldDetails.push(formField);
        }
    }

    if (this.currentUser === 'andrew@mycompany.com') {
      otherFormFieldDetails.forEach(field => {
        if (field.value !== '') {
          const mainFieldUpdateData = {
              backgroundColor: this.finishedBackground,
              isReadOnly: true
          };
      
          this.pdfviewerControl.formDesigner.updateFormField(field, mainFieldUpdateData as any);
      
          currentFormFieldDetails.forEach(currentField => {
              const currentFieldUpdateData = {
                  backgroundColor: this.andrewBackground,
                  isReadOnly: true
              };
      
              this.pdfviewerControl.formDesigner.updateFormField(currentField, currentFieldUpdateData as any);
          });
        }else{
          currentFormFieldDetails.forEach(currentField => {
            const currentFieldUpdateData = {
                backgroundColor: this.andrewBackground
            };
    
            this.pdfviewerControl.formDesigner.updateFormField(currentField, currentFieldUpdateData as any);
          });
        }
       const otherUserField = document.getElementById(field.id + '_content_html_element');
       if (otherUserField) {
          const currentFormField = this.pdfviewerControl.formFieldCollections.find(formField => formField.id === field.id);
          if (currentFormField.type !== 'DropDown' && otherUserField) {
              if (!currentFormField.value) {
                this.pdfviewerControl.formDesignerModule.updateFormField(currentFormField, { visibility:'hidden'} as any);
              }
          } else {
              if (currentFormField.value.length !== 0 && otherUserField) {
                this.pdfviewerControl.formDesignerModule.updateFormField(currentFormField, { visibility:'hidden'} as any);
              }
          }
       }
      });
    } else {
      this.validation(currentFormFieldDetails);
      if (!this.status) {
        currentFormFieldDetails.forEach(field => {
          const currentFieldUpdateData = {
              backgroundColor: this.finishedBackground,
              isReadOnly: true
          };
          this.pdfviewerControl.formDesigner.updateFormField(field, currentFieldUpdateData as any);
      
          otherFormFieldDetails.forEach(otherField => {
              const otherFieldUpdateData = {
                  backgroundColor: this.anneBackground,                  
                  isReadOnly: false
              };

              this.pdfviewerControl.formDesigner.updateFormField(otherField, otherFieldUpdateData as any);
          });
        });
        otherFormFieldDetails.forEach(field => {
          this.pdfviewerControl.formDesignerModule.updateFormField(field, { visibility:'visible'} as any);
      });      
      }
    }
  }

  public validation(forms: any[]): void {
    let errorMessage = "Required Field(s): ";
    let flag = false;
    let radioGroupName = "";

    for (let i = 0; i < forms.length; i++) {
      let text = "";

      if (forms[i].isRequired) {
        switch (forms[i].type.toString()) {
          case "Checkbox":
            if (!forms[i].isChecked) {
              text = forms[i].name;
            }
            break;

          case "RadioButton":
            if (!flag) {
              radioGroupName = forms[i].name;
              if (forms[i].isSelected) {
                flag = true;
              }
            }
            break;

          case "DropdownList":
            if (forms[i].value.length === 0) {
              text = forms[i].name;
            }
            break;

          default:
            if (!forms[i].value || (typeof forms[i].newValue === 'string' && forms[i].newValue === "")) {
              text = forms[i].name;
            }
            break;
        }

        if (text) {
          errorMessage = errorMessage === "Required Field(s): " ? errorMessage + text : errorMessage + ", " + text;
        }
      }
    }

    if (!flag && radioGroupName) {
      errorMessage = errorMessage === "Required Field(s): " ? errorMessage + radioGroupName : errorMessage + ", " + radioGroupName;
    }

    if (errorMessage !== "Required Field(s): ") {
      this.status = true;
      this.modalDialog.content = errorMessage;
      this.modalDialog.show();
      this.preventChange = true;
    } else {
      this.status = false;
      this.preventChange = false;
    }
  }


  public fieldChange = (args: any) => {
    let errorMessage = "Required Field(s): ";
    const forms = this.pdfviewerControl.formFieldCollections;
    let flag = false;
    let radioGroupName = "";
    let allFieldsValid = true;

    forms.forEach(form => {
        let text = "";

        if (form.isRequired) {
            if (form.type.toString() === "Checkbox" && !form.isChecked) {
                text = form.name;
                allFieldsValid = false;
            } else if (form.type === "RadioButton" && !flag) {
                radioGroupName = form.name;
                if (form.isSelected) {
                    flag = true;
                }
            } else if (form.type.toString() !== "Checkbox" && form.type !== "RadioButton" && (!form.value || (typeof args.newValue === 'string' && args.newValue === ""))) {
                text = form.name;
                allFieldsValid = false;
            } else if (form.type.toString() === "DropdownList" && form.value.length === 0) {
                text = form.name;
                allFieldsValid = false;
            }

            if (text) {
                errorMessage = errorMessage === "Required Field(s): " ? errorMessage + text : errorMessage + ", " + text;
            }
        }
    });

    if (!flag && radioGroupName) {
        errorMessage = errorMessage === "Required Field(s): " ? errorMessage + radioGroupName : errorMessage + ", " + radioGroupName;
        allFieldsValid = false;
    }

    if (allFieldsValid) {
        (document.getElementById('e-pv-e-sign-finishSigning') as any).disabled = false;
    } else {
        (document.getElementById('e-pv-e-sign-finishSigning') as any).disabled = true;
    }
  }

  public dlgButtonClick(): void {
    this.status = false;
    if (this.modalDialog) {
      this.modalDialog.hide();
    }
  }

  public documentLoad = (args: any) => {
    this.pdfviewerControl.designerMode = false;
    this.pdfviewerControl.magnification.fitToPage();
    this.updateUserFormField();
  }

  public finishSigning(args: any) {
    for (const formField of this.pdfviewerControl.formFieldCollections) {
      this.pdfviewerControl?.formDesignerModule.updateFormField(formField, { backgroundColor: this.finishedBackground } as TextFieldSettings);
    }
    this.pdfviewerControl.serverActionSettings.download = "FlattenDownload";
    this.pdfviewerControl.download();
    this.pdfviewerControl.serverActionSettings.download = "Download";
  }

  public downloadEnd = (args: any) => {
    this.pdfviewerControl.load(args.downloadDocument, null);
    (document.getElementById('e-pv-e-sign-finishSigning') as any).disabled = true;
    this.userMenu.enabled = false;
  }
}