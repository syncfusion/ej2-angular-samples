import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './calendar-data-source';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend);

@Component({
    selector: 'control-content',
    templateUrl: 'calendar-heatmap.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapCalendarComponent {
    public height: String = '300px';
    titleSettings: Object = {
        text: 'Annual Summary of User Activities in GitLab',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        opposedPosition: true,
        valueType: 'DateTime',
        minimum: new Date(2017, 6, 23),
        maximum: new Date(2018, 6, 30),
        intervalType: 'Days',
        showLabelOn: 'Months',
        labelFormat: 'MMM',
        increment: 7,
        labelIntersectAction: 'Rotate45',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        isInversed: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public cellSettings: Object = {
        showLabel: false,
        border: {
            color: 'white'
        }
    };
    public paletteSettings: Object = {
        palette: [{ value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
        { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
        { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
        { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
        { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
        ],
        type: 'Fixed',
        emptyPointColor: 'white'
    };
    public legendSettings: Object = {
        position: 'Bottom',
        width: '20%',
        alignment: 'Near',
        showLabel: true,
        labelDisplayType: 'None',
        enableSmartLegend: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public tooltipSettings: Object = {
        textStyle: {
             fontFamily: 'inherit'
         }
     };
    dataSource: Object = new SampleDataSource().calendarDataSource;
    public tooltipRender(args: ITooltipEventArgs): void {
        let intl: Internationalization = new Internationalization();
        let format: Function = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
        let newDate: Date = <Date>args.xValue;
        let date: Date = new Date(newDate.getTime());
        let axisLabel: string[] = args.heatmap.axisCollections[1].axisLabels;
        let index: number = axisLabel.indexOf(args.yLabel);
        (date).setDate((date).getDate() + index);
        let value: string = format(date);
        args.content = [(args.value === 0 ? 'No' : args.value) + ' ' + 'contributions' + '<br>' + value];
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
        if (args.heatmap.theme === 'HighContrast' || args.heatmap.theme.indexOf("Dark") > -1) {
            args.heatmap.cellSettings.border.color ='black';
        }
    };
    constructor() {
        //code
    };
}