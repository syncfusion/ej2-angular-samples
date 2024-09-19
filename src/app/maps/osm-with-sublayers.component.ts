/**
 * osm sample
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, Annotations, ILoadEventArgs, NavigationLine, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, MapsTooltip, DataLabel, NavigationLine, Annotations);
declare var require: any;
let africa: object[] = require('./africa.json');
@Component({
    selector: 'control-content',
    templateUrl: 'osm-with-sublayers.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MapsModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MapsOsmWithSublayerComponent {
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public zoomSettings: object = {
        enable: true
    }
    public titleSettings: object = {
        text: 'Location of Africa continent in the World map',
        textStyle: {
            size: '16px'
        }
    };
    public layers: object[] = [{
        urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',
    },
    {
        type: 'SubLayer',
        animationDuration: 0,
        shapeData: africa,
        shapeSettings: {
            fill: '#5100a3',
            opacity: 0.4
        }
    }
    ];
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['africa.json'];
    };
    // custom code end
}