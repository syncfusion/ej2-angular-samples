import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './table-bubble-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'bubble-types.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapBubbleTypesComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'Female Participation Rate in Labor Force for the Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['1995', '2000', '2005', '2010', '2015'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public cellSettings: Object = {
        border: {
            width: 1
        },
        showLabel: false,
        tileType: 'Bubble',
        bubbleType: 'Size'
    };
    dataSource: Object = new SampleDataSource().tableBubbleData;
    public paletteSettings: Object = {
        palette: [{ value: 35, color: '#50A3B1' },
        { value: 45, color: '#78D1BD' },
        { value: 55, color: '#CAE8B4' },
        { value: 65, color: '#EDF8B6' },
        { value: 78, color: '#FFFFDA' }
        ],
    };
    public tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public legendSettings: Object = {
        visible: true,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public tooltipRender(args: ITooltipEventArgs): void {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    ngAfterViewInit() {
        let bubbleTypeObj: DropDownList = new DropDownList({
            index: 0,
            popupHeight: '200px',
            change: () => {
                this.heatmap.cellSettings.bubbleType = bubbleTypeObj.value.toString() === 'Size' ?
                    'Size' : bubbleTypeObj.value.toString() === 'Color' ?
                        'Color' : bubbleTypeObj.value.toString() === 'Sector' ?
                            'Sector' : null;
            }
        });
        bubbleTypeObj.appendTo('#bubbleType');
    }
    constructor() {
        //code
    };
}