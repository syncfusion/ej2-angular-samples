/**
 * RTE Default functionality Sample
 */
import { Component } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ToolbarService, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    selector: 'control-content',
    templateUrl: 'quick-toolbar.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class QuickToolbarComponent {
    public quickTools: object = {
        image: [
            'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension',
            {
                tooltipText: 'Rotate Left',
                template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-roatate-left"></span>'
            },
            {
                tooltipText: 'Rotate Right',
                template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-roatate-right"></span>'
            }
        ]
    };
    public onCreate(e: Object): void {
        let rotateLeft: HTMLElement = document.getElementById('roatateLeft');
        let rotateRight: HTMLElement = document.getElementById('roatateRight');
        if (!isNullOrUndefined(rotateLeft)) {
            rotateLeft.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
                imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            };
        }
        if (!isNullOrUndefined(rotateRight)) {
            rotateRight.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
                imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            };
        }
    }
}