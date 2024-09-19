import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme, IPointerDragEventArgs } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-pointer.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class CustomPointerComponent {
    @ViewChild('textWidget')
    public gaugeTextWidget: LinearGaugeComponent;
    @ViewChild('iconWidget')
    public gaugeIconWidget: LinearGaugeComponent;
    @ViewChild('multipleWidget')
    public gaugeMultipleWidget: LinearGaugeComponent;

    public axesTextWidget: Object[] = [{
        line: {
            width: 20
        },
        pointers: [{
            width: 30,
            value: 55,
            offset: -2,
            color: '#173BBB',
            position: 'Cross',
            placement: 'Center',
            markerType: 'Circle',
        }
        ],
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesIconWidget: Object[] = [{
        line: {
            width: 20
        },
        pointers: [{
            width: 45,
            value: 90,
            height: 30,
            placement: 'Near',
            markerType: 'Image',
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/linear-gauge/images/thumb-icon.png'
        }
        ],
        majorTicks: {
            interval: 20, height: 7, width: 1
        },
        minorTicks: {
            interval: 10, height: 3
        },
        minimum: 0,
        maximum: 100,
        opposedPosition: true,
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesMultipleWidget: Object[] = [{
        line: {
            width: 20
        },
        pointers: [{
            width: 30,
            value: 60,
            offset: -2,
            placement: 'Center',
            position: 'Cross',
            markerType: 'Circle',
            color: '#173BBB'
        }, {
            width: 45,
            height: 30,
            value: 30,
            placement: 'Near',
            markerType: 'Image',
            color: '#173BBB',
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/linear-gauge/images/thumb-icon.png'
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
        labelStyle: { font: { fontFamily: 'inherit', fontWeight: 'normal' } }
    }];

    public annotationsTextWidget: Object[] = [{
        axisIndex: 0,
        axisValue: 55,
        x: 0,
        y: 0,
        zIndex: 1,
        content: '<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px;"> 55 </div>'
    }];

    public annotationsMultipleWidget: Object[] = [{
        axisIndex: 0,
        axisValue: 60,
        x: 0,
        y: 0,
        zIndex: 1,
        content: '<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px;"> 60 </div>'
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
    }

    public horizontalGauge(e: Event): void {
        this.gaugeTextWidget.width = this.gaugeIconWidget.width = this.gaugeMultipleWidget.width = '450px';
        this.gaugeTextWidget.height = this.gaugeIconWidget.height = this.gaugeMultipleWidget.height = '150px';
        this.gaugeTextWidget.orientation = this.gaugeIconWidget.orientation = this.gaugeMultipleWidget.orientation = "Horizontal";
        this.gaugeTextWidget.axes[0].pointers[0].offset = 2;
        this.gaugeMultipleWidget.axes[0].pointers[0].offset = 2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('textWidgetGauge').className = document.getElementById('iconWidgetGauge').className =
                document.getElementById('multipleWidgetGauge').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };

    public verticalGauge(e: Event): void {
        this.gaugeTextWidget.width = this.gaugeIconWidget.width = this.gaugeMultipleWidget.width = '170px';
        this.gaugeTextWidget.height = this.gaugeIconWidget.height = this.gaugeMultipleWidget.height = '350px';
        this.gaugeTextWidget.orientation = this.gaugeIconWidget.orientation = this.gaugeMultipleWidget.orientation = "Vertical";
        this.gaugeTextWidget.axes[0].pointers[0].offset = -2;
        this.gaugeMultipleWidget.axes[0].pointers[0].offset = -2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('textWidgetGauge').className = document.getElementById('iconWidgetGauge').className =
                document.getElementById('multipleWidgetGauge').className = "col-xs-5 col-sm-5 col-lg-4 col-md-4";
        }
    };

    constructor() {
        // code
    }

}
