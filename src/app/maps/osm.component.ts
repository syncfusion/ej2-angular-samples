/**
 * osm sample
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewEncapsulation } from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, MapsTooltip, DataLabel);

@Component({
    selector: 'control-content',
    templateUrl: 'osm.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MapsModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MapsOsmComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
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
            urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',
            animationDuration: 0,
            markerSettings: [
                {
                    visible: true,
                    template: '<div><img alt="Balloon image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
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
