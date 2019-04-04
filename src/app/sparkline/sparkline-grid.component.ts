import { Component, OnInit } from '@angular/core';
import { Sparkline } from '@syncfusion/ej2-charts';
import { orderdata } from './spark-data';
/**
 * Sample for axis type in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'sparkline-grid.html'
})
export class SparklineGridSample implements OnInit {
    public lineData: object[] = [
        [0, 6, -4, 1, -3, 2, 5],
        [5, -4, 6, 3, -1, 2, 0],
        [6, 4, 0, 3, -2, 5, 1],
        [4, -6, 3, 0, 1, -2, 5],
        [3, 5, -6, -4, 0, 1, 2],
        [1, -3, 4, -2, 5, 0, 6],
        [2, 4, 0, -3, 5, -6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, -6, 4, 1, -3, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [4, 6, -3, 0, 1, 2, 5],
        [3, -5, -6, 4, 0, 1, 2],
        [1, 3, -4, -2, 5, 0, 6],
        [2, -4, 0, -3, 5, 6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, 6, 4, -1, -3, 2, 5],
        [6, -4, 0, -3, 2, 5, 1],
        [4, 6, -3, 0, -1, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [3, 5, 6, -4, 0, 1, 2],
        [1, 3, -4, 2, -5, 0, 6]
    ];
    public columnData: Object[] = [
        [0, 6, -4, 1, -3, 2, 5],
        [5, -4, 6, 3, -1, 2, 0],
        [6, 4, 0, 3, -2, 5, 1],
        [4, -6, 3, 0, 1, -2, 5],
        [3, 5, -6, -4, 0, 1, 2],
        [1, -3, 4, -2, 5, 0, 6],
        [2, 4, 0, -3, 5, -6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, -6, 4, 1, -3, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [4, 6, -3, 0, 1, 2, 5],
        [3, -5, -6, 4, 0, 1, 2],
        [1, 3, -4, -2, 5, 0, 6],
        [2, -4, 0, -3, 5, 6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, 6, 4, -1, -3, 2, 5],
        [6, -4, 0, -3, 2, 5, 1],
        [4, 6, -3, 0, -1, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [3, 5, 6, -4, 0, 1, 2],
        [1, 3, -4, 2, -5, 0, 6]
    ];
    // tslint:disable
    public griddata: object[] = [];
    public getSparkData(type: string, count: number): number[] {
        if (type === 'line') {
            return this.lineData[count] as number[];
        } else {
            return this.columnData[count] as number[];
        }
    }
    public renderGridSparkline(): void {
        setTimeout(() => {
            for (let i: number = 1; i < 21; i++) {
                let line: Sparkline = new Sparkline({
                    height: '50px',
                    width: '90%',
                    lineWidth: 2,
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    dataSource: this.getSparkData('line', i)
                });
                line.appendTo('#spkline' + i);
                let column: Sparkline = new Sparkline({
                    height: '50px',
                    width: '90%',
                    type: 'Column',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    negativePointColor: '#f7a816',
                    dataSource: this.getSparkData('column', i)
                });
                column.appendTo('#spkarea' + i);
                let winloss: Sparkline = new Sparkline({
                    height: '50px',
                    width: '90%',
                    type: 'WinLoss',
                    valueType: 'Numeric',
                    fill: '#3C78EF',
                    tiePointColor: 'darkgray',
                    negativePointColor: '#f7a816',
                    dataSource: this.getSparkData('column', i)
                });
                winloss.appendTo('#spkwl' + i);
            }
        }, 100);
    }
    ngOnInit() {
        this.griddata = orderdata;
    }
}