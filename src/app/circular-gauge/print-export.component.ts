import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, ExportType, CircularGaugeComponent, CircularGauge, CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { PrintService, PdfExportService, ImageExportService } from '@syncfusion/ej2-angular-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'print-export.html',
    encapsulation: ViewEncapsulation.None,
    providers: [PrintService, PdfExportService, ImageExportService],
    standalone: true,
    imports: [CircularGaugeModule, ButtonModule]
})
export class ExportComponent {

    @ViewChild('gauge')
    public gauge: CircularGauge;
    public exportType: DropDownList;
    public allowPrint: boolean = true;
    public allowPdfExport: boolean = true;
    public allowImageExport: boolean = true;

    public minorTicks: Object = {
        position: 'Outside',
        width: 1,
        height: 8,
        interval: 2,
        useRangeColor: true
    };

    public majorTicks: Object = {
        position: 'Outside',
        width: 1,
        height: 25,
        interval: 10,
        useRangeColor: true
    };

    public lineStyle: Object = {
        width: 0
    };

    public labelStyle: Object = {
        hiddenLabel: 'Last', offset: 2,
        font: { fontFamily: 'inherit' },
        position: 'Outside',
        useRangeColor: true
    };

    public pointers: Object[] = [{
        radius: '0%', cap: {
            radius: 0
        }
    }];

    public ranges: object[] = [
        {
            start: 0, end: 32,
            radius: '90%',
            startWidth: 10, endWidth: 35,
            color: '#F8A197',
        },
        {
            start: 32, end: 70,
            radius: '90%',
            startWidth: 10, endWidth: 35,
            color: '#C45072',
        },
        {
            start: 70, end: 100,
            radius: '90%',
            startWidth: 10, endWidth: 35,
            color: '#1B679F',
        }];

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        /* custom code end */
    }

    public onClickPrint(e: Event): void {
        this.gauge.print();
    }

    public onClickExport(e: Event): void {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        this.gauge.export(<ExportType>this.exportType.value, fileName);
    }

    ngOnInit(): void {
        this.exportType = new DropDownList({
            index: 0,
            width: '90%',
        });
        this.exportType.appendTo('#exporttype');
    }

    constructor() {
        // code
    };
}