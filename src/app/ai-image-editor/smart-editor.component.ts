import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { TreeViewComponent, NodeSelectEventArgs, TreeViewAllModule, SidebarAllModule, SidebarComponent,ToolbarAllModule, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { hideSpinner, showSpinner } from '@syncfusion/ej2/popups';
import { ImageEditorAllModule, ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';
import { createElement } from '@syncfusion/ej2-base';
import { StabilityAiModelBGRemover,StabilityAiModel,StabilityAiModelMagicEraser } from './stability-ai-model';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxAllModule, TextBoxComponent , ColorPickerAllModule, ColorPickerEventArgs, PaletteTileEventArgs, ColorPickerComponent} from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-smart-editor',
  standalone: true,
  imports: [ImageEditorAllModule,CommonModule,ToolbarAllModule, TreeViewAllModule, SidebarAllModule, ButtonAllModule,TextBoxAllModule,ColorPickerAllModule],
  templateUrl: './smart-editor.component.html',
  styleUrl: './smart-editor.component.css'
})
export class SmartEditorComponent implements OnInit{
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-editor.component.html',
      'smart-editor.component.css',
      'stability-ai-model.ts'
    ];
  }
  @ViewChild('treeView') treeObj!: TreeViewComponent;
  @ViewChild('imageediorsideBar') sidebarObj!: SidebarComponent;
  @ViewChild('imageEditor') imageEditorObj!: ImageEditorComponent;
  @ViewChild('outlined') outlineTextBox!: TextBoxComponent;
  @ViewChild('colorpicker') colorPicker!: ColorPickerComponent;
  colorPickerVal: string = '';
  wrapperDiv!:HTMLElement;
  public treeData: { [key: string]: Object }[] = [
    { id: "1", name: "Magic Eraser", imageUrl: "./assets/ai-image-editor/object-remover.gif" },
    { id: "2", name: "Change Background", imageUrl: "./assets/ai-image-editor/change-bg.png" },
    { id: "3", name: "Remove Background", imageUrl: "./assets/ai-image-editor/remove-bg.png" }
  ];
  public presetColors: { [key: string]: string[] } = {
    'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
  };
  public items: any[] = [
    { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" },
    { template: '<div class="e-folder"><div class="e-folder-name">AI Image Editor</div></div>', cssClass: "e-folder" }
  ];
  
  ngOnInit(): void {
    this.wrapperDiv = document.getElementById('wrapper-container') as HTMLElement;
  }
  onFileOpened(): void {
    setTimeout(() => {
      this.imageEditorObj.update();
    }, 200);
  }
  removebtn(): void {
    this.imageEditorObj.element.setAttribute('data-value', '');
    (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
    hideSpinner(this.imageEditorObj.element);
    this.wrapperDiv.style.opacity = '1';
    this.imageEditorObj.discard();
  }
  change(args: ColorPickerEventArgs): void {
    this.colorPickerVal = args.currentValue.hex;
    this.imageEditorObj.open('', false, {backgroundColor: this.colorPickerVal } as any);
  }
  ToolbarClicked(args: ClickEventArgs): void {
    if(args.item.tooltipText == "Menu") {
      this.sidebarObj.toggle();
      setTimeout(() => {
        this.imageEditorObj.update();
      }, 500);
    }
}
  public beforeTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-circle-palette');
    args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
  }
  OnSelect(args: NodeSelectEventArgs): void {
    switch (args.nodeData['text']) {
      case "Magic Eraser":
        this.toggleDisplay('magic-eraser', 'bg-changer');
        this.imageEditorObj.update();
        this.imageEditorObj.element.setAttribute('data-value', 'mask-drawing');
        this.imageEditorObj.freehandDraw(true);
        this.treeObj.selectedNodes = [];
        break;
      case "Change Background":
        this.toggleDisplay('bg-changer', 'magic-eraser');
        this.treeObj.selectedNodes = [];
        this.processImageData();
        break;
      case "Remove Background":
        this.processImageData();
        break;
    }
  }
  processImageData(): void {
    showSpinner(this.imageEditorObj.element);
   this. wrapperDiv.style.opacity = '0.5';
    let imageData = (this.imageEditorObj as any).getImageData(false);
    let url = this.imageDataToBase64(imageData);
    const file = this.base64ToFile(url, 'image.png');
    this.removeBG(file);
  }
  base64ToFile(base64String: string, fileName: string) {
    const byteString = atob(base64String.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([intArray], { type: 'image/png' });
    const file = new File([blob], fileName, { type: 'image/png' });
    return file;
  }
  toggleDisplay(elementClassToShow: string, elementClassToHide: string): void {
    (document.getElementsByClassName(elementClassToHide)[0] as HTMLElement).style.display = 'none';
    (document.getElementsByClassName(elementClassToShow)[0] as HTMLElement).style.display = 'block';
  }

  onCreated(): void {
    this.imageEditorObj.open('./assets/ai-image-editor/image-ai.png');
  }
  imageDataToBase64(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    }
    return '';
  }
   getImageDataAsBase64(imageEditor: ImageEditorComponent): string {
    const imageData = imageEditor.getImageData(false);
    return this.imageDataToBase64(imageData);
  }
  bgRemoveBtnClick(): void {
    showSpinner(this.imageEditorObj.element);
    this.wrapperDiv.style.opacity = '0.5';
    if (this.outlineTextBox.value && this.outlineTextBox.value !== '') {
      let url = this.getImageDataAsBase64(this.imageEditorObj);
      const file = this.base64ToFile(url, 'image.png');
      let prompt = this.outlineTextBox.value;
      let searchPrompt = 'Background of the image';
      let aiOutput = StabilityAiModel(file, prompt, searchPrompt);
      aiOutput.then((result) => {
        this.imageEditorObj.open(result, false, {backgroundColor: '' } as any);
        setTimeout(() => {
          this.bghideSpinner();
        }, 100);
        (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
      });
    } else {
      this.bghideSpinner();
    }
  }
  // Remove Background
  backgrounchanger(): void {
    showSpinner(this.imageEditorObj.element);
    this.wrapperDiv.style.opacity = '0.5';
    if (this.outlineTextBox.value && this.outlineTextBox.value !== '') {
      let url = this.getImageDataAsBase64(this.imageEditorObj);
      const file = this.base64ToFile(url, 'image.png');
      let prompt = this.outlineTextBox.value;
      let searchPrompt = 'Background of the image';
      let aiOutput = StabilityAiModel(file, prompt, searchPrompt);
      aiOutput.then((result) => {
        this.imageEditorObj.open(result, false, {backgroundColor: '' } as any);
        setTimeout(() => {
          this.bghideSpinner();
        }, 100);
        (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
      });
    } else {
      this.bghideSpinner();
    }
  }
  // Magic Eraser 
  eraseOnClick(): void  {
    const maskUrl = this.getImageDataAsBase64(this.imageEditorObj);
    this.imageEditorObj.element.setAttribute('data-value', '');
    this.imageEditorObj.freehandDraw(false);
    const url = this.getImageDataAsBase64(this.imageEditorObj);
    showSpinner(this.imageEditorObj.element);
    const file = this.base64ToFile(url, 'image.png');
    const maskFile = this.base64ToFile(maskUrl, 'mask.png');
    const aiOutput = StabilityAiModelMagicEraser(file, maskFile);
    aiOutput.then((result:any) => {
      this.imageEditorObj.open(result, false, {backgroundColor: '' } as any);
      setTimeout(() => {
          hideSpinner(this.imageEditorObj.element);
          this.wrapperDiv.style.opacity = '1';
          this.treeObj.selectedNodes = [];
      }, 100);
      (document.getElementsByClassName('magic-eraser')[0] as HTMLElement).style.display = 'none';
  });
  }
  bghideSpinner() {
    (document.getElementsByClassName('bg-changer')[0] as HTMLElement).style.display = 'none';
    this.colorPicker.refresh();
    this.colorPickerVal = '#ffffff';
    this.outlineTextBox.value = '';
    const selectedElement = (this.colorPicker.element.parentElement as HTMLElement).querySelector('.e-selected');
    if (selectedElement) {
        selectedElement.classList.remove('e-selected');
    }
    hideSpinner(this.imageEditorObj.element);
    this.wrapperDiv.style.opacity = '1';
}
  removeBG(file: File) {
    let aiOutput = StabilityAiModelBGRemover(file);
    aiOutput.then((result: any) => {
      this.imageEditorObj.open(result, false, {backgroundColor: '' } as any);
      setTimeout(() => {
        hideSpinner(this.imageEditorObj.element);
        this.wrapperDiv.style.opacity = '1';
        this.treeObj.selectedNodes = [];
      }, 100);
    });
  }
}
