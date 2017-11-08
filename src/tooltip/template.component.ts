/**
 * Tooltip template sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-ng-popups';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['tooltip.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateTooltipComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.component.css'];
    }

    @ViewChild('tooltip')
    public control: TooltipComponent;

    //Tooltip content customization.
    onBeforeRender(args: TooltipEventArgs) {
        let data: any = [
            { title: 'Bold', name: 'Bold (Ctrl+B)', description: 'Makes your text bold.' },
            { title: 'Underline', name: 'Underline (Ctrl+U)', description: 'Underline your text.' },
            { title: 'Italic', name: 'Italic (Ctrl+I)', description: 'Italicize your text.' },
            {
                title: 'Cut', name: 'Cut (Ctrl+X)',
                description: 'Remove the selection and put it on the Clipboard so you can paste it somewhere else.'
            },
            {
                title: 'Copy', name: 'Copy (Ctrl+C)',
                description: 'Put a copy of a selection on the Clipboard so you can paste it somewhere else.'
            },
            { title: 'Paste', name: 'Paste (Ctrl+V)', description: 'Add content on the Clipboard to your document.' }
        ];
        for (let i: number = 0; i < data.length; i++) {
            if (data[i].title === args.target.getAttribute('title')) {
                this.control.content = '<h6>' + data[i].name + '</h6><p>' + data[i].description + '</p>';
            }
        }
    }
}