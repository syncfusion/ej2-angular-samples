import { Component, ViewEncapsulation, Inject } from '@angular/core';

let ele: string = '<div class="e-folder" id="mailTemplate"><div class="e-folder-name">Inbox(33)</div>';
ele = ele + '<div class="e-mail-id">user@example.com</div></div>';
/**
 *  Alignment Based Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'alignment.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AlignToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['alignment.component.css'];
    }
}