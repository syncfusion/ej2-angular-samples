import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGauge, LinearGaugeModule, GradientService } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'range.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [GradientService]
})

export class RangesComponent {
    @ViewChild('linearDefault')
    public linearDefault: LinearGaugeComponent;
    @ViewChild('linearExponential')
    public linearExponential: LinearGaugeComponent;
    @ViewChild('linearConcave')
    public linearConcave: LinearGaugeComponent;
    @ViewChild('linearGradient')
    public linearGradient: LinearGaugeComponent;
    @ViewChild('linearMultiple')
    public linearMultiple: LinearGaugeComponent;

    public axesDefault: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        ranges: [{
            start: 0,
            end: 100,
            startWidth: 10,
            endWidth: 10,
            color: '#F45656',
            offset: 5
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

    public axesExponential: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        ranges: [{
            start: 0,
            end: 50,
            startWidth: 2,
            endWidth: 15,
            color: '#F45656',
            offset: 5
        }, {
            start: 50,
            end: 100,
            startWidth: 15,
            endWidth: 50,
            color: '#F45656',
            offset: 5
        }
        ],
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

    public axesConcave: Object[] = [{
        line: {
            width: 5
        },
        pointers: [
            {
                width: 0,
            }
        ],
        ranges: [{
            start: 0,
            end: 50,
            color: '#F45656',
            startWidth: 50, endWidth: 20,
            offset: 5
        }, {
            start: 50,
            end: 100,
            color: '#F45656',
            startWidth: 20, endWidth: 50,
            offset: 5
        }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        majorTicks: {
            interval: 20, height: 7, width: 1, position: 'Outside'
        },
        minorTicks: {
            interval: 10, height: 3, position: 'Outside'
        },
        labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }
    }];

    public axesGradient: Object = [{
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
        ranges: [
            {
                start: 0,
                end: 100,
                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',
                    colorStop: [
                        { color: "#FB7D55", offset: "0%", opacity: 1 },
                        { color: "#ECC85B", offset: "50%", opacity: 1 },
                        { color: "#6FC78A", offset: "100%", opacity: 1 }]
                },
                startWidth: 50,
                endWidth: 50,
                offset: 5
            }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true
    }];

    public axesMultiple: Object = [{
        line: {
            width: 5
        },
        ranges: [
            {
                start: 0,
                end: 30,
                color: '#FB7D55',
                startWidth: 50,
                endWidth: 50,
                offset: 5
            },
            {
                start: 30,
                end: 65,
                color: '#ECC85B',
                startWidth: 50,
                endWidth: 50,
                offset: 5
            },
            {
                start: 65,
                end: 100,
                color: '#6FC78A',
                startWidth: 50,
                endWidth: 50,
                offset: 5
            }
        ],
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
        this.linearDefault.width = this.linearExponential.width = this.linearConcave.width = this.linearGradient.width = this.linearMultiple.width = '450px';
        this.linearDefault.height = this.linearExponential.height = this.linearConcave.height = this.linearGradient.height = this.linearMultiple.height = '150px';
        this.linearDefault.orientation = this.linearExponential.orientation = this.linearConcave.orientation = this.linearGradient.orientation = this.linearMultiple.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerone').className = document.getElementById('containertwo').className =
                document.getElementById('containerthree').className = document.getElementById('containerfour').className =
                document.getElementById('containerfive').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    };

    public verticalGauge(e: Event): void {
        this.linearDefault.width = this.linearExponential.width = this.linearConcave.width = this.linearGradient.width = this.linearMultiple.width = '150px';
        this.linearDefault.height = this.linearExponential.height = this.linearConcave.height = this.linearGradient.height = this.linearMultiple.height = '350px';
        this.linearDefault.orientation = this.linearExponential.orientation = this.linearConcave.orientation = this.linearGradient.orientation = this.linearMultiple.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerone').className = document.getElementById('containertwo').className =
                document.getElementById('containerthree').className = document.getElementById('containerfour').className =
                document.getElementById('containerfive').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
                document.getElementById('containerBox').style.padding = "4%";
        }
    };

    constructor() {
        //code
    }

}