/**
 * Annotation source
 */

import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export class AnnotationDataSerive {
    GetSubGauge1(): any {
        let gauge1: CircularGauge = new CircularGauge({
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            background: 'transparent',
             axes: [{
                ranges: [{ start: 0, end: 3, startWidth: 4, endWidth: 4, color: 'rgb(128,128,128)' },
                { start: 3, end: 12, startWidth: 4, endWidth: 4, color: 'rgb(192,192,192)' }],
                annotations: [{ angle: 270, radius: '40%', content: null },
                { angle: 180, radius: '40%', content: null },
                { angle: 90, radius: '40%', content: null },
                { angle: 360, radius: '35%', zIndex: '1', content: '<div id="tm" style="font-size:10px;">21-06-17</div>' }],
                labelStyle: { hiddenLabel: 'First', font: {  size: '0px' }, autoAngle: false },
                majorTicks: { width: 1, height: 5, interval: 1 },
                minorTicks: { height: 3, width: 0.5, interval: 0.2 }, minimum: 0, maximum: 12,
                pointers: [{
                    radius: '70%', pointerWidth: 2,
                    cap: {
                         radius: 2, border: { width: 0.2,  }
                    }, needleTail: {  length: '10%' }, animation: { enable: false, duration: 500 }
                }], startAngle: 0, endAngle: 0, lineStyle: { width: 0 }
            }]
        });
        let gauge2: CircularGauge = new CircularGauge({
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            background: 'transparent',
            axes: [
                {
                    startAngle: 0, endAngle: 0,
                    lineStyle: { width: 0 },
                    ranges: [
                        {
                            start: 0, end: 3,
                            startWidth: 4, endWidth: 4,
                            color: 'rgb(128,128,128)'
                        }, {
                            start: 3, end: 12,
                            startWidth: 4, endWidth: 4,
                            color: 'rgb(192,192,192)'
                        }
                    ],
                    annotations: [{
                        angle: 270,
                        radius: '40%',
                        content: null
                    }, {
                        angle: 180,
                        radius: '40%',
                        content: null
                    }, {
                        angle: 90,
                        radius: '50%',
                        content: null
                    }, {
                        angle: 360,
                        radius: '35%',zIndex: '1',
                        content: '<div id="tm" style="font-size:10px;">21-06-17</div>'
                    }],
                    labelStyle: {
                        hiddenLabel: 'First',
                        font: {
                            color: '#8c8c8c',
                            size: '0px'
                        },
                        autoAngle: false
                    }, majorTicks: {
                        width: 1,
                        height: 5,
                        interval: 1
                    }, minorTicks: {
                        height: 3,
                        width: 0.5,
                        interval: 0.2
                    },
                    minimum: 0,
                    maximum: 12,
                    pointers: [{
                        radius: '70%',
                        pointerWidth: 2,
                        cap: {
                            radius: 2,
                            border: {
                                width: 0.2,
                            }
                        },
                        needleTail: {
                            length: '10%'
                        }, animation: {
                            enable: false,
                            duration: 500
                        }
                    }]
                }
            ]
        });
        return { 'gauge1': gauge1, 'gauge2': gauge2 };
    }
}