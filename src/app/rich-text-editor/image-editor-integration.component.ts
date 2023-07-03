/**
 * Rich Text Editor Image Editor integration Functionality Sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, NodeSelection, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'image-editor-integration.html',
    styleUrls: ['image-editor-integration.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class ImageEditorIntegrationComponent {
  @ViewChild('toolsRTE')
  public defaultRTE: RichTextEditorComponent;
  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  @ViewChild('ImageEditor')
  public imageEditorObj: ImageEditorComponent;
  public selection = new NodeSelection();
  public header = 'Image Editor';
  public range: Range;
  public saveSelection: NodeSelection;
  public dataURL: null;
  public isLoaded = false;
  public imageELement: any;
  public dlgButtons = [
    {
      buttonModel: { content: 'Save', isPrimary: true },
      click: this.onInsert.bind(this),
    },
    { buttonModel: { content: 'Cancel' }, click: this.onCancel },
  ];
  public customToolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
  'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
  'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
  'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
  'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur' ];
  public quickToolbarSettings = {
    image: [
      'Replace',
      'Align',
      'Caption',
      'Remove',
      '-',
      'InsertLink',
      'Display',
      'AltText',
      {
        tooltipText: 'Image Editor',
        template:
          '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span></button>',
      },
    ],
  };

  public toolbarClick(args): void {
    if (args.item.tooltipText === 'Image Editor') {
      this.range = this.selection.getRange(document);
      this.saveSelection = this.selection.save(this.range, document);
      this.dialogObj.show();
    }
  }

  public onInsert(): void  {
    if (this.defaultRTE.formatter.getUndoRedoStack().length === 0) {
      this.defaultRTE.formatter.saveData();
    }
    this.saveSelection.restore();
    var canvas = document.createElement('CANVAS');
    var ctx = (canvas as any).getContext('2d');
    var imgData: ImageData = (this.imageEditorObj as any).getImageData();
    (canvas as any).height = imgData.height;
    (canvas as any).width = imgData.width;
    ctx.putImageData(imgData, 0, 0);
    this.isLoaded = true;
    this.defaultRTE.executeCommand('editImage', {
      url: (canvas as any).toDataURL(),
      width: { width: (canvas as any).width },
      height: { height: (canvas as any).height },
      selection: this.saveSelection,
      cssClass: this.imageELement.getAttribute('class').replace('e-rte-image', '')
    });
    this.defaultRTE.formatter.saveData();
    this.defaultRTE.formatter.enableUndo(this.defaultRTE);
    this.dialogObj.hide();
    this.isLoaded = false;
  }

  public onCancel(): void {
    var dialog = this;
    (dialog as any).hide();
  }
  
  public OnBeforeOpen(): void {
    var selectNodes =
      this.defaultRTE.formatter.editorManager.nodeSelection.getNodeCollection(
        this.range
      );
    if (selectNodes.length == 1 && (selectNodes[0] as any).tagName == 'IMG') {
      this.imageELement = selectNodes[0];
      this.imageELement.crossOrigin = 'anonymous';
      var canvas = document.createElement('CANVAS');
      var ctx = (canvas as any).getContext('2d');
      (canvas as any).height = this.imageELement.offsetHeight;
      (canvas as any).width = this.imageELement.offsetWidth;
      var imageInstance = this.imageEditorObj;
      var imageElementLoad = this.imageELement;
      this.imageELement.onload = function () {
        ctx.drawImage(
          imageElementLoad,
          0,
          0,
          (canvas as any).width,
          (canvas as any).height
        );
        this.dataURL = (canvas as any).toDataURL();
        if (!this.isLoaded) {
          (imageInstance as any).open(this.dataURL);
        }
      };
    }
  }
}
