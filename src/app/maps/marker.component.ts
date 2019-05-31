/**
 * Marker Sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { topPopulation } from './marker-location'; 
import { HttpClient } from '@angular/common/http';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Marker, MapsTooltip);
declare var require: any;
let worlMap: object[] = require('./world-map.json');
let population: object[] = require('./top-population.json');
@Component({
    selector: 'control-content',
    templateUrl: 'marker.html', 
    encapsulation: ViewEncapsulation.None
})
export class MapsMarkerComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => { 
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public zoomSettings: object= {
        enable: false
    };
    
    public titleSettings: object = { 
        text: 'Top 25 populated cities in the world', 
        titleStyle: { size: '16px' } 
    };

    public layers: object[] =   [{        
        shapeData: worlMap,
        dataSource:  population,
        shapeSettings: { fill: '#C3E6ED' },
        
        markerSettings: [{        
            dataSource: topPopulation,
            visible: true,
            animationDuration: 0,
            shape: 'Circle',
            fill: 'white',
            width: 3,
            border: { width: 2, color: '#285255' },
            tooltipSettings: {
                template: '<div><div class="toolback"><div class="listing2"><center> ${name} </center></div><hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"><div><span class="listing1">Country : </span><span class="listing2">${Country}</span></div><div><span class="listing1">Population : </span><span class="listing2">${population}</span></div></div></div>',
                visible: true,
                valuePath: 'population',
            }
        }]
    }];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'top-population.json', 'world-map.json'];
    };

}