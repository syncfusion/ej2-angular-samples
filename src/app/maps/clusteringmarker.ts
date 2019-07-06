/**
 * Marker Sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, Zoom, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { cluster } from './marker-location';
Maps.Inject(Marker, MapsTooltip, Zoom);
declare var require: any;
let worlMap: object[] = require('./world-map.json');
let cities: object[] = require('./marker-cluster.json');
@Component({
    selector: 'control-content',
    templateUrl: 'clusteringmarker.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsClusteringComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public zoomSettings: object = {
        enable: true
    };

    public titleSettings: object = {
        text: 'Top 50 largest cities in the World',
        titleStyle: { size: '16px' }
    };

    public layers: object[] = [{
        shapeData: worlMap,
        dataSource: cities,
        shapeSettings: { fill: '#C1DFF5' },

        markerClusterSettings: {
            allowClustering: true,
            shape: 'Image',
            height: 40,
            width: 40,
            labelStyle: { color: 'white' },
            imageUrl: './assets/maps/images/cluster.svg'
        },
        markerSettings: [{
            dataSource: cluster,
            visible: true,
            animationDuration: 0,
            shape: 'Image',
            imageUrl: './assets/maps/images/ballon.png',
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
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['marker-cluster.json', 'world-map.json'];
    };

}