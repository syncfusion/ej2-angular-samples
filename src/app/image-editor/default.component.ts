/**
 * Default Sample
 */
import { Component } from '@angular/core';
import { Browser, getComponent } from '@syncfusion/ej2-base';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css']
})

export class DefaultImageEditorComponent {
    public created = (): void => {
        const imageEditor: ImageEditorComponent = getComponent(document.getElementById('image-editor'), 'image-editor');
        if (Browser.isDevice) {
            imageEditor.open('./assets/image-editor/images/flower.png');
        } else {
            imageEditor.open('./assets/image-editor/images/bridge.png');
        }
        imageEditor.theme = window.location.href.split('#')[1].split('/')[1];
    }
}
