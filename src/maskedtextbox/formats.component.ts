import { Component, ViewChild } from '@angular/core';
import { MaskChangeEventArgs, Input } from '@syncfusion/ej2-inputs';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'formats.html',
})
export class FormatMaskedTextboxController {
    constructor() { }
    @ViewChild('formatMask')
    public formatMask: MaskedTextBoxComponent;
    @ViewChild('sample')
    public listObj: DropDownListComponent;
    public ddlFields: Object = { text: 'prompt', value: 'prompt' };
    // Prompt character options
    public promptData: Object[] = [
        { prompt: '_' },
        { prompt: '#' },
        { prompt: '@' },
        { prompt: '*' },
    ];
    public dynamicMask: string = "(999)-999-9999";
    public dynamicPrompt: string = "_";
    public onCreated(): void {
        (document.getElementById('val2') as HTMLElement).innerHTML = this.formatMask.getMaskedValue();
    }
    // Masked and un-masked values will be updated in the properties panel, while Masked Textbox value changes
    public maskChange(target: MaskChangeEventArgs): void {
        (document.getElementById('val1') as HTMLElement).innerHTML = target.value;
        (document.getElementById('val2') as HTMLElement).innerHTML = target.maskedValue;
    }
    // Styles will be added, while focusing Masked Textbox
    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }
    // Styles will be removed, when Masked Textbox has been focused out
    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }
    public setValues(target: HTMLElement): void {
        setTimeout(
            () => {
                // Masked and un-masked values will be updated in the properties panel, while Masked Textbox value changes
                (document.getElementById('val1') as HTMLElement).innerHTML = this.formatMask.value;
                (document.getElementById('val2') as HTMLElement).innerHTML = this.formatMask.getMaskedValue();
            },
            100);
    }
    // Set selection range
    public sampleInput(target: HTMLElement): void {
        let ele1: HTMLInputElement = (document.getElementById('input1') as HTMLInputElement);
        let start: number = ele1.selectionStart;
        let end: number = ele1.selectionEnd;
        setTimeout(
            () => {
                ele1.setSelectionRange(start, end);
            },
            10);
    }
}