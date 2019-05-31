import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';

/**
 * Switch Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'switch.html',
    styleUrls: ['switch.css'],
    encapsulation: ViewEncapsulation.None
})

export class SwitchController {
    @ViewChild('switch')
    public switch: SwitchComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['switch.css'];
    }
    ngOnInit(): void {
        let elemArray: NodeListOf<Element> = document.querySelectorAll('.switch-control label');
        for (let i: number = 0, len: number = elemArray.length; i < len; i++) {
            elemArray[i].addEventListener('mouseup', rippleHandler);
            elemArray[i].addEventListener('mousedown', rippleHandler);
        }
    }
 }
function rippleHandler(e: MouseEvent): void {
    let rippleSpan: Element = this.nextElementSibling.querySelector('.e-ripple-container');
    if (rippleSpan) {
        rippleMouseHandler(e, rippleSpan);
    }
}