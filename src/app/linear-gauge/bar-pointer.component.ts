import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGauge, LinearGaugeModule, GradientService } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'bar-pointer.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [GradientService]
})

export class BarPointerComponent {
    @ViewChild('outsideBar')
    public gaugeOutsideBar: LinearGaugeComponent;
    @ViewChild('crossBar')
    public gaugeCrossBar: LinearGaugeComponent;
    @ViewChild('insideBar')
    public gaugeInsideBar: LinearGaugeComponent;
    @ViewChild('gradientBar')
    public gaugeGradientBar: LinearGaugeComponent;
    @ViewChild('multipleBar')
    public gaugeMultipleBar: LinearGaugeComponent;

    public axesBarOutside: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            value: 70,
            height: 5,
            width: 5,
            placement: 'Near',
            type: 'Bar',
            position: 'Outside',
            color: '#0074E3',
            animationDuration: 1500
        }
        ],
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

    public axesBarCross: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            value: 70,
            height: 5,
            width: 5,
            placement: 'Near',
            type: 'Bar',
            position: 'Cross',
            color: '#0074E3',
            animationDuration: 1500
        }
        ],
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

    public axesBarInside: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            value: 70,
            height: 5,
            width: 5,
            placement: 'Near',
            type: 'Bar',
            position: 'Inside',
            color: '#0074E3',
            animationDuration: 1500
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
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesBarGradient: Object = [{
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
        pointers: [{
            value: 70,
            height: 5,
            width: 5,
            offset: 2,
            placement: 'Near',
            type: 'Bar',
            position: 'Outside',
            color: '#0074E3',
            animationDuration: 1500,
            linearGradient: {
                startValue: "0%",
                endValue: "100%",
                colorStop: [
                    { color: "#FB7D55", offset: "0%", opacity: 1 },
                    { color: "#ECC85B", offset: "50%", opacity: 1 },
                    { color: "#6FC78A", offset: "100%", opacity: 1 }
                ]
            }
        }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true
    }];

    public axesBarMultiple: Object = [{
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
        pointers: [{
            value: 10,
            height: 5,
            width: 5,
            placement: 'Near',
            type: 'Bar',
            position: 'Inside',
            color: '#0074E3',
            animationDuration: 1500
        },
        {
            value: 70,
            height: 5,
            width: 5,
            placement: 'Near',
            type: 'Bar',
            position: 'Outside',
            color: 'red',
            animationDuration: 1500
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
        this.gaugeOutsideBar.width = this.gaugeCrossBar.width = this.gaugeInsideBar.width = this.gaugeGradientBar.width = this.gaugeMultipleBar.width = '450px';
        this.gaugeOutsideBar.height = this.gaugeCrossBar.height = this.gaugeInsideBar.height = this.gaugeGradientBar.height = this.gaugeMultipleBar.height = '150px';
        this.gaugeOutsideBar.orientation = this.gaugeCrossBar.orientation = this.gaugeInsideBar.orientation = this.gaugeGradientBar.orientation = this.gaugeMultipleBar.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
                document.getElementById('containerBox').style.padding = "0%";
        }
    };

    public verticalGauge(e: Event): void {
        this.gaugeOutsideBar.width = this.gaugeCrossBar.width = this.gaugeInsideBar.width = this.gaugeGradientBar.width = this.gaugeMultipleBar.width = '150px';
        this.gaugeOutsideBar.height = this.gaugeCrossBar.height = this.gaugeInsideBar.height = this.gaugeGradientBar.height = this.gaugeMultipleBar.height = '350px';
        this.gaugeOutsideBar.orientation = this.gaugeCrossBar.orientation = this.gaugeInsideBar.orientation = this.gaugeGradientBar.orientation = this.gaugeMultipleBar.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
                document.getElementById('containerBox').style.padding = "4%";
        }
    };

    constructor() {
        //code
    }

}