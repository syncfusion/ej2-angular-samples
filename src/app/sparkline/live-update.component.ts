import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Sparkline, ISparklineLoadEventArgs } from '@syncfusion/ej2-charts';
/**
 * Sample for axis type in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'live-update.html',
    encapsulation: ViewEncapsulation.None
})
export class SparkineLiveUpdateSample {
    @ViewChild('cpuspark')
    public cpuspark: Sparkline;
    @ViewChild('memspark')
    public memspark: Sparkline;
    @ViewChild('diskspark')
    public diskspark: Sparkline;
    @ViewChild('netspark')
    public netspark: Sparkline;

    public cpuaxisSettings: object = {
        minY: 0, maxY: 150
    };
    public cpucontainerArea: object = {
        background: 'white',
        border: {
            color: '#dcdfe0',
            width: 2
        }
    };
    public cpuborder: object = {
        color: '#0358a0',
        width: 1
    };
    public cpuData: object[] = [
        { x: 0, yval: 50 },
        { x: 1, yval: 30 },
        { x: 2, yval: 20 },
        { x: 3, yval: 30 },
        { x: 4, yval: 50 },
        { x: 5, yval: 40 },
        { x: 6, yval: 20 },
        { x: 7, yval: 10 },
        { x: 8, yval: 30 },
        { x: 9, yval: 10 },
        { x: 10, yval: 40 },
        { x: 11, yval: 50 },
        { x: 12, yval: 10 },
        { x: 13, yval: 30 },
        { x: 14, yval: 50 },
        { x: 15, yval: 20 },
        { x: 16, yval: 10 },
        { x: 17, yval: 40 },
        { x: 18, yval: 30 },
        { x: 19, yval: 40 }
    ];
    public memaxisSettings: object = {
        minY: 4, maxY: 8
    };
    public memcontainerArea: object = {
        background: 'white',
        border: {
            color: '#dcdfe0',
            width: 2
        }
    };
    public memborder: object = {
        color: '#b247c6',
        width: 1
    };
    public memData: object[] = [
        { x: 0, yval: 6.05 },
        { x: 1, yval: 6.03 },
        { x: 2, yval: 6.02 },
        { x: 3, yval: 6.07 },
        { x: 4, yval: 6.05 },
        { x: 5, yval: 6.09 },
        { x: 6, yval: 6.08 },
        { x: 7, yval: 6.01 },
        { x: 8, yval: 6.03 },
        { x: 9, yval: 6.01 },
        { x: 10, yval: 6.07 },
        { x: 11, yval: 6.05 },
        { x: 12, yval: 6.01 },
        { x: 13, yval: 6.06 },
        { x: 14, yval: 6.05 },
        { x: 15, yval: 6.03 },
        { x: 16, yval: 6.01 },
        { x: 17, yval: 6.09 },
        { x: 18, yval: 6.06 },
        { x: 19, yval: 6.05 }
    ];
    public diskaxisSettings: object = {
        minY: 0, maxY: 100
    };
    public diskcontainerArea: object = {
        background: 'white',
        border: {
            color: '#dcdfe0',
            width: 2
        }
    };
    public diskborder: object = {
        color: '#27ad66',
        width: 1
    };
    public diskData: object[] = [
        { x: 0, yval: 50 },
        { x: 1, yval: 30 },
        { x: 2, yval: 20 },
        { x: 3, yval: 70 },
        { x: 4, yval: 50 },
        { x: 5, yval: 20 },
        { x: 6, yval: 80 },
        { x: 7, yval: 10 },
        { x: 8, yval: 30 },
        { x: 9, yval: 10 },
        { x: 10, yval: 70 },
        { x: 11, yval: 50 },
        { x: 12, yval: 10 },
        { x: 13, yval: 60 },
        { x: 14, yval: 50 },
        { x: 15, yval: 30 },
        { x: 16, yval: 10 },
        { x: 17, yval: 20 },
        { x: 18, yval: 60 },
        { x: 19, yval: 50 }
    ];
    public netaxisSettings: object = {
        minY: 0, maxY: 100
    };
    public netcontainerArea: object = {
        background: 'white',
        border: {
            color: '#dcdfe0',
            width: 2
        }
    };
    public netborder: object = {
        color: '#AA907A',
        width: 1
    };
    public netData: object[] = [
        { x: 0, yval: 50 },
        { x: 1, yval: 30 },
        { x: 2, yval: 20 },
        { x: 3, yval: 70 },
        { x: 4, yval: 50 },
        { x: 5, yval: 20 },
        { x: 6, yval: 80 },
        { x: 7, yval: 10 },
        { x: 8, yval: 30 },
        { x: 9, yval: 10 },
        { x: 10, yval: 70 },
        { x: 11, yval: 50 },
        { x: 12, yval: 10 },
        { x: 13, yval: 60 },
        { x: 14, yval: 50 },
        { x: 15, yval: 30 },
        { x: 16, yval: 10 },
        { x: 17, yval: 20 },
        { x: 18, yval: 60 },
        { x: 19, yval: 50 }
    ];
    public temp1: number = this.cpuData.length - 1;
    public temp2: number = this.memData.length - 1;
    public temp3: number = this.diskData.length - 1;
    public temp4: number = this.netData.length - 1;
    public time1: number;
    public time2: number;
    public time3: number;
    public time4: number;
    public update(): void {
        if (this.cpuspark.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 50;
            this.cpuspark.dataSource.push({ x: ++this.temp1, yval: value });
            this.cpuspark.dataSource.shift();
            this.cpuspark.refresh();
            let cpu: Element = document.getElementById('cpu');
            if (cpu) {
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
            }
        }
    }
    public update1(): void {
        if (this.memspark.element.className.indexOf('e-sparkline') > -1) {
            let value: number = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            } else {
                value = 6 - (value / 10);
            }
            this.memspark.dataSource.push({ x: ++this.temp2, yval: value });
            this.memspark.dataSource.shift();
            this.memspark.refresh();
            let memory: Element = document.getElementById('memory');
            let gb: string = parseFloat(value.toString().replace('0', '')).toFixed(1);
            if (memory) {
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
            }
        }
    }
    public update2(): void {
        if (this.diskspark.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            this.diskspark.dataSource.push({ x: ++this.temp3, yval: value });
            this.diskspark.dataSource.shift();
            this.diskspark.refresh();
            let disk: Element = document.getElementById('disk');
            if (disk) {
            disk.innerHTML = value.toFixed(0) + '%';
            }
        }
    }
    public update3(): void {
        if (this.netspark.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            this.netspark.dataSource.push({ x: ++this.temp4, yval: value });
            this.netspark.dataSource.shift();
            this.netspark.refresh();
            let net: Element = document.getElementById('net');
            if (net) {
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
            }
        }
    }
    constructor() {
        // live update
    }
    public cpuloaded(args: ISparklineLoadEventArgs): void {
        clearInterval(this.time1);
        this.time1 = setInterval(this.update.bind(this), 1000);
    }
    public memloaded(args: ISparklineLoadEventArgs): void {
        clearInterval(this.time2);
        this.time2 = setInterval(this.update1.bind(this), 1000);
    }
    public diskloaded(args: ISparklineLoadEventArgs): void {
        clearInterval(this.time3);
        this.time3 = setInterval(this.update2.bind(this), 1000);
    }
    public netloaded(args: ISparklineLoadEventArgs): void {
        clearInterval(this.time4);
        this.time4 = setInterval(this.update3.bind(this), 1000);
    }
}