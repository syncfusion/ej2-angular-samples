//tslint:disable
import { Component, ViewEncapsulation } from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps'; 

Maps.Inject(Marker, MapsTooltip, DataLabel);

/**
 * osm sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'osm.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsOsmComponent {
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public zoomSettings: object = {
        zoomFactor: 10,
        enable: false
    }
    public titleSettings: object = {
        text: 'Headquarters of the United Nations',
        textStyle: {
            size: '16px'
        }
    };
    public centerPosition:object = {
        latitude: 40.7209,
        longitude: -73.9680
    };

    public layers: object[] = [
        {
            layerType: 'OSM',
            animationDuration: 0,
            markerSettings: [
                {
                    visible: true,
                    template: '<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
                    dataSource: [{
                        name: 'Manhattan, New York, USA',
                        latitude: 40.7488758,
                        longitude: -73.9730091
                    }],
                    tooltipSettings: {
                        visible: true,
                        valuePath: 'name'
                    }
                }
            ]
        },
        
    ];
    constructor() {
        //code
    };
}