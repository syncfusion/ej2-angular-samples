import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapsTheme, Maps, Zoom, ILoadEventArgs } from '@syncfusion/ej2-ng-maps';
import { World_Map } from './MapData/WorldMap';
import { randomcountriesData } from './MapData/salesCountry';

Maps.Inject(Zoom);

let worldMap: object = World_Map;

/**
 * Maps zooming sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'zooming.html',
    styleUrls: ['maps.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MapsZoomingComponent {
    @ViewChild('maps')

    public maps: Maps;
    public tooltip: object = { isVisible: true, placement: 'before', showOn: 'focus' };
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public zoomSettings: object = {
        enable: true,
        toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
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
            dataSource: randomcountriesData
        }
    ];

    ngAfterViewInit() {
        document.getElementById('mousewheel').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('mousewheel'));
            this.maps.zoomSettings.mouseWheelZoom = element.checked;
            this.maps.refresh();
        };

        document.getElementById('pinch').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('pinch'));
            this.maps.zoomSettings.pinchZooming = element.checked;
            this.maps.refresh();
        };

        document.getElementById('zoom').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('zoom'));
            this.maps.zoomSettings.enable = element.checked;
            this.maps.refresh();
        };

        document.getElementById('doubletap').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('doubletap'));
            this.maps.zoomSettings.doubleClickZoom = element.checked;
            this.maps.zoomSettings.zoomOnClick = (!element.checked);
            let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('singletap');
            if (element.checked) {
                ele1.disabled = true;
            } else {
                ele1.disabled = false;
            }
        };

        document.getElementById('singletap').onchange = () => {
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('singletap'));
            let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('doubletap');
            this.maps.zoomSettings.zoomOnClick = element.checked;
            this.maps.zoomSettings.doubleClickZoom = (!element.checked);
            if (element.checked) {
                ele1.disabled = true;
            } else {
                ele1.disabled = false;
            }
        };
    }

    constructor() {
        //code
    };

}