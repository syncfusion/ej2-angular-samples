/**
 * Sample for pointers in the Circular Gauge
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService, GradientService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'patterns.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule],
    providers: [AnnotationsService, GradientService]
})

export class PatternsComponent {

  public selectedTheme: string = location.hash.split('/')[1];
  public lineStyle: Object = {
    width: 0
  };

  public lineStyleOne: Object = {
    width: 30,
    color: '#f6f7f9'
  };

  public lableStyleGaugeTwo: Object = {
    format:'{value} %',
    font: { fontFamily: 'inherit', size: '0px', fontWeight: 'Regular' }
  };

  public lableStyleGaugeThree: Object = {
    format:'{value}%',
    font: { fontFamily: 'inherit', size: '0px', fontWeight: 'Regular' }
  };

  public lableStyleGaugeFour: Object = {
    format:'Pointer {value} %',
    font: { fontFamily: 'inherit', size: '0px', fontWeight: 'Regular' }
  };

  public lableStyleGaugeFive: Object = {
    format:'$ {value}',
    font: { fontFamily: 'inherit', size: '0px', fontWeight: 'Regular' }
  };

  public lableStyleGaugeSix: Object = {
    format:'{value} % Completed',
    font: { fontFamily: 'inherit', size: '0px', fontWeight: 'Regular' }
  };

  public lableStyleGaugeOne: Object = {
    format:'{value}',
    font: {
      fontFamily: 'inherit',
      size: '12px'
    },
    position: 'Outside',
    offset: 20,
  };


  public ticks: Object = {
    width: 0
  };

  public majorTicks: Object = {
    width: 0,
    interval: 10
  };

  public majorTicksSix: Object = {
    height: 0,
    interval: 15
  };


  public annotationsGaugeThree: Object = [
    {
      description:'450',
      content:
        '<div class="gaugeThreeText" style="font-size:30px;font-family:inherit;"> 450 </div> </div>',
      zIndex: '1',
      angle: 0,
      radius: '10%',
    },
    {
      description:'300',
      content: '<div style="font-size:12px;font-family:inherit;"> 300 </div>',
      zIndex: '1',
      angle: 0,
      radius: '112%',
    },
    {
      description:'400',
      content: '<div style="font-size:12px;font-family:inherit;"> 400 </div>',
      zIndex: '1',
      angle: 48,
      radius: '112%',
    },
    {
      description:'500',
      content: '<div style="font-size:12px;font-family:inherit;"> 500 </div>',
      zIndex: '1',
      angle: 93,
      radius: '112%',
    }
  ];

  public pointersGaugeOne: Object[] = [
    {
      type: 'RangeBar',
      description:'RangeBar pointer value : 38',
      color: '#7edfb4',
      value: 38,
      radius: '120%',
      pointerWidth: 28,
      animation: {
        duration: 1800
      }
    },
    {
      type: 'Marker',
      description:'Marker pointer  value: 38',
      markerShape: 'Rectangle',
      markerWidth: 28,
      markerHeight: 3,
      radius: '98%',
      color: 'black',
      value: 38,
      animation: {
        duration: 1800
      }
    }
  ];

  public pointersGaugeTwo: Object[] = [
    {
      type: 'RangeBar',
      description: 'RangeBar pointer value : 75',
      pointerWidth: 40,
      color: '#d6f5e8',
      value: 75,
      radius: '125%',
    },
    {
      type: 'RangeBar',
      description: 'RangeBar pointer value: 75',
      pointerWidth: 30,
      color: '#7edfb4',
      value: 75,
      radius: '115%',
    },
  ];

  public pointersGaugeFour: Object[] = [
    {
      type: 'RangeBar',
      description:'RangeBar pointer value : 21',
      radius: '90%',
      value: 21,
      roundedCornerRadius: 10,
      color: '#a8f789',
      pointerWidth: 25,
      animation: {
        enable: false
      }
    },
    {
      type: 'Marker',
      description:'Marker Pointer value : 22',
      markerShape: 'Circle',
      markerWidth: 30,
      markerHeight: 30,
      color: 'white',
      radius: '80%',
      value: 22,
      animation: {
        enable: false
      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value: 22',
      markerShape: 'Circle',
      markerWidth: 18,
      markerHeight: 18,
      color: '#a8f789',
      radius: '81%',
      value: 22,
      animation: {
        enable: false
      }
    },
  ];

  public pointersGaugeSix: Object[] = [
    {
      type: 'Marker',
      description:'Marker pointer value : 0',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 0,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 1',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 1,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 2',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 2,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 3',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 3,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 4',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 4,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 5',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 5,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 6',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 6,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 7',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 7,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 8',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 8,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 9',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 9,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 10',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 10,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 11',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 11,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 12',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 12,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 13',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 13,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 14',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 14,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 15',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 15,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 16',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 16,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 17',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 17,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 18',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 18,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 19',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 19,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 20',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 20,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 21',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 21,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 22',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 22,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 23',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 23,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 24',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 24,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 25',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 25,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 26',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 26,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 27',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 27,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 28',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 28,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 29',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 29,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 30',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 30,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 31',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 31,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 32',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 32,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 33',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 33,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 34',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 34,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 35',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 35,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 36',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 36,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 37',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 37,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 38',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 38,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 39',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 39,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 40',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 40,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 41',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 41,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 42',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 42,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 43',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 43,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 44',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 44,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 45',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 45,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 46',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 46,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 47',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 47,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 48',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 48,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 49',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 49,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 50',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 50,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 51',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 51,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 52',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 52,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 53',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 53,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 54',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 54,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 55',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 55,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 56',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 56,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 57',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 57,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 58',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 58,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 59',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 59,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 60',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 60,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 61',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 61,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 62',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 62,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 63',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 63,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 64',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 64,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 65',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 65,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 66',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 66,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 67',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 67,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 68',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 68,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 69',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 69,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 70',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 70,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 71',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 71,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 72',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 72,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 73',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 73,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 74',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 74,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 75',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 75,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 76',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 76,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 77',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 77,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 78',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 78,
      animation: {
        enable: false,

      }
    },
    {
      type: 'Marker',
      description:'Marker pointer value : 79',
      markerShape: 'Rectangle',
      markerWidth: 38,
      markerHeight: 3,
      color: '#7edfb4',
      value: 79,
      animation: {
        enable: false,

      }
    }
  ];

  public rangesGaugeSix: Object[] = [
    {
      start: 0,
      end: 100,
      startWidth: 37,
      endWidth: 37,
      radius: '95%',
      color: '#f6f7f9'
    },
  ];

  public rangesGaugeOne: Object[] = [
    {
      start: 0,
      end: 38,
      startWidth: 10,
      endWidth: 10,
      color: '#7edfb4',
      radius: '86%',
    },
    {
      start: 38,
      end: 50,
      startWidth: 10,
      endWidth: 10,
      color: '#7edfb4',
      radius: '87%',
    },
    {
      start: 50,
      end: 75,
      startWidth: 10,
      endWidth: 10,
      color: '#f99d4c',
      radius: '87%',
    },
    {
      start: 75,
      end: 100,
      startWidth: 10,
      endWidth: 10,
      color: '#e96920',
      radius: '87%',
    }
  ];

  public rangesGaugeFour: Object[] = [
    {
      start: 0,
      end: 100,
      radius: '90%',
      startWidth: 25,
      endWidth: 25,
      color: '#E0E0E0',
      roundedCornerRadius: 20,
    },
    {
      start: 70,
      end: 100,
      radius: '90%',
      startWidth: 25,
      endWidth: 25,
      roundedCornerRadius: 20,
      color: '#ed5e4b',
    },
    {
      start: 21,
      end: 75,
      radius: '90%',
      startWidth: 25,
      endWidth: 25,
      color: '#ffe852',
      linearGradient: {
        startValue: '65%',
        endValue: '100%',
        colorStop: [
          { color: '#ffe852', offset: '20%', opacity: 0.9 },
          { color: '#ed5e4b', offset: '100%', opacity: 0.9 },
        ],
      },
    },
  ];

  public pointersGaugeFive: Object[] = [
    {
      roundedCornerRadius: 20,
      value: 54,
      type: 'RangeBar',
      radius: '90%',
      color: '#ffe852',
      border: {
        color: 'grey',
        width: 0,
      },
      animation: {
        enable: false,
      },
      pointerWidth: 30,
    },
  ];

  public rangesGaugeFive: Object[] = [
    {
      start: 0,
      end: 100,
      radius: '90%',
      startWidth: 30,
      endWidth: 30,
      color: '#E0E0E0',
      roundedCornerRadius: 20,
    },
    {
      start: 3,
      end: 30,
      radius: '105%',
      startWidth: 10,
      endWidth: 10,
      color: '#a8f789',
      roundedCornerRadius: 10,
    },
    {
      start: 31,
      end: 70,
      radius: '105%',
      startWidth: 10,
      endWidth: 10,
      color: '#ffe852',
      roundedCornerRadius: 10,
    },
    {
      start: 71,
      end: 96,
      radius: '105%',
      startWidth: 10,
      endWidth: 10,
      color: '#ed5e4b',
      roundedCornerRadius: 10,
    },
  ];

  public pointersGaugeThree: Object[] = [
    {
      type: 'Marker',
      markerShape: 'Circle',
      value: 450,
      color: 'white',
      border: {
        color: '#77e6b4',
        width: 7,
      },
      animation: {
        enable: false
      },
      radius: '94%',
      markerWidth: 17,
      markerHeight: 17,
    },
  ];

  public rangesGaugeThree: Object[] = [
    {
      start: 0,
      end: 298,
      startWidth: 12,
      endWidth: 12,
      color: '#ff5353',
      roundedCornerRadius: 10,
    },
    {
      start: 300,
      end: 397,
      startWidth: 12,
      endWidth: 12,
      color: '#ffd223',
      roundedCornerRadius: 10,
    },
    {
      start: 400,
      end: 497,
      startWidth: 12,
      endWidth: 12,
      color: '#77e6b4',
      roundedCornerRadius: 10,
    },
    {
      start: 500,
      end: 600,
      startWidth: 12,
      endWidth: 12,
      color: '#21d683',
      roundedCornerRadius: 10,
    },
  ];

  public loadOne(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeOneText" style="font-size:30px;color:white;font-family:inherit;">38</div>';
    }
    else {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeOneText" style="font-size:30px;font-family:inherit;">38</div>';
    }
    // custom code end
  }

  public loadTwo(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
      if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
        args.gauge.axes[0].annotations[0].content = '<div style="font-size:25px;color:white;font-family:inherit;">75%</div>';
        args.gauge.axes[0].annotations[1].content = '<div style="font-size:22px;color:white;font-family:inherit;">0%</div>';
        args.gauge.axes[0].annotations[2].content = '<div style="font-size:22px;color:white;font-family:inherit;">100%</div>'
      }
      else {
        args.gauge.axes[0].annotations[0].content = '<div style="font-size:25px;font-family:inherit;">75%</div>';
        args.gauge.axes[0].annotations[1].content = '<div style="font-size:22px;font-family:inherit;">0%</div>';
        args.gauge.axes[0].annotations[2].content = '<div style="font-size:22px;font-family:inherit;">100%</div>'
      }
    // custom code end
  }

  public loadThree(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeThreeText" style="font-size:30px;color:white;font-family:inherit;"> 450 </div>';
      args.gauge.axes[0].annotations[1].content = '<div style="font-size:12px;color:white;font-family:inherit;"> 300 </div>';
      args.gauge.axes[0].annotations[2].content = '<div style="font-size:12px;color:white;font-family:inherit;"> 400 </div>';
      args.gauge.axes[0].annotations[3].content = '<div style="font-size:12px;color:white;font-family:inherit;"> 500 </div>';
    }
    else {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeThreeText" style="font-size:30px;font-family:inherit;"> 450 </div>';
      args.gauge.axes[0].annotations[1].content = '<div style="font-size:12px;font-family:inherit;"> 300 </div>';
      args.gauge.axes[0].annotations[2].content = '<div style="font-size:12px;font-family:inherit;"> 400 </div>';
      args.gauge.axes[0].annotations[3].content = '<div style="font-size:12px;font-family:inherit;"> 500 </div>';
    }
    // custom code end
  }

  public loadFour(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeFourText" style="font-size:30px;color:white;font-family:inherit;">21%</div>';
    }
    else {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeFourText" style="font-size:30px;font-family:inherit;">21%</div>';
    }
    // custom code end
  }

  public loadFive(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeFiveText" style="font-size:30px;color:white;font-family:inherit;">54%</div>';
    }
    else {
      args.gauge.axes[0].annotations[0].content = '<div class="gaugeFiveText" style="font-size:30px;font-family:inherit;">54%</div>';
    }
    // custom code end
  }

  public loadSix(args: ILoadedEventArgs): void {
    // custom code start
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material';
    args.gauge.theme = <GaugeTheme>(this.selectedTheme.charAt(0).toUpperCase() +
      this.selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    if (this.selectedTheme.indexOf('dark') > -1 || this.selectedTheme.indexOf('contrast') > -1) {
      args.gauge.axes[0].annotations[0].content = '<div class="annotationText" style="color:white;font-family:inherit;">80% <br/> <div> Completed </div> </div>'
    }
    else {
      args.gauge.axes[0].annotations[0].content = '<div class="annotationText">80% <br/> <div> Completed </div> </div>'
    }
    // custom code end
  }

  constructor() {
    // code
  };
}