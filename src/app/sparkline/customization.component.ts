import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Sparkline, VisibleType } from '@syncfusion/ej2-charts';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
/**
 * Sample for axis type in Sparkline 
 */
// tslint:disable
@Component({
    selector: 'control-content',
    templateUrl: 'customization.html',
    encapsulation: ViewEncapsulation.None
})
export class SparklineCustomizationSample {
    public percentageData: object[] = [
        { x: 0, xval: 'AUDI', yval: 1 },
        { x: 1, xval: 'BMW', yval: 5 },
        { x: 2, xval: 'BUICK', yval: -1 },
        { x: 3, xval: 'CETROEN', yval: -6 },
        { x: 4, xval: 'CHEVROLET', yval: 0 },
        { x: 5, xval: 'FIAT', yval: 1 },
        { x: 6, xval: 'FORD', yval: -2 },
        { x: 7, xval: 'HONDA', yval: 7 },
        { x: 8, xval: 'HYUNDAI', yval: -9 },
        { x: 9, xval: 'JEEP', yval: 0 },
        { x: 10, xval: 'KIA', yval: -10 },
        { x: 11, xval: 'MAZDA', yval: 3 },
        { x: 12, xval: 'MERCEDES', yval: 13 },
        { x: 13, xval: 'NISSAN', yval: 5 },
        { x: 14, xval: 'OPEL/VHALL', yval: -6 },
        { x: 15, xval: 'PEUGEOT', yval: 0 },
        { x: 16, xval: 'RENAULT', yval: 7 },
        { x: 17, xval: 'SKODA', yval: 5 },
        { x: 18, xval: 'SUBARU', yval: 5 },
        { x: 19, xval: 'SUZUKI', yval: 11 },
        { x: 20, xval: 'TOYOTA', yval: 5 },
        { x: 21, xval: 'VOLKSWAGEN', yval: 3 },
    ];
    public peraxisSettings: object = {
        lineSettings: {
            color: 'red',
            width: 2
        }
    };
    public permarkerSettings: object = {
        fill: 'red',
        size: 5
    };
    public pertooltipSettings: object = {
        format: '${xval}: ${yval}',
        trackLineSettings: {
            color: 'red',
            width: 1
        }
    };
    public salData: object[] = [
        { x: 0, xval: 'AUDI', yval: 1847613 },
        { x: 1, xval: 'BMW', yval: 2030331 },
        { x: 2, xval: 'BUICK', yval: 1465823 },
        { x: 3, xval: 'CETROEN', yval: 999888 },
        { x: 4, xval: 'CHEVROLET', yval: 3857388 },
        { x: 5, xval: 'FIAT', yval: 1503806 },
        { x: 6, xval: 'FORD', yval: 5953122 },
        { x: 7, xval: 'HONDA', yval: 4967689 },
        { x: 8, xval: 'HYUNDAI', yval: 3951176 },
        { x: 9, xval: 'JEEP', yval: 1390130 },
        { x: 10, xval: 'KIA', yval: 2511293 },
        { x: 11, xval: 'MAZDA', yval: 1495557 },
        { x: 12, xval: 'MERCEDES', yval: 2834181 },
        { x: 13, xval: 'NISSAN', yval: 4834694 },
        { x: 14, xval: 'OPEL/VHALL', yval: 996559 },
        { x: 15, xval: 'PEUGEOT', yval: 1590300 },
        { x: 16, xval: 'RENAULT', yval: 2275227 },
        { x: 17, xval: 'SKODA', yval: 1180672 },
        { x: 18, xval: 'SUBARU', yval: 1050390 },
        { x: 19, xval: 'SUZUKI', yval: 2891415 },
        { x: 20, xval: 'TOYOTA', yval: 7843423 },
        { x: 21, xval: 'VOLKSWAGEN', yval: 6639250 },
    ];
    public salaxisSettings: object = {
        lineSettings: {
            color: 'red',
            width: 2
        }
    };
    public salmarkerSettings: object = {
        fill: 'red',
        size: 5
    };
    public saltooltipSettings: object = {
        format: '${xval}: ${yval}',
        trackLineSettings: {
            color: 'red',
            width: 1
        }
    };
    public value: number = 0;
     data: string[] = [
        'Sales Percentage',
        'Sales Count',
    ]
    public mode: DropDownList;
    ngOnInit(): void {
        this.mode = new DropDownList({
            index: 0,
            width: 120,
            dataSource: [
                'Sales Percentage',
                'Sales Count',
            ],
            
            change: (e: ChangeEventArgs) => {
                
                this.onchange(e);
            }
        });
        this.mode.appendTo('#spark');
    }
    @ViewChild('percentage')
    public percentage: Sparkline;
    @ViewChild('sales')
    public sales: Sparkline;
    @ViewChild('slide')
    public slide: Slider;
    // tslint:disable-next-line:max-func-body-length
    public onchange = (element1: ChangeEventArgs) => {
        if (element1.value === 'Sales Percentage') {
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            slider1.max = 10;
            slider1.value = 0;
        } else {          
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            slider1.max = 5000000;
            slider1.value = 0;
        }
        if ((element1.value === 'Sales Percentage' && this.percentage.markerSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.markerSettings.visible.length)) {
            (document.getElementById('marker') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('marker') as HTMLInputElement).checked = false;
        }
        document.getElementById('marker').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.markerSettings.visible = this.getVisible();
            } else {
                spark.markerSettings.visible = [];
            }
            spark.refresh();
        };
        if ((element1.value === 'Sales Percentage' && this.percentage.dataLabelSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.dataLabelSettings.visible.length)) {
            (document.getElementById('datalabel') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('datalabel') as HTMLInputElement).checked = false;
        }
        
        let all: HTMLInputElement = document.getElementById('all') as HTMLInputElement;
        let negative: HTMLInputElement = document.getElementById('negative') as HTMLInputElement;
        let first: HTMLInputElement = document.getElementById('first') as HTMLInputElement;
        let last: HTMLInputElement = document.getElementById('last') as HTMLInputElement;
        let high: HTMLInputElement = document.getElementById('high') as HTMLInputElement;
        let low: HTMLInputElement = document.getElementById('low') as HTMLInputElement;
        let label: HTMLInputElement = document.getElementById('datalabel') as HTMLInputElement;
        let marker: HTMLInputElement = document.getElementById('marker') as HTMLInputElement;
        if (!marker.checked && !label.checked) {
            all.checked = true;
            negative.checked = false;
            first.checked = false;
            last.checked = false;
            high.checked = false;
            low.checked = false;
        }
        if (marker.checked) {
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark.markerSettings.visible.indexOf('All') > -1;
            negative.checked = spark.markerSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.markerSettings.visible.indexOf('Start') > -1;
            last.checked = spark.markerSettings.visible.indexOf('End') > -1;
            high.checked = spark.markerSettings.visible.indexOf('High') > -1;
            low.checked = spark.markerSettings.visible.indexOf('Low') > -1;
        }
        if (label.checked) {
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark.dataLabelSettings.visible.indexOf('All') > -1;
            negative.checked = spark.dataLabelSettings.visible.indexOf('Negative') > -1;
            first.checked = spark.dataLabelSettings.visible.indexOf('Start') > -1;
            last.checked = spark.dataLabelSettings.visible.indexOf('End') > -1;
            high.checked = spark.dataLabelSettings.visible.indexOf('High') > -1;
            low.checked = spark.dataLabelSettings.visible.indexOf('Low') > -1;
        }
        document.getElementById('datalabel').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.dataLabelSettings.visible = this.getVisible();
            } else {
                spark.dataLabelSettings.visible = [];
            }
            spark.refresh();
        };
        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.visible === true)) {
            (document.getElementById('tooltip') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('tooltip') as HTMLInputElement).checked = false;
        }
        document.getElementById('tooltip').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.tooltipSettings.visible = true;
            } else {
                spark.tooltipSettings.visible = false;
            }
            spark.refresh();
        };
        if ((element1.value === 'Sales Percentage' && this.percentage.enableRtl === true) ||
            (element1.value === 'Sales Count' && this.sales.enableRtl === true)) {
            (document.getElementById('enableRTL') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('enableRTL') as HTMLInputElement).checked = false;
        }
        document.getElementById('enableRTL').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.enableRtl = true;
            } else {
                spark.enableRtl = false;
            }
            spark.refresh();
        };
        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.trackLineSettings.visible === true)) {
            (document.getElementById('trackline') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('trackline') as HTMLInputElement).checked = false;
        }
        document.getElementById('trackline').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.tooltipSettings.trackLineSettings.visible = true;
            } else {
                spark.tooltipSettings.trackLineSettings.visible = false;
            }
            spark.refresh();
        };
        if ((element1.value === 'Sales Percentage' && this.percentage.axisSettings.lineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.axisSettings.lineSettings.visible === true)) {
            (document.getElementById('axis1') as HTMLInputElement).checked = true;
        } else {
            (document.getElementById('axis1') as HTMLInputElement).checked = false;
        }
        document.getElementById('axis1').onchange = (e: Event) => {
            let boolean: boolean = (e.target as HTMLInputElement).checked;
            let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            if (boolean) {
                spark.axisSettings.lineSettings.visible = true;
            } else {
                spark.axisSettings.lineSettings.visible = false;
            }
            spark.refresh();
        };
        if (element1.value === 'Sales Percentage' && this.percentage.axisSettings.value !== 0) {
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            slider1.max = 10;
            slider1.value = slider1.value;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + slider1.value;
        }
        if (element1.value === 'Sales Count' && this.sales.axisSettings.value !== 0) {
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            slider1.max = 5000000;
            slider1.value = slider1.value;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + slider1.value;
        }
        document.getElementById('axis').onpointermove = document.getElementById('axis').ontouchmove =
            document.getElementById('axis').onchange = (e: Event) => {
                let slider: Element = document.getElementById('axis');
                let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0]; 
                let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
                spark.axisSettings.value = slider1.value as number;
                document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + slider1.value;
                spark.refresh();
            };
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        if (element.value === 'Sales Percentage') {
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            let max = slider1.max = 10;
        } else {
            let slider: Element = document.getElementById('axis');
            let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
            slider1.min = 0;
            let max = slider1.max = 5000000;
        }
        
    }
    public onchangeAll = (e: CheckBoxChangeEvents) => {
        let negative: HTMLInputElement = document.getElementById('negative') as HTMLInputElement;
        let first: HTMLInputElement = document.getElementById('first') as HTMLInputElement;
        let last: HTMLInputElement = document.getElementById('last') as HTMLInputElement;
        let high: HTMLInputElement = document.getElementById('high') as HTMLInputElement;
        let low: HTMLInputElement = document.getElementById('low') as HTMLInputElement;
        let checked: boolean = e.checked;
        negative.disabled = checked;
        first.disabled = checked;
        last.disabled = checked;
        high.disabled = checked;
        low.disabled = checked;
        let marker: HTMLInputElement = document.getElementById('marker') as HTMLInputElement;
        let label: HTMLInputElement = document.getElementById('datalabel') as HTMLInputElement;
        let element1: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let spark: Sparkline = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.markerSettings.visible = (checked && marker.checked) ? ['All'] : (marker.checked) ? this.getVisible() : [];
        spark.dataLabelSettings.visible = (checked && label.checked) ? ['All'] : (label.checked) ? this.getVisible() : [];
        spark.refresh();
    }
    public onchangeOthers = (e: CheckBoxChangeEvents) => {
        this.processMarkerLabel(e);
    }
    public processMarkerLabel(e: CheckBoxChangeEvents): void {
        let marker: HTMLInputElement = document.getElementById('marker') as HTMLInputElement;
        let label: HTMLInputElement = document.getElementById('datalabel') as HTMLInputElement;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let spark: Sparkline = element.value === 'Sales Percentage' ? this.percentage : this.sales;
        if (marker.checked) {
            spark.markerSettings.visible = this.getVisible() as VisibleType[];
            spark.refresh();
        }
        if (label.checked) {
            spark.dataLabelSettings.visible = this.getVisible() as VisibleType[];
            spark.refresh();
        }
    }
    public getVisible(): VisibleType[] {
        let all: HTMLInputElement = document.getElementById('all') as HTMLInputElement;
        let negative: HTMLInputElement = document.getElementById('negative') as HTMLInputElement;
        let first: HTMLInputElement = document.getElementById('first') as HTMLInputElement;
        let last: HTMLInputElement = document.getElementById('last') as HTMLInputElement;
        let high: HTMLInputElement = document.getElementById('high') as HTMLInputElement;
        let low: HTMLInputElement = document.getElementById('low') as HTMLInputElement;
        let visible: VisibleType[] = [];
        if (all.checked) { return ['All']; }
        if (negative.checked) { visible.push('Negative'); }
        if (first.checked) { visible.push('Start'); }
        if (last.checked) { visible.push('End'); }
        if (high.checked) { visible.push('High'); }
        if (low.checked) { visible.push('Low'); }
        return visible;
    };
    public onchangeMarker = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
       let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
       <Sparkline>document.getElementById('sales1')['ej2_instances'][0]; 
       if (true) {
            sparks.markerSettings.visible = this.getVisible();
        } 
        sparks.refresh();
    };
    public onchangeDatalabel = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
       <Sparkline>document.getElementById('sales1')['ej2_instances'][0];
        if (true) {
            sparks.dataLabelSettings.visible = this.getVisible();
        }
        sparks.refresh();
    };
    public onchangeTooltip = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
       <Sparkline>document.getElementById('sales1')['ej2_instances'][0];
        sparks.tooltipSettings.visible = true;
        sparks.tooltipSettings.format = '${xval}: ${yval}';
        sparks.refresh();
    };
    public onchangeTrackline = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
       <Sparkline>document.getElementById('sales1')['ej2_instances'][0];
        sparks.tooltipSettings.trackLineSettings.visible = true;
        sparks.tooltipSettings.trackLineSettings.color = 'red';
        sparks.tooltipSettings.trackLineSettings.width = 1;
        sparks.refresh();
    }
    public onchangeline = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
        <Sparkline>document.getElementById('sales1')['ej2_instances'][0];
        sparks.axisSettings.lineSettings.visible = true;
            sparks.axisSettings.lineSettings.color = 'red';
            sparks.axisSettings.lineSettings.width = 2;
        
        sparks.refresh();
    }
    public onchangeAxis = (e: SliderChangeEventArgs) => {
        let slider: Element = document.getElementById('axis');
        let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let spark: Sparkline = element.value === 'Sales Percentage' ? this.percentage : this.sales;
        slider1.max = (element.value === 'Sales Percentage') ? 10 : 5000000 
        spark.axisSettings.value = slider1.value as number;
        document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + slider1.value;
        spark.refresh();
    }
    public onshowLastLabel = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('spark'));
        let sparks: Sparkline  = (element.value === 'Sales Percentage') ? <Sparkline>document.getElementById('percentage1')['ej2_instances'][0] :
       <Sparkline>document.getElementById('sales1')['ej2_instances'][0];
        sparks.enableRtl = (<HTMLInputElement>document.getElementById('enableRTL')).checked;
        sparks.refresh();
    };
    
}