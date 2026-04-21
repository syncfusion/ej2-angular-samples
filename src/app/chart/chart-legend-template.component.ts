import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ChartAllModule, ILoadedEventArgs, ILegendRenderEventArgs, ILegendClickEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'chart-legend-template.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ChartLegendTemplateComponent {
    @ViewChild('chart') public chart: ChartComponent;

    public medalData: Object[] = [
        { Country: 'Argentina', Gold: 22, Silver: 27, Bronze: 31 },
        { Country: 'Austria', Gold: 22, Silver: 35, Bronze: 44 },
        { Country: 'Ethiopia', Gold: 24, Silver: 16, Bronze: 22 },
        { Country: 'Iran', Gold: 27, Silver: 29, Bronze: 32 },
        { Country: 'India', Gold: 10, Silver: 10, Bronze: 21 }
    ];

    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'OnTicks',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        interval: 10,
        minimum: 0,
        maximum: 50,
        title: 'Medal Count',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    };

    public title: string = 'All-Time Summer Olympic Medal Count by Country';
    public subTitle: string = 'Source: Wikipedia.org';
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: '${series.name} Medals : <b>${point.y}</b>'
    };

    public legendSettings: Object = {
            visible: true,
            position: 'Right',
            template: '<div class="template" style="display:flex;align-items:center;gap:' + (Browser.isDevice ? '1px' : '8px') + ';opacity:1;">' +
                '<img class="e-image" src="" width="20" height="20" />' +
                '<span class="e-text" style="font-size:' + (Browser.isDevice ? '9px' : '14px') + ';"></span>' +
                '</div>'
    };

    public width: string = Browser.isDevice ? '100%' : '75%';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public legendRender(args: ILegendRenderEventArgs): void {
        const matchedSeries: any = this.chart.series.find((s: any) => s.name === args.text);
        const opacity: string = matchedSeries && !matchedSeries.visible ? '0.5' : '1';
        args.template = args.template
            .replace('opacity:1;', 'opacity:' + opacity + ';')
            .replace('src=""', 'src="./assets/chart/images/' + args.text.toLowerCase() + '-medal.png"')
            .replace('font-size:', 'color:' + args.fill + ';font-weight:bold;font-size:')
            .replace('></span>', '>' + args.text + '</span>');
    }

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    }
}
