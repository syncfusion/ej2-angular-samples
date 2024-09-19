import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Adaptor, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'json-row.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapRowJsonComponent {

    titleSettings: Object = {
        text: 'Olympic Medal Achievements of most Successful Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['China', 'France', 'GBR', 'Germany', 'Italy', 'Japan', 'KOR', 'Russia', 'USA'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        title: { 
            text: 'Olympic Year',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        labels: ['2000', '2004', '2008', '2012', '2016'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    dataSource: Object = [
            { 'Region': 'USA', '2000': 93, '2004': 101, '2008': 112, '2012': 103, '2016': 121 },
            { 'Region': 'GBR', '2000': 28, '2004': 30, '2008': 49, '2012': 65, '2016': 67 },
            { 'Region': 'China', '2000': 58, '2004': 63, '2008': 100, '2012': 91, '2016': 70 },
            { 'Region': 'Russia', '2000': 89, '2004': 90, '2008': 60, '2012': 69, '2016': 55 },
            { 'Region': 'Germany', '2000': 56, '2004': 49, '2008': 41, '2012': 44, '2016': 42 },
            { 'Region': 'Japan', '2000': 18, '2004': 37, '2008': 25, '2012': 38, '2016': 41 },
            { 'Region': 'France', '2000': 38, '2004': 33, '2008': 43, '2012': 35, '2016': 42 },
            { 'Region': 'KOR', '2000': 28, '2004': 30, '2008': 32, '2012': 30, '2016': 21 },
            { 'Region': 'Italy', '2000': 34, '2004': 32, '2008': 27, '2012': 28, '2016': 28 }];
    dataSourceSettings: Object = {
        isJsonData: true,
        adaptorType: 'Table',
        xDataMapping: 'Region',
    };
    public paletteSettings: Object = {
        palette: [{ color: '#F0C27B' },
        { color: '#4B1248' }
        ],
    };
    public cellSettings: Object = {
        border: {
            width: 1,
            radius: 4,
            color: 'white'
        },
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public legendSettings: Object = {
        textStyle: {
             fontFamily: 'inherit'
         }
     };
     public tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' Medals'];
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    constructor() {
        //code
    };
}