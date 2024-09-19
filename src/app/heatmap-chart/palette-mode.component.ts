import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SampleDataSource } from './palatte-sample-data';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Legend, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'palette-mode.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeatmapPaletteComponent {
    @ViewChild('heatmap')
    public heatmap: HeatMap;
    titleSettings: Object = {
        text: 'U.S. Government Energy Consumption By Agency (Trillion Btu)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
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
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
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