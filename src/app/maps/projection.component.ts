import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MapsTheme, Maps, Zoom, Legend, ProjectionType, MapsTooltip, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Zoom, Legend, MapsTooltip);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
@Component({
    selector: 'control-content',
    templateUrl: 'projection.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, FormsModule, SBDescriptionComponent]
})
export class MapsProjectionComponent {
    @ViewChild('maps')
    public maps: Maps;
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
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
            dataSource : [
                { Country: 'China', Membership: 'Permanent' },
                { Country: 'France', Membership: 'Permanent' },
                { Country: 'Russia', Membership: 'Permanent' },
                { Country: 'United Kingdom', Membership: 'Permanent' },
                { Country: 'United States', Membership: 'Permanent' },
                { Country: 'Bolivia', Membership: 'Non-Permanent' },
                { Country: 'Eq. Guinea', Membership: 'Non-Permanent' },
                { Country: 'Ethiopia', Membership: 'Non-Permanent' },
                { Country: 'Côte d Ivoire', Membership: 'Permanent' },
                { Country: 'Kazakhstan', Membership: 'Non-Permanent' },
                { Country: 'Kuwait', Membership: 'Non-Permanent' },
                { Country: 'Netherlands', Membership: 'Non-Permanent' },
                { Country: 'Peru', Membership: 'Non-Permanent' },
                { Country: 'Poland', Membership: 'Non-Permanent' },
                { Country: 'Sweden', Membership: 'Non-Permanent' },
                ],
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
            index: 0, placeholder: 'Select projection type', width: '110%',
            change: () => {
                this.maps.projectionType = <ProjectionType>projection.value;
                this.maps.refresh();
            }
        });
        projection.appendTo('#projectiontype');
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'world-map.json'];
    };
    // custom code end

}