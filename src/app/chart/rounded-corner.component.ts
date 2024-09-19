import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent,ChartAllModule, IAccLoadedEventArgs, AccumulationTheme, AccumulationChartAllModule, IAccPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Pie with Various Radius
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rounded-corner.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent,ChartAllModule, AccumulationChartAllModule, SBDescriptionComponent]
})
export class CornerRadiusComponent {
    public data: Object[] = [
      { x: 'Operations', y: 30.0, text: '30.0%' },
      { x: 'Miscellaneous', y: 10.0, text: '10.0%' },
      { x: 'Human Resources', y: 15.0, text: '15.0%' },
      { x: 'Research and Development', y: 20.0, text: '20.0%' },
      { x: 'Marketing', y: 25.0, text: '25.0%' },
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    //Initializing Legend
    public legendSettings: Object = {
        visible: false
    };
    //Initializing Datalabel
    public dataLabel: Object = {
      visible: true,
      position: 'Outside',
      name: 'x',
      connectorStyle: { width: 0 },
    };
    //Border
    public border: Object = {
      width : 3
    }
      // custom code start
    public load(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    // custom code end
    public enableAnimation: boolean = false;
    public enableSmartLabels: boolean = true;
    public tooltip: Object = {
        enable: true,
        header: '<b>Budget</b>', format: '${point.x}: <b>${point.y}%</b>'
    };
    public annotations: Object[] = [
      {
        content: `<div style=" padding: 5px 5px 5px 5px;font-size: ${Browser.isDevice ? '10px' : '14px'}">30%</div>`,
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Operations',
        y: 30.0
      },
      {
        content: `<div style=" padding: 5px 5px 5px 5px;font-size: ${Browser.isDevice ? '10px' : '14px'}">10%</div>`,
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Miscellaneous',
        y: 10.0
      },
      {
        content: `<div style=" padding: 5px 5px 5px 5px;font-size: ${Browser.isDevice ? '10px' : '14px'}">15%</div>`,
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Human Resources',
        y: 15.0
      },
      {
        content: `<div style=" padding: 5px 5px 5px 5px;font-size: ${Browser.isDevice ? '10px' : '14px'}">20%</div>`,
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Research and Development',
        y: 20.0
      },
      {
        content: `<div style=" padding: 5px 5px 5px 5px;font-size: ${Browser.isDevice ? '10px' : '14px'}">25%</div>`,
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Marketing',
        y: 25.0
      }
  ];

    public pointRender(args: IAccPointRenderEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
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
    public title: string = 'Company Budget Distribution';
    constructor() {
        //code
    };

}


