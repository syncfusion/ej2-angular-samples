/**
 * Sample for Circular Gauge default functionalities
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService, GradientService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'key-performance-indicator.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService, GradientService]
})

export class KeyPerformanceComponent {

  public selectedTheme: string = location.hash.split('/')[1];
  public annotations: Object = [
    {
      description:'Triangle',
      content: '<div class="triangle-up"></div>',
      angle: 270,
      zIndex: '1',
      radius: '33%',
    },
    {
      description:'Current',
      content:
        '<div class="text" style="color:#84cbb5;">Current</div>',
      angle: 0,
      zIndex: '1',
      radius: '25%',
    },
    {
      description:'76.6%',
      content:
        '<div class="percentage" style="color:#84cbb5;">76.6%</div>',
      angle: 105,
      zIndex: '1',
      radius: '9%',
    },
    {
      description:'0',
      content:
        '<div style="font-size:22px;">0</div>',
      angle: 213,
      zIndex: '1',
      radius: '83%',
    },
    {
      description:'100',
      content:
        '<div style="font-size:22px;">100</div>',
      angle: 150,
      zIndex: '1',
      radius: '83%',
    },
  ];

  public animation: Object = {
    enable: false
  };

  public ticks: Object = {
    height: 0
  };

  public lineStyle: Object = {
    width: 0
  };

  public linearGradient: Object = {
    startValue: '0%',
    endValue: '60%',
    colorStop: [
      { color: 'white', offset: '10%', opacity: 0.9 },
      { color: '#84cbb5', offset: '90%', opacity: 0.9 },
    ],
  };

  public labelStyle: Object = {
    format:'{value} %',
    font: {
      size: '0px',
    },
  };

  public loadGauge(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
      if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
        args.gauge.axes[0].annotations[3].content = '<div style="font-size:22px;color:white;">0</div>';
        args.gauge.axes[0].annotations[4].content = '<div style="font-size:22px;color:white;">100</div>';
      }
      else {
        args.gauge.axes[0].annotations[3].content = '<div style="font-size:22px;">0</div>';
        args.gauge.axes[0].annotations[4].content = '<div style="font-size:22px;">100</div>';
      }
    // custom code end
  }

  constructor() {
    // code
  };
}