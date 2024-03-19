/**
 * Tooltip default sample
 */

import { Component, ViewChild } from '@angular/core';
import { TooltipComponent, Position, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, TooltipModule, ButtonModule, SBDescriptionComponent]
})
export class DefaultTooltipComponent {
    @ViewChild('tooltip')
    public control: TooltipComponent;

    //Handle tooltip position based on drop-down value change
    onChange(value: string) {
        this.control.position = value as Position;
    }
}