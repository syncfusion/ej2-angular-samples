/**
 * Sample for data sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'data.html',
    encapsulation: ViewEncapsulation.None
})
export class DataComponent {

    public Container1: Object = {
        width: 30,
        border: {
            width: 0
        },
        offset: 30
    };
    // custom code start
    public load1(args1: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args1.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            if (args1.gauge.theme.toLowerCase().indexOf('dark') > 1 || args1.gauge.theme.toLowerCase() === 'highcontrast') {
                args1.gauge.annotations[1].content = '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="./assets/linear-gauge/images/Running1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Running</p></div>';
            }
    }
    public load2(args2: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args2.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            if (args2.gauge.theme.toLowerCase().indexOf('dark') > 1 || args2.gauge.theme.toLowerCase() === 'highcontrast') {
                args2.gauge.annotations[0].content = '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="./assets/linear-gauge/images/Cycling1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Cycling</p></div>';
            }
    }
    public load3(args3: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args3.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            if (args3.gauge.theme.toLowerCase().indexOf('dark') > 1 || args3.gauge.theme.toLowerCase() === 'highcontrast') {
                args3.gauge.annotations[0].content = '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="./assets/linear-gauge/images/Walking1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Walking</p></div>';
            }
    }
    // custom code end
    //Initializing Annotation
    public Annotation1: Object[] = [
        {
            content: '<div id="title" style="width:300px;"> <img style="float:left" src'
            + '="./assets/linear-gauge/images/exercise-tracking.svg"/><p style="font-size:18px;color:#4285F4;float:left;margin-left:12px;'
            + 'margin-top:4px">Exercise Tracking </p></div>',
            axisIndex: 0,
            axisValue: 0,
            x: 150,
            y: -180, zIndex: '1'
        },
        {
            content: '<div id="running" style="width:100px;"><img style="height:25px;width:25px;float:left" src="./assets/linear-gauge' +
            '/images/running.svg" /></span><p style="float:left;margin-left:10px;">Running</p></div>',
            axisIndex: 0,
            axisValue: 0,
            x: 50,
            y: -130, zIndex: '1'
        },
        {
            content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px;">10 MPH</p></div>',
            axisIndex: 0,
            axisValue: 10,
            y: -65, zIndex: '1'
        }
    ];

    public Axes1: Object[] = [{
        line: {
            offset: 30
        },
        labelStyle: {
            offset: 50
        },
        pointers: [{
            value: 10,
            placement: 'Near',
            offset: -60,
            height: 10,
            width: 10,
            markerType: 'Triangle'
        }],
        ranges: [
            {
                start: 0,
                end: 10,
                startWidth: 30,
                endWidth: 30,
                color: '#30b32d'
            }
        ]
    }];

    public Container2: Object = {
        width: 30,
        border: {
            width: 0
        },
        offset: -50
    };

    public Annotation2: Object[] = [{
        content: '<div id="cycle" style="width:100px;"><img style="height:25px;width:25px;float:left" src="./assets/linear-gauge'
        + '/images/cycling.svg" /></span><p style="float:left;margin-left:10px;">Cycling</p></div>',
        axisIndex: 0,
        axisValue: 0,
        x: 50,
        y: -110, zIndex: '1'
    },
    {
        content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px;">28 MPH</p></div>',
        axisIndex: 0,
        axisValue: 28,
        y: -70, zIndex: '1'
    }];

    public Axes2: Object[] = [{
        line: {
            offset: 30
        },
        labelStyle: {
            offset: 50
        },
        pointers: [{
            value: 28,
            height: 10,
            width: 10,
            placement: 'Near',
            offset: -60,
            markerType: 'Triangle'
        }],
        ranges: [
            {
                start: 0,
                end: 28,
                startWidth: 30,
                endWidth: 30,
                color: '#30b32d'
            }
        ]
    }];

    public Container3: Object = {
        width: 30,
        border: {
            width: 0
        },
        offset: -90
    };

    public Annotation3: Object[] = [{
        content: '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;float:left" src="./assets/' +
        'linear-gauge/images/walking.svg" /></span><p style="float:left;margin-left:10px;">Walking</p></div>',
        axisIndex: 0,
        axisValue: 0,
        x: 50,
        y: -120, zIndex: '1'
    },
    {
        content: '<div id="pointerText" style="width:100px;"><p style="font-size:15px;">2000 Steps</p></div>',
        axisIndex: 0,
        axisValue: 2.2,
        y: -65, zIndex: '1'
    }];

    public Axes3: Object[] = [{
        maximum: 10,
        line: {
            offset: 30
        },
        labelStyle: {
            format: '{value}k',
            offset: 50
        },
        pointers: [{
            value: 2,
            height: 10,
            width: 10,
            placement: 'Near',
            offset: -60,
            markerType: 'Triangle'
        }],
        ranges: [
            {
                start: 0,
                end: 2,
                startWidth: 30,
                endWidth: 30,
                color: '#30b32d'
            }
        ]
    }];
    constructor() {
        // code
    };
}