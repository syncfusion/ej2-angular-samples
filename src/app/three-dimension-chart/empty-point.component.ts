import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, Chart3DLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Chart3DPointRenderEventArgs, Chart3DAllModule } from '@syncfusion/ej2-angular-charts';
import {
    pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors,
    pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors,
    pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2HighContrastColors, pointTailwind3Colors, pointTailwind3DarkColors,
    load3DChartTheme
} from './theme-color';

/**
 * 3D Chart Empty Point Column sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'empty-point.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [Chart3DAllModule]
})

export class EmptyPointColumnComponent {

    public dataSource: Object[] = [
        { x: 'Italy', y: 10 }, { x: 'Kenya', y: 4 },
        { x: 'France', y: 10 }, { x: 'Hungary', y: 0 },
        { x: 'Australia', y: 17 }, { x: 'Brazil', y: 7 }, 
        { x: 'Netherlands', y: 10 }, { x: 'Unspecified', y: null },
        { x: 'Germany', y: 10 }, { x: 'Serbia', y: 3 }];

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'BetweenTicks',
        interval: 1,
        labelRotation: -45
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        maximum: 20,
        interval: 4
    };
    //Initializing 3D-Chart Title
    public title: string = 'Olympic Gold Medal Counts - Tokyo 2020';
    public width: string = Browser.isDevice ? '100%' : '75%';
    public tooltip: Object = { enable: true, header: '${point.x}', format: 'Gold Medal : <b>${point.y}' };
    public enableRotation: boolean = true;
    public wallColor: string = 'transparent';
    public height: string = '400';
    public legendSettings: Object = { visible: false };
    public rotation: number = 7;
    public tilt:  number = 10;
    public depth: number = 100;

    public load(args: Chart3DLoadedEventArgs): void {
        load3DChartTheme(args);
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
        }  else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        }
    };
    constructor() {
        // code
    };
}