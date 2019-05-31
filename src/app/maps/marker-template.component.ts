/**
 * Marker template sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Marker);
declare var require: any;
let australia: object[] = require('./australia.json');
@Component({
    selector: 'control-content',
    templateUrl: 'marker-template.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsMarkerTemplateComponent {
    public zoomSettings: object= {
        enable: false
    };
    // custom code start
    public load = (args: ILoadEventArgs) => { 
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public titleSettings: object = {
        text: ' Australia cities weather detail',
        titleStyle: {
            size: '16px'
        }
    }
    public layers: object[] =  [
        {
            shapeData: australia,
            shapeDataPath: 'STATE_NAME',
            markerSettings: [
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-clear.png"/>' +
                     '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Perth', latitude: -31.950527, longitude: 115.860457 , Temperature: 31.6}
                        ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-clouds.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Adelaide', latitude: -34.928499, longitude: 138.600746, Temperature: 28.5 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-clear.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Townsville', latitude: -19.2589635, longitude: 146.8169483, Temperature: 31.3 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-rain.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Sydney', latitude: -33.868820, longitude: 151.209296, Temperature: 26.4 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-clear.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Alice Springs', latitude: -23.698042, longitude: 133.880747, Temperature: 36.4 },
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div id="marker1" style="font-size: 14px;height:30px; width:30px;"><img class="markerTemplate" src="./assets/maps/images/weather-clouds.png"/>'
                     + '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Brisbane', latitude: -27.469771, longitude: 153.025124, Temperature: 29.1 }
                      ]
                }
            ],
            tooltipSettings: {
                visible: false
            },
            shapeSettings: {
                autofill: true,
                palette: ['#E2B247', '#88DB46', '#42C4E2', '#C08AF8', '#52BACC', '#F4CE2F', '#6986ED'],
                border: {
                    width: 0.5,
                    color: 'white'
                },
            }
        }
    ];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'australia.json'];
    };

}