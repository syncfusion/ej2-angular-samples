/**
 * Tooltip default sample
 */

import { Component, ViewChild } from '@angular/core';
import { TooltipComponent, Position } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css']
})
export class ApiTooltipComponent {
    @ViewChild('tooltip')
    public tooltip: TooltipComponent;
    @ViewChild('button')
    public button: any;
    @ViewChild('textbox')
    public textbox: any;

    public waterMark = 'Open Mode';
    public dataDDL = ['Hover', 'Click', 'Auto'];
    public tContent = 'Tooltip Content';

    public created() {
        if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }
    public onClick(args: any) {
        if (args && !args.target.classList.contains('e-btn')) {
        if (this.tooltip && document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.tooltip.close();
        }
        }
    }
    public onScroll() {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.tooltip.close();
        }
    }
    public wChange(args: any) {
        this.tooltip.width = args.value;
    }
    public hChange(args: any) {
        this.tooltip.height = args.value;
    }
    public ddlChange(args: any) {
        this.tooltip.opensOn = args.value;
        this.tooltip.refresh(this.button);
    }
    public cChange(args: any) {
        this.tooltip.isSticky = args.checked;
    }
    public keymonitor(args: any) {
        this.tooltip.close();
        this.tooltip.content = args.currentTarget.value;
    }
}
