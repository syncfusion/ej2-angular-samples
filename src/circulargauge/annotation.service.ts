/**
 * Annotation source
 */

import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export class AnnotationDataSerive {
    GetSubGauge1(): any {
        let gauge1: CircularGauge = new CircularGauge({
             axes: [{
                ranges: [{ start: 0, end: 3, startWidth: 4, endWidth: 4, color: 'rgba(29,29,29,0.4)' },
                { start: 3, end: 12, startWidth: 4, endWidth: 4, color: 'rgba(168,145,102,0.1)' }],
                annotations: [{ angle: 270, radius: '40%', content: null },
                { angle: 180, radius: '40%', content: null },
                { angle: 90, radius: '40%', content: null },
                { angle: 360, radius: '35%', zIndex: '1', content: '<div id="tm" style="font-size:10px;">21-06-17</div>' }],
                labelStyle: { hiddenLabel: 'First', font: { color: '#8c8c8c', size: '0px' }, autoAngle: false },
                majorTicks: { width: 1, height: 5, interval: 1 },
                minorTicks: { height: 3, width: 0.5, interval: 0.2 }, minimum: 0, maximum: 12,
                pointers: [{
                    radius: '70%', pointerWidth: 2, color: 'rgba(29,29,29,1)',
                    cap: {
                        color: 'rgba(29,29,29,1)', radius: 2, border: { width: 0.2, color: 'rgba(168,145,102,1)' }
                    }, needleTail: { color: 'rgba(168,145,102,1)', length: '10%' }, animation: { enable: false, duration: 500 }
                }], startAngle: 0, endAngle: 0, lineStyle: { width: 0 }
            }]
        });
        let gauge2: CircularGauge = new CircularGauge({
            titleStyle: { color: 'black' },
            axes: [
                {
                    startAngle: 0, endAngle: 0,
                    lineStyle: { width: 0 },
                    ranges: [
                        {
                            start: 0, end: 3,
                            startWidth: 4, endWidth: 4,
                            color: 'rgba(29,29,29,0.4)'
                        }, {
                            start: 3, end: 12,
                            startWidth: 4, endWidth: 4,
                            color: 'rgba(168,145,102,0.1)'
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
                        color: 'rgba(29,29,29,1)',
                        cap: {
                            color: 'rgba(29,29,29,1)',
                            radius: 2,
                            border: {
                                width: 0.2,
                                color: 'rgba(168,145,102,1)'
                            }
                        },
                        needleTail: {
                            color: 'rgba(168,145,102,1)',
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