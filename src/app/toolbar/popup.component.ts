import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
let today: Date = new Date();
/**
 * Popup Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'popup.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, SBDescriptionComponent]
})
export class PopupToolbarComponent {
    ele: string = '<div class = "e-tool-name">' + today.toLocaleString('en-us', { month: 'long' }) + ' ' + today.getFullYear() + '</div>';
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}