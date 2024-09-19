/**
 * Export sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MapsTheme, Maps, Marker, MapsTooltip, ILoadEventArgs, ExportType, MapsModule } from '@syncfusion/ej2-angular-maps';
import { PdfExportService, ImageExportService } from '@syncfusion/ej2-angular-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MapAjax } from '@syncfusion/ej2-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
declare var require: any;
let worldMap: object[] = require('./world-map.json');
Maps.Inject(Marker, MapsTooltip);
@Component({
    selector: 'control-content',
    templateUrl: 'export.html',
    encapsulation: ViewEncapsulation.None,
    providers: [PdfExportService, ImageExportService],
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, FormsModule, ButtonModule, SBDescriptionComponent, TextBoxModule]
})
export class MapsExportComponent {
    @ViewChild('maps')
    public maps: Maps;
    public allowPdfExport: boolean = true;
    public allowImageExport: boolean = true;
    public downloadFileName: string = 'Maps';
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public zoomSettings: object= {
        enable: false
    };
    public legendSettings: object = { visible: true };

    public titleSettings: object = {
        text: 'Location of the Wonders in the World',
        titleStyle: { size: '16px' },
    };

    public layers: object[] =  [
        {
                shapeData:  worldMap,
                shapeSettings: { fill: 'lightgrey', border: { color: 'black', width: 0.1 } },
                markerSettings: [
                    {
                        visible: true,
                        dataSource: [
                            { longitude: 116.5703749, latitude: 40.4319077, name: 'The Great Wall of China, China ' },
                            { longitude: 35.4443622, latitude: 30.3284544, name: 'Petra, Jorden' },
                            { longitude: 78.0421552, latitude: 27.1750151, name: 'Taj Mahal, Agra, India' },
                            { longitude: 12.4922309, latitude: 41.8902102, name: 'The Roman Colosseum, Rome, Italy' },
                            { longitude: -88.5677826, latitude: 20.6842849, name: 'The Chichen Itza, Mexico' },
                            { longitude: -72.5449629, latitude: -13.1631412, name: 'Machu Picchu, Peru' },
                            { longitude: -43.2104872, latitude: -22.951916, name: 'Christ Redeemer, Rio de janeiro, Brazil' },
                        ],
                        shape: 'Balloon',
                        fill: '#E13E40',
                        height: 20,
                        width: 15,
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name'
                        },
                    }
                ],
            }
    ];
    public onClick(e: Event): void {
        this.maps.export(<ExportType>this.exportType.value, this.downloadFileName);
    }
    public change(target: any): void {
        this.downloadFileName = target.value;
    }
    public exportType: DropDownList;
    public layerType: DropDownList;
    public modeData : string[] = ['JPEG', 'PNG', 'PDF', 'SVG'];
    ngOnInit(): void {
        this.exportType = new DropDownList({
            index: 0,
            dataSource: this.modeData,
            width: '100%',
        });
        this.exportType.appendTo('#exporttype');
        this.layerType = new DropDownList({
            index: 0,
            width: '100%',
            change: () => {
                if (this.layerType.value === 'OSM') {
                    this.maps.layers[this.maps.layersCollection.length - 1].urlTemplate = 'https://tile.openstreetmap.org/level/tileX/tileY.png';
                    this.maps.layers[this.maps.layersCollection.length - 1].shapeData = null;
                    if (this.exportType.value === 'SVG') {
                        this.exportType.value = this.modeData[0];
                    }
                    this.exportType.dataSource = this.modeData.slice(0, 3);
                    
                } else {
                    this.maps.layers[this.maps.layersCollection.length - 1].shapeData = worldMap;
                    this.maps.layers[this.maps.layersCollection.length - 1].urlTemplate = '';
                    this.exportType.dataSource = this.modeData;
                }
                this.maps.refresh();
            }
        });
        this.layerType.appendTo('#layertype');
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'world-map.json'];
    };
    // custom code end

}