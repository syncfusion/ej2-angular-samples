import { PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';
import { pivotProductData } from '../frontend/datasource';

export const executePivotAction = (data: any, pivot: PivotViewComponent, includedProps?: object) => {
    if (data.props) {
        if (data.props.dataSourceSettings) {
            data.props.dataSourceSettings.dataSource = pivotProductData;
        } else {
            data.props.dataSourceSettings = { dataSource: pivotProductData };
        }
        if (data.props.displayOption) {
            pivot.setProperties(data.props, true);
            pivot.refresh();
        } else {
            pivot.setProperties(data.props, false);
        }
    }
}