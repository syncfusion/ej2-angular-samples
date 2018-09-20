import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './data';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * HeatMap palette sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'palette.html',
    encapsulation: ViewEncapsulation.None
})
export class HeatmapPaletteComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'U.S. Government Energy Consumption By Agency (Trillion Btu)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal'
        }
    };
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
    dataSource: Object = new SampleDataSource().palatteSampleData;
    public paletteSettings: Object = {
        palette: [
            { value: 4.3, color: '#FFFFDA' },
            { value: 7, color: '#EDF8B6' },
            { value: 9, color: '#CAE8B4' },
            { value: 15, color: '#78D1BD' },
            { value: 18, color: '#36BCC6' },
            { value: 25, color: '#208FC6' },
            { value: 30, color: '#253494' },
            { value: 32, color: '#081D58' }
        ],
        type: 'Fixed'
    };
    public cellSettings: Object = {
        border: { width: 0 },
        showLabel: false
    };
    public legendSettings: Object = {
        position: 'Bottom',
        width: '400px',
        enableSmartLegend: true
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ngAfterViewInit() {

        let smartLegend: CheckBox = new CheckBox({
            name: 'enableSmartLegend',
            change: () => {this.heatmap.legendSettings.enableSmartLegend = smartLegend.checked; },
            checked: true, disabled: false
        });
        smartLegend.appendTo('#smartLegend');
        let fixedRadioButton: RadioButton = new RadioButton({
            label: 'Fixed', name: 'paletteType',
            change: () => {
                smartLegend.disabled = false;
                smartLegend.dataBind();
                this.heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient'; },
            value: 'Fixed', checked: true
        });
        fixedRadioButton.appendTo('#fixed');

        let gradientradioButton: RadioButton = new RadioButton({
            label: 'Gradient', name: 'paletteType',
            change: () => {
                smartLegend.disabled = true;
                smartLegend.dataBind();
                this.heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient'; },
            value: 'Gradient'
        });
        gradientradioButton.appendTo('#gradient');
    }
    constructor() {
        //code
    };
}