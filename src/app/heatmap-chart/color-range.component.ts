import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './color-range-data';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * HeatMap palette sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'color-range.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapColorRangeComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        },
        text: 'U.S. Government Energy Consumption By Agency (Trillion Btu)',
    };
    dataSource: Object = new SampleDataSource().colorRangeSampleData;
    xAxis: Object = {
        labels: ['2005', '2006', '2007', '2008', '2009', '2010',
            '2011', '2012', '2013', '2014', '2015'],
        labelRotation: 45,
        labelIntersectAction: 'None',
    };
    yAxis: Object = {
        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
            'Justice', 'NASA', 'Transportation']
    };
    public paletteSettings: Object = {
        palette: [
            { startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
            { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
            { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
        ],
        type: 'Gradient'
    };
    public cellSettings: Object = {
        border: { width: 0 },
        showLabel: false
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ngAfterViewInit() {

        let fixedRadioButton: RadioButton = new RadioButton({
            label: 'Fixed', name: 'paletteType',
            change: () => {
                this.heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient'; },
            value: 'Fixed'
        });
        fixedRadioButton.appendTo('#fixed');

        let gradientradioButton: RadioButton = new RadioButton({
            label: 'Gradient', name: 'paletteType',
            change: () => {
                this.heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient'; },
            value: 'Gradient', checked: true
        });
        gradientradioButton.appendTo('#gradient');
    }
    constructor() {
        //code
    };
}