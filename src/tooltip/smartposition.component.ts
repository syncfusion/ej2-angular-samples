import { Component, ViewChild, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { TooltipComponent } from '@syncfusion/ej2-ng-popups';
import { Draggable } from '@syncfusion/ej2-base';
/**
 * Tooltip Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'smartposition.html',
    styleUrls: ['tooltip.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DraggableTooltipComponent implements OnInit {
    @ViewChild('tooltip')
    public tooltipControl: TooltipComponent;
    public tooltipAnimation: Object = {
        open: { effect: 'None' },
        close: { effect: 'None' }
    };
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.component.css'];
    }

    ngOnInit(): void {
        let ele: HTMLElement = document.getElementById('demoSmart');
        let drag: Draggable = new Draggable(ele, {
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