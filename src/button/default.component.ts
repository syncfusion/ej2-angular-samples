import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-ng-buttons';
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
    btnClick() {
        if (this.toggleBtn.element.classList.contains('e-active')) {
            this.toggleBtn.content = 'Play';
            this.toggleBtn.iconCss = 'e-icons e-play-icon';
        } else {
            this.toggleBtn.content = 'Pause';
            this.toggleBtn.iconCss = 'e-icons e-pause-icon';
        }
    }
}