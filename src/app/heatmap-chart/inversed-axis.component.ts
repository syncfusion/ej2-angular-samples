import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './invered-axis-data';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'inversed-axis.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapInversedComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'Population Growth Rate of the most Populous Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan',
            'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        isInversed: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
            '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
        isInversed: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    dataSource: Object = new SampleDataSource().inveredAxisData;
    public cellSettings: Object = {
        border: {
            width: 0
        },
        showLabel: false,
        format: '{value} %'
    };
    public paletteSettings: Object = {
        palette: [{ value: 0, color: '#4b7287' },
        { value: 0.5, color: '#b5b29f' },
        { value: 1, color: '#F0D6AD' },
        { value: 1.5, color: '#9da49a' },
        { value: 2, color: '#466f86' },
        { value: 2.5, color: '#d7c7a7' },
        { value: 3, color: '#6e888f' },
        ],
    };
    public legendSettings: Object = {
        visible: false
    };
    public tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    ngAfterViewInit() {
        let xlistObj: CheckBox = new CheckBox({
            label: 'Reverse X-Axis Origin', checked: true,
            change: () => {
                this.heatmap.xAxis.isInversed = xlistObj.checked;
            }
        });
        xlistObj.appendTo('#XOpposedPosition');
        let ylistObj: CheckBox = new CheckBox({
            label: 'Reverse Y-Axis Origin', checked: true,
            change: () => {
                this.heatmap.yAxis.isInversed = ylistObj.checked;
            }
        });
        ylistObj.appendTo('#YOpposedPosition');
    }
    constructor() {
        //code
    };
}