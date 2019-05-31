import { Component, Inject, ViewChild} from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent,ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { TextBoxComponent, NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

/**
 * Default Multiline TextBox sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['multiline-textbox.css'],
    templateUrl: 'multiline-textbox.html'
})
export class DefaultTextAreaController {
    @ViewChild('default')
    public textareaObj: TextBoxComponent;
    @ViewChild('enabled')
    public enabledObj: CheckBoxComponent;
    @ViewChild('readonly')
    public readonlyObj: CheckBoxComponent;
    @ViewChild('rows')
    public rowObj: NumericTextBoxComponent;
    @ViewChild('select')
    public floatLabelType: DropDownListComponent;
    // define the JSON of data
    public floatData: Object[] = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    public fields: Object = { text: 'Label',value: 'Id' };
    // set the placeholder to DropDownList input element
    public waterMark: string = 'Select float type';
    // set the value to select an item based on mapped value at initial rendering
    public value: string ='Auto';
    
    public floatHandler(args: ChangeEventArgs): void {
        switch (args.value) {
            case 'Auto':
                this.textareaObj.floatLabelType = 'Auto';
                break;
            case 'Always':
                this.textareaObj.floatLabelType = 'Always';
                break;
            case 'Never':
                this.textareaObj.floatLabelType = 'Never';
                break;
        }
    }

    public enabledHandler: EmitType<Object> = () => {
        this.textareaObj.enabled = !(this.enabledObj.checked);
    }

    public readonlyHandler: EmitType<Object> = () => {
        this.textareaObj.readonly = this.readonlyObj.checked;
    }

    public rowHandler(args: any) :void {
        this.textareaObj.addAttributes({rows: args.value});
    }
}