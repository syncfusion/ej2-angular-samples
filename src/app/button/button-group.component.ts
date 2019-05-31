import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { rippleEffect } from '@syncfusion/ej2-base';
/**
 * ButtonGroup Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'button-group.html',
    styleUrls: ['button-group.css'],
    encapsulation: ViewEncapsulation.None
})
  // To enable ripple in checkbox/radio type ButtonGroup.
export class ButtonGroupController implements OnInit {
    ngOnInit(): void {
        // To enable ripple in checkbox/radio type ButtonGroup.
        let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
        let button: HTMLElement;
        for (let i: number = 0; i < buttons.length; i++) {
            button = buttons.item(i) as HTMLElement;
            rippleEffect(button, { selector: '.e-btn' });
        }
    }

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
         sourceFiles.files = ['button-group.css'];
    }
 }