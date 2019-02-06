import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
/**
 * Default Button Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['button.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultButtonController {
    @ViewChild('toggleBtn')
    public toggleBtn: ButtonComponent;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['button.css'];
    }

    //Toggle button click event handler
    btnClick() {
        if (this.toggleBtn.element.classList.contains('e-active')) {
            this.toggleBtn.content = 'Play';
            this.toggleBtn.iconCss = 'e-btn-sb-icons e-play-icon';
        } else {
            this.toggleBtn.content = 'Pause';
            this.toggleBtn.iconCss = 'e-btn-sb-icons e-pause-icon';
        }
    }
}