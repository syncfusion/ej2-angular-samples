import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    IDataOptions, IDataSet, PivotViewModule, PivotView, GroupingBarService, FieldListService,
    VirtualScrollService, ToolbarService, ExcelExportService, DisplayOption
} from '@syncfusion/ej2-angular-pivotview';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Menu } from '@syncfusion/ej2-navigations';

enableRipple(false);

/**
 * Pivot Table Exporting Its Own Format Sample.
 */
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['pivot-table-exporting.css'],
    templateUrl: 'pivot-table-exporting.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, FieldListService, GroupingBarService, VirtualScrollService, ExcelExportService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class PivotTableExportComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public toolbarOptions: string[] = ['Chart', 'FieldList'];
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    toolbarClicked() {
        this.pivotObj.exportAsPivot();
    }
    gridToolbarClicked(args: any) {
        if (this.pivotObj && this.pivotObj.gridSettings && this.pivotObj.gridSettings.layout !== args.item.id && (args.item.id == 'Compact' || args.item.id == 'Tabular')) {
            this.pivotObj.setProperties({
                gridSettings: {
                    layout: args.item.id
                },
                displayOption: {
                    view: 'Both', primary: 'Table'
                },
            }, true);
            this.pivotObj.refresh();
        }
    }

    beforeToolbarRender(args: any) {
        args.customToolbar.splice(0, 0, {
            prefixIcon: 'e-menu-icon e-pivotview-excel-export e-icons',
            tooltipText: 'Excel Export as Pivot',
            click: this.toolbarClicked.bind(this),
        });
        args.customToolbar.splice(1, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(2, 0, {
            template: '<ul id="grid_menu"></ul>',
            id: 'custom_toolbar'
        });
        args.customToolbar.splice(3, 0, {
            type: 'Separator'
        });
    };
    onDataBound() {
        if (Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
        if (document.querySelector('#grid_menu .e-menu-item') == null) {
            var menuItems = [
                {
                    iconCss: 'e-toolbar-grid e-icons',
                    items: [
                        { text: 'Compact Layout', id: 'Compact' },
                        { text: 'Tabular Layout', id: 'Tabular' },
                    ],
                },
            ];
            new Menu(
                { items: menuItems, select: this.gridToolbarClicked.bind(this) }, '#grid_menu'
            );
        }
    };

    ngOnInit(): void {
        this.displayOption = { view: 'Both' } as DisplayOption;
        this.chartSettings = {
            title: 'Sales Analysis',
            primaryYAxis: { border: { width: 0 } },
            legendSettings: { visible: false },
            chartSeries: { type: 'Bar', animation: { enable: false } }
        } as ChartSettings;

        this.gridSettings = {
            columnWidth: Browser.isDevice ? 100 : 120
        } as GridSettings;

        this.dataSourceSettings = {
            url: 'https://ej2services.syncfusion.com/js/development/api/pivot/post',
            mode: 'Server',
            expandAll: true,
            enableSorting: true,
            columns: [ { name: 'Year', caption: 'Production Year' },
            ],
            values: [
                { name: 'Sold', caption: 'Units Sold' },
                { name: 'Amount', caption: 'Sold Amount' }
            ],
            rows: [{ name: 'Country' }, {name: 'Products'}],
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' }],
            filters: []
        };
    }
}