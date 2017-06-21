import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
})
export class DefaultTextboxController {
    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }

    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }

    public onMouseDown(target: HTMLElement): void {
        target.classList.add('e-input-btn-ripple');
    }

    public onMouseUp(target: HTMLElement): void {
        let ele: HTMLElement = target;
        setTimeout(
                () => {ele.classList.remove('e-input-btn-ripple'); },
                500);
    }
}