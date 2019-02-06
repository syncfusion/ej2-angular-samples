import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ProgressButton, SpinSettingsModel, AnimationSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';
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

    public spinRight: SpinSettingsModel = { position: 'Right' };
    public spinTop: SpinSettingsModel = { position: 'Top' };
    public spinBottom: SpinSettingsModel = { position: 'Bottom' };
    public spinCenter: SpinSettingsModel = { position: 'Center' };
    public zoomOut: AnimationSettingsModel = { effect: 'ZoomOut' };
    public slideLeft: AnimationSettingsModel = { effect: 'SlideLeft' };
    public slideRight: AnimationSettingsModel = { effect: 'SlideRight' };
    public zoomIn: AnimationSettingsModel = { effect: 'ZoomIn' };

    public contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }

    public contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }
}