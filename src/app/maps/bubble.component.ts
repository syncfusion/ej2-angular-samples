/**
 * Bubble sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Bubble, IBubbleRenderingEventArgs, MapsTooltip, ILoadEventArgs, } from '@syncfusion/ej2-angular-maps';
import {  internetUsers } from './population-data';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Bubble, MapsTooltip); 

export interface Data { value?: number; }
declare var require: any;
let worldMap: object[] = require('./world-map.json');
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html', 
    encapsulation: ViewEncapsulation.None
})
export class MapsBubbleComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => { 
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public zoomSettings: object= {
        enable: true,
        horizontalAlignment: 'Near',
        toolBarOrientation: 'Vertical',
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
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['population-data.ts', 'world-map.json'];
    };

}