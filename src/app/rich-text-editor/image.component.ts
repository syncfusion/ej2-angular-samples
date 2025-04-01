/**
 * Rich Text Editor Image Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, QuickToolbarService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService} from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, NodeSelection, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownListComponent, FieldSettingsModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'image.html',
    styleUrls: ['image.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, CheckBoxModule, DropDownListModule, SBDescriptionComponent]
})
export class ImageComponent {

    @ViewChild('imageRTE')
    private rteObj: RichTextEditorComponent;
    @ViewChild('readonly')
    public readonlyObj: CheckBoxComponent;
    @ViewChild('formatOption')
    public formatObj: DropDownListComponent;


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
  
    public formatData: { [key: string]: Object }[] = [
      { Id: 'Blob', Format: 'Blob' },
      { Id: 'Base64', Format: 'Base64' },
    ];
    public fields: FieldSettingsModel = { text: 'Id', value: 'Format' };
    public height: string = '200px';
    public value: string = 'Blob';
    
    public onToolbarClick(e: any): void {
        const nodeObj: NodeSelection = new NodeSelection();
        const range: Range = nodeObj.getRange(this.rteObj.contentModule.getDocument());
        const imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
        if (!isNullOrUndefined(e.item)) {
          if (e.item.tooltipText === 'Rotate Right') {
                const transform: number = (imgEle.style.transform === '') ? 0 :
              parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
          } else if (e.item.tooltipText === 'Rotate Left') {
                const transform: number = (imgEle.style.transform === '') ? 0 :
              Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
          }
        }
    }
    public onChangeRead(): void {
      this.rteObj.enableAutoUrl = this.readonlyObj.checked;
    }
    public formatChange(): void {
      if (this.formatObj.value === 'Base64') {
        this.rteObj.insertImageSettings.saveFormat = 'Base64';
      } else {
        this.rteObj.insertImageSettings.saveFormat = 'Blob';
      }
    }
    editorValue: string = `<h2>Insert Image in Rich Text Editor!<br></h2><p>You can insert and edit images within this editor. Click inside the editor and use the <strong>image tool</strong> to add an image.</p><h5>What You Can Do</h5><li><strong>Insert Images:</strong> Upload images from local storage or provide an image URL.</li><li><strong>Resize &amp; Drag:</strong> Easily adjust image dimensions and reposition them within the content.</li><li><strong>Align Images:</strong> Set images to align <strong>left, center, or right</strong>.</li><li><strong>Caption Support:</strong> Add captions to describe your images.</li><li><strong>Replace &amp; Remove:</strong> Change or delete images as needed.</li><h5>Try It Out!</h5><p><img id="rteImageID" style="width: 300px; height: 300px; transform: rotate(0deg);" alt="Editor Features Overview" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Portrait.png" class="e-rte-image e-imginline"></p>`;
}
