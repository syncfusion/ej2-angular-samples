/**
 * Sample for Default linear gauge
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme, LinearGauge, ExportType } from '@syncfusion/ej2-lineargauge';
import { PrintService, PdfExportService, ImageExportService } from '@syncfusion/ej2-angular-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'export.html',
    encapsulation: ViewEncapsulation.None,
    providers: [PrintService, PdfExportService, ImageExportService]
})
export class ExportComponent {
    @ViewChild('gauge')
    public gauge: LinearGauge;
    public allowPrint: boolean = true;
    public allowPdfExport: boolean = true;
    public allowImageExport: boolean = true;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing Axes
    public Axes: Object[] = [{
        minimum: 0,
        maximum: 120,
     line:
     {
         width:0
     },
        majorTicks: {
            height: 0,
            width: 0,
            interval: 20
        },
        minorTicks: {
            height: 7,
            width: 0,
            interval: 4
        },
        labelStyle: {
            position: "Outside",
            font: {
                color: 'red'
            },
            offset: 4
        },
        ranges: [{
                start: 0,
                end: 20,
                startWidth: 15,
                endWidth: 25,
                color: '#82b944'
            },
            {
                start: 20,
                end: 40,
                startWidth: 25,
                endWidth: 35,
                color: '#a1cb43'
            },
            {
                start: 40,
                end: 60,
                startWidth: 35,
                endWidth: 45,
                color: '#ddec12'
            },
            {
                start: 60,
                end: 80,
                startWidth: 45,
                endWidth: 55,
                color: '#ffbc00'
            },
            {
                start: 80,
                end: 100,
                startWidth: 55,
                endWidth: 65,
                color: '#ff6000'
            },
            {
                start: 100,
                end: 120,
                startWidth: 65,
                endWidth: 75,
                color: 'red'
            },
        ],
        pointers: [{
            value: 80,
            height: 23,
            width: 35,
            offset: -55,
            markerType: 'Triangle',
            border:
            {
                width: 2,
                color:'white'
            }
        }],
    }];
    public onClickPrint(e: Event): void {
        this.gauge.print();
    };
    public onClickExport(e: Event): void {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        this.gauge.export(<ExportType>this.exportType.value, fileName);
    }
    public exportType: DropDownList;
    ngOnInit(): void {
        this.exportType = new DropDownList({
            index: 0,
            width: 90,
        });
        this.exportType.appendTo('#exporttype');
    }
    constructor() {
        // code
    };
}