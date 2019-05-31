import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './data';
import { RadioButton } from '@syncfusion/ej2-buttons';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * HeatMap render-mode sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'render-mode.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapRenderModeComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        }
    };
    xAxis: Object = {
        labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
            'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
        labelRotation: -90,
        labelIntersectAction: 'None',
    };
    yAxis: Object = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
            '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015']
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
        width: '200px'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
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