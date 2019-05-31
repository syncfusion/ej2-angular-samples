/**
 * Speedometer 
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, IAxisLabelRenderEventArgs, CircularGauge } from '@syncfusion/ej2-angular-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';
// custom code start
//tslint:disable
// custom code end
@Component({
    selector: 'control-content',
    templateUrl: 'speedometer.html',
    encapsulation: ViewEncapsulation.None
})
export class SpeedometerComponent {

    @ViewChild('circulargauge')
    public circulargauge: CircularGaugeComponent;
    public title: string = 'Speedometer';
    public titleStyle: Object = { size: '18px' };
        
    public axisLabelRender(args:IAxisLabelRenderEventArgs):void {           
                if (document.getElementsByClassName("e-checkbox-wrapper")[0].getAttribute("aria-checked") === "true") {
                    args.axis.majorTicks.interval = 10
                        var text;
                        switch (parseInt(args.text)) {
                            case 10:
                                text = 'Ideal';
                                break;
                            case 30:
                                text = 'Safe';
                                break;
                            case 50:
                                text = 'Good';
                                break;
                            case 70:
                                text = 'Ok';
                                break;
                            case 90:
                                text = 'Risk';
                                break;
                            case 110:
                                text = 'Danger';
                                break;
                            default:
                                text = '';
                                break;
                        }
                        args.text = text;
                    
                        args.axis.pointers[0].animation.enable = false;
                } else {
                    args.axis.majorTicks.interval = 20;
                    args.axis.minimum = 0;
                    args.axis.maximum = 120;
                    args.axis.pointers[0].animation.enable = false;
                }
    }
    public lineStyle: Object = {
        width: 0
    };
    //Initializing LabelStyle
    public labelStyle: Object = {
        useRangeColor: false, position: 'Outside', autoAngle: true,
        font: { size: '13px', fontFamily: 'Roboto' }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public majorTicks: Object = {
        width: 0
    };
    public minorTicks: Object = {
        width: 0
    };
    public pointers: Object[] =[{
        animation: { enable: true, duration: 900 },
        value: 40,
        radius: '80%',
        color: '#757575',
        pointerWidth: 7,
        cap: {
            radius: 8,
            color: '#757575',
            border: { width: 0 }
        },
        needleTail: {
            color: '#757575',
            length: '15%'
        },
    }];
    public annotaions: Object = [{
        content: "<div id='templateWrap'>"
        + "<div style='width:90px;text-align:center;float: right;color: #424242;font-size: 20px;font-family:Roboto'>${pointers[0].value} km/h</div></div></div>",
        angle: 0, zIndex: '1',
        radius: '30%'
    }
];
public ranges: Object[] = [
    {
        start: 0,
        end: 20,
        startWidth: 5, endWidth: 10,
        radius: '102%',
        color: '#82b944',
    },
    {
        start: 20,
        end: 40,
        startWidth: 10, endWidth: 15,
        radius: '102%',
        color: '#a1cb43',
    }, {
        start: 40,
        end: 60,
        startWidth: 15, endWidth: 20,
        radius: '102%',
        color: '#ddec12',
    },
    {
        start: 60,
        end: 80,
        startWidth: 20, endWidth: 25,
        radius: '102%',
        color: '#ffbc00',
    },
    {
        start: 80,
        end: 100,
        startWidth: 25, endWidth: 30,
        radius: '102%',
        color: '#ff6000',
    },
    {
        start: 100,
        end: 120,
        startWidth: 30, endWidth: 35,
        radius: '102%',
        color: 'red',
    }
]
ngAfterViewInit(): void {
let gauge5Interval1: any = setInterval(
    (): void => {
        let newVal: number = this.circulargauge.axes[0].pointers[0].value + (Math.floor(Math.random() * (10 - (-10))) - 10);
        if (newVal <= 0) {
            newVal = 5;
        }
        if (document.getElementById('container')) {
            this.circulargauge.axes[0].pointers[0].animation.enable = true;
            this.circulargauge.setPointerValue(0, 0, newVal);
            if (!isNullOrUndefined(document.getElementById('pointerannotation'))) {
                document.getElementById('pointerannotation').innerHTML = newVal.toString() + ' km/h';
            }
        } else {
            clearInterval(gauge5Interval1);
        }
    },
    1000
);

let combineRange: EmitType<CheckBoxChangeEvents>;
let rangeSet: CheckBox = new CheckBox(
    {
        change: combineRange, checked: false
    },
    '#combineRange');
let showText: EmitType<CheckBoxChangeEvents>;
let interval: CheckBox = new CheckBox(
        {
            change: showText, checked: false
        },
        '#showText');
let range: EmitType<CheckBoxChangeEvents>;
let showCheckBox: CheckBox = new CheckBox(
{
    change: range, checked: false
},
'#range');
let axisLabel:EmitType<IAxisLabelRenderEventArgs>;
rangeSet.change = combineRange = (e: CheckBoxChangeEvents) => {
    let element: HTMLInputElement = document.getElementById('range') as HTMLInputElement;
    if (e.checked === true) {
        showCheckBox.disabled = true;
        this.circulargauge.axes[0].ranges[0].start = 0;
        this.circulargauge.axes[0].ranges[0].end = 120;
        this.circulargauge.axes[0].ranges[0].startWidth = 5;
        this.circulargauge.axes[0].ranges[0].endWidth = 35;
        this.circulargauge.axes[0].ranges[0].color = 'url(#grad1)';
        this.circulargauge.axes[0].ranges[1].start = null;
        this.circulargauge.axes[0].ranges[1].end = null;
        this.circulargauge.axes[0].ranges[1].startWidth = '';
        this.circulargauge.axes[0].ranges[1].endWidth = '';
        this.circulargauge.axes[0].ranges[1].color = '';
        this.circulargauge.axes[0].ranges[2].start = null;
        this.circulargauge.axes[0].ranges[2].end = null;
        this.circulargauge.axes[0].ranges[2].startWidth = '';
        this.circulargauge.axes[0].ranges[2].endWidth = '';
        this.circulargauge.axes[0].ranges[2].color = '';
        this.circulargauge.axes[0].ranges[3].start = null;
        this.circulargauge.axes[0].ranges[3].end = null;
        this.circulargauge.axes[0].ranges[3].startWidth = '';
        this.circulargauge.axes[0].ranges[3].endWidth = '';
        this.circulargauge.axes[0].ranges[3].color = '';
        this.circulargauge.axes[0].ranges[4].start = null;
        this.circulargauge.axes[0].ranges[4].end = null;
        this.circulargauge.axes[0].ranges[4].startWidth = '';
        this.circulargauge.axes[0].ranges[4].endWidth = '';
        this.circulargauge.axes[0].ranges[4].color = '';
        this.circulargauge.axes[0].ranges[5].start = null;
        this.circulargauge.axes[0].ranges[5].end = null;
        this.circulargauge.axes[0].ranges[5].startWidth = '';
        this.circulargauge.axes[0].ranges[5].endWidth = '';
        this.circulargauge.axes[0].ranges[5].color = '';
        this.circulargauge.axes[0].pointers[0].animation.enable = false;
        this.circulargauge.refresh();
    } else {
        showCheckBox.disabled = false;
        this.circulargauge.axes[0].ranges[0].start = 0;
        this.circulargauge.axes[0].ranges[0].end = 20;
        this.circulargauge.axes[0].ranges[0].startWidth = 5;
        this.circulargauge.axes[0].ranges[0].endWidth = 10;
        this.circulargauge.axes[0].ranges[0].color = '#82b944';
        this.circulargauge.axes[0].ranges[1].start = 20;
        this.circulargauge.axes[0].ranges[1].end = 40;
        this.circulargauge.axes[0].ranges[1].startWidth = 10;
        this.circulargauge.axes[0].ranges[1].endWidth = 15;
        this.circulargauge.axes[0].ranges[1].color = '#a1cb43';
        this.circulargauge.axes[0].ranges[2].start = 40;
        this.circulargauge.axes[0].ranges[2].end = 60;
        this.circulargauge.axes[0].ranges[2].startWidth = 15;
        this.circulargauge.axes[0].ranges[2].endWidth = 20;
        this.circulargauge.axes[0].ranges[2].color = '#ddec12';
        this.circulargauge.axes[0].ranges[3].start = 60;
        this.circulargauge.axes[0].ranges[3].end = 80;
        this.circulargauge.axes[0].ranges[3].startWidth = 20;
        this.circulargauge.axes[0].ranges[3].endWidth = 25;
        this.circulargauge.axes[0].ranges[3].color = '#ffbc00';
        this.circulargauge.axes[0].ranges[4].start = 80;
        this.circulargauge.axes[0].ranges[4].end = 100;
        this.circulargauge.axes[0].ranges[4].startWidth = 25;
        this.circulargauge.axes[0].ranges[4].endWidth = 30;
        this.circulargauge.axes[0].ranges[4].color = '#ff6000';
        this.circulargauge.axes[0].ranges[5].start = 100;
        this.circulargauge.axes[0].ranges[5].end = 120;
        this.circulargauge.axes[0].ranges[5].startWidth = 30;
        this.circulargauge.axes[0].ranges[5].endWidth = 35;
        this.circulargauge.axes[0].ranges[5].color = 'red';
        this.circulargauge.axes[0].pointers[0].animation.enable = false;
        this.circulargauge.refresh();
    }
};
interval.change = showText = (e: CheckBoxChangeEvents) => {
    this.circulargauge.axes[0].pointers[0].animation.enable = false;
    this.circulargauge.refresh();
}
showCheckBox.change = range = (e: CheckBoxChangeEvents) => {
    if (e.checked) {
        this.circulargauge.axes[0].rangeGap = 5;
    } else {
        this.circulargauge.axes[0].rangeGap = null;
    }
    this.circulargauge.axes[0].pointers[0].animation.enable = false;
    this.circulargauge.refresh();
};
}

    constructor() {
        //
    };
}