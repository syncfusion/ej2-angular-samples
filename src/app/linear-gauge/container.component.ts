import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ContainerType, Orientation, ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'container.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class ContainerComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    public orientation: DropDownList;
    public container: DropDownList;

    public axes: Object[] = [{
        minimum: 0,
        maximum: 180,
        line: {
            width: 0
        },
        majorTicks: {
            interval: 20, color: '#9e9e9e', height: 20
        },
        minorTicks: {
            color: '#9e9e9e', height: 10, interval: 10
        },
        labelStyle: {
            font: { fontFamily: 'inherit' }
        },
        pointers: [
            {
                value: 90,
                height: 13,
                width: 13,
                type: 'Bar',
                color: '#f02828'
            }
        ]
    },
    {
        minimum: 0,
        maximum: 180,
        line: {
            width: 0
        },
        majorTicks: {
            interval: 20, height: 20, color: '#9e9e9e'
        },
        minorTicks: {
            height: 10, interval: 10, color: '#9e9e9e'
        },
        opposedPosition: true,
        labelStyle: {
            font: { fontFamily: 'inherit' }
        },
        pointers: [
            {
                width: 0
            }
        ]
    }];

    public containerType: Object = {
        width: 13,
        roundedCornerRadius: 5,
        type: 'Thermometer'
    };

    public titleStyle: Object = {
        fontFamily: 'inherit'
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }

    ngOnInit(): void {
        this.orientation = new DropDownList({
            index: 0, width: '110%',
            change: () => {
                let value: string = this.orientation.value.toString();
                this.gauge.orientation = <Orientation>value;
                this.gauge.refresh();
            }
        });
        this.orientation.appendTo('#orientationMode');
        this.container = new DropDownList({
            index: 0, width: '110%',
            change: () => {
                let value: string = this.container.value.toString();
                this.gauge.container.type = <ContainerType>value;
                this.gauge.refresh();
            }
        });
        this.container.appendTo('#containerMode');
    }

    constructor() {
        //code
    };
}

