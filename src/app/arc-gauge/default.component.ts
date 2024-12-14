/**
 * Sample for Circular Gauge default functionalities
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService]
})

export class DefaultComponent {

  public height: string = "500px";
  public width: string = "100%"

  public titleStyle: Object = {
    size: '18px',
    fontFamily: 'inherit'
  };

  public annotations: Object = [
    {
      description:'Youtube',
      content: '<div class="titleText" style="color:#c8eab7;">YouTube</div>',
      angle: 344,
      radius: '94%',
      zIndex: '1',
    },
    {
      description:'Instagram',
      content: '<div class="titleText" style="color:#82cdbc;">Instagram</div>',
      angle: 340,
      radius: '81%',
      zIndex: '1',
    },
    {
      description:'Twitter',
      content: '<div class="titleText" style="color:#43b6c4;">Twitter</div>',
      angle: 340,
      radius: '66%',
      zIndex: '1',
    },
    {
      description:'Facebook',
      content: '<div class="titleText" style="color:#1d91bf;">Facebook</div>',
      angle: 332,
      radius: '55%',
      zIndex: '1',
    },
    {
      description:'Tiktok',
      content: '<div class="titleText" style="color:#205ea8;">TikTok</div>',
      angle: 328,
      radius: '40%',
      zIndex: '1',
    },
    {
      description:'68%',
      content: '<div class="annotation">68%</div>',
      angle: 191,
      radius: '89%',
      zIndex: '1',
    },
    {
      description:'43%',
      content: '<div class="annotation">43%</div>',
      angle: 125,
      radius: '75%',
      zIndex: '1',
    },
    {
      description:'21%',
      content: '<div class="annotation">21%</div>',
      angle: 67,
      radius: '62%',
      zIndex: '1',
    },
    {
      description:'75%',
      content: '<div class="annotation">75%</div>',
      angle: 215,
      radius: '48%',
      zIndex: '1',
    },
    {
      description:'44%',
      content: '<div class="annotation">44%</div>',
      angle: 133,
      radius: '33%',
      zIndex: '1',
    },
  ];

  public ranges: Object[] = [
    {
      start: 0,
      end: 68,
      color: '#c8eab7',
      radius: '94%',
      startWidth: 22,
      endWidth: 22,
    },
    {
      start: 74,
      end: 100,
      color: '#7a7f82',
      startWidth: 1,
      endWidth: 1,
      radius: '89%',
    },
    {
      start: 0,
      end: 43,
      color: '#82cdbc',
      radius: '80%',
      startWidth: 22,
      endWidth: 22,
    },
    {
      start: 49,
      end: 100,
      color: '#7a7f82',
      startWidth: 1,
      endWidth: 1,
      radius: '75%',
    },
    {
      start: 0,
      end: 21,
      color: '#43b6c4',
      radius: '66%',
      startWidth: 22,
      endWidth: 22,
    },
    {
      start: 28,
      end: 100,
      color: '#7a7f82',
      startWidth: 1,
      endWidth: 1,
      radius: '61%',
    },
    {
      start: 0,
      end: 75,
      color: '#1d91bf',
      radius: '52%',
      startWidth: 22,
      endWidth: 22,
    },
    {
      start: 85,
      end: 100,
      color: '#7a7f82',
      startWidth: 1,
      endWidth: 1,
      radius: '47%',
    },
    {
      start: 0,
      end: 44,
      color: '#205ea8',
      radius: '38%',
      startWidth: 22,
      endWidth: 22,
    },
    {
      start: 55,
      end: 100,
      color: '#7a7f82',
      startWidth: 1,
      endWidth: 1,
      radius: '34%',
    },
  ];

  public ticks: Object = {
    height: 0,
    width: 0
  };

  public lineStyle: Object = {
    width: 0
  };

  public labelStyle: Object = {
    position: 'Inside',
    font: {
      size: '0px',
      color: 'white',
      fontFamily: 'Roboto',
      fontStyle: 'Regular',
    },
  };

  public load(args: ILoadedEventArgs): void {
    // custom code start
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
      selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (selectedTheme.indexOf('dark') > -1 || selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[5].content = '<div class="annotation" style="color:white;">68%</div>';
      args.gauge.axes[0].annotations[6].content = '<div class="annotation" style="color:white;">43%</div>';
      args.gauge.axes[0].annotations[7].content = '<div class="annotation" style="color:white;">21%</div>';
      args.gauge.axes[0].annotations[8].content = '<div class="annotation" style="color:white;">75%</div>';
      args.gauge.axes[0].annotations[9].content = '<div class="annotation" style="color:white;">44%</div>'
    }
    // custom code end
  }

  constructor() {
    // code
  };
}