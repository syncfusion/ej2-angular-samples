/**
 * Tooltip default sample
 */

import { Component, ViewChild, ViewChildren } from '@angular/core';
import { TooltipComponent, Position } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'html-content.html',
    styleUrls: ['html-content.css']
})
export class HtmlContentComponent {
    @ViewChild('tooltip')
    public control: TooltipComponent;

    public created() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }

    public onClick(args: any) {
        if (args && !args.target.parentNode.parentNode.classList.contains('e-tooltip')) {
            if (this.control && document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                this.control.close();
            }
        }
    }

    public onScroll() {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.control.close();
        }
    }
}
