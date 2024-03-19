import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Default Button Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['button.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DefaultButtonController {
    @ViewChild('toggleBtn')
    public toggleBtn: ButtonComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
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