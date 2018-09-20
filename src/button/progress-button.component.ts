import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ProgressButton, SpinSettings, AnimationSettings } from '@syncfusion/ej2-angular-splitbuttons';
/**
 * Progress Button Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'progress-button.html',
    styleUrls: ['progress-button.css'],
    encapsulation: ViewEncapsulation.None
})

export class ProgressButtonController {
    @ViewChild('contractBtn')
    public contractBtn: ProgressButton;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['progress-button.css'];
    }

    public spinRight: SpinSettings = { position: 'Right' };
    public spinTop: SpinSettings = { position: 'Top' };
    public spinBottom: SpinSettings = { position: 'Bottom' };
    public spinCenter: SpinSettings = { position: 'Center' };
    public zoomOut: AnimationSettings = { effect: 'ZoomOut' };
    public slideLeft: AnimationSettings = { effect: 'SlideLeft' };
    public slideRight: AnimationSettings = { effect: 'SlideRight' };
    public zoomIn: AnimationSettings = { effect: 'ZoomIn' };

    public contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }

    public contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }
}