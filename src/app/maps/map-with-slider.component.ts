/**
 * Maps with slider
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, ILoadEventArgs, ILoadedEventArgs, Annotations } from '@syncfusion/ej2-angular-maps';
import { Slider, SliderChangeEventArgs  } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { MapAjax } from '@syncfusion/ej2-maps'; 

Maps.Inject(Marker, MapsTooltip, DataLabel, Annotations);
let colorCodes: string[] = ['#7E9CDC', '#DCD57E', '#7EDCA2', '#6EB5D0', '#A6DC7E', '#DCA87E', '#d075c6'];
let sliderVal: number | number[] = [-2 , 4];
declare var require: any;
let north_america: object[] = require('./north-america.json');
let population: object[] = require('./population-growth.json');
@Component({
    selector: 'control-content',
    templateUrl: 'map-with-slider.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsWithSliderComponent {
@ViewChild('maps')
    public maps: Maps
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public margin: object = {
        bottom: 20
    };
    public zoomSettings: object = {
        enable: false
    }
    public titleSettings: object = {
        text: 'Average annual population growth in North American countries',
        textStyle: {
            size: '16px'
        }
    };
    public annotations: object[]= [
        {
            content: '#mapslider-annotation',
            horizontalAlignment: 'Center',
            y: '93%'
        }
    ];

    public loaded = (args: ILoadedEventArgs) => {
        if (!isNullOrUndefined( document.getElementById(args.maps.element.id + '_Annotation_0'))) {
            this.annotationRender(sliderVal);
        }
    };
    public layers: object[] = [
        {
            shapeData: north_america,
            shapePropertyPath: 'name',
            shapeDataPath: 'name',
            dataSource: population,
            shapeSettings: {
                colorValuePath: 'population',
                colorMapping: [
                    {
                        from: -1.5, to: -0.75, color: '#7E9CDC'
                    },
                    {
                        from: -0.75, to: 0, color: '#DCD57E'
                    },
                    {
                        from: 0.1, to: 0.75, color: '#7EDCA2'
                    },
                    {
                        from: 0.76, to: 1.5, color: '#6EB5D0'
                    },
                    {
                        from: 1.5, to: 2.25, color: '#A6DC7E'
                    },
                    {
                        from: 2.25, to: 3, color: '#DCA87E'
                    },
                    {
                        from: 3, to: 3.75, color: '#d075c6'
                    }
                ]
            },
            tooltipSettings: {
                visible: true,
                format: '${name} : ${population}%'
            }
        }
  
    ];
    public annotationRender(val: number | number[]): void {
        let slider: Slider = new Slider({
            min: -1.5, max: 3.75,
            value: val,
            step: 0.75,
            type: 'Range',
            ticks: { placement: 'After', largeStep: 0.75 },
            changed: (args: SliderChangeEventArgs) => {
                debugger;
                if (!isNaN(args.value[0]) && !isNaN(args.value[1])) {
                    for (let i: number = 0; i < this.maps.layers[0].shapeSettings.colorMapping.length; i++) {
                        args.value[0] = args.value[0] === -2 ? -2.1 : args.value[0];
                        if (this.maps.layers[0].shapeSettings.colorMapping[i].from < args.value[0] ||
                            this.maps.layers[0].shapeSettings.colorMapping[i].to > args.value[1]) {
                            this.maps.layers[0].shapeSettings.colorMapping[i].color = '#E5E5E5';

                            } else {
                                this.maps.layers[0].shapeSettings.colorMapping[i].color = colorCodes[i];
                            }
                        }
                    }
                    sliderVal = args.value;
                    this.maps.refresh();
                }
        });
        slider.appendTo('#mapannotation');
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'population-growth.json', 'north-america.json',];
    };
}