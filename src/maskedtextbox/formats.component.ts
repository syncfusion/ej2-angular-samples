import { Component, ViewChild } from '@angular/core';
import { MaskChangeEventArgs, Input } from '@syncfusion/ej2-inputs';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-ng-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';

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
    public promptData: Object[] = [
        { prompt: '_' },
        { prompt: '#' },
        { prompt: '@' },
        { prompt: '*' },
    ];
    public dynamicMask: string = "(999)-999-9999";
    public dynamicPrompt: string = "_";
    ngAfterViewInit(): void {
        (document.getElementById('val2') as HTMLElement).innerHTML = this.formatMask.getMaskedValue();
    }
    public maskChange(target: MaskChangeEventArgs): void {
        (document.getElementById('val1') as HTMLElement).innerHTML = target.value;
        (document.getElementById('val2') as HTMLElement).innerHTML = target.maskedValue;
    }
    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }
    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }
    public setValues(target: HTMLElement): void {
        setTimeout(
            () => {
                (document.getElementById('val1') as HTMLElement).innerHTML = this.formatMask.value;
                (document.getElementById('val2') as HTMLElement).innerHTML = this.formatMask.getMaskedValue();
            },
            100);
    }
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