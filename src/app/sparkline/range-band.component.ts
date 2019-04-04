import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { products } from './spark-data';
import { SparklineModel, Sparkline} from '@syncfusion/ej2-charts';
import { getInstance } from '@syncfusion/ej2-base';
import {  ChangeEventArgs as CheckBoxChangeEvents} from '@syncfusion/ej2-buttons';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';
/**
 * Sample for axis type in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'range-band.html',
    encapsulation: ViewEncapsulation.None
})
export class SparklineRangebandSample implements OnInit {
    @ViewChild('sparkline')
    @ViewChild('slide')
    public lineData: object[] = [
        [0, 6, 4, 1, 3, 2, 5],
        [5, 4, 6, 3, 1, 2, 0],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [2, 4, 0, 3, 5, 6, 1],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6]
    ];
    // tslint:disable
    public griddata: object[] = [];
    public sparkline: SparklineModel = {
        height: '50px',
        width: '100%',
        lineWidth: 2,
        fill: '#0d3c9b',
        dataSource: this.lineData[0] as Number[],
        rangeBandSettings: [
            {
                startRange: 1, endRange: 3, color: '#bfd4fc'
            }
        ]
    };

    constructor(){
        
        window["sampleInstance"] = this;
        //window["sparkLineData"] = this.lineData;
    }
    
    public renderGridSparkline(): void {
        let that:any = window["sampleInstance"];
        let lineData: object[] = [
            [0, 6, 4, 1, 3, 2, 5],
            [5, 4, 6, 3, 1, 2, 0],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [2, 4, 0, 3, 5, 6, 1],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6]
        ];
        setTimeout(() => {
            for (let i: number = 1; i < 6; i++) {
                let first: Sparkline = new Sparkline(that.sparkline);
                first.dataSource = lineData[i] as number[];
                first.appendTo('#sparkline2010' + i);
                let second: Sparkline = new Sparkline(that.sparkline);
                second.dataSource = lineData[i + 5] as number[];
                second.appendTo('#sparkline2011' + i);
            }
        }, 700);
    }; 
    
    ngOnInit() {
        this.griddata = products;
    }
    public rangeMinChange(e: SliderChangeEventArgs) {
        var slider = document.getElementById('range-min');
        let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
        let value: number = slider1.value as number;
        document.getElementById('slider1').innerHTML = 'Range Band Min <span> ' + (slider1.value as number);
        this.changeRangeMin(value);
    }
    public rangeMaxChange(e: SliderChangeEventArgs) {
        var slider = document.getElementById('range-max');
        let slider2: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
        let value: number = slider2.value as number;
        document.getElementById('slider2').innerHTML = ' Range Band Max <span> ' + (slider2.value as number);
        this.changeRangeMax(value);
    }
    public changeRangeMin: Function = (min: number): void => {
        for (let i: number = 1; i < 6; i++) {
            let first: Sparkline = <Sparkline>document.getElementById('sparkline2010' + i)['ej2_instances'][0]
            let second: Sparkline = <Sparkline>document.getElementById('sparkline2011' + i)['ej2_instances'][0]
            first.rangeBandSettings[0].startRange = min;
            second.rangeBandSettings[0].startRange = min;
            first.refresh();
            second.refresh();
        }
    }
    public changeRangeMax: Function = (max: number): void => {
        for (let i: number = 1; i < 6; i++) {
            let first: Sparkline = <Sparkline>document.getElementById('sparkline2010' + i)['ej2_instances'][0]
            let second: Sparkline = <Sparkline>document.getElementById('sparkline2011' + i)['ej2_instances'][0]
            first.rangeBandSettings[0].endRange = max;
            second.rangeBandSettings[0].endRange = max;
            first.refresh();
            second.refresh();
        }
    }
}
