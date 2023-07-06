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
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const imageEditor: any = getComponent(document.getElementById('image-editor'), 'image-editor');
        if (Browser.isDevice) {
            imageEditor.open('./assets/image-editor/images/flower.png');
        } else {
            imageEditor.open('./assets/image-editor/images/default.png');
        }
        if (imageEditor.theme && window.location.href.split('#')[1]) {
            imageEditor.theme = window.location.href.split('#')[1].split('/')[1];
        }
    }
    ngOnInit() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }     
    }
    // Handler used to reposition the tooltip on page scroll
    onScroll(): void {
        if (document.getElementById('image-editor_sliderWrapper')) {
            let slider: any = getComponent(document.getElementById('image-editor_sliderWrapper'), 'slider');
            slider.refreshTooltip(slider.tooltipTarget);
        }
    }
}
