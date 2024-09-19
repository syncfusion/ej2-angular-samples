/**
 * Print sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { TreeMap, ExportType, TreeMapTooltip } from '@syncfusion/ej2-treemap';
import { PrintService, PdfExportService, ImageExportService, TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { ProductSale } from './product';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadEventArgs, TreeMapTheme } from '@syncfusion/ej2-angular-treemap';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
TreeMap.Inject(TreeMapTooltip);

@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    encapsulation: ViewEncapsulation.None,
    providers: [PrintService, PdfExportService, ImageExportService],
    standalone: true,
    imports: [TreeMapModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent, TextBoxModule]
})

export class TreemapPrintComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    public allowPrint: boolean = true;
    public allowPdfExport: boolean = true;
    public allowImageExport: boolean = true;
    public downloadFileName: string = 'TreeMap';
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
        titleSettings: object = {
            text: 'Top 10 best selling smartphone brands - 2017',
            textStyle: { size: '15px'}
        };
        dataSource: object[] = ProductSale;
        layoutType: string  = 'SliceAndDiceVertical';
        weightValuePath: string = 'Percentage';
        rangeColorValuePath: string = 'Percentage';
        tooltipSettings: object = {
            visible: true,
            format: '${Product} (+${Percentage}) %'
        };
        leafItemSettings: object = {
            labelPath: 'Product',
            fill: '#6699cc',
            border: { color: 'black', width: 0.5 },
            labelPosition: 'Center',
            interSectAction: 'Hide',
            labelFormat: '${Product} (+${Percentage}) %',
            colorMapping: [
                {
                    from: 1.3,
                    to: 22,
                    color: '#FAB665',
                    minOpacity: 0.5,
                    maxOpacity: 1
                }
            ]
        };
        public onClick1(e: Event): void {
            this.treemap.export(<ExportType>this.exportType.value, this.downloadFileName);
        }
        public onClick2(e: Event): void {
            this.treemap.print();
        }
        public change(target: any): void {
            this.downloadFileName = target.value;
        }
        public exportType: DropDownList;
        ngOnInit(): void {
            this.exportType = new DropDownList({
                index: 0,
                width: '100%',
            });
            this.exportType.appendTo('#mode');
        }
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
            sourceFiles.files = ['product.ts' ];
        };
};