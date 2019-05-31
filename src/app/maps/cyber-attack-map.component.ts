/**
 * Cyber attack maps sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Legend, Marker, MapsTooltip, ILoadEventArgs, ILoadedEventArgs, NavigationLineSettingsModel, NavigationLine } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';

Maps.Inject(Marker, NavigationLine, MapsTooltip);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
@Component({
    selector: 'control-content',
    templateUrl: 'cyber-attack-map.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsCyberAttackComponent {
    titleSettings: object = {
        text: 'Cyber Attack Map of United States',
        textStyle: { size: '16px' }
    };
    public zoomSettings: object = {
        enable: false
    };
    public legendSettings: object = { visible: true };

    public layers: object[] = [{
        shapeData: worldMap,
        shapeSettings: {
            border: { color: '#D2691E', width: 0.5 },
            fill: '#FFFFE0'
        },
        navigationLineSettings: [
            {
                dashArray: '5,1', visible: true,
                angle: -0.3, color: '#ffffb3',
                latitude: [15.758401, 39.864171],
                longitude: [101.155642, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: 0.4, color: '#ffffb3',
                latitude: [57.725612, 39.864171],
                longitude: [-101.802160, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [29.930938, 39.864171],
                longitude: [69.358894, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.1, color: '#ffffb3',
                latitude: [22.860388, 39.864171],
                longitude: [79.739066, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.1, color: '#ffffb3',
                latitude: [-24.763753, 39.864171],
                longitude: [134.852191, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.4, color: '#ffffb3',
                latitude: [34.611098, 39.864171],
                longitude: [104.189872, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.8, color: '#ffffb3',
                latitude: [-12.354844, 39.864171],
                longitude: [-49.017709, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.4, color: '#ffffb3',
                latitude: [3.450682, 39.864171],
                longitude: [-72.943141, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.7, color: '#ffffb3',
                latitude: [62.448268, 39.864171],
                longitude: [97.251835, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.3, color: '#ffffb3',
                latitude: [65.931163, 39.864171],
                longitude: [-45.812820, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [-21.206222, 39.864171],
                longitude: [17.122018, -100.854833],

            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [35.839969, 39.864171],
                longitude: [137.904641, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [46.582184, 39.864171],
                longitude: [2.232903, -100.854833],
            },
            {
                dashArray: '5,1', visible: true,
                angle: -0.2, color: '#ffffb3',
                latitude: [0.390617, 39.864171],
                longitude: [37.893734, -100.854833],
            }
        ],
        markerSettings: [
            {
                visible: true, height: 15, width: 15,
                template: '<div id="template"><div class="pulse-css"><br /><div class="name">{{:name}}</div></div></div>',
                animationDuration: 0,
                dataSource: [
                    { latitude: 15.758401, longitude: 101.155642, name: 'Thailand' },
                    { latitude: 57.725612, longitude: -101.802160, name: 'Canada' },
                    { latitude: 39.634177, longitude: 42.410740, name: 'Turkey' },
                    { latitude: 22.860388, longitude: 79.739066, name: 'India' },
                    { latitude: -24.763753, longitude: 134.852191, name: 'Australia' },
                    { latitude: 34.611098, longitude: 104.189872, name: 'China' },
                    { latitude: -12.354844, longitude: -49.017709, name: 'Brazil' },
                    { latitude: 3.450682, longitude: -72.943141, name: 'Colombia' },
                    { latitude: 62.448268, longitude: 97.251835, name: 'Russia' },
                    { latitude: 65.931163, longitude: -45.812820, name: 'Greenland' },
                    {  latitude: -21.206222, longitude: 17.122018, name: 'Namibia' },
                    { latitude: 35.839969, longitude: 137.904641, name: 'Japan' },
                    { latitude: 46.582184, longitude: 2.232903, name: 'France' },
                    { latitude: 0.390617, longitude: 37.893734, name: 'Kenya' }
                ]
            },
            {
                visible: true, height: 15, width: 15,
                template: '<div id="parent_template" ><div class="parent_css"><br/><div class="name" style="margin-left: -10px">United States</div></div></div>',
                animationDuration: 0,
                dataSource: [{
                    latitude: 39.864171,
                    longitude: -100.854833
                }]
            },
        ]
    },
];
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public loaded = (args: ILoadedEventArgs) => {
        let lines = args.maps.layers[0].navigationLineSettings;
            for (let i: number = 0; i < lines.length; i++) {
                let line: HTMLElement = document.getElementById('container_LayerIndex_0_NavigationIndex_' + i + '_Line0');
                let marker: HTMLElement = document.getElementById('container_LayerIndex_0_MarkerIndex_0_dataIndex_' + i)
                line.style.strokeDasharray = '1000';
                line.style.strokeDashoffset = '1000';
                if (i < 4) {
                    line.style.animation = marker.style.animation = 'dash 5s linear 0s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(() => {
                        marker.style.visibility = 'visible';
                    }, 0);
                } else if (i < 8) {
                    line.style.animation = marker.style.animation = 'dash 6s linear 2s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(() => {
                        marker.style.visibility = 'visible';
                    }, 2000);
                } else if (i < 12) {
                    line.style.animation = marker.style.animation = 'dash 6s linear 4.5s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(() => {
                        marker.style.visibility = 'visible';
                    }, 4500);
                } else {
                    line.style.animation = marker.style.animation = 'dash 5s linear 7s infinite';
                    marker.style.visibility = 'hidden';
                    setTimeout(() => {
                        marker.style.visibility = 'visible';
                    }, 7000);
                }
            }
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['world-map.json'];
    };
}