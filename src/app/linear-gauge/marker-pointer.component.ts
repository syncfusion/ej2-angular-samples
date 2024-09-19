import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent, LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ILoadedEventArgs, LinearGaugeTheme, IPointerDragEventArgs } from '@syncfusion/ej2-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'marker-pointer.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule]
})

export class MarkerPointerComponent {
    @ViewChild('linearTriangle')
    public linearTriangle: LinearGaugeComponent;
    @ViewChild('linearCircle')
    public linearCircle: LinearGaugeComponent;
    @ViewChild('linearText')
    public linearText: LinearGaugeComponent;
    @ViewChild('linearRectangle')
    public linearRectangle: LinearGaugeComponent;
    @ViewChild('linearMultiple')
    public linearMultiple: LinearGaugeComponent;

    public axesTriangle: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 5,
            value: 40,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            type: 'Bar',
            offset: 12,
            color: '#0074E3',
            animationDuration: 1500
        }, {
            width: 15,
            value: 40,
            height: 15,
            enableDrag: true,
            placement: 'Near',
            markerType: 'Triangle',
            animationDuration: 1500
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

    public axesCircle: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 5,
            value: 20,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            type: 'Bar',
            offset: 12,
            color: '#0074E3',
            animationDuration: 1500
        }, {
            width: 15,
            value: 20,
            height: 15,
            enableDrag: true,
            placement: 'Near',
            markerType: 'Circle',
            animationDuration: 1500
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

    public axesText: Object[] = [{
        line: {
            width: 5
        },
        pointers: [{
            width: 5,
            value: 50,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            type: 'Bar',
            offset: 12,
            color: '#0074E3',
            animationDuration: 1500
        }, {
            width: 15,
            value: 50,
            height: 15,
            enableDrag: true,
            offset: -10,
            placement: 'Near',
            markerType: 'Text',
            text:'50 Points',
            animationDuration: 1500
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
        labelStyle: { font: { fontFamily: 'inherit' } }
    }];

    public axesRectangle: Object = [{
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
            font: { fontFamily: 'inherit' }
        },
        pointers: [{
            width: 5,
            value: 30,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            type: 'Bar',
            offset: 12,
            color: '#0074E3',
            animationDuration: 1500
        }, {
            width: 15,
            value: 30,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            markerType: 'Rectangle',
            animationDuration: 1500
         }
        ],
        minimum: 0,
        maximum: 100,
        opposedPosition: true
    }];

    public axesMultiple: Object = [{
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
            font: { fontFamily: 'inherit' }
        },
        pointers: [{
            width: 5,
            value: 10,
            height: 5,
            enableDrag: true,
            placement: 'Near',
            type: 'Bar',
            offset: 12,
            color: '#0074E3',
            animationDuration: 1500
        }, {
            width: 15,
            value: 10,
            height: 15,
            enableDrag: true,
            placement: 'Near',
            markerType: 'Triangle',
            animationDuration: 1500
        }, {
            width: 15,
            value: 100,
            height: 15,
            enableDrag: true,
            placement: 'Near',
            markerType: 'Diamond',
            animationDuration: 1500
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
    }

    public dragEndTriangle(args: IPointerDragEventArgs): void {
        this.linearTriangle.axes[0].pointers[0].animationDuration = 1500;
        this.linearTriangle.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartTriangle(args: IPointerDragEventArgs): void {
        this.linearTriangle.axes[0].pointers[0].animationDuration = 0;
        this.linearTriangle.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveTriangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearTriangle.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndCircle(args: IPointerDragEventArgs): void {
        this.linearCircle.axes[0].pointers[0].animationDuration = 1500;
        this.linearCircle.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartCircle(args: IPointerDragEventArgs): void {
        this.linearCircle.axes[0].pointers[0].animationDuration = 0;
        this.linearCircle.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveCircle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearCircle.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndText(args: IPointerDragEventArgs): void {
        this.linearText.axes[0].pointers[0].animationDuration = 1500;
        this.linearText.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartText(args: IPointerDragEventArgs): void {
        this.linearText.axes[0].pointers[0].animationDuration = 0;
        this.linearText.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveText(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearText.axes[0].pointers[1].text = Math.round(args.currentValue).toString() + " Points";
            this.linearText.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragEndRectangle(args: IPointerDragEventArgs): void {
        this.linearRectangle.axes[0].pointers[0].animationDuration = 1500;
        this.linearRectangle.axes[0].pointers[1].animationDuration = 1500;
    }

    public dragStartRectangle(args: IPointerDragEventArgs): void {
        this.linearRectangle.axes[0].pointers[0].animationDuration = 0;
        this.linearRectangle.axes[0].pointers[1].animationDuration = 0;
    }

    public dragMoveRectangle(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearRectangle.setPointerValue(0, 0, args.currentValue);
        }
    }

    public dragStartMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearMultiple.axes[0].pointers[0].animationDuration = 0;
            this.linearMultiple.axes[0].pointers[1].animationDuration = 0;
        }
    }

    public dragEndMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearMultiple.axes[0].pointers[0].animationDuration = 1500;
            this.linearMultiple.axes[0].pointers[1].animationDuration = 1500;
        }
    }

    public dragMoveMultiple(args: IPointerDragEventArgs): void {
        if (args.pointerIndex == 1) {
            this.linearMultiple.setPointerValue(0, 0, args.currentValue);
        }
    }

    public horizontalGauge(e: Event): void {
        this.linearTriangle.width = this.linearCircle.width = this.linearText.width = this.linearRectangle.width = this.linearMultiple.width = '450px';
        this.linearTriangle.height = this.linearCircle.height = this.linearText.height = this.linearRectangle.height = this.linearMultiple.height = '150px';
        this.linearTriangle.orientation = this.linearCircle.orientation = this.linearText.orientation = this.linearRectangle.orientation = this.linearMultiple.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerTriangle').className = document.getElementById('containerCircle').className =
                document.getElementById('containerText').className = document.getElementById('containerRectangle').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
                document.getElementById('containerBox').style.padding = "0%";
        }
    };

    public verticalGauge(e: Event): void {
        this.linearTriangle.width = this.linearCircle.width = this.linearRectangle.width = this.linearMultiple.width = '150px';
        this.linearText.width = '168px';
        this.linearTriangle.height = this.linearCircle.height = this.linearText.height = this.linearRectangle.height = this.linearMultiple.height = '350px';
        this.linearTriangle.orientation = this.linearCircle.orientation = this.linearText.orientation = this.linearRectangle.orientation = this.linearMultiple.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerTriangle').className = document.getElementById('containerCircle').className =
                document.getElementById('containerText').className = document.getElementById('containerRectangle').className =
                document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
                document.getElementById('containerBox').style.padding = "4%";
        }
    };

    constructor() {
        //code
    }

}