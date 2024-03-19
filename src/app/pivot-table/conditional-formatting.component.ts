import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, ConditionalFormattingService, IDataSet, PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule} from '@syncfusion/ej2-angular-buttons';
enableRipple(false);

/**
 * Pivot Table Sample with Conditional Formatting.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'conditional-formatting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['conditional-formatting.css'],
    providers: [FieldListService, ConditionalFormattingService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, ButtonModule]
})
export class ConditionalFormattingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    applyFormat(e: Event): void {
        this.pivotObj.conditionalFormattingModule.showConditionalFormattingDialog();
    }

    resetFormat(e: Event): void {
        if (this.pivotObj.dataSourceSettings.conditionalFormatSettings.length > 0) {
            this.pivotObj.setProperties({ dataSourceSettings: { conditionalFormatSettings: [] } }, true);
            this.pivotObj.renderPivotGrid();
        }
        this.pivotObj.conditionalFormattingModule.destroy();
        document.getElementById('conditional-formatting-reset-btn').blur();
    }

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 100
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            values: [{ name: 'In_Stock', caption: 'In Stock' },
            { name: 'Sold', caption: 'Units Sold' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            conditionalFormatSettings: [
                {
                    measure: 'In_Stock',
                    value1: 5000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#80cbc4',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                },
                {
                    value1: 3400,
                    value2: 40000,
                    measure: 'Sold',
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#f48fb1',
                        color: 'black',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    }
                }
            ]
        };
    }
}