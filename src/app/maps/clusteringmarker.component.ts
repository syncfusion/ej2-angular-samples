/**
 * Marker Sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, Zoom, MapsTooltip, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { cluster } from './marker-location';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, MapsTooltip, Zoom);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
let cities: object[] = require('./marker-cluster.json');
@Component({
    selector: 'control-content',
    templateUrl: 'clusteringmarker.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsClusteringComponent {
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
    };

    public titleSettings: object = {
        text: 'Top 50 largest cities in the World',
        titleStyle: { size: '16px' }
    };

    public layers: object[] = [{
        shapeData: worldMap,
        dataSource: cities,
        shapeSettings: { fill: '#C1DFF5' },

        markerClusterSettings: {
            allowClustering: true,
            shape: 'Image',
            height: 40,
            width: 40,
            labelStyle: { color: 'white' },
            imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/cluster.svg'
        },
        markerSettings: [{
            dataSource: cluster,
            visible: true,
            animationDuration: 0,
            shape: 'Image',
            imageUrl: 'https://ej2.syncfusion.com/demos/src/maps/images/ballon.png',
            height: 20,
            width: 20,
            border: { width: 2, color: '#285255' },
            tooltipSettings: {
                template: '<div><div class="toolback"><div class="listing2"><center> ${city} </center></div><hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"><div><span class="listing1">Rank : </span><span class="listing2">${Rank}</span></div><div><span class="listing1">Area : </span><span class="listing2">${area} sq kms</span></div></div></div>',
                visible: true,
                valuePath: 'area',
            }
        }]
    }];
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['marker-cluster.json', 'world-map.json'];
    };
    // custom code end

}