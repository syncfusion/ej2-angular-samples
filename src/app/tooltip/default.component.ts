/**
 * Tooltip default sample
 */

import { Component, ViewChild } from '@angular/core';
import { TooltipComponent, Position } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultTooltipComponent {
    @ViewChild('tooltip')
    public control: TooltipComponent;

    //Handle tooltip position based on drop-down value change
    onChange(value: string) {
        this.control.position = value as Position;
    }
}