import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'ticks.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class TicksComponent {
    @ViewChild('outsideTicks')
    public outsideTicksGauge: LinearGaugeComponent;
    @ViewChild('crossTicks')
    public crossTicksGauge: LinearGaugeComponent;
    @ViewChild('insideTicks')
    public insideTicksGauge: LinearGaugeComponent;
    @ViewChild('offsetTicks')
    public offsetTicksGauge: LinearGaugeComponent;
    
    public axesOutside: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        majorTicks: {
            interval: 20, height: 7, width: 1, position: 'Outside'
        },
        minorTicks: {
            interval: 10, height: 3, position: 'Outside'
        },
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }
    }];

    public axesCross: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        majorTicks: {
            interval: 20, height: 7, width: 1, position: 'Cross'
        },
        minorTicks: {
            interval: 10, height: 3, position: 'Cross'
        },
        minimum: 0,
        maximum: 100,
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesInside: Object[] = [{
        line: {
            width: 5
        },
        pointers: [
            {
                width: 0,
            }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        isInversed: true,
        majorTicks: {
            interval: 20, height: 7, width: 1, position: 'Inside'
        },
        minorTicks: {
            interval: 10, height: 3, position: 'Inside'
        },
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesOffset: Object = [{
        line: {
            width: 5
        },
        majorTicks: {
            interval: 20,
            height: 7,
            width: 1,
            position: 'Inside',
            offset: 10
        },
        minorTicks: {
            interval: 10,
            height: 3,
            position: 'Inside',
            offset: 10
        },
        labelStyle: {
            font: { fontFamily: 'inherit' }
        },
        pointers: [
            {
                width: 0
            }
        ],
        minimum: 0,
        maximum: 100,
        isInversed: true,
        opposedPosition: true
    }];

    public titleStyle: Object = {
        fontFamily: 'inherit', fontWeight: 'normal'
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }

    public horizontalGauge(e: Event): void {
        this.outsideTicksGauge.width = this.crossTicksGauge.width = this.insideTicksGauge.width = this.offsetTicksGauge.width = '450px';
        this.outsideTicksGauge.height = this.crossTicksGauge.height = this.insideTicksGauge.height = this.offsetTicksGauge.height = '150px';
        this.outsideTicksGauge.orientation = this.crossTicksGauge.orientation = this.insideTicksGauge.orientation = this.offsetTicksGauge.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };

    public verticalGauge(e: Event): void {
        this.outsideTicksGauge.width = this.crossTicksGauge.width = this.insideTicksGauge.width = this.offsetTicksGauge.width = '150px';
        this.outsideTicksGauge.height = this.crossTicksGauge.height = this.insideTicksGauge.height = this.offsetTicksGauge.height = '350px';
        this.outsideTicksGauge.orientation = this.crossTicksGauge.orientation = this.insideTicksGauge.orientation = this.offsetTicksGauge.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className = "col-xs-5 col-sm-5 col-lg-3 col-md-3";
        }
    };

    constructor() {
        //code
    }
}