import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule, NumericTextBoxComponent, NumericTextBoxModule, OtpInputComponent, OtpInputEventArgs } from '@syncfusion/ej2-angular-inputs';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

/**
 * API sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [OtpInputModule, DropDownListModule, TextBoxModule, NumericTextBoxModule, SwitchModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class APIOtpInputComponent  {
    
    @ViewChild('otpRef') otpRef!: OtpInputComponent
    @ViewChild('lengthTextBox') lengthTextBox!: NumericTextBoxComponent
    @ViewChild('resetBtn') resetBtn!: any
    @ViewChild('verifyBtn') verifyBtn!: any

    public placeHolder: string = 'X';
    public separatorVal: string = '-';
    public otpCssClass: string = '';
    public lengthVal: number = 4;
    public disabledVal: boolean = false;
    public styleMode: string = 'Outlined';
    public styleModeData: string[] = [ 'Outlined', 'Underlined', 'Filled' ];
    public validationData: string[] = [ 'None' , 'Success', 'Warning', 'Error'];

    dropDownHandler = (args: any) => {
        this.styleMode = args.value;
    };

    placeHolderHandler = (args:any) => {
        this.placeHolder = args.value.toString(); 
    };

    separatorHandler = (args:any) => {
        this.separatorVal = args.value.toString(); 
    };

    validationHandler(args: any): void {
        this.otpCssClass = 'e-' + args.value.toLowerCase();
    };

    lengthHandler(args: any): void {
        if(!args.value) {
            this.lengthTextBox.element.value = "1";
        }
        this.lengthVal = args.value || 1;
    };

    toggleDisabled = (args: any) => {
        this.disabledVal = args.checked;
    };

    handleOtpChange(args: OtpInputEventArgs) {
        if (args.value !== undefined) {
            const otpLength = args.value.toString().length;
            this.verifyBtn.nativeElement.disabled = otpLength !== this.lengthVal;
            this.resetBtn.nativeElement.disabled = !otpLength;
        }
    };

    handleResetClick() {
        if (this.otpRef) {
            this.otpRef.value = "";
        }
        this.verifyBtn.nativeElement.disabled = true;
        this.resetBtn.nativeElement.disabled = true;
    };

    handleVerifyClick() {
        if (this.otpRef) {
            alert(`Entered OTP value is : ${this.otpRef.value}`);
        }
    };
}
