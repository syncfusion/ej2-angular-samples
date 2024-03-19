import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { addClass, createElement, getComponent } from '@syncfusion/ej2-base';
import { SignatureComponent, ColorPickerModule, SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { SplitButton, ItemModel, MenuEventArgs, DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Button, ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs, NumericTextBox, PaletteTileEventArgs, Signature, SignatureFileType } from '@syncfusion/ej2-inputs';
import { DropDownList, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'toolbar.html',
    styleUrls: ['toolbar.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, SplitButtonModule, ColorPickerModule, DropDownListModule, CheckBoxModule, SignatureModule, SBDescriptionComponent]
})
export class ToolbarSignatureComponent {
    @ViewChild('signature') signature !: SignatureComponent;
    public widthOptions: ItemModel[] = [
      { text: '1'},
      { text: '2'},
      { text: '3'},
      { text: '4'},
      { text: '5'}
    ];
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
          (this.signature.disabled as any) = args.checked;
      }
    });
  
    public valueChange(args:ChangeEventArgs) {
      this.signature.disabled = args.checked as boolean;
    };
  
    public onChange(){
      let saveBtn: SplitButton = getComponent(document.getElementById("save-option") as HTMLElement, 'split-btn');
        if (!this.signature.isEmpty()) {
            this.clearButton();
            saveBtn.disabled = false;
        }
        this.updateUndoRedo();
    }
  
    public presetColors = {
      'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
          '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
    };
  
    public onCreated(e: any) {
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
                let redoButton1: SplitButton | any = document.querySelectorAll('.e-selected-color');
                addClass(redoButton1, 'e-sign-icons');      
      }
      this.clearButton();
      (document.getElementById('save-option') as HTMLElement).addEventListener('click', this.saveBtnClick);
    };
  
    public onColorChange(args: ColorPickerEventArgs, id: string) {
      if(!this.signature.disabled){
        let pickerElem: any = this.getPickerElem(document.getElementById(id));
        if(id === 'bg-color'){
          this.signature.backgroundColor = args.currentValue.rgba;
        } else {
          this.signature.strokeColor = args.currentValue.rgba;
        }
        pickerElem.style.borderBottomColor =  args.currentValue.rgba ;
      }
    };
  
    public tileRender(args: PaletteTileEventArgs) {
      if(args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
      }
    }
  
    public onSelect(args: any, option?: string) {
      if(option === 'width') {
        this.signature.maxStrokeWidth = parseInt((args.item.textContent as string));
      } else {
        this.signature.save(args.item.text as SignatureFileType, 'Save');
      }
    }
     
    public getPickerElem(args:any) {
      let pickerElem: HTMLElement = args.nextElementSibling;
      return (pickerElem) ? pickerElem.querySelector('.e-selected-color') : null;
    }
  
    public onClick (args: ClickEventArgs): void {
      let saveBtn: SplitButton = getComponent(document.getElementById("save-option") as HTMLElement, 'split-btn');
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
                  if (this.signature.isEmpty()) {
                      this.clearButton();
                      saveBtn.disabled = true;
                  }
                  break;
          }
    }
  
    public updateSaveBtn() {
      let saveBtn: SplitButton = getComponent(document.getElementById("save-option") as HTMLElement, 'split-btn');
      if (this.signature.isEmpty()) {
          saveBtn.disabled = true;
      }
    }
  
    public updateUndoRedo() {
      let undoButton: Button | any; let redoButton: Button | any
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
    };
  
    public saveBtnClick(): void {
      let signature: Signature = getComponent(document.getElementById("signature") as HTMLElement, 'signature');
      signature.save();
    };
  
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
    };
}