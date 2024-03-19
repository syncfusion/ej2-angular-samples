import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, SBDescriptionComponent]
})
export class DefaultToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}