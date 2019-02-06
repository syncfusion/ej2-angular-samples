/**
 * Tooltip template sample
 */

import { Component, ViewChild, ViewChildren, ViewEncapsulation, Inject } from '@angular/core';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['tooltip.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateTooltipComponent {
    @ViewChild('tooltip') public control: TooltipComponent;

    public tooltipData = [
        { header: 'Cut (Ctrl+X)', para: 'Remove the selection and put it on the Clipboard so you can paste it somewhere else.' },
        { header: 'Copy (Ctrl+C)', para: 'Put a copy of a selection on the Clipboard so you can paste it somewhere else.' },
        { header: 'Paste (Ctrl+V)', para: 'Add content on the Clipboard to your document.' },
        { header: 'Bold (Ctrl+B)', para: 'Makes your text bold.' },
        { header: 'Underline (Ctrl+U)', para: 'Add content on the Clipboard to your document.' },
        { header: 'Italic (Ctrl+I)', para: 'Italicize your text.' }
    ]
    public toolbarIcons: any = [
        { name: 'cut', id: 0 },
        { name: 'copy', id: 1 },
        { name: 'paste', id: 2 },
        { name: 'bold', id: 3 },
        { name: 'underline', id: 4 },
        { name: 'italic', id: 5 }
    ];

    @ViewChildren('tooltip_template') public templates: any;

    onBeforeRender = (args: any) => {
        this.control.content = this.templates.toArray()[Number(args.target.firstElementChild.id)];
    }
}
