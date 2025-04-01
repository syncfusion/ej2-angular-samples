/**
 * Default Sample
 */
import { Component, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ImageEditorAllModule, Dimension, ImageEditorComponent, ImageFilterOption, ShapeChangeEventArgs, ShapeType, ShapeSettings } from '@syncfusion/ej2-angular-image-editor';
import { Browser, isNullOrUndefined, getComponent, extend } from '@syncfusion/ej2-base';
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonAllModule, DropDownButton, MenuEventArgs, OpenCloseMenuEventArgs, ItemModel as DropDownButtonItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { ToolbarAllModule, ItemModel, Toolbar, ToolbarComponent, ClickEventArgs as ToolbarClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ColorPickerModule, ColorPicker, ColorPickerMode, ColorPickerEventArgs, ModeSwitchEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-toolbar.html',
    styleUrls: ['custom-toolbar.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [SBActionDescriptionComponent, FabModule, ImageEditorAllModule, ToolbarAllModule, DropDownButtonAllModule, ColorPickerModule, SBDescriptionComponent]
})

export class CustomToolbarComponent implements OnDestroy {
    @ViewChild('imageEditor') imageEditorObj: ImageEditorComponent;
    @ViewChild('filterToolbar') filterToolbar: ToolbarComponent;
    toolbarItems: any = [];
    zoomSettings: any = { minZoomFactor: 0.1, maxZoomFactor: 50 };
    popupLeft: string;
    showQuickAccessToolbar: boolean = false;
    currentToolbar: string = 'main';
    activeObjIndex: string;
    tempShapeSettings: ShapeSettings;
    isShapeCustomizing: boolean = false;
    isTextEditing: boolean = false;
    isShapeSelected: boolean = false;
    filter: ImageFilterOption = ImageFilterOption.Default;
    imageData: ImageData;
    presetColors: { [key: string]: string[]; } = {
        'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
    };
    toolbars = ['filter', 'rectangle', 'ellipse', 'line', 'text', 'edittext', 'freehanddraw'];

    fileOpened() {
        this.imageData = this.imageEditorObj.getImageData();
    }
    onIECreated() {
        const image: HTMLImageElement = document.getElementById('previewImgContainer') as HTMLImageElement;
        if (Browser.isDevice && image) {
            image.src = './assets/image-editor/images/flower.png';
        }
        document.addEventListener('keydown', this.keyDownEventHandler.bind(this));
        document.getElementById('image-editor-container').addEventListener('dblclick', this.doubleClickEvent.bind(this));
    }
    shapeChanging(args: any) {
        if (args.action === 'select') {
            this.isShapeSelected = true;
            this.updateToolbar(args, true);
        } else if (args.action === 'insert') {
            this.activeObjIndex = args.currentShapeSettings.id;
            this.tempShapeSettings = args.currentShapeSettings;
        }
    }

    shapeChange(args: any) {
        if (args.action === 'apply' && !this.isShapeCustomizing && !this.isShapeSelected) {
            this.isTextEditing = false;
            let proxy: any = this;
            setTimeout(function() {
                proxy.refreshToolbar('main');
            }, 1);
        }
    }

    click() {
        if (this.toolbars.indexOf(this.currentToolbar) !== -1) {
            this.refreshToolbar('main');
        }
    }

    editClicked() {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        this.imageEditorObj.open((document.getElementById('previewImgContainer') as HTMLImageElement).src);
        this.refreshToolbar('main');
        setTimeout(() => {
            let toolbarArea: HTMLElement = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            this.refreshToolbar('main');
        }, 10);
    }

    onTopToolbarCreated() {
        const toolbarArea: HTMLElement = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }

    onBottomToolbarCreated() {
        this.renderAnnotationBtn(); this.createFontColor();
        this.createShapeColor();
        this.createPenColor();
        const toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }

