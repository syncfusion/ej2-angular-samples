import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DPointRenderEventArgs, Chart3DAxisLabelRenderEventArgs, Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2HighContrastColors, pointTailwind3Colors, pointTailwind3DarkColors } from './theme-color';

/**
 * 3D Chart Column sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'column.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class ColumnComponent {

    public dataSource: Object[] = [
        { x: 'Tesla', y: 137429 },{ x: 'Aion', y: 80308 },
        { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 },
        { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 },
        { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelRotation:  -45,
        labelPlacement: 'BetweenTicks'
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 150000,
        interval: 30000
    };
    //Initializing 3D-Chart Title
    public title: string = 'Top Selling Electric Cars in China';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' };
    public legendSettings: Object = { visible: false };
    public enableRotation: boolean = true;
    public wallColor: string = 'transparent';
    public height: string = '400';
    public rotation: number = 7;
    public tilt:  number = 10;
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };

    public axisLabelRender(args: Chart3DAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis' && Number(args.text)) {
            let value: number = Number(args.text) / 1000;
            args.text = String(value) + 'k';
        }
    };

    public labelRender(args: Chart3DPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = pointFabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material-dark') {
            args.fill = pointMaterialDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = pointMaterialColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5-dark') {
            args.fill = pointBootstrap5DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5') {
            args.fill = pointBootstrap5Colors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap4') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap-dark') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = pointHighContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = pointFluentDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = pointFluentColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'material3') {
            args.fill = pointMaterial3Colors[args.point.index % 10];
        }
        else if (selectedTheme === 'material3-dark') {
            args.fill = pointMaterial3DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2') {
            args.fill = pointFluent2Colors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
            args.fill = pointFluent2HighContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        }
    };
    constructor() {
        // code
    };
}