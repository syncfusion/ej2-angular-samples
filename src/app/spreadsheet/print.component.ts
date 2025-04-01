import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { printData, yearlyReport, base64PrintYearUrl, base64PrintUrl } from './data';
import { SpreadsheetComponent, SpreadsheetModule, ChartModel, ImageModel, PrintType } from '@syncfusion/ej2-angular-spreadsheet';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents, Button } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Print Spreadsheet Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    styleUrls: ['spreadsheet.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SpreadsheetModule, SBDescriptionComponent]
})

export class PrintController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['spreadsheet.css'];
    }
    @ViewChild('default')
    public spreadsheetObj: SpreadsheetComponent;
    public image: ImageModel[] = [{src: base64PrintUrl(), height: 40, width: 80, top: 5, left: 130}];
    public yearlyReportImage: ImageModel[] = [{src: base64PrintYearUrl(), height: 40, width: 80, top: 5, left: 95}];
    public chart: ChartModel[] = [{ type: "Column", range: "C2:D58" }];
    public printData: Object[] = printData();
    public yearlyReport: Object[] = yearlyReport();
    public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
    public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
    created() {
        this.spreadsheetObj.numberFormat('$#,##0.00', 'Car Sales!F3:F59');
        // The default format code for the date format is 'm/d/yyyy'.
        this.spreadsheetObj.numberFormat('m/d/yyyy', 'Car Sales!E3:E58');
        this.spreadsheetObj.merge('Car Sales!B1:F1');
        this.spreadsheetObj.merge('Yearly Report!B1:G1');
    }
    ngAfterViewInit(): void {
        let printType: PrintType = <PrintType>'ActiveSheet';
        let dropDownListInstance: DropDownList = new DropDownList({
            index: 0,
            placeholder: 'Printing Option',
            width: '100%',
            change: () => {
                printType = <PrintType>dropDownListInstance.value;
            }
        });
        dropDownListInstance.appendTo('#printingOption');

        let allowGridLines: boolean = false;
        let allowRowColumnHeader: boolean = false;
        let enableRowColumnHeader: EmitType<CheckBoxChangeEvents>;
        let rowColumnHeaderCheckBox: CheckBox = new CheckBox(
            {
                change: enableRowColumnHeader, checked: false
            },
            '#header');
        rowColumnHeaderCheckBox.change = enableRowColumnHeader = (e: CheckBoxChangeEvents) => {
            allowRowColumnHeader = e.checked;
        };

        let enableGridLines: EmitType<CheckBoxChangeEvents>;
        let gridlineCheckBox: CheckBox = new CheckBox(
            {
                change: enableGridLines, checked: false
            },
            '#gridline');
        gridlineCheckBox.change = enableGridLines = (e: CheckBoxChangeEvents) => {
            allowGridLines = e.checked;
        };

        let printButton: Button = new Button({
            isPrimary: true
        });
        printButton.appendTo('#printbtn');
        const printButtonElement: HTMLElement | null = document.getElementById('printbtn');
        if (printButtonElement) {
            printButtonElement.onclick = () => {
                this.spreadsheetObj.print({ type: printType, allowGridLines: allowGridLines, allowRowColumnHeader: allowRowColumnHeader });
            };
        }
    }
}