    toolbarClicked(args: ToolbarClickEventArgs): void {
        const item: string = args.item.id.toLowerCase();
        const dimension: Dimension = this.imageEditorObj.getImageDimension();
        let imageData: ImageData; let canvas: HTMLCanvasElement;
        switch (item) {
        case 'back':
            this.apply();
            this.refreshToolbar('main');
            break;
        case 'cancel':
            this.isTextEditing = false;
            if (this.currentToolbar === 'main') {
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
                this.imageEditorObj.reset();
            } else {
                if ((this.isShapeCustomizing || this.isShapeSelected) && this.tempShapeSettings && this.tempShapeSettings.id) {
                    this.imageEditorObj.updateShape(this.tempShapeSettings);
                }
                this.imageEditorObj.clearSelection(true);
                this.refreshToolbar('main');
            }
            break;
        case 'undo':
            if (this.currentToolbar === 'pen') {
                this.imageEditorObj.freeHandDraw(false);
            }
            this.isTextEditing = false;
            this.imageEditorObj.undo();
            this.refreshToolbar('main');
            break;
        case 'redo':
            if (this.currentToolbar === 'pen') {
                this.imageEditorObj.freeHandDraw(false);
            }
            this.isTextEditing = false;
            this.imageEditorObj.redo();
            this.refreshToolbar('main');
            break;
        case 'ok':
            this.isTextEditing = false;
            if (this.currentToolbar === 'main') {
                imageData = this.imageEditorObj.getImageData();
                canvas = document.createElement('canvas');
                canvas.width = imageData.width; canvas.height = imageData.height;
                canvas.getContext('2d').putImageData(imageData, 0, 0);
                (document.getElementById('previewImgContainer') as HTMLImageElement).src = canvas.toDataURL();
                this.imageEditorObj.open(imageData);
                document.getElementById('image-editor-container').style.display = 'none';
                (document.getElementById('imagePreviewContainer') as HTMLElement).style.display = 'block';
            } else {
                this.apply();
                this.refreshToolbar('main');
            }
            break;
        case 'cropandtransform':
            this.imageEditorObj.select('custom');
            this.refreshToolbar('crop');
            break;
        case 'rotateleft':
            this.imageEditorObj.rotate(-90);
            break;
        case 'rotateright':
            this.imageEditorObj.rotate(90);
            break;
        case 'addtext':
            this.imageEditorObj.drawText(dimension.x + (dimension.width / 2) - 65, dimension.y + (dimension.height / 2) - 15, 'Add Text',
                                    'Arial', 30, false, false, '#fff', true);
            this.isShapeSelected = true;
            this.refreshToolbar('text');
            break;
        case 'remove':
            if (isNullOrUndefined(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
                this.activeObjIndex = this.tempShapeSettings.id;
            }
            if (this.isTextEditing) {
                this.tempShapeSettings = this.imageEditorObj.getShapeSetting(this.activeObjIndex);
                this.activeObjIndex = this.tempShapeSettings.id;
            }
            this.imageEditorObj.deleteShape(this.activeObjIndex);
            this.refreshToolbar('main');
            break;
        case 'edittext':
            this.isTextEditing = true;
            this.imageEditorObj.enableTextEditing();
            this.refreshToolbar('edittext');
            break;
        case 'addpen':
            this.imageEditorObj.freeHandDraw(true);
            this.refreshToolbar('pen');
            break;
        case 'filters':
            this.refreshToolbar('filter');
            break;
        }
    }

    refreshToolbar(type: string, isEvent?: boolean) {
        const toolbar: Toolbar = getComponent('bottom-toolbar', 'toolbar') as Toolbar;
        let items: string[] = []; let itemModel: ItemModel[];
        const dimension: Dimension = this.imageEditorObj.getImageDimension();; let shapeSettings: ShapeSettings[];
        document.getElementById('filter-toolbar').style.display = 'none';
        this.currentToolbar = type;
        switch (type) {
        case 'main':
            items = ['cropAndTransform', 'addText', 'shapes', 'addPen', 'filters'];
            break;
        case 'crop':
            items = ['rotateLeft', 'rotateRight'];
            break;
        case 'text':
        case 'edittext':
            items = ['back', 'fontColor', 'remove', 'editText'];
            break;
        case 'rectangle':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                this.imageEditorObj.drawRectangle(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                            200, 100, 2, '#fff', null, null, true);
                this.isShapeSelected = true;
            }
            break;
        case 'ellipse':
            items = ['back', 'fillColor', 'strokeColor', 'remove'];
            if (!isEvent) {
                this.imageEditorObj.drawEllipse(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50,
                                        100, 50, 2, '#fff', null, null, true);
                this.isShapeSelected = true;
            }
            break;
        case 'line':
            items = ['back', 'strokeColor', 'remove'];
            if (!isEvent) {
                this.imageEditorObj.drawLine(dimension.x + (dimension.width / 2) - 200, dimension.y + (dimension.height / 2) - 100,
                                        dimension.x + (dimension.width / 2) + 200, dimension.y + (dimension.height / 2) + 100, 2, '#fff', true);
                this.isShapeSelected = true;
            }
            break;
        case 'pen':
        case 'freehanddraw':
            items = ['back', 'penStrokeColor', 'remove'];
            break;
        case 'filter':
            this.createCanvasFilter();
            this.filterToolbar.refreshOverflow();
            document.getElementById('filter-toolbar').style.display = 'block';
            items = ['default', 'chrome', 'cold', 'warm', 'grayscale', 'sepia', 'invert'];
            break;
        }
        for (let i: number = 0; i < toolbar.items.length; i++) {
            if (items.indexOf(toolbar.items[i as number].id) !== -1) {
                toolbar.items[i as number].visible = true;
                if (toolbar.items[i as number].id.toLowerCase() === 'edittext') {
                    if (type === 'edittext') {
                        toolbar.items[i as number].disabled = true;
                        setTimeout(function() {
                            (document.querySelector('.e-textarea') as HTMLInputElement).focus();
                        }, 1);
                    } else {
                        toolbar.items[i].disabled = false;
                    }
                }
            } else {
                toolbar.items[i as number].visible = false;
            }
            if (toolbar.items[i as number].id === 'remove') {
                if (type === 'pen') {
                    toolbar.items[i as number].disabled = true;
                } else {
                    toolbar.items[i as number].disabled = false;
                }
            }
        }
        const enableUndo: boolean = this.imageEditorObj.canUndo();
        const enableRedo: boolean = this.imageEditorObj.canRedo();
        const topToolbar: Toolbar = getComponent('top-toolbar', 'toolbar') as Toolbar;
        for (let i: number = 0; i < topToolbar.items.length; i++) {
            if (topToolbar.items[i as number].id === 'undo') {
                topToolbar.items[i as number].disabled = !enableUndo;
            } else if (topToolbar.items[i as number].id === 'redo') {
                topToolbar.items[i as number].disabled = !enableRedo;
            } else if (topToolbar.items[i as number].id === 'ok') {
                if (this.currentToolbar === 'main') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Save';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-save';
                } else if (this.currentToolbar === 'crop' || this.currentToolbar === 'filter') {
                    topToolbar.items[i as number].visible = true;
                    topToolbar.items[i as number].tooltipText = 'Apply';
                    topToolbar.items[i as number].prefixIcon = 'e-icons e-check-tick';
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            
            } else if (topToolbar.items[i as number].id === 'cancel') {
                if (this.currentToolbar === 'main' || this.currentToolbar === 'crop') {
                    topToolbar.items[i as number].visible = true;
                } else {
                    topToolbar.items[i as number].visible = false;
                }
            }
        }
        setTimeout(() => {
            let toolbarArea: HTMLElement = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }, 1);
    }

