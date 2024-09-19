import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './color-range-data';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'color-range.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapColorRangeComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        },
        text: 'U.S. Government Energy Consumption By Agency (Trillion Btu)',
    };
    dataSource: Object = new SampleDataSource().colorRangeSampleData;
    xAxis: Object = {
        labels: ['2005', '2006', '2007', '2008', '2009', '2010',
            '2011', '2012', '2013', '2014', '2015'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    yAxis: Object = {
        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
            'Justice', 'NASA', 'Transportation'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public paletteSettings: Object = {
        palette: [
            { startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
            { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
            { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
        ],
        type: 'Gradient'
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
    public cellSettings: Object = {
        border: { width: 0 },
        showLabel: false
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        if(args.heatmap.element.offsetWidth < 500)
        {
            args.heatmap.xAxis.labelRotation = 0;
            args.heatmap.xAxis.labelIntersectAction = 'Trim';
        } else {
            args.heatmap.xAxis.labelRotation = 45;
            args.heatmap.xAxis.labelIntersectAction = 'None';
        }
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