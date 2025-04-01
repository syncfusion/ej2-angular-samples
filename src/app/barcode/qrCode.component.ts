import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { QRCodeGenerator, DisplayTextModel, QRCodeGeneratorModule } from '@syncfusion/ej2-angular-barcode-generator';
import { TextBoxComponent, TextBoxModule, NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { ChangeEventArgs as NumericChangeEventArgs, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ValidateEvent } from '@syncfusion/ej2-barcode-generator';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { TextPosition, Alignment } from '@syncfusion/ej2-barcode-generator/src/barcode/enum/enum';
import { TextBox, NumericTextBox, ChangedEventArgs } from '@syncfusion/ej2-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'qrCode.html',
    styleUrls: ['barcode-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, QRCodeGeneratorModule, TextBoxModule, NumericTextBoxModule, CheckBoxModule, ColorPickerModule, DropDownListModule, SBDescriptionComponent, ButtonModule]
})
export class QrCodeComponent {
  @ViewChild('barcode')
  public barcode: QRCodeGenerator;
  @ViewChild('displayText')
  public displayText: TextBoxComponent;

  public logoImageSource: string = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAuRXhpZgAATU0AKgAAAAgAAkAAAAMAAAABAAAAAEABAAEAAAABAAAAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAHaAdoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2WiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAozQaSgBc0U3inClcAooopgFFFF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/wCFTf7X60f8Km/2v1pfWIdx8jPNPyo/KvS/+FTf7X60f8Km/wBr9aPrEO4cjPNPyo/KvS/+FTf7X60f8Km/2v1o+sQ7hyM80/KkyK9M/wCFTf7X60f8Km/2v1o+sU+4cjPM+MZz1r0D4PH/AInF+P8ApmKuH4UHj5v/AB6uh8G+DT4avbiYnPmrjrWdatCUGkxxi07nX1g+M/8AkXLr/cNb9Z+t6d/aemy2399cVwwaUk2aPVHzhHjH40/8q9JHwn9W7+tO/wCFT/7X/j1el9Zh3MeRnmn5UflXpf8Awqb/AGv1o/4VN/tfrR9Yh3HyM80/Kj8q9L/4VN/tfrR/wqb/AGv1o+sQ7hyM80/Kj8q9L/4VN/tfrR/wqb/a/Wj6xDuHIzzT8qPyr0v/AIVN/tfrR/wqb/a/Wj6xDuHIzzT8q0/DRH9vw+ua7j/hU/8Atf8Aj1WtK+GX2DUI7jd933pSxEHFpMFF3PQrb/j1i/3RUlNjXy40T+6MU6vMZqLRRRQMKKKKACiiigAooooAKKKKACiiigAooooAKKKKADFFFFABRRRSAKKKKACiiigAooooAKKKKACiiigAo5oopgFFFFKwBRRRQAUUUUAFFFFABRRRQAUUUUwCiiigAooooAKKKKQBRRRQAUUUUAFFFFABRRRRYApMUtFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooASilooA//9k=";
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

  public showLogo(args: CheckBoxChangeEventArgs) {
    this.barcode.logo.imageSource = args.checked ? this.logoImageSource : '';
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

  btnClick() {
    this.barcode.exportImage("SyncfusionQR", "PNG");
  }
}