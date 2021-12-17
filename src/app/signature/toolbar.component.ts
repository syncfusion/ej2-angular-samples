import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { addClass, createElement, getComponent } from '@syncfusion/ej2-base';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SplitButton, ItemModel, MenuEventArgs, DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Button, ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs, NumericTextBox, PaletteTileEventArgs, Signature, SignatureFileType } from '@syncfusion/ej2-inputs';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'toolbar.html',
    styleUrls: ['toolbar.css'],
    encapsulation: ViewEncapsulation.None

})
export class ToolbarSignatureComponent {
    @ViewChild('signature') signature: SignatureComponent;
    public strokeWidth: number = 2;
    public items: ItemModel[] = [
    {
        text: 'Png'
    },
    {
        text: 'Jpeg'
    },
    {
        text: 'Svg'
    }];

    public templateCheckbox1: any = new CheckBox({
        label: 'Disabled',
        checked: false,
        change: (args: ChangeEventArgs) => {
            this.signature.disabled = args.checked;
        }
    });

    public change(): void {
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (!this.signature.isEmpty()) {
            this.clearButton();
           saveBtn.disabled = false;
        }
        this.updateUndoRedo();
    }
    public onCreate (e: any) {
        this.templateCheckbox1.appendTo('#chkelement1');
        let ddl: DropDownList = new DropDownList({
            dataSource:  [1, 2, 3, 4, 5],
            width: '60',
            value: 2,
            change: function(args) {
                let signature: Signature = getComponent(document.getElementById("signature"), 'signature');
                signature.maxStrokeWidth = args.value;
            } 
        });
        ddl.appendTo('#stroke-width');
        new SplitButton({
            iconCss: 'e-sign-icons e-save',
            items: this.items,
            content: 'Save',
            select: (args: MenuEventArgs) => {
                this.signature.save(args.item.text as SignatureFileType, 'Signature');
            },
            disabled: true
        }, '#save-option');
        let strokeColor: ColorPicker = new ColorPicker({
            modeSwitcher: false,
            columns: 4,
            presetColors: {
                'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                args.element.classList.add('e-circle-palette');
                args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
            },
            showButtons: false,
            mode: 'Palette',
            cssClass: 'e-stroke-color', 
            change: (args: ColorPickerEventArgs) => {
                if (this.signature.disabled) {
                    return;
                }
                let selElem: HTMLElement = strokeColor.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
                selElem.style.borderBottomColor = args.currentValue.rgba;
                this.signature.strokeColor = args.currentValue.rgba;
            }
        });
        strokeColor.appendTo('#stroke-color');
        let bgColor: ColorPicker = new ColorPicker({
            modeSwitcher: false,
            columns: 4,
            noColor: true,
            presetColors: {
                'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
            },
            beforeTileRender: (args: PaletteTileEventArgs) => {
                args.element.classList.add('e-circle-palette');
                args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
            },
            showButtons: false,
            mode: 'Palette',
            cssClass: 'e-bg-color',
            change: (args:ColorPickerEventArgs) => {
                if (this.signature.disabled) {
                    return;
                }
                let selElem: HTMLElement = bgColor.element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
                this.signature.backgroundColor = args.currentValue.rgba;
                selElem.style.borderBottomColor = args.currentValue.rgba;
            }
        });
        bgColor.appendTo('#bg-color');
      
        addClass([strokeColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        addClass([bgColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        document.getElementById('save-option').addEventListener('click', this.saveBtnClick);
        this.clearButton();
        let toolbarlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < toolbarlItems.length; i++) {
            if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
                let undoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                undoButton.disabled = true;
            }
            if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
                let redoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
                redoButton.disabled = true;
            }
        }
    }

    public clicked(args: ClickEventArgs): void {
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (this.signature.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case 'Undo (Ctrl + Z)':
                if (this.signature.canUndo()) {
                    this.signature.undo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Redo (Ctrl + Y)':
                if (this.signature.canRedo()) {
                    this.signature.redo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Clear':
                this.signature.clear();
                if (this.signature.isEmpty) {
                    this.clearButton();
                    saveBtn.disabled = true;
                }
                break;
        }
    }

    public saveBtnClick(): void {
        let signature: Signature = getComponent(document.getElementById("signature"), 'signature');
        signature.save();
    }

    public clearButton() {
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                let clrBtn: Button = getComponent(tlItems[i] as HTMLElement, 'btn');
                if (this.signature.isEmpty()) {
                    clrBtn.disabled = true;
                } else {
                    clrBtn.disabled = false;
                }
            }
        }
    }

    public updateSaveBtn() {
        let saveBtn: SplitButton = getComponent(document.getElementById("save-option"), 'split-btn');
        if (this.signature.isEmpty()) {
            saveBtn.disabled = true;
        }
    }

    public updateUndoRedo() {
        let undoButton: Button; let redoButton: Button
        let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-undo')) {
                undoButton = getComponent(tlItems[i] as HTMLElement, 'btn'); 
            }
            if (tlItems[i].children[0].classList.contains('e-redo')) {
                redoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
            }
        }
        if (this.signature.canUndo()) {
            undoButton.disabled = false;
        } else {
            undoButton.disabled = true;
        }
        if (this.signature.canRedo()) {
            redoButton.disabled = false;
        } else {
            redoButton.disabled = true;
        }
    }
}