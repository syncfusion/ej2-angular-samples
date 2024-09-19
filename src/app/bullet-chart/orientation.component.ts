import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { BulletTooltipSettingsModel, AnimationModel, BulletChartComponent, OrientationType, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'orientation.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule]
})

export class BulletChartOrientationComponent {
    @ViewChild('bullet')
    public bulletChart: BulletChartComponent;
    public chnageOrientation: DropDownList;
    public width: string = '19%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public dataSource: Object[] = [{ value: 23, target: 27, name: 'Product A' }];
    public animation: AnimationModel = { enable: false };
    public margin: Object = { left: 10 }
    public minimum: number = 0;
    public maximum: number = 30;
    public interval: number = 5;
    public height: string = '400px';
    public labelFormat: string = '{value}%';
    public orientation: string = 'Vertical';
    public load = (args: IBulletLoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ngOnInit(): void {
        this.chnageOrientation = new DropDownList({
            dataSource: ['Vertical', 'Horizontal'],
            value: 'Vertical',
            change: (args: ChangeEventArgs) => {
                if (args.value === 'Horizontal') {
                    this.bulletChart.width = '80%';
                    this.bulletChart.height = '100px';
                } else {
                    this.bulletChart.width = '19%';
                    this.bulletChart.height = '400px';
                }
                this.bulletChart.orientation = args.value as OrientationType;
                this.bulletChart.refresh();
            }
        });
        this.chnageOrientation.appendTo('#orientationSelect');
    }
}