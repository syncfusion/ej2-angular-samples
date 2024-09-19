import { Component, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { TextAreaComponent, TextBoxComponent, NumericTextBoxComponent, TextAreaModule, TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * TextArea api sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['api.css'],
    templateUrl: 'api.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [TextAreaModule, TextBoxModule, CheckBoxModule, NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ApiTextAreaController {
    @ViewChild('default')
    public textareaObj: TextAreaComponent;
    @ViewChild('enabled')
    public enabledObj: CheckBoxComponent;
    @ViewChild('readonly')
    public readonlyObj: CheckBoxComponent;
    @ViewChild('clearicon')
    public clearIconObj: CheckBoxComponent;
    
    public enabledHandler: EmitType<Object> = () => {
        this.textareaObj.enabled = this.enabledObj.checked;
    }
    public readonlyHandler: EmitType<Object> = () => {
        this.textareaObj.readonly = this.readonlyObj.checked;
    }
    public clearIconHandler: EmitType<Object> = () => {
       this.textareaObj.showClearButton = this.clearIconObj.checked;
    }
    public rowHandler(args: any) :void {
       this.textareaObj.rows = args.value;
    }
    public columnHandler(args: any) :void {
        this.textareaObj.cols = args.value;
    }
    public maxLengthHandler(args: any) :void {
        this.textareaObj.maxLength = args.value;
    }
    public valueHandler(args: any) :void {
        this.textareaObj.value = args.value;
    }
}