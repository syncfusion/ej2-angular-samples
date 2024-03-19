import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChartComponent, ChartAllModule,AccumulationChart, AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, IPointRenderEventArgs, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Sample for doughnut 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'donut.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class DonutComponent {
    public data: Object[] = [
        { x: 'Chrome', y: 61.3, DataLabelMappingName: Browser.isDevice ? 'Chrome: <br> 61.3%' : 'Chrome: 61.3%' },
        { x: 'Safari', y: 24.6, DataLabelMappingName: Browser.isDevice ? 'Safari: <br> 24.6%' : 'Safari: 24.6%' },
        { x: 'Edge', y: 5.0, DataLabelMappingName: 'Edge: 5.0%' },
        { x: 'Samsung Internet', y: 2.7, DataLabelMappingName: Browser.isDevice ? 'Samsung Internet: <br> 2.7%' : 'Samsung Internet: 2.7%' },
        { x: 'Firefox', y: 2.6, DataLabelMappingName: Browser.isDevice ? 'Firefox: <br> 2.6%' : 'Firefox: 2.6%' },
        { x: 'Others', y: 3.6, DataLabelMappingName: Browser.isDevice ? 'Others: <br> 3.6%' :'Others: 3.6%' }
    ];
    public pointRender(args: IPointRenderEventArgs): void {
        this.SetTheme(args);
     };
    public SetTheme(args: IPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        let seriesColor = ['#FFE066', "#FAB666", "#F68F6A", "#F3646A", "#CC555A", "#9C4649"];
        if (selectedTheme === 'fluent' || selectedTheme === 'bootstrap5') {
            args.fill = seriesColor[args.point.index % 10];
        } 
        if (selectedTheme.indexOf('dark') > -1 )
        {
          if(selectedTheme.indexOf('material') > -1 )
          {
            args.border.color = '#303030' ;
          }
          else if(selectedTheme.indexOf('bootstrap5') > -1 )
          {
            args.border.color = '#212529' ;
          }
          else if(selectedTheme.indexOf('bootstrap') > -1 )
          {
            args.border.color = '#1A1A1A' ;
          }
          else if(selectedTheme.indexOf('tailwind') > -1 )
          {
            args.border.color = '#1F2937' ;
          }
          else if(selectedTheme.indexOf('fluent') > -1 )
          {
            args.border.color = '#252423' ;
          }
          else if(selectedTheme.indexOf('fabric') > -1 )
          {
            args.border.color = '#201f1f' ;
          }
          else
          {
            args.border.color = '#222222' ;
          }
        }
        else if(selectedTheme.indexOf('highcontrast') > -1)
        {
          args.border.color = '#000000' ;
        }
        else
        {
          args.border.color = '#FFFFFF' ;
        }
      };
    //Initializing Legend
    public legendSettings: Object = {
        visible: false,
    };
    //Initializing DataLabel
    public dataLabel: Object = {
        visible: true,
        name: 'DataLabelMappingName',
        position: 'Outside',
        font: {
            fontWeight: '600',
        },
        connectorStyle: { 
            length: '20px',
            type: 'Curve'
         },
    };
    public centerLabel: Object = {
        text: 'Mobile<br>Browsers<br>Statistics',
        hoverTextFormat: '${point.x}<br>Browser Share<br>${point.y}%',
        textStyle: {
            fontWeight: '600',
            size: Browser.isDevice ? '7px' : '15px'
        },
    };
    public border: object = {
        width: 1
    };
     // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
     // custom code end
    public radius: string = Browser.isDevice ? '40%' : '70%'
    public startAngle: number =  Browser.isDevice ? 30 : 62;
    constructor() {
        //code
    };

}