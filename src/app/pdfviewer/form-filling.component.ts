import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {
    PdfViewerComponent, TextFieldSettings, RadioButtonFieldSettings, InitialFieldSettings, CheckBoxFieldSettings, SignatureFieldSettings, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, LoadEventArgs, ValidateFormFieldsArgs, FormDesignerService
} from '@syncfusion/ej2-angular-pdfviewer';
/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'form-filling.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
   providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService]
})

export class FormFillingComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    public service: string = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
    public document: string = 'FormFillingDocument.pdf';
    ngOnInit(): void {
        // ngOnInit function
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
     
}
