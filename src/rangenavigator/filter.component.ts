import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, IChangedEventArgs, Chart } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { employeeData } from './datasource';

/**
 * Range navigator with date time axis
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';

@Component({
    selector: 'control-content',
    templateUrl: 'filter.html',
    encapsulation: ViewEncapsulation.None
})

export class FilterComponent {
    @ViewChild('grid')
    public Grid: GridComponent;

    public isGrid: boolean = false;

    public gridData: Object = employeeData.filter((data: { [key: string]: Object }): Boolean => {
        return (data.HireDate >= new Date(1992, 5, 1) && data.HireDate <= new Date(1993, 4, 1));
    });

    public dataSource: object = employeeData;

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public value: object = [new Date(1992, 5, 1), new Date(1993, 4, 1)];

    public format:Object = { skeleton: 'yMd', type: 'date' };

    public changed(args: IChangedEventArgs): void {
        if (this.isGrid) {
            this.Grid.dataSource = employeeData.filter((data: { [key: string]: Object }): Boolean => {
                return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
            });
            this.Grid.refresh();
        }
        this.isGrid = true;
    }

}