import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ITextRenderEventArgs, ChartTheme, AxisModel, MarkerSettingsModel, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
/**
 * Sample for Data Label Template
 */
@Component({
    selector: 'control-content',
    templateUrl: 'data-label-template.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class DataLabelComponent {
    public theme: ChartTheme;
    public materialMan: string = '<div style="background-color:#00bdae;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public materialWomen: string = '<div style="background-color:#404041;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fabricMan: string = '<div style="background-color:#4472c4;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fabricWomen: string = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrapMan: string = '<div style="background-color:#a16ee5;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y}M </span></div></div>';
    public bootstrapWomen: string = '<div style="background-color:#f7ce69;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrap5Man: string = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrap5Women: string = '<div style="background-color:#6610F2;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public highcontrastMan: string = '<div style="background-color:#79ECE4;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public highcontrastWomen: string = '<div style="background-color:#E98272;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwindMan: string = '<div style="background-color:#5A61F6;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwindWomen: string = '<div style="background-color:#65A30D;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwind3Man: string = '<div style="background-color:#2F4074;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwind3Women: string = '<div style="background-color:#03B4B4;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public materialdarkMan: string = '<div style="background-color:#9ECB08;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public materialdarkWomen: string = '<div style="background-color:#56AEFF;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fabricdarkMan: string = '<div style="background-color:#4472c4;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fabricdarkWomen: string = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrapdarkMan: string = '<div style="background-color:#a16ee5;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrapdarkWomen: string = '<div style="background-color:#f7ce69;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwinddarkMan: string = '<div style="background-color:#8B5CF6;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwinddarkWomen: string = '<div style="background-color:#22D3EE;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwind3darkMan: string = '<div style="background-color:#8029F1;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public tailwind3darkWomen: string = '<div style="background-color:#1ABC9C;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrap5darkMan: string = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public bootstrap5darkWomen: string = '<div style="background-color:#6610F2;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fluentMan: string = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fluentWomen: string = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fluentdarkMan: string = '<div style="background-color: #1AC9E6;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';
    public fluentdarkWomen: string = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
        '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
        '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
        + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
        '${point.y} </span></div></div>';   
    public material3Man: string = '<div style="background-color:#6355C7;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public material3Women: string = '<div style="background-color:#00AEE0;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public material3darkMan: string = '<div style="background-color: #4EAAFF;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public material3darkWomen: string = '<div style="background-color:#FA4EAB;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2Women: string = '<div style="background-color:#09AF74;border-radius: 3px;">' +
    '<img src="./assets/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2Man: string = '<div style="background-color:#6200EE;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2DarkMan: string = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2DarkWomen: string = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="./assets/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2HighContrastMan: string = '<div style="background-color:#9BB449;border-radius: 3px;">' +
    '<img src="./assets/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
    public fluent2HighContrastWomen: string = '<div style="background-color:#2A72D5;border-radius: 3px;">' +
    '<img src="./assets/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';

    public data: Object[] = [
        { sports: "Tennis", boys: 50, girls: 38 },
        { sports: "Badminton", boys: 30, girls: 40 },
        { sports: "Cycling", boys: 37, girls: 20 },
        { sports: "Football", boys: 60, girls: 21 },
        { sports: "Hockey", boys: 15, girls: 8 },
    ];
    public data1: Object[] = [
        { sports: "Tennis", boys: 50, girls: 38 },
        { sports: "Badminton", boys: 30, girls: 40 },
        { sports: "Cycling", boys: 37, girls: 20 },
        { sports: "Football", boys: 60, girls: 21 },
        { sports: "Hockey", boys: 15, girls: 8 },
    ];
    //Initializing Primary X Axis
    public primaryXAxis: AxisModel = {
        valueType: 'Category',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        labelIntersectAction: 'Rotate45',
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: AxisModel = {
        minimum: 0,
        maximum: 70,
        lineStyle: { width: 0 },
        majorGridLines: { color: '#eaeaea', width: 1 }
    };
    public marker1: MarkerSettingsModel = {
        visible: false,
        shape: 'Circle',
        dataLabel: {
            visible: true,
            position: 'Outer',
            margin: { top: 70 },
            template: this.materialMan
        }, 
    };
    public marker2: Object = {
        visible: false,
        shape: 'Rectangle',
        dataLabel: {
            visible: true,
            position: 'Outer',
            margin: { top: 70 },
            template: this.materialWomen
        }, 
    };
    public textRender(args: ITextRenderEventArgs): void {
        if (this.theme === 'Material') {
            args.template = args.series.name === 'Boys' ? this.materialMan : this.materialWomen;
        } else if (this.theme === 'Fabric') {
            args.template = args.series.name === 'Boys' ? this.fabricMan : this.fabricWomen;
        }  else if (this.theme === <ChartTheme>'HighContrast') {
            args.template = args.series.name === 'Boys' ? this.highcontrastMan : this.highcontrastWomen;
        }  else if (this.theme === <ChartTheme>'Tailwind') {
            args.template = args.series.name === 'Boys' ? this.tailwindMan : this.tailwindWomen;
        } else if (this.theme === <ChartTheme>'Bootstrap') {
            args.template = args.series.name === 'Boys' ? this.bootstrapMan : this.bootstrapWomen;
        } else if (this.theme === <ChartTheme>'Bootstrap5') {
            args.template = args.series.name === 'Boys' ? this.bootstrap5Man : this.bootstrap5Women;
        }else if (this.theme === 'Material3') {
            args.template = args.series.name === 'Boys' ? this.material3Man : this.material3Women;
        } else if (this.theme === <ChartTheme>'TailwindDark') {
            args.template = args.series.name === 'Boys' ? this.tailwinddarkMan : this.tailwinddarkWomen;
        } else if (this.theme === <ChartTheme>'Fluent') {
            args.template = args.series.name === 'Boys' ? this.fluentMan : this.fluentWomen;
        } else if (this.theme === <ChartTheme>'FluentDark') {
            args.template = args.series.name === 'Boys' ? this.fluentdarkMan : this.fluentdarkWomen;
        }else if (this.theme === 'MaterialDark') {
            args.template = args.series.name === 'Boys' ? this.materialdarkMan : this.materialdarkWomen;
        } else if (this.theme === 'FabricDark') {
            args.template = args.series.name === 'Boys' ? this.fabricdarkMan : this.fabricdarkWomen;
        } else if (this.theme === 'Bootstrap5Dark') {
            args.template = args.series.name === 'Boys' ? this.bootstrap5darkMan : this.bootstrap5darkWomen;
        }else if (this.theme === 'Material3Dark') {
            args.template = args.series.name === 'Boys' ? this.material3darkMan : this.material3darkWomen;
        } else if (this.theme === <ChartTheme>'Fluent2') {
            args.template = args.series.name === 'Boys' ? this.fluent2Man : this.fluent2Women;
        } else if (this.theme === <ChartTheme>'Fluent2Dark') {
            args.template = args.series.name === 'Boys' ? this.fluent2DarkMan : this.fluent2DarkWomen;
        } else if (this.theme === <ChartTheme>'Fluent2HighContrast') {
            args.template = args.series.name === 'Boys' ? this.fluent2HighContrastMan : this.fluent2HighContrastWomen;
        } else if (this.theme === <ChartTheme>'Tailwind3') {
            args.template = args.series.name === 'Boys' ? this.tailwind3Man : this.tailwind3Women;
        } else if (this.theme === <ChartTheme>'Tailwind3Dark') {
            args.template = args.series.name === 'Boys' ? this.tailwind3darkMan : this.tailwind3darkWomen;
        } else {
            args.template = args.series.name === 'Boys' ? this.bootstrapdarkMan : this.bootstrapdarkWomen;
        }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.theme = args.chart.theme;
    };
      // custom code end
    //Initializing Chart Title
    public title: string = 'Athletes in Popular School';
    public titleStyle: Object = {
        fontStyle: 'medium', size: '14px'
    };
    constructor() {
        //code
    };

}