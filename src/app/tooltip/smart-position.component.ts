/**
 * Tooltip smart position sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { TooltipComponent, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { Draggable } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'smart-position.html',
    styleUrls: ['tooltip.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, TooltipModule, SBDescriptionComponent]
})

export class DraggableTooltipComponent implements OnInit {
    @ViewChild('tooltip')
    public tooltipControl: TooltipComponent;

    //Set tooltip animation
    public tooltipAnimation: Object = {
        open: { effect: 'None' },
        close: { effect: 'None' }
    };

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.component.css'];
    }

    ngOnInit(): void {

        //Handle tooltip smart positioning.
        let ele: HTMLElement = document.getElementById('demoSmart');
        let drag: Draggable = new Draggable(ele, { //Initialize Draggable for tooltip element
            clone: false,
            dragArea: '#targetContainer',
            drag: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    this.tooltipControl.open(args.element);
                } else {
                    this.tooltipControl.refresh(args.element);
                }
            },
            dragStart: (args: any) => {
                if (args.element.getAttribute('data-tooltip-id') === null) {
                    this.tooltipControl.open(args.element);
                }
            },
            dragStop: (args: any) => {
                this.tooltipControl.close();
            }
        });
    }
}
