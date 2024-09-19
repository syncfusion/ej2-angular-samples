/**
 * Annotation Sample
 */
// custom code start
//tslint:disable
// custom code end
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MapsTheme, Maps, Annotations, Marker, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
let africa: object[] = require('./africa-continent.json');
Maps.Inject(Annotations, Marker);
declare var require: any;
//let africa: object[] = require('./africa-continent.json');
@Component({
    selector: 'control-content',
    templateUrl: 'annotation.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsAnnotationComponent {
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
    public annotations: object[] = [
        {
            content: '<div id="maps-annotation"> <div id="annotation"> <div> <p style="margin-left:10px;font-size:13px;font-weight:500">Facts about Africa</p> </div> <hr style="margin-top:-3px;margin-bottom:10px;border:0.5px solid #DDDDDD"> <div> <ul style="list-style-type:disc; margin-left:-20px;margin-bottom:2px; font-weight:400"> <li>Africa is the second largest and second most populated continent in the world.</li> <li style="padding-top:5px;">Africa has 54 sovereign states and 10 non-sovereign territories.</li> <li style="padding-top:5px;">Algeria is the largest country in Africa, where as Mayotte is the smallest.</li> </ul> </div> </div> </div>',
            x: '0%', y: '70%'
        }, {
            content: '<div id="compass-maps"> <img alt="Direction compass" src="https://ej2.syncfusion.com/angular/demos/assets/maps/images/compass.svg" width="75px" height="75px"> </div>',
            x: '85%', y: '5%'
        }
    ];
    public layers: object[] = [
            {
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: africa,
                shapeSettings: {
                    fill: 'url(#grad1)'
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<h3 style="color:white">{{:name}}</h3>',
                        animationDuration: 1,
                        dataSource: [{
                            name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                        }]
                    }
                ]
            }
        ];
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['africa-continent.json'];
    }
    // custom code end

}
