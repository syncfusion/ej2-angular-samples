import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-ng-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
/**
 * Sample for update
 */
@Component({
    selector: 'control-content',
    templateUrl: 'update.html',
    encapsulation: ViewEncapsulation.None
})

export class UpdateComponent {
    @ViewChild('updateGauge')
    public updateGauge: LinearGaugeComponent;
    public toolTipInterval: number;
    private element: HTMLElement = document.getElementById('updateGauge');
    //Initializing Container
    public Container: Object = {
        height: 350,
        width: 20,
        offset: -85,
        backgroundColor: '#d6d1d1'
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    //Initializing Annotation
    public Annotation: Object[] = [
        {
            content: '<div id="systolic" style="width:200px;color:#808080"><h1 style="font-size:13px">Systolic:-</h1></div>',
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center',
            x: 190,
            y: -40,
        },
        {
            content: '<div id="diastolic" style="width:200px;color:#808080"><h1 style="font-size:13px">Diastolic:-</h1></div>',
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center',
            x: 190
        },
        {
            content: '<div id="pulse" style="width:200px;color:#808080"><h1 style="font-size:13px">Pulse:-</h1></div>',
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center',
            x: 190,
            y: 40
        },
        {
            content: '<div id="pressure" style="width:300px;color:#808080"><h1 style="font-size:14px;font-weight:Bold;">Blood Pressure Measure</h1></div>',
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center',
            x: 203,
            y: -80
        },
        {
            content: '<div id="frame1"><img style="height:25px;width:25px;"'
            + 'src="src/lineargauge/images/diastolic.jpg" /></div>',
            verticalAlignment: 'Center',
            horizontalAlignment: 'Center',
            x: 60,
            y: -33,
        },
        {
            content: '<div id="frame2"><img style="height:25px;width:25px;"'
            + 'src="src/lineargauge/images/systolic.jpg" /></div>',
            verticalAlignment: 'Center',
            horizontalAlignment: 'Center',
            x: 60,
            y: 5
        },
        {
            content: '<div id="frame3"><img style="height:25px;width:25px;"'
            + 'src="src/lineargauge/images/Heart-ECG.png" /></div>',
            verticalAlignment: 'Center',
            horizontalAlignment: 'Center',
            x: 60,
            y: 45
        },
        {
            content: '<div id="frame"><img style="height:410px;width:200px;opacity:0.5;"'
            + 'src="src/lineargauge/images/thermo-light_03.png" /></div>',
            verticalAlignment: 'Center',
            horizontalAlignment: 'Center',
            x: -95
        },
        {
            content: '<div id="border"><div style="border:1px solid;width:210px;height:170px"></div></div>',
            verticalAlignment: 'Near',
            horizontalAlignment: 'Center',
            x: 130,
            y: 130
        }
    ];
    public Major1: Object = {
        interval: 20
    };
    public Minor1: Object = {
        interval: 4
    };
    public Label1: Object = {
        font: {
            color: '#000000'
        }
    };
    public Pointer1: Object[] = [
        {
            value: 0,
            type: 'Bar',
            width: 20,
            color: '#ff1919'
        }
    ];
    public Line2: Object = {
        height: 320
    };
    public Major2: Object = {
        interval: 20
    };
    public Minor2: Object = {
        interval: 4
    };
    public Label2: Object = {
        font: {
            color: '#000000'
        }
    };
    public Pointer2: Object[] = [
        {
            width: 0
        }
    ];
    public value: number;
    public frame1Display: string;
    public frame2Display: string;
    public frame3Display: string;
    public frame4Display: string;
    constructor() {
        // code
    };

    ngAfterViewInit(): void {
        document.getElementById('check').onclick = () => {
            let check: HTMLButtonElement = <HTMLButtonElement>document.getElementById('check');
            let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('reset');
            check.disabled = true;
            reset.disabled = true;
            this.pressureStart(reset);
        };
        document.getElementById('reset').onclick = () => {
            let check: HTMLButtonElement = <HTMLButtonElement>document.getElementById('check');
            let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('reset');
            reset.disabled = true;
            check.disabled = true;
            this.pressureEnd(check);
        };
    }

    private getRandom(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public pressureStart(element: HTMLButtonElement): void {
        let colors: string[] = ['#66ff66', '#ffff00', '#ff0000'];
        let target: number = Math.round(this.getRandom(100, 140));
        let addition: number = (target + 80);
        let pressure: number = 0;
        let toolTipInterval: number;
        let increase: boolean = true;
        let measureValues: number[] = [40, 80];
        let wait: boolean = false;
        let speed: number = 0.1; let setAnnotation: boolean = false;
        let startTime: number = 0; let drawn: boolean = true;
        let timeStamp: number; let process: boolean = true;
        this.toolTipInterval = setInterval(
            (): void => {
                if (document.getElementById('updateGauge')) {
                    pressure = increase ? (pressure + 0.2) : (pressure - 0.2);
                    if (!wait && increase && pressure > 0 && pressure < target) {
                        measureValues.map((val: number) => {
                            timeStamp = 50;
                            if (val === Math.round(pressure)) {
                                wait = true;
                                startTime = 0;
                            }
                        });
                    } else if (Math.round(pressure) === addition) {
                        increase = false;
                    } else if (!increase && Math.round(pressure) === target) {
                        this.value = pressure;
                        setAnnotation = true;
                        element.disabled = false;
                        clearInterval(this.toolTipInterval);
                    }
                    if (wait) {
                        startTime += 1;
                        if (startTime > timeStamp) {
                            process = true;
                        } else {
                            process = false;
                        }
                    }
                    if (process) {
                        wait = false;
                        startTime = 0;
                        process = true;
                        this.updateGauge.setPointerValue(0, 0, pressure);
                    }
                    if (setAnnotation) {
                        let systolicValue: number = Math.round(pressure);
                        let diastolicValue: number = Math.round((pressure - 40));
                        let pulse: number = Math.round(this.getRandom(65, 80));
                        let content1: string = '<div id="systolic" style="width:200px;color:#808080"><h1 style="font-size:13px">Systolic: '
                            + systolicValue + ' mmHg</h1></div>';
                        let content2: string = '<div id="diastolic" style="width:200px;color:#808080"><h1 style="font-size:13px">' +
                            'Diastolic: ' + diastolicValue + ' mmHg</h1></div>';
                        let content3: string = '<div id="pulse" style="width:200px;color:#808080"><h1 style="font-size:13px">Pulse: '
                            + pulse + '</h1></div>';
                        let first: string = '<div id="pressure" style="width:300px;color:#808080">';
                        let second: string = '<h1 style="font-size:14px;font-weight:Bold;">Blood Pressure Measure</h1></div>';
                        let content4: string = first + second;
                        this.updateGauge.setAnnotationValue(0, content1);
                        this.updateGauge.setAnnotationValue(1, content2);
                        this.updateGauge.setAnnotationValue(2, content3);
                    }
                } else {
                    clearInterval(toolTipInterval);
                }
            },
            speed);
    }



    public pressureEnd(element: HTMLButtonElement): void {
        let target: number = 120;
        let pressure: number = 0;
        let toolTipInterval: number;
        let speed: number = 0.1;
        pressure = this.value;
        this.toolTipInterval = setInterval(
            (): void => {
                if (document.getElementById('updateGauge')) {
                    pressure = (pressure - 0.4);
                    this.updateGauge.setPointerValue(0, 0, pressure);
                    let content1: string = '<div id="systolic" style="width:200px;color:#808080"><h1 style="font-size:13px">Systolic:-</h1></div>';
                    let content2: string = '<div id="diastolic" style="width:200px;color:#808080"><h1 style="font-size:13px">Diastolic:-</h1></div>';
                    let content3: string = '<div id="pulse" style="width:200px;color:#808080"><h1 style="font-size:13px">Pulse:-</h1></div>';
                    let first: string = '<div id="pressure" style="width:300px;color:#808080">';
                    let second: string = '<h1 style="font-size:14px;font-weight:Bold;"></h1></div>';
                    let content4: string = first + second;
                    this.updateGauge.setAnnotationValue(0, content1);
                    this.updateGauge.setAnnotationValue(1, content2);
                    this.updateGauge.setAnnotationValue(2, content3);
                    if (Math.round(pressure) === 0) {
                        element.disabled = false;
                        clearInterval(toolTipInterval);
                    }
                } else {
                    clearInterval(toolTipInterval);
                }
            },
            speed);
    }
}