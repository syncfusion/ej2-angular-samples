import { Component, ViewEncapsulation } from '@angular/core';
import { MapsTheme, Maps, Legend, MapsTooltip, ILoadEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';

Maps.Inject(Legend, MapsTooltip);

/**
 * Legend Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'legend.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsLegendComponent {
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public titleSettings: object = {
        text: 'Population density (per square kilometers) - 2015',
        titleStyle: { size: '16px' }
    };

    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        if (!args.options['data']) {
            args.cancel = true;
        }
    }

    public legendSettings: object = { visible: true, position: 'Top' };

    public zoomSettings: object = { enable: false };

    public layers: object[] = [
        {
            shapeData: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json'),
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            dataSource: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/population-density.json'),
            tooltipSettings: {
                visible: true,
                valuePath: 'name',
                format: '${name} : ${density} per square kms'
            },
            shapeSettings: {
                colorValuePath: 'density',
                fill: '#E5E5E5',
                colorMapping: [
                    {
                        from: 0.00001, to: 100, color: 'rgb(153,174,214)', label: '<100'
                    },
                    {
                        from: 100, to: 200, color: 'rgb(115,143,199)', label: '100 - 200'
                    },
                    {
                        from: 200, to: 300, color: 'rgb(77,112,184)', label: '200 - 300'
                    },
                    {
                        from: 300, to: 500, color: 'rgb(38,82,168)', label: '300 - 500'
                    },
                    {
                        from: 500, to: 19000, color: 'rgb(0,51,153)', label: '>500'
                    }
                ]
            }
        }
    ];
    constructor() {
        //code
    };
}