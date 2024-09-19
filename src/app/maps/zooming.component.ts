/**
 * Maps zooming sample
 */
import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapsTheme, Maps, Zoom, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { SliderComponent, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Zoom);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
@Component({
    selector: 'control-content',
    templateUrl: 'zooming.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SliderModule, SBDescriptionComponent]
})
export class MapsZoomingComponent {
    @ViewChild('maps')

    public maps: Maps;
    public tooltip: object = { isVisible: true, placement: 'before', showOn: 'focus' };
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
    public zoomSettings: object = {
        enable: true,
        toolbarSettings:{
            buttonSettings: {
               toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
            }
        },
        pinchZooming: true
    }

    public layers: object[] = [
        {
            shapeData: worldMap,
            shapePropertyPath: 'continent',
            shapeDataPath: 'continent',
            shapeSettings: {
                autofill: true,
                colorValuePath: 'color'
            },
            animationDuration: 500,
            dataSource: [
                { country: 'RUS', 'continent': 'Europe', 'CategoryName': 'Books', 'Sales': 3746, 'color': '#EC9B79' },
                { country: 'IND', 'continent': 'Asia', 'CategoryName': 'Books', 'Sales': 10688, 'color': '#7BC1E8' },
                { country: 'CAN', 'continent': 'North America', 'CategoryName': 'Books', 'Sales': 10882, 'color': '#B5E485' },
                { country: 'BRA', 'continent': 'South America', 'CategoryName': 'Books', 'Sales': 13776, 'color': '#78D0D3' },
                { country: 'JPN', 'continent': 'Asia', 'CategoryName': 'Books', 'Sales': 19390, 'color': '#7BC1E8' },
                { country: 'AUS', 'continent': 'Australia',  'CategoryName': 'Books', 'Sales': 30716, 'color': '#D6D572' },
                { country: 'CAF', 'continent': 'Africa', 'CategoryName': 'Books', 'Sales': 18718.0, 'color': '#DF819C' }
                ]
        }
    ];
    public setAnimation(e: SliderChangeEventArgs): void {
        let slider: Element = document.getElementById('range');
        let slider1: SliderComponent = <SliderComponent>slider['ej2_instances'][0];
        let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
        maps.layers[0].animationDuration = slider1.value as number;
        document.getElementById('slider1').innerHTML = (slider1.value as number).toString() + 'ms';
        maps.refresh();
    };
    ngAfterViewInit() {
       
        document.getElementById('mousewheel').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('mousewheel'));
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.mouseWheelZoom = element.checked;
            maps.refresh();
        };

        document.getElementById('pinch').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('pinch'));
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.pinchZooming = element.checked;
            maps.refresh();
        };

        document.getElementById('zoom').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('zoom'));
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.enable = element.checked;
            maps.refresh();
        };

        document.getElementById('pan').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('pan'));
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.enablePanning = element.checked;
            maps.refresh();
        };

        document.getElementById('doubletap').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('doubletap'));
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.doubleClickZoom = element.checked;
            let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('singletap');
            if (element.checked) {
                ele1.disabled = true;
            } else {
                ele1.disabled = false;
            }
            maps.refresh();
        };

        document.getElementById('singletap').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('singletap'));
            let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('doubletap');
            let maps: Maps = <Maps>document.getElementById('container')['ej2_instances'][0];
            maps.zoomSettings.zoomOnClick = element.checked;
            if (element.checked) {
                ele1.disabled = true;
            } else {
                ele1.disabled = false;
            }
            maps.refresh();
        };
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'world-map.json'];
    };
    // custom code end

}