import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { QRCodeGenerator ,DisplayTextModel} from '@syncfusion/ej2-angular-barcode-generator';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as NumericChangeEventArgs, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { TextPosition, Alignment } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, ChangedEventArgs } from '@syncfusion/ej2-inputs';
@Component({
  selector: 'control-content',
  templateUrl: 'qrCode.html',
  styleUrls: ['barcode-style.css'],
  encapsulation: ViewEncapsulation.None
})
export class QrCodeComponent {
  @ViewChild('barcode')
  public barcode: QRCodeGenerator;
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


  public errorCorrectionValue: { [key: string]: Object }[] = [
    { value: '7', text: 'Low' },
    { value: '15', text: 'Medium' },
    { value: '25', text: 'Quartile' },
    { value: '30', text: 'High' },
  ];

  public textAlignmentValues: { [key: string]: Object }[] = [
    { type: 'Left', text: 'Left' },
    { type: 'Right', text: 'Right' },
    { type: 'Center', text: 'Center' },
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
  public displayTextMethod: DisplayTextModel = {
    visibility: false
  };


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


  public TextmarginTophChange(args: NumericChangeEventArgs) {
    this.barcode.displayText.margin.top = args.value;
  }
  public TextMarginBottomhChange(args: NumericChangeEventArgs) {
    this.barcode.displayText.margin.bottom = args.value;
  }

  public errorCorrectionOnChange(args: ChangeEventArgs) {
    this.barcode.errorCorrectionLevel = (Number(args.itemData.value));
  }

  public VersionChange(args: NumericChangeEventArgs) {
    this.barcode.version = (Number(args.value));
  }


  public displayTextOnChange(args: ChangedEventArgs) {
    this.barcode.displayText.text = args.value.toString();
  }


}