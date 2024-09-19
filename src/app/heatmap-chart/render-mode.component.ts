import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './render-mode-data';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'render-mode.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapRenderModeComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    xAxis: Object = {
        labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
            'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
        labelRotation: -90,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
            '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    dataSource: Object = new SampleDataSource().renderModeData;
    public paletteSettings: Object = {
        palette: [{ color: '#C06C84' },
        { color: '#355C7D' }
        ],
    };
    renderingMode: string = 'SVG';
    public cellSettings: Object = {
        border: {
            width: 0
        },
        showLabel: false,
        format: '{value} %'
    };
    public legendSettings: Object = {
        position: 'Bottom',
        width: '200px',
        textStyle: {
            fontFamily: 'inherit'
        }
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

        let svgRadioButton: RadioButton = new RadioButton({
            label: 'SVG', name: 'renderingmode',
            change: () => { debugger; this.heatmap.renderingMode = svgRadioButton.checked ? 'SVG' : 'Canvas'; },
            value: 'SVG', checked: true
        });
        svgRadioButton.appendTo('#svg');

        let canvasradioButton: RadioButton = new RadioButton({
            label: 'Canvas', name: 'renderingmode',
            change: () => { this.heatmap.renderingMode = svgRadioButton.checked ? 'SVG' : 'Canvas'; },
            value: 'Canvas'
        });
        canvasradioButton.appendTo('#canvas');
    }
    constructor() {
        //code
    };
}