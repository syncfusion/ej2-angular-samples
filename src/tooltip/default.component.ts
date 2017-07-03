import { Component, ViewChild } from '@angular/core';
import { TooltipComponent, Position } from '@syncfusion/ej2-ng-popups';

/**
 * Default Tooltip Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html'
})
export class DefaultTooltipComponent {
    @ViewChild('tooltip')
    public control: TooltipComponent;
    onChange(value: string) {
        this.control.position = value as Position;
    }
}