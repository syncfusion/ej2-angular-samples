/**
 * osm sample with marker cluster
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, MapsTooltip, Maps, Marker, ILoadEventArgs, Zoom, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, MapsTooltip, Zoom);
@Component({
    selector: 'control-content',
    templateUrl: 'osm-with-marker-clustering.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MapsModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MapsOsmWithMarkerClusterComponent {
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public zoomSettings: object = {
        enable: true,
        zoomFactor: 2,
        toolbarSettings: {
            buttonSettings: {
                toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
            }
        }
    }
    public titleSettings: object = {
        text: 'Popular attractions around the world',
        textStyle: {
            size: '16px'
        }
    };
    public layers: object[] = [{
        urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',
        markerSettings: [
            {
                clusterSettings: {
                    allowClustering: true,
                    allowDeepClustering: false,
                    allowClusterExpand: true,
                    labelStyle: {
                        color: 'white',
                        size: '10px'
                    },
                    shape: 'Image',
                    height: 40, width: 40,
                    imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/cluster-france.svg'
                },
                visible: true,
                dataSource: [
                    { latitude: 48.8584, longitude: 2.2945, name: 'Eiffel Tower', state: 'Paris', country: 'France' },
                    { latitude: 48.8606, longitude: 2.3376, name: 'Louvre Museum', state: 'Paris', country: 'France' },
                    { latitude: 48.8529, longitude: 2.3500, name: 'Notre-Dame Cathedral', state: 'Paris', country: 'France' },
                    { latitude: 48.6360, longitude: 1.5115, name: 'Mont Saint-Michel', state: 'Normandy', country: 'France' },
                    { latitude: 48.8049, longitude: 2.1204, name: 'Versailles', state: 'Normandy', country: 'France' },
                    { latitude: 43.7102, longitude: 7.2620, name: 'French Riviera', state: 'Provence-Alpes-Côte d Azur', country: 'France' },
                    { latitude: 47.6167, longitude: 1.5167, name: 'Château de Chambord', state: 'Centre-Val de Loire', country: 'France' },
                    { latitude: 48.8738, longitude: 2.2950, name: 'Arc de Triomphe', state: 'Paris', country: 'France' },
                    { latitude: 48.8566, longitude: 2.3522, name: 'Sainte-Chapelle', state: 'Paris', country: 'France' },
                    { latitude: 49.4144, longitude: 0.8322, name: 'The D-Day Landing Beaches', state: 'Normandy', country: 'France' }
                ],
                shape: 'Circle',
                height: 15,
                width: 15,
                fill: '#b38600',
                border: {
                    color: '#e6f2ff',
                    width: 2
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}'
                },
                animationDuration: 0
            },
            {
                clusterSettings: {
                    allowClustering: true,
                    allowDeepClustering: false,
                    allowClusterExpand: true,
                    shape: 'Image',
                    height: 40, width: 40,
                    labelStyle: {
                        color: 'white',
                        size: '10px'
                    },
                    imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/cluster-usa.svg'
                },
                visible: true,
                dataSource: [
                    { latitude: 35.019028, longitude: -85.339439, name: 'Ruby Falls', state: 'Tennessee', country: 'United States of America' },
                    { latitude: 35.654613, longitude: -105.996979, name: 'Meow Wolf Santa Fe', state: 'New Mexico', country: 'United States of America' },
                    { latitude: 36.107216, longitude: -115.175804, name: 'City Center of Las Vegas', state: 'Nevada', country: 'United States of America' },
                    { latitude: 36.879047, longitude: -111.510498, name: 'Horseshoe Bend', state: 'Arizona', country: 'United States of America' },
                    { latitude: 36.011955, longitude: -113.810951, name: 'Grand Canyon West Skywalk', state: 'Arizona', country: 'United States of America' },
                    { latitude: 44.460438, longitude: -110.828377, name: 'Old Faithful', state: 'Wyoming', country: 'United States of America' },
                    { latitude: 33.839165, longitude: -118.391113, name: 'Redondo Beach Pier', state: 'California', country: 'United States of America' },
                    { latitude: 36.117615, longitude: -115.168381, name: 'High Roller, Las Vegas', state: 'Nevada', country: 'United States of America' },
                    { latitude: 36.082027, longitude: -115.172897, name: 'Welcome to Fabulous Las Vegas Sign', state: 'Nevada', country: 'United States of America' },
                    { latitude: 28.521894, longitude: -80.681702, name: 'Kennedy Space Center Visitor Complex', state: 'Florida', country: 'United States of America' }
                ],
                shape: 'Circle',
                height: 15,
                width: 15,
                fill: '#bf4040',
                border: {
                    color: '#e6f2ff',
                    width: 2
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}'
                },
                animationDuration: 0
            },
            {
                clusterSettings: {
                    allowClustering: true,
                    allowDeepClustering: false,
                    allowClusterExpand: true,
                    shape: 'Image',
                    height: 40, width: 40,
                    labelStyle: {
                        color: 'white',
                        size: '10px'
                    },
                    imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/cluster-india.svg'
                },
                visible: true,
                dataSource: [
                    { latitude: 26.985901, longitude: 75.850700, name: 'Amber Fort, Amer', state: 'Rajastan', country: 'India' },
                    { latitude: 22.957390, longitude: 77.625275, name: 'Bhimbetka, Raisen District', state: 'Madhya Pradesh', country: 'India' },
                    { latitude: 26.809330, longitude: 75.540527, name: 'Bagru Fort, Bagru', state: 'Rajasthan', country: 'India' },
                    { latitude: 25.489504, longitude: 80.330116, name: 'Kalinjar Fort, Banda', state: 'Uttar Pradesh', country: 'India' },
                    { latitude: 27.988890, longitude: 76.388336, name: 'Neemrana', state: 'Rajasthan', country: 'India' },
                    { latitude: 17.382330, longitude: 78.401604, name: 'Golconda Fort', state: 'Hyderabad', country: 'India' },
                    { latitude: 28.657211, longitude: 77.233978, name: 'Bhagirath Palace', state: 'New Delhi', country: 'India' },
                    { latitude: 18.544689, longitude: 73.825478, name: 'Raj Bhavan', state: 'Maharashtra', country: 'India' },
                    { latitude: 22.718435, longitude: 75.855217, name: 'Rajwada, Indore', state: 'Madhya Pradesh', country: 'India' },
                    { latitude: 27.173891, longitude: 78.042068, name: 'The Taj Mahal', state: 'Uttar Pradesh', country: 'India' }
                ],
                shape: 'Circle',
                fill: '#00b3b3',
                border: {
                    color: '#e6f2ff',
                    width: 2
                },
                height: 15,
                width: 15,
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}'
                },
                animationDuration: 0
            },
            {
                clusterSettings: {
                    allowClustering: true,
                    allowDeepClustering: false,
                    allowClusterExpand: true,
                    shape: 'Image',
                    height: 40, width: 40,
                    labelStyle: {
                        color: 'white',
                        size: '10px'
                    },
                    imageUrl: 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/cluster-china.svg'
                },
                visible: true,
                dataSource: [
                    { latitude: 40.4319, longitude: 116.5704, name: 'Great Wall of China', state: 'Beijing', country: 'China' },
                    { latitude: 39.9163, longitude: 116.3972, name: 'Forbidden City', state: 'Beijing', country: 'China' },
                    { latitude: 34.3848, longitude: 109.2734, name: 'Terracotta Army', state: 'Shaanxi Province', country: 'China' },
                    { latitude: 39.8825, longitude: 116.4122, name: 'Temple of Heaven', state: 'Beijing', country: 'China' },
                    { latitude: 39.9990, longitude: 116.2754, name: 'Summer Palace', state: 'Beijing', country: 'China' },
                    { latitude: 30.2470, longitude: 120.1614, name: 'Hangzhou', state: 'Zhejiang Province', country: 'China' },
                    { latitude: 31.2400, longitude: 121.4900, name: 'Shanghai Tower', state: 'Shanghai', country: 'China' }
                ],
                shape: 'Circle',
                fill: '#b366ff',
                border: {
                    color: '#e6f2ff',
                    width: 2
                },
                height: 15,
                width: 15,
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}'
                },
                animationDuration: 0
            }
        ]
    },

    ];
    // custom code start
    constructor() { };
    // custom code end
}
