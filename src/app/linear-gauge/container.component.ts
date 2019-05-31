/**
 * Sample for containers
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { ContainerType, Orientation, ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'container.html',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent {
    @ViewChild('gauge')
    public gauge: LinearGaugeComponent;
    @ViewChild('orientationMode')
    public orientation: DropDownList;
    @ViewChild('containerMode')
    public container: DropDownList;
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    // custom code end
    //Initializing Axes
    public Axes: Object[] = [{
        minimum: 0,
        maximum: 180,
        line: {
            width: 0
        },
        majorTicks: {
            interval: 20,
            color: '#9e9e9e'
        },
        minorTicks: {
            color: '#9e9e9e'
        },
        pointers: [
            {
                value: 90,
                height: 13,
                width: 13,
                roundedCornerRadius: 5,
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
            interval: 20
        },
        opposedPosition: true,
        pointers: [
            {
                width: 0
            }
        ]
    }];

    public Container: Object = {
        width: 13,
        roundedCornerRadius: 5,
        type: 'Thermometer'
    };
    constructor() {
        //code
    };
    ngOnInit(): void {
        this.orientation = new DropDownList({
            index: 0, width: 100,
            change: () => {
                let value: string = this.orientation.value.toString();
                this.gauge.orientation = <Orientation>value;
                this.gauge.refresh();
            }
        });
        this.orientation.appendTo('#orientationMode');
        this.container = new DropDownList({
            index: 0, width: 100,
            change: () => {
                let value: string = this.container.value.toString();
                this.gauge.container.type = <ContainerType>value;
                this.gauge.refresh();
            }
        });
        this.container.appendTo('#containerMode');
    }
}

