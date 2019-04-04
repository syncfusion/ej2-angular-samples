// custom code start
//tslint:disable
// custom code end
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
@Component({
    selector: 'control-content',
    templateUrl: 'apple-watch-rings.html',
    encapsulation: ViewEncapsulation.None
})

export class AppleWatchComponent {

    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;

    public lineStyle: Object = {
        width: 0
    };
    //Initializing LabelStyle
    public labelStyle: Object = {
        position: 'Inside', useRangeColor: true,
        font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    public load1(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="./assets/circular-gauge/images/image4.svg" /></div>';
        }
    }
    public load2(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;" src="./assets/circular-gauge/images/image5.svg" /></div>';
        }
    }
    public load3(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;" src="./assets/circular-gauge/images/image6.svg" /></div>';
        }
    }
    // custom code end
    public ranges: Object[] = [
        {
            start: 0, end: 100,
            radius: '90%',
            startWidth: 40, endWidth: 40,
            color: '#E30219', opacity: 0.2
        },
        {
            start: 0, end: 100,
            radius: '68%',
            startWidth: 40, endWidth: 40,
            color: '#3EDE00', opacity: 0.2
        },
        {
            start: 0, end: 100,
            radius: '46%',
            startWidth: 40, endWidth: 40,
            color: '#18F8F6', opacity: 0.2
        }
    ];
    public pointers: Object[] = [{
        roundedCornerRadius: 25,
        value: 65,
        type: 'RangeBar',
        radius: '90%',
        color: '#E2011A',
        animation: { enable: true },
        pointerWidth: 40
    },
    {
        roundedCornerRadius: 25,
        value: 43,
        type: 'RangeBar',
        radius: '68%',
        color: '#3FE000',
        animation: { enable: true },
        pointerWidth: 40
    },
    {
        roundedCornerRadius: 25,
        value: 58,
        type: 'RangeBar',
        radius: '46%',
        color: '#00C9E6',
        animation: { enable: true },
        pointerWidth: 40
    }];
    public majorTicks: Object = {
        height: 0, 
    };
    public minorTicks: Object = {
        height: 0
    };
    public annotaions: Object = [{
          angle: 8, radius: '80%', zIndex: '1',
        content: '<div id="annotation1"><img style="width:22px;height:22px;" src="./assets/circular-gauge/images/image1.svg" /></div>'
    },{
        angle: 11, radius: '58%', zIndex: '1',
        content: '<div id="annotation2"><img style="width:20px;height:20px;" src="./assets/circular-gauge/images/image2.svg" /></div>'
    },{
        angle: 16, radius: '36%', zIndex: '1',
        content: '<div id="annotation3"><img style="width:22px;height:22px;" src="./assets/circular-gauge/images/image3.svg" /></div>'
    }];
    public ranges1: Object[] = [
        {
            start: 0, end: 100,
            radius: '100%',
            startWidth: 8, endWidth: 8,
            color: '#E30219', opacity: 0.2
        }];
        public pointers1: Object[] = [{
            roundedCornerRadius: 5,
            value: 65,
            type: 'RangeBar',
            radius: '100%',
            color: '#E2011A',
            animation: { enable: true },
            pointerWidth: 8
        }];
        public annotaions1: Object = [{
            angle: 0, radius: '0%', zIndex: '1',
            content: '<div id="annotation4"><img style="width:17px;height:17px;" src="./assets/circular-gauge/images/image1.svg" /></div>'
        }];
        public ranges2: Object[] = [
            {
                start: 0, end: 100,
                radius: '100%',
                startWidth: 8, endWidth: 8,
                color: '#3EDE00', opacity: 0.2
            }];
            public pointers2: Object[] = [{
                roundedCornerRadius: 5,
                value: 43,
                type: 'RangeBar',
                radius: '100%',
                color: '#3FE000',
                animation: { enable: true },
                pointerWidth: 8
            }];
            public annotaions2: Object = [{
                angle: 0, radius: '0%', zIndex: '1',
                content: '<div id="annotation6"><img style="width:15px;height:15px;" src="./assets/circular-gauge/images/image2.svg" /></div>'
            }];
            public ranges3: Object[] = [
                {
                    start: 0, end: 100,
                    radius: '100%',
                    startWidth: 8, endWidth: 8,
                    color: '#18F8F6', opacity: 0.2
                }];
                public pointers3: Object[] = [{
                    roundedCornerRadius: 5,
                    value: 58,
                    type: 'RangeBar',
                    radius: '100%',
                    color: '#00C9E6',
                    animation: { enable: true },
                    pointerWidth: 8
                }];
                public annotaions3: Object = [{
                    angle: 0, radius: '0%', zIndex: '1',
                    content: '<div id="annotation6"><img style="width:20px;height:20px;" src="./assets/circular-gauge/images/image3.svg" /></div>'
                }];
        
    
    constructor() {
        //
    };
}