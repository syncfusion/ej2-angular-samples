import { GridComponent } from '@syncfusion/ej2-angular-grids';

export const executeGridAction = (data: any, grid: GridComponent, includedProps?: object) => {
    if (data.props) {
        grid.setProperties(data.props, false);
    }
}