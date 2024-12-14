import { Component, OnInit, AfterViewInit } from '@angular/core';
import { getComponent } from '@syncfusion/ej2-base';
import { ImageEditorComponent, ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { MultiSelectModule, MultiSelectComponent, CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
    selector: 'control-content',
    templateUrl: 'file-restrict.html',
    styleUrls: ['file-restrict.css'],
    providers: [CheckBoxSelectionService],
    standalone: true,
    imports: [SBActionDescriptionComponent, ImageEditorModule, DropDownButtonModule, MultiSelectModule, NumericTextBoxModule, SBDescriptionComponent]
})
export class FileRestrictComponent {
  public fileExtensionsList = [
    { Name: 'JPEG', Value: '.jpeg' },
    { Name: 'JPG', Value: '.jpg' },
    { Name: 'PNG', Value: '.png' },
    { Name: 'SVG', Value: '.svg' },
    { Name: 'WebP', Value: '.webp' }
  ];
  public defaultUnit = 'KB';
  public fields = { text: 'Name', value: 'Value' };
  public allowedExtensions: any = ['.jpeg', '.jpg', '.png', '.svg', '.webp'];
  public minFileSize = 1;
  public maxFileSize = 100;
  public uploadSettings = {
    minFileSize: this.convertToBytes(this.minFileSize),
    maxFileSize: this.convertToBytes(this.maxFileSize),
    allowedExtensions: this.allowedExtensions.join(', ')
  };
  public units = [
    { text: 'MB' },
    { text: 'KB' }
  ];

  onCreated() {
    this.updateUploadSettings();
  }

  convertToBytes(value: number): number {
    return value * (this.defaultUnit === 'MB' ? 1024 * 1024 : 1024);
  }

  updateMinFileSize(event: any): void {
    if (event.value >= 0) {
      this.minFileSize = event.value;
      this.updateUploadSettings();
    }
  }

  updateMaxFileSize(event: any): void {
    if (event.value >= this.minFileSize) {
      this.maxFileSize = event.value;
      this.updateUploadSettings();
    }
  }

  updateAllowedExtensions(event: any): void {
    if (event.value.length === 0) {
      this.allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp";
    } else {
      this.allowedExtensions = event.value;
    }
    this.updateUploadSettings();
  }

  updateUploadSettings(): void {
    this.uploadSettings = {
      minFileSize: this.convertToBytes(this.minFileSize),
      maxFileSize: this.convertToBytes(this.maxFileSize),
      allowedExtensions: this.allowedExtensions.join(', '),
    };
    const imageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditorComponent;
    if (imageEditor) {
      imageEditor.uploadSettings = this.uploadSettings;
      imageEditor.dataBind();
    }
  }

  onSelect(args: any): void {
    this.defaultUnit = args.item.text;
    this.updateUploadSettings();
  }

  beforeItemRender(args: any): void {
    if (args.item.text === this.defaultUnit) {
      args.element.classList.add('e-selected');
    }
  }
}
