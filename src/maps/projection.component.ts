import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MapsTheme, Maps, Zoom, Legend, ProjectionType, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-ng-maps';
import { World_Map } from './MapData/WorldMap';
import { unCountries } from './MapData/UNOCountries';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


Maps.Inject(Zoom, Legend, MapsTooltip);
let worldMap: object = World_Map;

/**
 * Changing projection sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'projection.html',
    styleUrls: ['maps.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MapsProjectionComponent {
    @ViewChild('maps')
    public maps: Maps;
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public zoomSettings: object= {
        enable: false
    };
    public legendSettings: object = { visible: true };

    public titleSettings: object = {
        text: 'Members of the UN Security Council',
        titleStyle: { size: '16px' },
        subtitleSettings: {
            text: '- In 2017',
            titleStyle: { alignment: 'Far' }
        }
    };

    public layers: object[] =  [
        {
            shapeData: worldMap,
            shapeDataPath: 'Country',
            shapePropertyPath: 'name',
            dataSource : unCountries,
            tooltipSettings: {
                visible: true,
                valuePath: 'Country',
            },
            shapeSettings: {
                fill: '#E5E5E5',
                colorMapping: [
                    {
                        value: 'Permanent',
                        color: '#EDB46F'
                    },
                    {
                        color: '#F1931B',
                        value: 'Non-Permanent'
                    }
                ],
                colorValuePath: 'Membership'
            }
        }
    ];
    ngAfterViewInit(){
        let projection: DropDownList = new DropDownList({
            index: 0, placeholder: 'Select projection type', width: 120,
            change: () => {
                this.maps.projectionType = <ProjectionType>projection.value;
                this.maps.refresh();
            }
        });
        projection.appendTo('#projectiontype');
    }
    constructor() {
        
    };

}