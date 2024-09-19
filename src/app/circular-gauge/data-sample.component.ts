import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme, CircularGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-circulargauge';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'control-content',
    templateUrl: 'data-sample.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CircularGaugeModule, GridModule],
    providers: [AnnotationsService]
})
export class SampleDataComponent {

    @ViewChild('germanyGauge')
    public germany: CircularGaugeComponent;
    @ViewChild('usaGauge')
    public usa: CircularGaugeComponent;
    @ViewChild('ukGauge')
    public uk: CircularGaugeComponent;
    @ViewChild('dataGrid')
    public grid: GridComponent;

    public data: Object[] = [];
    public tooltipInterval1: number;
    public annotation1: string = "<div id='positiveoneTemplateWrap'><img alt='positive image' class='imageStyle' src='./assets/circular-gauge/images/positive.png' />" +
        "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation2: string = "<div class='fontDes1'>Germany</div>"
    public annotation3: string = "<div class='fontDes1'>USA</div>"
    public annotation4: string = "<div class='fontDes1'>UK</div>"
    public annotation5: string = "<div id='negativeTemplateWrap'><img alt='negative image' class='imageStyle' src='./assets/circular-gauge/images/negative.png' />" +
        "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation6: string = "<div id='positivetwoTemplateWrap'><img alt='positive image' class='imageStyle' src='./assets/circular-gauge/images/positive.png' />" +
        "<div class='fontDes'>${pointers[0].value}%</div></div></div>";

    public load(args: ILoadedEventArgs): void {
        /* custom code start */
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        /* custom code end */
    }

    public majorTicks: Object = {
        width: 0, height: 0
    };

    public lineStyle: Object = {
        width: 0, color: 'transparent'
    };

    public minorTicks: Object = {
        width: 0, height: 0
    };

    public labelStyleOne: Object = {
        position: 'Outside',
        format:'Germany Gauge {value} %',
        font: { size: '0', color: 'transparent' }
    };

    public labelStyleTwo: Object = {
        position: 'Outside',
        format:'USA {value} %',
        font: { size: '0', color: 'transparent' }
    };

    public labelStyleThree: Object = {
        position: 'Outside',
        format:'UK {value} %',
        font: { size: '0', color: 'transparent' }
    };

    public germanyAnnotation: Object[] = [{
        content: "<div id='germanyTemplateWrap'>"
            + "<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/positive.png' />"
            + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">Germany</div>',
        angle: 180,
        radius: '65%'
    }];

    public usaAnnotation: Object[] = [{
        content: "<div id='usaTemplateWrap'>"
            + "<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/positive.png' />"
            + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">USA</div>',
        angle: 180,
        radius: '65%'
    }];

    public ukAnnotation: Object[] = [{
        content: "<div id='ukTemplateWrap'>"
            + "<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/negative.png' />"
            + "<div style='float: right;color: #424242;font-size: 20px;'>${pointers[0].value}%</div></div></div>",
        angle: 180,
        radius: '30%'
    }, {
        content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">UK</div>',
        angle: 180,
        radius: '65%'
    }];

    public ranges: Object = [{
        start: -100, end: 0,
        startWidth: 15, endWidth: 15,
        color: '#EC121C'
    }, {
        start: 0, end: 100,
        startWidth: 15, endWidth: 15,
        color: '#45EA0C'
    }];

    public germanyPointer: Object = [{
        value: 75, radius: '60%',
        color: '#777777',
        animation: { enable: false, duration: 900 },
        pointerWidth: 5,
        cap: {
            radius: 6, color: '#777777',
            border: { width: 0 }
        },
        needleTail: {
            length: '25%', color: '#777777'
        }
    }];

    public usaPointer: Object = [{
        value: 60, radius: '60%',
        animation: { enable: false, duration: 900 },
        pointerWidth: 5,
        cap: {
            radius: 6, color: '#777777',
            border: { width: 0 }
        },
        needleTail: {
            length: '25%', color: '#777777'
        }
    }];

    public ukPointer: Object = [{
        value: 25, radius: '60%', color: '#777777',
        animation: { enable: false, duration: 900 },
        pointerWidth: 5,
        cap: {
            radius: 6, color: '#777777',
            border: { width: 0 }
        },
        needleTail: {
            length: '25%', color: '#777777'
        }
    }];

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
        this.tooltipInterval1 = window.setInterval(
            (): void => {
                if (document.getElementById('sample-data')) {
                    let randomValue: number = Math.random();
                    let value1: number = Math.round((randomValue * 35) + 55);
                    let value2: number = Math.round((randomValue * 15) + 60);
                    let value3: number = Math.round((randomValue * 30) + 10);
                    let gridData1: number = 4 * value1;
                    let gridData2: number = 6 * value2;
                    let gridData3: number = -7 * value3;
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
                            'vsTarget': gridData3
                        }
                    ];

                    this.grid.dataSource = orderData;
                    this.grid.refresh();

                    this.germany.axes[0].pointers[0].animation.enable = true;
                    this.usa.axes[0].pointers[0].animation.enable = true;
                    this.uk.axes[0].pointers[0].animation.enable = true;
                    this.germany.setPointerValue(0, 0, value1);
                    this.usa.setPointerValue(0, 0, value2);
                    this.uk.setPointerValue(0, 0, -value3);
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