    updateToolbar(args: ShapeChangeEventArgs, isEvent?: boolean) {
        const type: string = args.currentShapeSettings.type.toLowerCase();
        this.refreshToolbar(type, isEvent);
        if (isEvent) {
            this.tempShapeSettings = args.currentShapeSettings;
            this.activeObjIndex = this.tempShapeSettings.id;
        }
        setTimeout(() => {
            const selFillElem: HTMLElement = document.querySelector('.e-fill.e-template .e-dropdownbtn-preview') as HTMLElement;
            const selStrokeElem: HTMLElement = document.querySelector('.e-stroke.e-template .e-dropdownbtn-preview') as HTMLElement;
            const selTextStrokeElem: HTMLElement = document.querySelector('#imageEditor_fontColorBtn .e-dropdownbtn-preview') as HTMLElement;
            const selPenStrokeElem: HTMLElement = document.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview') as HTMLElement;
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                } else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    (getComponent('imageEditor_shapeFill', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.background = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    (getComponent('imageEditor_shapeStroke', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.background = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    (getComponent('imageEditor_textFont', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.background = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    (getComponent('imageEditor_penStroke', 'colorpicker') as ColorPicker).value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    }

    toPascalCase(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    filterImage(args: any) {
        this.imageEditorObj.applyImageFilter(args.item.id);
        this.filter = args.item.id;
    }

    filterToolbarCreated() {
        this.createCanvasFilter();
        this.filterToolbar.refreshOverflow();
    }

    renderDropDownButton(id: string, items: DropDownButtonItemModel[], iconCss: string, cssClass: string,
        popup: boolean) {
        iconCss = iconCss === '' ? '' : 'e-icons ' + iconCss;
        const drpDownBtn: DropDownButton = new DropDownButton({
            items: items, iconCss: iconCss, cssClass: cssClass,
            createPopupOnClick: popup,
            open: (args: OpenCloseMenuEventArgs) => {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top - args.element.parentElement.offsetHeight + 'px';
                }
            },
            select: (args: MenuEventArgs) => {
                this.refreshToolbar(args.item.id);
            }
        });
        drpDownBtn.appendTo('#' + id);
    }

    renderColorPicker(type: string, id: string, value: string, cssClass: string,
        noColor: boolean, mode: ColorPickerMode, inline: boolean, showButtons: boolean,
        target: string, iconCss: string, ddbCssClass: string, ddbId: string, dropdownPreview: string, colors: { [key: string]: string[]; }): void {
        const colorpicker: ColorPicker = new ColorPicker({
            modeSwitcher: false, noColor: noColor, value: value, inline: inline,
            showButtons: showButtons, mode: mode, cssClass: cssClass,
            presetColors: colors, columns: 4,
            change: (args: ColorPickerEventArgs): void => {
                this.isShapeCustomizing = true;
                if (type === 'pen-color') {
                    if (this.tempShapeSettings && this.tempShapeSettings.id && this.tempShapeSettings.id.split('_')[0] === 'pen') {
                        const shapeSetting: ShapeSettings = {id: this.tempShapeSettings.id, type: ShapeType.FreehandDraw,
                            startX: this.tempShapeSettings.startX, startY: this.tempShapeSettings.startY,
                            strokeColor: args.currentValue.hex, strokeWidth: this.tempShapeSettings.strokeWidth,
                            opacity: this.tempShapeSettings.opacity, points: this.tempShapeSettings.points };
                        this.tempShapeSettings.strokeColor = args.currentValue.hex;
                        this.imageEditorObj.updateShape(shapeSetting, true);
                        this.isShapeSelected = true;
                    } else {
                        const shapeSetting: ShapeSettings = {id: null, type: ShapeType.FreehandDraw, startX: null, startY: null,
                            strokeColor: args.currentValue.hex};
                        this.imageEditorObj.updateShape(shapeSetting);
                    }
                } else {
                    const shapeSetting: ShapeSettings = this.imageEditorObj.getShapeSetting(this.activeObjIndex);
                    if (type === 'font-color') {
                        shapeSetting.color = args.value;
                    } else if (type === 'shape-fill') {
                        shapeSetting.fillColor = args.value;
                    } else if (type === 'shape-stroke') {
                        shapeSetting.strokeColor = args.value;
                    }
                    this.tempShapeSettings = shapeSetting;
                    this.imageEditorObj.updateShape(shapeSetting, true);
                    this.isShapeSelected = true;
                    if (this.isTextEditing) {
                        this.imageEditorObj.enableTextEditing();
                    }
                }
                this.isShapeCustomizing = false;
                if (type === 'shape-fill') {
                    if (args.currentValue.rgba === '') {
                        (dropdownBtn.element.children[0] as HTMLElement).classList.add('e-nocolor-item');
                    } else {
                        (dropdownBtn.element.children[0] as HTMLElement).classList.remove('e-nocolor-item');
                        (dropdownBtn.element.children[0] as HTMLElement).style.backgroundColor = args.currentValue.rgba;
                    }
                } else {
                    (dropdownBtn.element.children[0] as HTMLElement).style.backgroundColor = args.currentValue.rgba;
                }
                dropdownBtn.toggle();
            },
            beforeClose: (): void => {
                dropdownBtn.toggle();
            }
        }, '#' + id);
        const dropdownBtn: DropDownButton = new DropDownButton({
            open: (args: OpenCloseMenuEventArgs) => {
                const parenElem: HTMLElement = args.element.parentElement;
                if (Browser.isDevice) {
                    parenElem.style.top = dropdownBtn.element.getBoundingClientRect().top -
                    parenElem.offsetHeight + 'px';
                    parenElem.style.left = args.element.parentElement.offsetLeft + 'px';
                }
            },
            target: target,
            iconCss: iconCss,
            cssClass: ddbCssClass
        }, '#' + ddbId);
        colorpicker.inline = true;
        colorpicker.value = colorpicker.getValue(colorpicker.value, 'rgba');
        if (type === 'shape-fill') {
            (document.querySelector(dropdownPreview) as HTMLElement).classList.add('e-nocolor-item');
        } else {
            (document.querySelector(dropdownPreview) as HTMLElement).style.background = colorpicker.value;
        }
    }

    renderAnnotationBtn() {
        const items: DropDownButtonItemModel[] = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        this.renderDropDownButton('imageEditor' + '_annotationButton', items, 'e-shapes', 'e-image-popup', false);
    }

    createFontColor() {
        document.querySelector('.e-template.e-text-fontColor').appendChild(this.imageEditorObj.createElement('input', {
            id: 'imageEditor_textFont'
        }));
        this.renderColorPicker('font-color', 'imageEditor_textFont', this.tempShapeSettings && this.tempShapeSettings.color != null ? this.tempShapeSettings.color : '#fff', 'e-text-font-color', false, 'Palette', true, false, '.e-text-font-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_fontColorBtn', '.e-text-fontColor.e-template .e-dropdownbtn-preview', this.presetColors);
    }

    createShapeColor() {
        const id: string = 'imageEditor';
        document.querySelector('.e-template.e-fill').appendChild(this.imageEditorObj.createElement('input', {
            id: id + '_shapeFill'
        }));
        const colors: {[key: string]: string[]} = extend({}, this.presetColors, {}, true) as {[key: string]: string[]};
        colors['custom'][0] = '';
        document.querySelector('.e-template.e-stroke').appendChild(this.imageEditorObj.createElement('input', {
            id: id + '_shapeStroke'
        }));
        this.renderColorPicker('shape-fill', 'imageEditor_shapeFill', '', 'e-shape-fill-color', true, 'Palette', true, false, '.e-shape-fill-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_fillColorBtn', '.e-fill.e-template .e-dropdownbtn-preview', colors);
        this.renderColorPicker('shape-stroke', 'imageEditor_shapeStroke', '#fff', 'e-shape-stroke-color', false, 'Palette', true, false, '.e-shape-stroke-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_borderColorBtn', '.e-stroke.e-template .e-dropdownbtn-preview', this.presetColors);
    }

    createPenColor() {
        const id: string = 'imageEditor';
        document.querySelector('.e-template.e-pen-stroke-color').appendChild(this.imageEditorObj.createElement('input', {
            id: id + '_pen_stroke'
        }));
        this.renderColorPicker('pen-color', 'imageEditor_pen_stroke', '#fff', 'e-pen-color', false, 'Palette', true, false, '.e-pen-color',
                        'e-dropdownbtn-preview', 'e-ie-ddb-popup', 'imageEditor_penColorBtn', '.e-pen-stroke-color.e-template .e-dropdownbtn-preview', this.presetColors);
    }

    createCanvasFilter() {
        const inMemoryCanvas: HTMLCanvasElement = document.createElement('canvas');
        const inMemoryContext: CanvasRenderingContext2D = inMemoryCanvas.getContext('2d');
        if(this.imageData) {
            inMemoryCanvas.width = this.imageData.width; inMemoryCanvas.height = this.imageData.height;
            inMemoryContext.putImageData(this.imageData, 0, 0);
        }
        this.updateFilterCanvas('_defaultCanvas', 'default', inMemoryCanvas);
        this.updateFilterCanvas('_chromeCanvas', 'chrome', inMemoryCanvas);
        this.updateFilterCanvas('_coldCanvas', 'cold', inMemoryCanvas);
        this.updateFilterCanvas('_warmCanvas', 'warm', inMemoryCanvas);
        this.updateFilterCanvas('_grayscaleCanvas', 'grayscale', inMemoryCanvas);
        this.updateFilterCanvas('_sepiaCanvas', 'sepia', inMemoryCanvas);
        this.updateFilterCanvas('_invertCanvas', 'invert', inMemoryCanvas);
    }

    updateFilterCanvas(selector: string, type: string, inMemoryCanvas: HTMLCanvasElement) {
        const filter: HTMLCanvasElement = document.querySelector('#imageEditor' + selector);
        if (filter) {
            let ctx: CanvasRenderingContext2D = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px'; filter.style.height = '100px';
            ctx.filter = this.imageEditorObj.getImageFilter(this.toPascalCase(type) as ImageFilterOption) as string;
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    }

    apply() {
        if (this.currentToolbar === 'crop') {
            this.imageEditorObj.crop();
        } else if (this.currentToolbar === 'pen') {
            if (this.activeObjIndex && this.activeObjIndex.split('_')[0] === 'pen') {
                this.tempShapeSettings = this.imageEditorObj.getShapeSetting(this.activeObjIndex);
            } else {
                const shapeSettings: ShapeSettings[] = this.imageEditorObj.getShapeSettings();
                if (shapeSettings.length > 0) {
                    this.tempShapeSettings = shapeSettings[shapeSettings.length - 1].id.split('_')[0] === 'pen' ? shapeSettings[shapeSettings.length - 1] : null;
                    if (this.tempShapeSettings) {
                        this.imageEditorObj.selectShape(this.tempShapeSettings.id);
                    } else {
                        this.imageEditorObj.freeHandDraw(false);
                    }
                } else {
                    this.imageEditorObj.freeHandDraw(false);
                    return;
                }
            }
            if (this.tempShapeSettings) {
                this.imageEditorObj.updateShape(this.tempShapeSettings);
            }
        } else if (this.currentToolbar === 'freehanddraw' && this.tempShapeSettings) {
            this.imageEditorObj.updateShape(this.tempShapeSettings);
        } else if (this.currentToolbar !== 'filter' && this.activeObjIndex) {
            this.tempShapeSettings = this.imageEditorObj.getShapeSetting(this.activeObjIndex);
            this.imageEditorObj.updateShape(this.tempShapeSettings);
        }
        this.tempShapeSettings = null; this.activeObjIndex = null;
    }

    keyDownEventHandler(e: KeyboardEvent): void {
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        switch (e.key) {
        case (e.ctrlKey && 's'):
            this.imageEditorObj.export();
            break;
        case (e.ctrlKey && 'z'):
            this.isTextEditing = false;
            this.refreshToolbar('main');
            break;
        case (e.ctrlKey && 'y'):
            this.isTextEditing = false;
            this.refreshToolbar('main');
            break;
        case 'Delete':
            if (isNullOrUndefined(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
                this.activeObjIndex = this.tempShapeSettings.id;
            }
            if (this.activeObjIndex) {this.imageEditorObj.deleteShape(this.activeObjIndex); }
            this.refreshToolbar('main');
            break;
        case 'Escape':
            if (this.currentToolbar === 'crop') {
                this.imageEditorObj.clearSelection(true);
                this.refreshToolbar('main');
            }
            break;
        case 'Enter':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(e.target as any).closest('.e-textarea')) {
                this.apply();
                this.refreshToolbar('main');
            }
            break;
        }
    }

    doubleClickEvent(e: MouseEvent & TouchEvent) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && (e.target as any).closest('.e-textarea')) {
            this.isTextEditing = true;
        }
    }

    ngOnDestroy() {
        const dropdowns = document.querySelectorAll('.e-dropdown-popup');
        if (dropdowns && dropdowns.length > 0) {
            dropdowns.forEach(dropdown => {
                if (dropdown.id && dropdown.id.indexOf("imageEditor") !== -1) {
                    dropdown.remove();
                }
            });
        }
    }
}


