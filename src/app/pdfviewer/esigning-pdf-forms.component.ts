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
  public document: string = 'https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib";
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

  public finishSigning(args: any): void {
    for (const formField of this.pdfviewerControl.formFieldCollections) {
      this.pdfviewerControl?.formDesignerModule.updateFormField(formField, { backgroundColor: this.finishedBackground } as TextFieldSettings);
    }
    const url: string = "https://ej2services.syncfusion.com/angular/development/api/pdfviewer/FlattenDownload";
    this.pdfviewerControl.saveAsBlob().then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        const requestData = JSON.stringify({ base64String });
        xhr.onload = () => {
          if (xhr.status === 200) {
            const responseBase64 = xhr.responseText.split('base64,')[1];
            if (responseBase64) {
              const blob = this.createBlobFromBase64(responseBase64, 'application/pdf');
              const blobUrl = URL.createObjectURL(blob);
              this.downloadDocument(blobUrl);
              this.pdfviewerControl.load(xhr.responseText, null);
              (document.getElementById('e-pv-e-sign-finishSigning') as any).disabled = true;
              this.userMenu.enabled = false;
            } else {
              console.error('Invalid base64 response.');
            }
          } else {
            console.error('Download failed:', xhr.statusText);
          }
        };
        xhr.onerror = () => {
          console.error('An error occurred during the download:', xhr.statusText);
        };
        xhr.send(requestData);
      };
    }).catch((error) => {
      console.error('Error saving Blob:', error);
    });
  }

  public createBlobFromBase64(base64String: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64String);
    const byteArrays: Uint8Array[] = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = Array.from(slice, char => char.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  }

  public downloadDocument(blobUrl: string): void {
    const anchorElement = document.createElement('a');
    anchorElement.href = blobUrl;
    anchorElement.target = '_parent';
    const downloadFileName = this.pdfviewerControl.fileName || 'downloadedFile.pdf';
    anchorElement.download = downloadFileName.endsWith('.pdf') ? downloadFileName : `${downloadFileName}.pdf`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    URL.revokeObjectURL(blobUrl);
  }
}