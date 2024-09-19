/**
 * Bubble sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Bubble, IBubbleRenderingEventArgs, MapsTooltip, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import {  internetUsers } from './population-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Bubble, MapsTooltip); 
let worldMap: object[] = require('./world-map.json');
export interface Data { value?: number; }
declare var require: any;
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsBubbleComponent {
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public zoomSettings: object= {
        enable: true,
        toolbarSettings: {
            orientation:'Vertical',
            horizontalAlignment: 'Near',
        },
        pinchZooming: true
    }
    
    public titleSettings : object =  {
        text: 'Top 30 countries with highest Internet users',
        titleStyle: {
            size: '16px'
        }
    }

    public layers: object[] =  [
        {
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            shapeData:  worldMap,
            shapeSettings: {
                fill: '#E5E5E5'
            },
            bubbleSettings: [
                {
                    visible: true,
                    valuePath: 'value',
                    colorValuePath: 'color',
                    minRadius: 3,
                    maxRadius: 70,
                    opacity: 0.8,
                    dataSource: internetUsers,
                    tooltipSettings: {
                        visible: true,
                        valuePath: 'population',
                        template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Rank : </span><span class="listing2">${rank}</span> </div> <div> <span class="listing1">Population : </span><span class="listing2">${population}</span> </div> </div> </div>'
                    },
                }
            ]
        }
    ]

    public bubbleRendering = (args: IBubbleRenderingEventArgs) => { 
        args.radius = (args.data as Data).value; 
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['population-data.ts', 'world-map.json'];
    };
    // custom code end

}