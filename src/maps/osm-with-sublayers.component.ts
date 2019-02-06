//tslint:disable
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, Annotations,ILoadEventArgs, NavigationLine } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps'; 

Maps.Inject(Marker, MapsTooltip, DataLabel, NavigationLine, Annotations);

/**
 * osm sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'osm-with-sublayers.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsOsmWithSublayerComponent {
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
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
        layerType: 'OSM',
    },
    {
        type: 'SubLayer',
        animationDuration: 0,
        shapeData: new MapAjax('./src/maps/africa.json'),
        shapeSettings: {
            fill: '#5100a3',
            opacity: 0.4
        }
    }
       ];
       constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'africa.json'];
    };
}