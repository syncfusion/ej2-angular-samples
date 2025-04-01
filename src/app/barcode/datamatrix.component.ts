import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataMatrixGenerator, DisplayTextModel, DataMatrixGeneratorModule } from '@syncfusion/ej2-angular-barcode-generator';
import { TextBoxComponent, TextBoxModule, NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as NumericChangeEventArgs, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { TextPosition, Alignment } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import {  DataMatrixEncoding } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, ChangedEventArgs } from '@syncfusion/ej2-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'datamatrix.html',
    styleUrls: ['barcode-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DataMatrixGeneratorModule, TextBoxModule, NumericTextBoxModule, CheckBoxModule, ColorPickerModule, DropDownListModule, SBDescriptionComponent, ButtonModule]
})
export class DataMatrixComponent {
  @ViewChild('barcode')
  public barcode: DataMatrixGenerator;
  @ViewChild('displayText')
  public displayText: TextBoxComponent
  
public canShowError: boolean = false;
public customfn(): any {
  let customFn: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    if (this.canShowError) {
        return false;
    }
    return true;
};
return customFn
}

public options(): any {
  let custom = this.customfn()
  let options: FormValidatorModel = {
    rules: {
      'password': { minLength: [custom, 'Invalid input'] }
    },
    keyup(): void {
      if (this.canShowError) {
        this.canShowError = false;
      }
    },
    focusout(args: any): void {
      this.displayText.value = this.barcode.value = (document.getElementById('barcodeValue') as HTMLInputElement).value;
      this.barcode.dataBind();
    },


  };
  return options
}
public invalidInput(args: ValidateEvent): void {
  let error: HTMLElement = document.getElementById('errorblog');

  this.canShowError = true;
  let options = this.options()
  let formobject =  new FormValidator('#form-element', options);
  //this.formObject.validate();
  formobject.validate();
}


  public MatrixSizeValue: { [key: string]: Object }[] = [
    { value: '0', text: 'Auto' },
    { value: '1', text: 'Size10x10' },
    { value: '2', text: 'Size12x12' },
    { value: '3', text: 'Size14x14' },
    { value: '4', text: 'Size16x16' },
    { value: '5', text: 'Size18x18' },
    { value: '6', text: 'Size20x20' },
    { value: '7', text: 'Size22x22' },
    { value: '8', text: 'Size24x24' },
    { value: '9', text: 'Size26x26' },
    { value: '10', text: 'Size32x32' },
    { value: '11', text: 'Size36x36' },
    { value: '12', text: 'Size40x40' },
    { value: '13', text: 'Size44x44' },
    { value: '14', text: 'Size48x48' },
    { value: '15', text: 'Size52x52' },
    { value: '16', text: 'Size64x64' },

    { value: '17', text: 'Size72x72' },
    { value: '18', text: 'Size80x80' },
    { value: '19', text: 'Size88x88' },
    { value: '20', text: 'Size96x96' },
    { value: '21', text: 'Size104x104' },
    { value: '22', text: 'Size120x120' },
    { value: '23', text: 'Size132x132' },
    { value: '24', text: 'Size144x144' },
    { value: '25', text: 'Size8x18' },
    { value: '26', text: 'Size8x32' },
    { value: '27', text: 'Size12x26' },
    { value: '28', text: 'Size12x36' },
    { value: '29', text: 'Size16x36' },
    { value: '30', text: 'Size16x48' },
  ];

  public PdfDataMatrixEncodingValue: { [key: string]: Object }[] = [
    { value: 'Auto', text: 'Auto' },
    { value: 'ASCII', text: 'ASCII' },
    { value: 'ASCIINumeric', text: 'ASCIINumeric' },
    { value: 'Base256', text: 'Base256' },
  ];
  public barcodevalueOnChange(args) {
    this.barcode.value = args.value.toString();
    //this.displayText.value = args.value.toString();
  }

  public onWidthChange(args: NumericChangeEventArgs) {
    this.barcode.width = args.value.toString();
  }
  public onheightChange(args: NumericChangeEventArgs) {
    this.barcode.height = args.value.toString();
  }

  public textVisibilityChange(args: CheckBoxChangeEventArgs) {
    this.barcode.displayText.visibility = args.checked;
  }

  public svgModeChange(args: CheckBoxChangeEventArgs) {
    this.barcode.mode = args.checked ? 'SVG' : 'Canvas';
  }

  public bgColorChange(args: ColorPickerEventArgs) {
    this.barcode.backgroundColor = args.currentValue.hex;
  }
  public foreColorChange(args: ColorPickerEventArgs) {
    this.barcode.foreColor = args.currentValue.hex;
  }


  public marginLeftChange(args: NumericChangeEventArgs) {
    this.barcode.margin.left = args.value;
  }
  public MarginRighthChange(args: NumericChangeEventArgs) {
    this.barcode.margin.right = args.value;
  }
  public marginTopChange(args: NumericChangeEventArgs) {
    this.barcode.margin.top = args.value;
  }
  public MarginBottomtChange(args: NumericChangeEventArgs) {
    this.barcode.margin.bottom = args.value;
  }
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };
  // // public displayTextMethod():DisplayTextModel={
  // //   this.barcode.displayText.visibility = false
  // // }
  // public displayTextMethod: DisplayTextModel = {
  //   visibility: false
  // };


  public TextmarginTophChange(args: NumericChangeEventArgs) {
    this.barcode.displayText.margin.top = args.value;
  }
  public TextMarginBottomhChange(args: NumericChangeEventArgs) {
    this.barcode.displayText.margin.bottom = args.value;
  }

  public textPositionOnChange(args: ChangeEventArgs) {
    this.barcode.displayText.position = (args.value) as TextPosition;
  }

  public MatrixSizeonOnChange(args: ChangeEventArgs) {
    // this.barcode.displayText.alignment = (args.value) as Alignment;
    this.barcode.size = (Number(args.itemData.value));
  }


  public PdfDataMatrixEncodingOnChange(args: ChangeEventArgs) {
    this.barcode.encoding = ((args.itemData.value.toString()) as DataMatrixEncoding);
  }

  btnClick() {
    this.barcode.exportImage("DataMatrix", "PNG");
  }
}