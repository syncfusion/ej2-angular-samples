import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
/**
 * Default Splitter component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultSplitterComponent {

}
