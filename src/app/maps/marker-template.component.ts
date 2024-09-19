/**
 * Marker template sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker);
declare var require: any;
let australia: object[] = require('./australia.json');
@Component({
    selector: 'control-content',
    templateUrl: 'marker-template.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsMarkerTemplateComponent {
    public zoomSettings: object= {
        enable: false
    };
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public titleSettings: object = {
        text: ' Australia cities weather detail',
        titleStyle: {
            size: '16px'
        }
    }
    public layers: object[] =  [
        {
            shapeData: australia,
            shapePropertyPath: 'STATE_NAME',
            markerSettings: [
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather clear image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-clear.png"/>' +
                     '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Perth', latitude: -31.950527, longitude: 115.860457 , Temperature: 31.6}
                        ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather cloud image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-clouds.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Adelaide', latitude: -34.928499, longitude: 138.600746, Temperature: 28.5 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather clear image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-clear.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Townsville', latitude: -19.2589635, longitude: 146.8169483, Temperature: 31.3 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather rain image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-rain.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Sydney', latitude: -33.868820, longitude: 151.209296, Temperature: 26.4 }
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather clear image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-clear.png"/>' +
                    '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                    dataSource: [
                        { Name: 'Alice Springs', latitude: -23.698042, longitude: 133.880747, Temperature: 36.4 },
                      ]
                },
                {
                    height: 30,
                    width: 30,
                    visible: true,
                    template: '<div><img class="markerTemplate" alt="Marker weather cloud image" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/weather-clouds.png"/>'
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
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'australia.json'];
    };
    // custom code end

}