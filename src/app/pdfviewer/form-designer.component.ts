import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
    PdfViewerComponent, TextFieldSettings, RadioButtonFieldSettings, InitialFieldSettings, CheckBoxFieldSettings, SignatureFieldSettings, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, LoadEventArgs, ValidateFormFieldsArgs
} from '@syncfusion/ej2-angular-pdfviewer';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'form-designer.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, 
                TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService],
    styleUrls: ['pdfviewer.component.css'],
})

export class FormDesignerComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;

    public document: string = 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf';
    public resource:string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    ngOnInit(): void {
        // ngOnInit function
    }
    public documentLoaded(e: LoadEventArgs): void {
        if (e.documentName === 'form-designer.pdf') {
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "First Name", bounds: { X: 146, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "Middle Name", bounds: { X: 338, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "Last Name", bounds: { X: 530, Y: 229, Width: 150, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("RadioButton", { bounds: { X: 148, Y: 289, Width: 18, Height: 18 }, name: "Gender", isSelected: false } as RadioButtonFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("RadioButton", { bounds: { X: 292, Y: 289, Width: 18, Height: 18 }, name: "Gender", isSelected: false } as RadioButtonFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOB Month", bounds: { X: 146, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOB Date", bounds: { X: 193, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOB Year", bounds: { X: 242, Y: 320, Width: 35, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("InitialField", { name: "Agree", bounds: { X: 148, Y: 408, Width: 200, Height: 43 } } as InitialFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("InitialField", { name: "Do Not Agree", bounds: { X: 148, Y: 466, Width: 200, Height: 43 } } as InitialFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("CheckBox", { name: "Text Message", bounds: { X: 56, Y: 664, Width: 20, Height: 20 }, isChecked: false } as CheckBoxFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("CheckBox", { name: "Email", bounds: { X: 242, Y: 664, Width: 20, Height: 20 }, isChecked: false } as CheckBoxFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("CheckBox", { name: "Appointment Reminder", bounds: { X: 56, Y: 740, Width: 20, Height: 20 }, isChecked: false } as CheckBoxFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("CheckBox", { name: "Request for Customerservice", bounds: { X: 56, Y: 778, Width: 20, Height: 20 }, isChecked: false } as CheckBoxFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("CheckBox", { name: "Information Billing", bounds: { X: 290, Y: 740, Width: 20, Height: 20 }, isChecked: false } as CheckBoxFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "My Email", bounds: { X: 146, Y: 850, Width: 200, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "My Phone", bounds: { X: 482, Y: 850, Width: 200, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("SignatureField", { name: "Sign", bounds: { X: 57, Y: 923, Width: 200, Height: 43 } } as SignatureFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOS Month", bounds: { X: 386, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOS Date", bounds: { X: 434, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
            this.pdfviewerControl.formDesignerModule.addFormField("Textbox", { name: "DOS Year", bounds: { X: 482, Y: 923, Width: 35, Height: 24 } } as TextFieldSettings);
        }
    }

public validateFormFields(e: ValidateFormFieldsArgs): void {
    let errorMessage : string = "Required Field(s): ";
    let forms: any = this.pdfviewerControl.formFieldCollections;
    let flag: boolean = false;
    let radioGroupName: string = "";
    for (var i = 0; i < forms.length; i++) {
        let text: string = "";
        if (forms[i].isRequired == true)
        {
            if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                text = forms[i].name;
            }
            else if (forms[i].type == "RadioButton" && flag == false) {
                radioGroupName = forms[i].name;
                if(forms[i].isSelected == true)
                    flag = true;
            }
            else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" &&  forms[i].value == ""){
                text = forms[i].name;
            }
            if(text != "")
            {                    
                if (errorMessage == "Required Field(s): ") {
                    errorMessage += text;
                }
                else {
                    errorMessage += ", " + text;
                }
            }
        }
    }
    if(!flag && radioGroupName != "")
    {
        if(errorMessage == "Required Field(s): ")
            errorMessage += radioGroupName;
        else
            errorMessage += ", " + radioGroupName;
    }
    if (errorMessage != "Required Field(s): ") {
        this.pdfviewerControl.showNotificationPopup(errorMessage);
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
