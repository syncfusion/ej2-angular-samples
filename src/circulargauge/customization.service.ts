/**
 * Dynamic source
 */

import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export class DynamicDataSerive {
    GetSubGauge1(): any {
        let gauge1: CircularGauge = new CircularGauge({
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            axes: [{
                annotations: [{
                    content: '<div style="color:#666666;font-size:35px;">50.5GB</div>',
                    angle: 180, radius: '0%', zIndex:'1'
                }, {
                    content: '<div style="color:#757575;font-size:15px;">Used</div>',
                    angle: 180, radius: '25%', zIndex:'1',
                    textStyle: {
                        fontFamily: 'Roboto',
                        color: '#9E9E9E',
                        fontStyle: 'Bold',
                        fontWeight: 'Regular',
                        size: '14px'
                    }
                }],
                lineStyle: { width: 0 },
                startAngle: 180, endAngle: 180,
                radius: '80%',
                labelStyle: { font: { size: '0px' } },
                majorTicks: { width: 0 },
                minorTicks: { height: 0 },
                minimum: 0, maximum: 100,
                ranges: [{
                    start: 0, end: 100,
                    radius: '80%', startWidth: 30,
                    endWidth: 30, color: '#E0E0E0'
                }],
                pointers: [{
                    type: 'RangeBar',
                    value: 50.5, radius: '80%',
                    color: '#FF2680', animation: { duration: 0 },
                    pointerWidth: 30
                }]
            }]
        });
        let gauge2: CircularGauge = new CircularGauge({
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            centerY: '70%',
            axes: [{
                annotations: [{
                    content: '<div style="color:#666666;font-size:35px;">1800</div>',
                    angle: 0,
                    radius: '110%', zIndex:'1'
                }],
                lineStyle: { width: 0 },
                startAngle: 300, endAngle: 60,
                radius: '80%',
                labelStyle: { font: { size: '0px' } },
                majorTicks: { width: 0 },
                minorTicks: { height: 0 },
                minimum: 999, maximum: 2000,
                ranges: [{
                    start: 1000, end: 2000,
                    radius: '90%',
                    startWidth: 30, endWidth: 30,
                    color: '#E0E0E0'
                }],
                pointers: [{
                    type: 'RangeBar',
                    value: 1800, radius: '90%',
                    color: '#FFDD00', animation: { duration: 0 },
                    pointerWidth: 30
                }, {
                    radius: '90%', value: 1800,
                    color: '#424242',
                    animation: { duration: 0 },
                    pointerWidth: 9,
                    cap: { radius: 10, color: '#424242', border: { width: 0 } }
                }]
            }]
        });
        return { 'gauge1': gauge1, 'gauge2': gauge2 };
    }
}