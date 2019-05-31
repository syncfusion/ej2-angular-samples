/**
 * Heat Map sample
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, MapsTooltip, Legend, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';

Maps.Inject(Marker, MapsTooltip, Legend);
declare var require: any;
let india: object[] = require('./india.json');
let population: object[] = require('./india-population.json');
@Component({
    selector: 'control-content',
    templateUrl: 'heatmap.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsHeatmapComponent {
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public titleSettings: object = {
        text: 'State wise India\'s population - 2011',
        titleStyle: { size: '16px' }
    };

    public legendSettings: object = { visible: true, mode: 'Interactive', position: 'Bottom', height: '10', width: '350', alignment: 'Center' };

    public zoomSettings: object = { enable: false };

    public layers: object[] = [
        {
            shapeData: india,
            shapePropertyPath: 'NAME_1',
            shapeDataPath: 'Name',
            dataSource: population,
            tooltipSettings: {
                visible: true,
                valuePath: 'population',
                format: 'State: ${Name} <br> Population: ${population}'
            },
            shapeSettings: {
                border: {
                    width: 0.2,
                    color: 'white'
                },
                colorValuePath: 'population',
                colorMapping: [{
                    from: 60000, to: 400000, color: '#9fdfdf', label: '<0.4M'
                },
                {
                    from: 400000, to: 10000000, color: '#79d2d2', label: '0.4-10M'
                },
                {
                    from: 10000000, to: 20000000, color: '#53C6C6', label: '10-20M'
                },
                {
                    from: 20000000, to: 70000000, color: '#39acac', label: '20-70M'
                },
                {
                    from: 70000000, to: 100000000, color: '#339999', label: '70-100M'
                },
                {
                    from: 100000000, to: 200000000, color: '#2d8686', label: '>100M'
                }
                ]
            }
        }
    ];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'india-population.json', 'india.json'];
    };

}