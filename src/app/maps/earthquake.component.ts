/**
 * Earth quake map sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Zoom, Marker, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';

Maps.Inject(Zoom, Marker);
declare var require: any;
let asia: object[] = require('./asia.json');
@Component({
    selector: 'control-content',
    templateUrl: 'earthquake.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsEarthquakeComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => { 
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public centerPosition : object = { latitude: 1.5053645409602877, longitude: 105.14038085937499 };
    public zoomSettings : object = { enable: false, zoomFactor: 7 };
    public mapsArea : object = { background: '#AEE2FA' };
    
    public titleSettings : object = { 
        text: '7.6 Magnitude earthquake strikes Sumatra - 2009', 
        textAlignment: 'Near', 
        titleStyle: { size: '18px' } 
    };
    
    public layers: object[] =   [
        {
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            shapeData: asia,
            markerSettings: [{
                visible: true,
                height: 100,
                width: 100,
                template: '<div id="template"> <div class="pulse-container"> <div class="pulse-box"> <div class="pulse-css"></div> </div> </div> </div>',
                animationDuration: 0,
                dataSource: [{
                    latitude: 1.625758360412755, longitude: 98.5693359375
                    }]
            }],
            shapeSettings: {
                fill: '#FFFDCF',
                border: {
                    color: '#3497C3 ',
                    width: 0.5
                }
            },
            dataLabelSettings: {
                visible: true,
                labelPath: 'name',
                smartLabelMode: 'Hide'
            }
        }
    ];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['asia.json', 'world-map.json'];
    };

}