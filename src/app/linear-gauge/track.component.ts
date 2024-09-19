import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGauge, LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'track.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class TrackComponent {
    @ViewChild('linearDefault')
    public linearDefaultGauge: LinearGaugeComponent;
    @ViewChild('linearEdge')
    public linearEdgeGauge: LinearGaugeComponent;
    @ViewChild('linearRange')
    public linearRangeGauge: LinearGaugeComponent;
    @ViewChild('linearInversed')
    public linearInversedGauge: LinearGaugeComponent;
    @ViewChild('linearOpposed')
    public linearOpposedGauge: LinearGaugeComponent;

    public axesDefault: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesEdge: Object[] = [{
        line: {
            width: 0
        },
        pointers: [{
            width: 0,
        }],
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        labelStyle: { font: { fontFamily: 'inherit' }, useRangeColor: true }
    }];

    public axesRange: Object[] = [{
        line: {
            width: 0
        },
        pointers: [
            {
                width: 0,
            }
        ],
        ranges: [{
            start: 0,
            end: 30,
            color: '#F45656',
            startWidth: 5, endWidth: 5,
            offset: -5
        }, {
            start: 30,
            end: 60,
            color: '#FFC93E',
            startWidth: 5, endWidth: 5,
            offset: -5
        }, {
            start: 60,
            end: 100,
            color: '#0DC9AB',
            startWidth: 5, endWidth: 5,
            offset: -5
        }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        labelStyle: { useRangeColor: true, font: { fontFamily: 'inherit' } }
    }];

    public axesInversed: Object = [{
        line: {
            width: 5
        },
        majorTicks: {
            interval: 20,
            height: 7,
            width: 1
        },
        minorTicks: {
            interval: 10,
            height: 3
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

    public axesOpposed: Object = [{
        line: {
            width: 5
        },
        majorTicks: {
            interval: 20,
            height: 7,
            width: 1,
            position: 'Outside'
        },
        minorTicks: {
            interval: 10,
            height: 3,
            position: 'Outside'
        },
        labelStyle: {
            position: 'Outside',
            font: { fontFamily: 'inherit' }
        },
        pointers: [
            {
                width: 0
            }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true
    }];

    public containerEdge: Object = {
        width: 20, roundedCornerRadius: 10, type: 'RoundedRectangle', border: { width: 1 }
    };

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
        document.getElementById('containerBox').style.padding = "0%";
        document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
        document.getElementById('containerRange').className = document.getElementById('containerInversed').className =
        document.getElementById('containerOpposed').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        this.linearDefaultGauge.width = this.linearEdgeGauge.width = this.linearRangeGauge.width = this.linearInversedGauge.width = this.linearOpposedGauge.width = '450px';
        this.linearDefaultGauge.height = this.linearEdgeGauge.height = this.linearRangeGauge.height = this.linearInversedGauge.height = this.linearOpposedGauge.height = '150px';
        this.linearDefaultGauge.orientation = this.linearEdgeGauge.orientation = this.linearRangeGauge.orientation = this.linearInversedGauge.orientation = this.linearOpposedGauge.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            
        }
    };

    public verticalGauge(e: Event): void {
        document.getElementById('containerBox').style.padding = "4%";
        document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
                document.getElementById('containerRange').className = document.getElementById('containerInversed').className =
                document.getElementById('containerOpposed').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2"; 
        this.linearDefaultGauge.width = this.linearEdgeGauge.width = this.linearRangeGauge.width = this.linearInversedGauge.width = this.linearOpposedGauge.width = '150px';
        this.linearDefaultGauge.height = this.linearEdgeGauge.height = this.linearRangeGauge.height = this.linearInversedGauge.height = this.linearOpposedGauge.height = '350px';
        this.linearDefaultGauge.orientation = this.linearEdgeGauge.orientation = this.linearRangeGauge.orientation = this.linearInversedGauge.orientation = this.linearOpposedGauge.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
                       
        }
    };

    constructor() {
        //code
    }

}