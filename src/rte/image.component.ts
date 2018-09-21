/**
 * RTE Image Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, NodeSelection, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector: 'control-content',
    templateUrl: 'image.html',
    styleUrls: ['image.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class ImageComponent {
    @ViewChild('imageRTE') rteObj: RichTextEditorComponent;
     toolbarSettings: ToolbarModule = {
        image: [
            'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
            'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
            {
                tooltipText: 'Rotate Left',
                template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
            },
            {
                tooltipText: 'Rotate Right',
                template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
            }
        ]
    };
    public onToolbarClick(e: any): void {
        let nodeObj: NodeSelection = new NodeSelection();
        let range: Range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        let imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
        if (e.item.tooltipText === 'Rotate Right') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
        } else if (e.item.tooltipText === 'Rotate Left') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
        }
    }
}