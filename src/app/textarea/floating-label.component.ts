import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextAreaComponent, TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * TextArea floating label sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['floating-label.css'],
    templateUrl: 'floating-label.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [TextAreaModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FloatingLabelTextAreaController {
    @ViewChild('default')
    public textareaObj: TextAreaComponent;
    @ViewChild('select')
    public floatLabelType: DropDownListComponent;
    // define the JSON of data
    public floatData: Object[] = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    public fields: Object = { text: 'Label',value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    public value: string ='Auto';

    public floatLabelHandler(args: ChangeEventArgs): void {
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
}