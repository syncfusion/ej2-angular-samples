/**
 * Legend Sample
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Legend, MapsTooltip, ILoadEventArgs, ITooltipRenderEventArgs, LegendPosition, LegendMode, MapsModule } from '@syncfusion/ej2-angular-maps';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';

Maps.Inject(Legend, MapsTooltip);
declare var require: any;
let worldMap: object[] = require('./world-map.json');
let population: object[] = require('./population-density.json');
@Component({
    selector: 'control-content',
    templateUrl: 'legend.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, FormsModule, SBDescriptionComponent]
})
export class MapsLegendComponent {
 @ViewChild('maps')
 public maps: Maps;
    public load = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    }
    public titleSettings: object = {
        text: 'Population density (per square kilometer) - 2015',
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
            shapeData: worldMap,
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            dataSource: population,
            tooltipSettings: {
                visible: true,
                valuePath: 'name',
                format: '${name} : ${density}'
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
                    },
                    {
                        color: null, label: null
                    }

                ]
            }
        }
    ];
    ngAfterViewInit(): void {
        let legendPosition: DropDownList = new DropDownList({
            index: 0,
            placeholder: 'Legend Position',
            width: '100%',
            change: () => {
                this.maps.legendSettings.position = <LegendPosition>legendPosition.value;
                if (legendPosition.value === 'Left' || legendPosition.value === 'Right') {
                    this.maps.legendSettings.orientation = 'Vertical';
                    if (this.maps.legendSettings.mode === 'Interactive') {
                        this.maps.legendSettings.height = '70%';
                        this.maps.legendSettings.width = '10';
                    } else {
                        this.maps.legendSettings.height = '';
                        this.maps.legendSettings.width = '';
                    }
                } else {
                    this.maps.legendSettings.orientation = 'Horizontal';
                    if (this.maps.legendSettings.mode === 'Interactive') {
                        this.maps.legendSettings.height = '10';
                        this.maps.legendSettings.width = '';
                    }
                }
                this.maps.refresh();
            }
        });
        legendPosition.appendTo('#legendPosition');
        let mode: DropDownList = new DropDownList({
            index: 0,
            placeholder: 'Select layoutMode type',
            width: '100%',
            change: () => {
                this.maps.legendSettings.mode = <LegendMode>mode.value;
                if (mode.value === 'Interactive') {
                    if (this.maps.legendSettings.orientation === 'Horizontal' || this.maps.legendSettings.orientation === 'None') {
                        this.maps.legendSettings.height = '10';
                        this.maps.legendSettings.width = '';
                    } else {
                        this.maps.legendSettings.height = '70%';
                        this.maps.legendSettings.width = '10';
                    }
                } else {
                    this.maps.legendSettings.height = '';
                    this.maps.legendSettings.width = '';
                }
                this.maps.refresh();
            }
        });
        mode.appendTo('#legendMode');
        let opacity: EmitType<CheckBoxChangeEvents>;
        let highlightCheckBox: CheckBox = new CheckBox(
        {
            change: opacity, checked: false
        },
        '#opacity');
        highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
            if (e.checked) {
                this.maps.layers[0].shapeSettings.colorMapping[5].from = 0;
                this.maps.layers[0].shapeSettings.colorMapping[5].to = 0;
                this.maps.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
                this.maps.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
            } else {
                this.maps.layers[0].shapeSettings.colorMapping[5].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].to = null;
            }
            this.maps.refresh();
        };
        let toggleLegend: EmitType<CheckBoxChangeEvents>;
        let toggleLegendCheckBox: CheckBox = new CheckBox(
        {
            change: toggleLegend, checked: false
        },
        '#toggleLegend');
        toggleLegendCheckBox.change = toggleLegend = (e: CheckBoxChangeEvents) => {
            this.maps.legendSettings.toggleLegendSettings.enable = e.checked;
        }
        this.maps.refresh();
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'population-density.json','world-map.json'];
    };
    // custom code end
}