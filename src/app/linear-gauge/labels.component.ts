import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class LabelsComponent {
    @ViewChild('customLabels')
    public customLabels: LinearGaugeComponent;
    @ViewChild('textLabels')
    public textLabels: LinearGaugeComponent;
    @ViewChild('labelOffset')
    public labelOffset: LinearGaugeComponent;
    @ViewChild('labelCustomization')
    public labelCustomization: LinearGaugeComponent;
    public customLabelAxes: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 0,
        }],
        majorTicks: {
            interval: 5, height: 7, width: 1
        },
        minorTicks: {
            interval: 2.5, height: 3
        },
        minimum: 5,
        maximum: 20,
        opposedPosition: true,
        labelStyle: { format: '${value}', font: { fontFamily: 'inherit' } }
    }];

    public textLabelAxes: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 15,
            height: 15,
            value: 20,
            color: '#0DC9AB',
            placement: 'Near',
            markerType: 'Circle',
            offset: 7
        }, {
            width: 15,
            height: 15,
            value: 15,
            color: '#0DC9AB',
            placement: 'Near',
            markerType: 'Circle',
            offset: 7
        },
        {
            width: 15,
            height: 15,
            value: 10,
            color: '#0DC9AB',
            placement: 'Near',
            markerType: 'Circle',
            offset: 7
        },
        {
            width: 15,
            height: 15,
            value: 5,
            color: '#E5E7EB',
            placement: 'Near',
            markerType: 'Circle',
            offset: 7
        }
        ],
        ranges: [{
            start: 10,
            end: 15,
            startWidth: 5,
            endWidth: 5,
            color: '#0DC9AB'
        },
        {
            start: 15,
            end: 20,
            startWidth: 5,
            endWidth: 5,
            color: '#0DC9AB'
        }
        ],
        majorTicks: {
            interval: 5, height: 0
        },
        minorTicks: {
            interval: 2.5, height: 0
        },
        minimum: 5,
        maximum: 20,
        opposedPosition: true,
        labelStyle: { offset: 10, font: { fontFamily: 'inherit' } }
    }];

    public labelOffsetAxes: Object[] = [{
        line: {
            width: 5
        },
        pointers: [
            {
                width: 0,
            }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        labelStyle: { offset: 5, font: { fontFamily: 'inherit' } }
    }];

    public labelCustomizationAxes: Object = [{
        line: {
            width: 5
        },
        majorTicks: {
            interval: 20,
            height: 7,
            width: 1
        },
        minorTicks: {
            interval: 10,
            height: 3
        },
        labelStyle: {
            font: { fontFamily: 'inherit', color: '#F93106' }
        },
        pointers: [
            {
                width: 0
            }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true
    }];

    public titleStyle: Object = {
        fontFamily: 'inherit', fontWeight: 'normal'
    };

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
        if (args.gauge.element.id === 'textLabels') {
            if (args.gauge.theme === 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
                args.gauge.axes[0].pointers[3].color  = '#292827';
            } else if (args.gauge.theme === 'Bootstrap5Dark'){
                args.gauge.axes[0].pointers[3].color = '#343A40'
            } else if (args.gauge.theme === 'Tailwind3Dark') {
                args.gauge.axes[0].pointers[3].color = '#282F3C';
            } else if (args.gauge.theme === 'Material3') {
                args.gauge.axes[0].pointers[3].color = '#C4C7C5';
            } else if (args.gauge.theme === 'Material3Dark') {
                args.gauge.axes[0].pointers[3].color = '#938F99';
            }
        }
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.text == "20")
            args.text = "Ordered";
        else if (args.text == "15")
            args.text = "Packed";
        else if (args.text == "10")
            args.text = "Shipped";
        else if (args.text == "5")
            args.text = "Delivered";
        else
            args.text = " ";
    }

    public horizontalGauge(e: Event): void {
        this.customLabels.width = this.textLabels.width = this.labelOffset.width = this.labelCustomization.width = '450px';
        this.customLabels.height = this.textLabels.height = this.labelOffset.height = this.labelCustomization.height = '150px';
        this.customLabels.orientation = this.textLabels.orientation = this.labelOffset.orientation = this.labelCustomization.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerone').className = document.getElementById('containertwo').className =
                document.getElementById('containerthree').className = document.getElementById('containerfour').className ="col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };

    public verticalGauge(e: Event): void {
        this.customLabels.width = this.textLabels.width = this.labelOffset.width = this.labelCustomization.width = '150px';
        this.customLabels.height = this.textLabels.height = this.labelOffset.height = this.labelCustomization.height = '350px';
        this.customLabels.orientation = this.textLabels.orientation = this.labelOffset.orientation = this.labelCustomization.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerone').className = document.getElementById('containertwo').className =
                document.getElementById('containerthree').className = document.getElementById('containerfour').className = "col-xs-5 col-sm-5 col-lg-3 col-md-3";
        }
    };

    constructor() {
        //code
    }
}
