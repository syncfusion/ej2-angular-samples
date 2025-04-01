/**
 * Rich Text Editor Image Editor integration Functionality Sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, NodeSelection, RichTextEditorComponent, RichTextEditorModule, QuickToolbarService, PasteCleanupService, CountService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { getComponent } from '@syncfusion/ej2-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
@Component({
    selector: 'control-content',
    templateUrl: 'image-editor-integration.html',
    styleUrls: ['image-editor-integration.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, CountService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, DialogModule, ImageEditorModule, SBDescriptionComponent]
})
export class ImageEditorIntegrationComponent {
    @ViewChild('toolsRTE')
    public defaultRTE: RichTextEditorComponent;
    @ViewChild('Dialog')
    public dialogObj: DialogComponent;
    @ViewChild('ImageEditor')
    public imageEditorObj: ImageEditor;
    public selection = new NodeSelection();
    public header = 'Image Editor';
    public range: Range;
    public saveSelection: NodeSelection;
    public dataURL: null;
    public isLoaded = false;
    public imageELement: any;
    public dlgButtons = [
        {
            buttonModel: { content: 'Insert', isPrimary: true },
            click: this.onInsert.bind(this),
        },
        { buttonModel: { content: 'Cancel' }, click: this.onCancel.bind(this), },
    ];

    public quickToolbarSettings = {
        image: [
            'Replace',
            'Align',
            'Caption',
            'Remove',
            '-',
            'InsertLink',
            'OpenImageLink',
            'EditImageLink',
            'RemoveImageLink',
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
            this.defaultRTE.quickToolbarModule.imageQTBar.hidePopup();
        }
    }

    public onInsert(): void {
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
        this.dispose();
        this.dialogObj.hide();
    }

    public onCancel(): void {
        this.dispose();
        this.dialogObj.hide();
        this.isLoaded = true;
    }

    public onclose() {
        this.dispose();
        this.dialogObj.hide();
        this.isLoaded = true;
    }

    public open(): void {
        this.imageEditorObj.update();
        this.imageEditorObj.open(this.dataURL);
    }

    public OnBeforeOpen(): void {
        this.dispose();
        this.isLoaded = false;
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
            var imageELe = this.imageELement;
            var isLoded = this.isLoaded;
            this.imageELement.onload = () => {
                ctx.drawImage(
                    imageELe,
                    0,
                    0,
                    (canvas as any).width,
                    (canvas as any).height
                );
                this.dataURL = (canvas as any).toDataURL();
            };
            if (isLoded !== undefined && !isLoded) {
                this.imageEditorObj = new ImageEditor({
                    height: '450px'
                });
                this.imageEditorObj.appendTo('#image-editor');
                isLoded = true;
            }
        }
    }

    public dispose(): void {
        var imageEditorInstance = getComponent(
            document.getElementById('image-editor'),
            'image-editor'
        ) as ImageEditor;
        if (imageEditorInstance !== null && imageEditorInstance !== undefined) {
            imageEditorInstance.destroy();
        }
    }
}
