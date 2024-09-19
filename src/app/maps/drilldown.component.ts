/**
 * Drilldown sample
 */
import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapsTheme, Maps, shapeSelected, IShapeSelectedEventArgs, Highlight, MapsTooltip, Marker, ILoadEventArgs, ILoadedEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Highlight, MapsTooltip, Marker );

export interface ShapeData { continent?: string; }
let touchmove: boolean;
declare var require: any;
let worldMap: object[] = require('./world-map.json');
let datasource: object[] = require('./default-datasource.json');
let africa: object[] = require('./africa.json');
let europe: object[] = require('./europe.json');
let asia: object[] = require('./asia.json');
let north_america: object[] = require('./north-america.json');
let south_america: object[] = require('./south-america.json');
let oceania: object[] = require('./oceania.json');
@Component({
    selector: 'control-content',
    templateUrl: 'drilldown.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsDrilldownComponent {
    @ViewChild('maps')
    public maps: Maps;
    public load = (args: ILoadEventArgs) => { 
        // custom code start
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    public loaded= (args: ILoadedEventArgs) => {
        let mapsSVG: HTMLElement = document.getElementById('mapdrilldown_svg') as HTMLElement;
        if (mapsSVG) {
            mapsSVG.addEventListener('touchmove', (e: MouseEvent) => { touchmove = true; }, false);
        }
    };
    public shapeSelected = (args: IShapeSelectedEventArgs) : void => { 
        let shape: string = (args.shapeData as ShapeData).continent; 
        if (this.maps.baseLayerIndex === 0 && !touchmove) {
        if (shape === 'Africa') { 
            this.maps.baseLayerIndex = 1; 
            this.maps.refresh(); 
        } 
        else if (shape === 'Europe') { 
            this.maps.baseLayerIndex = 2; 
            this.maps.refresh(); 
        } 
        else if (shape === 'Asia') { 
            this.maps.baseLayerIndex = 3; 
            this.maps.refresh(); 
        } 
        else if (shape === 'North America') { 
            this.maps.baseLayerIndex = 4; 
            this.maps.refresh(); 
        }
        else if (shape === 'South America') {
            this.maps.baseLayerIndex = 5; 
            this.maps.refresh(); 
        } 
        else if (shape === 'Australia') { 
            this.maps.baseLayerIndex = 6; 
            this.maps.refresh(); 
        }
        let button: HTMLElement = document.getElementById('button'); button.style.display = 'block'; 
        document.getElementById('content').innerHTML = ''; 
        (<HTMLElement>document.getElementById('category')).style.visibility = 'visible';
        (<HTMLElement>document.getElementById('text')).innerHTML = shape;
        (<HTMLElement>document.getElementById('symbol')).style.visibility = 'visible';
    };
    touchmove = false;
}
    public zoomSettings: object = { enable: false };
    
    public layers: object[] = [
        {
            shapePropertyPath: 'continent',
            shapeDataPath: 'continent',
            dataSource: datasource ,
            shapeData: worldMap,
            shapeSettings: {
                colorValuePath: 'drillColor'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'continent'
            },
            markerSettings: [
                {
                    visible: true,
                    template: '<div id="marker1" class="markersTemplate" style="color:white;">Asia' +
                        '</div>',
                    dataSource: [
                        { latitude: 50.32087157990324, longitude: 90.015625 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="marker2" class="markersTemplate" style="color:white;">Australia' +
                        '</div>',
                    dataSource: [
                        { latitude: -28.88583769986199, longitude: 130.296875 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="marker3" class="markersTemplate" style="color:white;">Africa' +
                        '</div>',
                    dataSource: [
                        { latitude: 10.97274101999902, longitude: 16.390625 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="marker4" class="markersTemplate" style="color:white;">Europe' +
                        '</div>',
                    dataSource: [
                        { latitude: 47.95121990866204, longitude: 18.468749999999998 }
                    ],
                    animationDuration: 0,
                },
                {
                    visible: true,
                    template: '<div id="marker5" class="markersTemplate" style="width:50px;color:white;">North America' +
                        '</div>',
                    dataSource: [
                        { latitude: 59.88893689676585, longitude: -109.3359375 }
                    ],
                    animationDuration: 0
                },
                {
                    visible: true,
                    template: '<div id="marker6" class="markersTemplate" style="width:50px;color:white;">South America' +
                        '</div>',
                    dataSource: [
                        { latitude: -6.64607562172573, longitude: -55.54687499999999 }
                    ],
                    animationDuration: 0
                },
            ]
        },
        {
            shapeData: africa,
            shapeSettings: {
                fill: '#80306A'
            },
            highlightSettings: {
                enable: true,
                fill: '#80306A'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
        {
            shapeData: europe,
            shapeSettings: {
                fill: '#622D6C'
            },
            highlightSettings: {
                enable: true,
                fill: '#622D6C'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
        {
            shapeData: asia,
            shapeSettings: {
                fill: '#462A6D'
            },
            highlightSettings: {
                enable: true,
                fill: '#462A6D'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
        {
            shapeData: north_america,
            shapeSettings: {
                fill: '#C13664'
            },
            highlightSettings: {
                enable: true,
                fill: '#C13664'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
        {
            shapeData:  south_america,
            shapeSettings: {
                fill: '#9C3367'
            },
            highlightSettings: {
                enable: true,
                fill: '#9C3367'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        },
        {
            shapeData: oceania,
            shapeSettings: {
                fill: '#2A2870'
            },
            highlightSettings: {
                enable: true,
                fill: '#2A2870'
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            }
        }
    ]

    ngAfterViewInit(){
        document.getElementById('category').onclick = () => {
            this.maps.baseLayerIndex = 0;
            this.maps.refresh();
            let button: HTMLElement = document.getElementById('button');
            button.style.display = 'none';
            document.getElementById('content').innerHTML = 'Click on a shape to drill';
            (<HTMLElement>document.getElementById('category')).style.visibility = 'hidden';
            (<HTMLElement>document.getElementById('text')).innerHTML = '';
            (<HTMLElement>document.getElementById('symbol')).style.visibility = 'hidden';
        };
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default-datasource.json', 'world-map.json'];
    };
    // custom code end

}