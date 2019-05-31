import { Component, Inject } from '@angular/core';

@Component({
    selector: 'control-content',
    styleUrls: ['textboxes-style.css'],
    templateUrl: 'default.html'
})
export class DefaultTextboxController {
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['textboxes-style.css'];
    }

    //Focus Event function for input component
    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }

    //FocusOut Event function for input component
    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }

    //Focus Event function for input component
    public focusInLeft(target: HTMLElement): void {
        target.parentElement.parentElement.classList.add('e-input-focus');
    }

    //FocusOut Event function for input component
    public focusOutLeft(target: HTMLElement): void {
        target.parentElement.parentElement.classList.remove('e-input-focus');
    }

    //MouseDown Event function for input component
    public onMouseDown(target: HTMLElement): void {
        target.classList.add('e-input-btn-ripple');
    }

    //MouseUp Event function for input component
    public onMouseUp(target: HTMLElement): void {
        let ele: HTMLElement = target;
        setTimeout(
                () => {ele.classList.remove('e-input-btn-ripple'); },
                500);
    }
}