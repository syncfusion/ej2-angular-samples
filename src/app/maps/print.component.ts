/**
 * Print sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MapsTheme, Maps, Legend, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject( MapsTooltip, Legend);
declare var require: any;
let usMap: object[] = require('./usa.json');
let population: object[] = require('./us-population.json');
@Component({
    selector: 'control-content',
    templateUrl: 'print.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsPrintComponent {
    @ViewChild('maps')
    public maps: Maps;
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public zoomSettings: object= {
        enable: false
    };
    public legendSettings: object = {
            visible: true,
            mode: 'Interactive',
            position: 'Bottom',
            height: '10',
            width: '350',
            labelDisplayMode: 'Trim',
            alignment: 'Center'
        };
    public titleSettings: object = {
        text: 'State-wise US population - 2010',
        titleStyle: { size: '16px' },
    };

    public layers: object[] =  [
        {
            shapeData: usMap,
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            dataSource: population,
               shapeSettings: {
                border: {
                    width: 0.5,
                    color: 'gray'
                },
                colorValuePath: 'population',
                colorMapping: [
                    {
                        from: 580000 , to: 2800000, color: '#dae8f1', label: '<3M'
                    },
                    {
                        from: 2800000, to: 5280000, color: '#b0cde1', label: '3-6M'
                    },
                    {
                        from: 5280000, to:  8260000, color: '#90bad8', label: '6-9M'
                    },
                    {
                        from: 8260000, to: 11660000, color: '#6ea7d2', label: '9-12M'
                    },
                    {
                        from: 11660000, to: 19600000, color: '#4c96cb', label: '12-20M'
                    },
                    {
                        from: 19600000, to: 26500000, color: '#3182bd', label: '20-25M'
                    },
                    {
                        from: 26500000, to: 38400000, color: '#004374', label: '>25M'
                    }
                ]
            },
               tooltipSettings: {
                   visible: true,
                   valuePath: 'population',
                   format: 'State: ${name} <br> Population: ${population}'
               }
            }
    ];
    public mode(e: Event): void {
        this.maps.print();
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'usa.json', 'us-population.json'];
    };

}