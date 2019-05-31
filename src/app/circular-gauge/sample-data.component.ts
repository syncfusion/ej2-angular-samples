/**
 * Sample for data sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'control-content',
    templateUrl: 'sample-data.html',
    encapsulation: ViewEncapsulation.None
})
export class SampleDataComponent {
    @ViewChild('gauge1')
    public germany: CircularGaugeComponent;
    @ViewChild('gauge2')
    public usa: CircularGaugeComponent;
    @ViewChild('gauge3')
    public uk: CircularGaugeComponent;
    @ViewChild('grid1')
    public grid: GridComponent;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    public majorTicks: Object = { width: 0 };
    public lineStyle: Object = { width: 0 };
    public minorTicks: Object = { width: 0 };
    //Initializing LabelStyle
    public labelStyle: Object = { font: { size: '0' } };
    //Initializing Annotation
    public annotation1: string = "<div id='templateWrap'><img class='imageStyle' src='./assets/circular-gauge/images/positive.png' />" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation2: string = "<div class='fontDes1'>Germany</div>"
    public annotation3: string = "<div class='fontDes1'>USA</div>"
    public annotation4: string = "<div class='fontDes1'>UK</div>"
    public annotation5: string = "<div id='templateWrap'><img class='imageStyle' src='./assets/circular-gauge/images/negative.png' />" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";


    public germanyAnnotation: Object[] = [{
        content:  "<div id='templateWrap'>"
        +"<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/positive.png' />" 
        + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">Germany</div>',
        angle: 180,
        radius: '65%'
    }];
    public usaAnnotation: Object[] = [{
        content:  "<div id='templateWrap'>"
        +"<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/positive.png' />" 
        + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">USA</div>',
        angle: 180,
        radius: '65%'
    }];
    public ukAnnotation: Object[] = [{
        content:  "<div id='templateWrap'>"
        +"<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/negative.png' />" 
        + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">UK</div>',
        angle: 180,
        radius: '65%'
    }];
    public ranges: Object = [{
        start: 0, end: 50,
        startWidth: 15, endWidth: 15,
        color: '#EC121C'
    }, {
        start: 50, end: 100,
        startWidth: 15, endWidth: 15,
        color: '#45EA0C'
    }];
    public pointers1: Object = [{
        value: 75, radius: '60%',
        animation: { enable: false },
        color: '#777777', pointerWidth: 5,
        cap: {
            radius: 6,
            border: { width: 0 },
            color: '#777777'
        },
        needleTail: {
            length: '25%',
            color: '#777777'
        }
    }];
    public pointers2: Object = [{
        value: 60, radius: '60%',
        animation: { enable: false },
        color: '#777777', pointerWidth: 5,
        cap: {
            radius: 6,
            border: { width: 0 },
            color: '#777777'
        },
        needleTail: {
            length: '25%',
            color: '#777777'
        }
    }];
    public pointers3: Object = [{
        value: 25, radius: '60%',
        animation: { enable: false },
        color: '#777777', pointerWidth: 5,
        cap: {
            radius: 6,
            border: { width: 0 },
            color: '#777777'
        },
        needleTail: {
            length: '25%',
            color: '#777777'
        }
    }];

    public data: Object[] = [];

    public tooltipInterval1: number;

    ngOnInit(): void {
        this.data = [
            {
                'Country': 'Germany',
                'Sales': 500,
                'Target': 400,
                'vsTarget': 300
            }, {
                'Country': 'USA',
                'Sales': 1000,
                'Target': 600,
                'vsTarget': 360
            }, {
                'Country': 'UK',
                'Sales': 600,
                'Target': 700,
                'vsTarget': -100
            }
        ];
    }

    ngAfterViewInit(): void {
        this.tooltipInterval1 = setInterval(
            (): void => {
                if (document.getElementById('sample-data')) {
                    let value1: number = Math.round(Math.random() * (90 - 55) + 55);
                    let value2: number = Math.round(Math.random() * (75 - 60) + 60);
                    let value3: number = Math.round(Math.random() * (40 - 10) + 10);
                    let gridData1: number = 4 * value1;
                    let gridData2: number = 6 * value2;
                    let gridData3: number = 7 * value3;
                    let orderData: Object[] = [
                        {
                            'Country': 'Germany',
                            'Sales': 500,
                            'Target': 400,
                            'vsTarget': gridData1
                        }, {
                            'Country': 'USA',
                            'Sales': 1000,
                            'Target': 600,
                            'vsTarget': gridData2
                        }, {
                            'Country': 'UK',
                            'Sales': 600,
                            'Target': 700,
                            'vsTarget': -gridData3
                        }
                    ];

                    this.grid.dataSource = orderData;
                    this.grid.refresh();

                    this.germany.axes[0].pointers[0].animation.enable = true;
                    this.usa.axes[0].pointers[0].animation.enable = true;
                    this.uk.axes[0].pointers[0].animation.enable = true;
                    this.germany.setPointerValue(0, 0, value1);
                    this.usa.setPointerValue(0, 0, value2);
                    this.uk.setPointerValue(0, 0, value3);
                    this.germany.setAnnotationValue(0, 0, this.germany.axes[0].annotations[0].content);
                    this.usa.setAnnotationValue(0, 0, this.usa.axes[0].annotations[0].content);
                    this.uk.setAnnotationValue(0, 0, this.uk.axes[0].annotations[0].content);
                } else {
                    clearInterval(this.tooltipInterval1);
                }
            },
            2000);
    }
    constructor() {
        // code
    };
}