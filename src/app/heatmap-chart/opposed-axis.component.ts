import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './opposed-axis-data';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'opposed-axis.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapOpposedComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'Monthly Flight Traffic at JFK Airport',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['2007', '2008', '2009', '2010', '2011',
            '2012', '2013', '2014', '2015', '2016', '2017'],
        opposedPosition: true,
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        opposedPosition: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public legendSettings: Object = {
        visible: false,
    };
    public cellSettings: Object = {
        showLabel: false,
        border: {
            width: 0,
        },
        format: '{value} flights'
    };
    public tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    dataSource: Object = new SampleDataSource().opposedAxisData;
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    ngAfterViewInit() {
        let xlistObj: CheckBox = new CheckBox({
            label: 'Change X-Axis Position', checked: true,
            change: () => {
                this.heatmap.xAxis.opposedPosition = xlistObj.checked;
            }
        });
        xlistObj.appendTo('#XOpposedPosition');
        let ylistObj: CheckBox = new CheckBox({
            label: 'Change Y-Axis Position', checked: true,
            change: () => {
                this.heatmap.yAxis.opposedPosition = ylistObj.checked;
            }
        });
        ylistObj.appendTo('#YOpposedPosition');
    }
    constructor() {
        //code
    };
}