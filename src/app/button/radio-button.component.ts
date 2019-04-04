import { Component, ViewEncapsulation, Inject } from '@angular/core';;

/**
 * RadioButton Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'radio-button.html',
    styleUrls: ['radio-button.css'],
    encapsulation: ViewEncapsulation.None
})

export class RadioButtonController {
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['radio-button.css'];
    }
 }