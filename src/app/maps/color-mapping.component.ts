/**
 * Colormapping sample
 */
// custom code start
//tslint:disable
// custom code end
import { Component,ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MapsTheme, Maps, Legend, Marker, MapsTooltip, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
Maps.Inject(Legend, Marker, MapsTooltip);
declare var require: any;
let usMap: object[] = require('./usa.json');
let colorMapping: object[] = require('./color-mapping.json');
@Component({
    selector: 'control-content',
    templateUrl: 'color-mapping.html',
    encapsulation: ViewEncapsulation.None
})
export class ColorMappingComponent {
    @ViewChild('maps')
    public maps: Maps
    titleSettings: object = {
        text: 'Spring Precipitation Averages of US States',
        textStyle: {
            size: '16px'
        }
    };
    public zoomSettings: object = {
        enable: false
    };
    public legendSettings: object = {
        visible: true,
        position: 'Bottom',
        height: '10',
        width: '80%',
        mode: 'Interactive',
        titleStyle: {
            size: '18px'
        },
        title: {
            text: 'Inches'
        },
    }
    public layers: object[] = [
        {
            dataSource : colorMapping,
            shapeDataPath: 'State',
            shapeData: usMap,
            shapePropertyPath: 'name',
            shapeSettings: {
                colorValuePath: 'inches',
                fill: '#E5E5E5',
                border: {
                    color: 'black',
                    width: 0.2
                },
                colorMapping: [
                    {
                        from: 0.1, to: 1, color: '#DEEBAE', label: '0 - 1'
                    },
                    {
                        from: 1, to: 2, color: '#A4D6AD', label: '1 - 2'
                    },
                    {
                        from: 2, to: 3, color: '#37AFAB', label: '2 - 3'
                    },
                    {
                        from: 3, to: 4, color: '#547C84', label: '3 - 4'
                    },
                    {
                        from: 4, to: 5, color: '#CEBF93', label: '4 - 5'
                    },
                    {
                        from: 5, to: 6, color: '#CEBF93', label: '5 - 6'
                    },
                ],
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'State',
                template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${State} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Inches : </span><span class="listing2">${inches}</span> </div> <div> <span class="listing1">Category : </span><span class="listing2">${value}</span> </div> </div> </div>'
            },
        }
    ];
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        let dropdownValue: HTMLInputElement = document.getElementById('colorMapping') as HTMLInputElement;
        let opacityCheck: HTMLInputElement = document.getElementById('opacity') as HTMLInputElement;
    }
    // custom code end
    ngAfterViewInit(): void {
        document.getElementById('minopacity').onpointermove = document.getElementById('minopacity').ontouchmove =
    document.getElementById('minopacity').onchange = () => {
        let slider: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
        let minOpacity: number = parseFloat(slider.value);
        this.maps.layers[0].shapeSettings.colorMapping[0].minOpacity = minOpacity;
        this.maps.layers[0].shapeSettings.colorMapping[1].minOpacity = minOpacity;
        this.maps.refresh();
    };
    document.getElementById('maxopacity').onpointermove = document.getElementById('maxopacity').ontouchmove =
    document.getElementById('maxopacity').onchange = () => {
        let slider: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
        let maxOpacity: number = parseFloat(slider.value);
        this.maps.layers[0].shapeSettings.colorMapping[0].maxOpacity = maxOpacity;
        this.maps.layers[0].shapeSettings.colorMapping[1].maxOpacity = maxOpacity;
        this.maps.refresh();
    };
    let opacity: EmitType<CheckBoxChangeEvents>;
    let highlightCheckBox: CheckBox = new CheckBox(
    {
        change: opacity, checked: false
    },
    '#opacity');
    highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
        let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
        let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
        if (e.checked) {
            document.getElementById('text2').style.display = 'block';
            document.getElementById('input2').style.display = 'block';
            document.getElementById('text3').style.display = 'block';
            document.getElementById('input3').style.display = 'block';
            this.maps.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
            this.maps.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
            this.maps.layers[0].shapeSettings.colorMapping[1].minOpacity = parseFloat(minOpacity.value);
            this.maps.layers[0].shapeSettings.colorMapping[1].maxOpacity = parseFloat(maxOpacity.value);           
        } else {
            document.getElementById('text2').style.display = 'none';
            document.getElementById('input2').style.display = 'none';
            document.getElementById('text3').style.display = 'none';
            document.getElementById('input3').style.display = 'none';
            this.maps.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
            this.maps.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            this.maps.layers[0].shapeSettings.colorMapping[1].minOpacity = null;
            this.maps.layers[0].shapeSettings.colorMapping[1].maxOpacity = null;           
        }
        this.maps.refresh();
    };
    let sampleValue: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Range ColorMaping',
        width: '110%',
        change: () => {
            let element: string = sampleValue.value.toString();
            if (element === 'RangeColorMapping') {
                document.getElementById('text1').style.display = 'none';
                document.getElementById('input1').style.display = 'none';
                document.getElementById('text2').style.display = 'none';
                document.getElementById('input2').style.display = 'none';
                document.getElementById('text3').style.display = 'none';
                document.getElementById('input3').style.display = 'none';               
                this.maps.layers[0].shapeSettings.colorValuePath = 'inches';
                this.maps.layers[0].shapeSettings.colorMapping[0].from = 0.1;
                this.maps.layers[0].shapeSettings.colorMapping[0].to = 1;
                this.maps.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
                this.maps.layers[0].shapeSettings.colorMapping[0].label = '0 - 1';
                this.maps.layers[0].shapeSettings.colorMapping[0].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].from = 1;
                this.maps.layers[0].shapeSettings.colorMapping[1].to = 2;
                this.maps.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
                this.maps.layers[0].shapeSettings.colorMapping[1].label = '1 - 2';
                this.maps.layers[0].shapeSettings.colorMapping[1].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].from = 2;
                this.maps.layers[0].shapeSettings.colorMapping[2].to = 3;
                this.maps.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
                this.maps.layers[0].shapeSettings.colorMapping[2].label = '2 - 3';
                this.maps.layers[0].shapeSettings.colorMapping[2].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].from = 3;
                this.maps.layers[0].shapeSettings.colorMapping[3].to = 4;
                this.maps.layers[0].shapeSettings.colorMapping[3].color = '#547C84';
                this.maps.layers[0].shapeSettings.colorMapping[3].label = '3 - 4';
                this.maps.layers[0].shapeSettings.colorMapping[3].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].from = 4;
                this.maps.layers[0].shapeSettings.colorMapping[4].to = 5;
                this.maps.layers[0].shapeSettings.colorMapping[4].color = '#637391';
                this.maps.layers[0].shapeSettings.colorMapping[4].label = '4 - 5';
                this.maps.layers[0].shapeSettings.colorMapping[4].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].from = 5;
                this.maps.layers[0].shapeSettings.colorMapping[5].to = 6;
                this.maps.layers[0].shapeSettings.colorMapping[5].color = '#a69d70';
                this.maps.layers[0].shapeSettings.colorMapping[5].label = '5 - 6';
                this.maps.layers[0].shapeSettings.colorMapping[5].value = null;
                this.maps.legendSettings.title.text = 'Inches';
                this.maps.refresh();
            } else if (element === 'EqualColorMapping') {
                document.getElementById('text1').style.display = 'none';
                document.getElementById('input1').style.display = 'none';
                document.getElementById('text2').style.display = 'none';
                document.getElementById('input2').style.display = 'none';
                document.getElementById('text3').style.display = 'none';
                document.getElementById('input3').style.display = 'none';               
                this.maps.layers[0].shapeSettings.colorValuePath = 'value';
                this.maps.layers[0].shapeSettings.colorMapping[0].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[0].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
                this.maps.layers[0].shapeSettings.colorMapping[0].value = 'Low';
                this.maps.layers[0].shapeSettings.colorMapping[0].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
                this.maps.layers[0].shapeSettings.colorMapping[1].value = 'Moderate';
                this.maps.layers[0].shapeSettings.colorMapping[1].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
                this.maps.layers[0].shapeSettings.colorMapping[2].value = 'High';
                this.maps.layers[0].shapeSettings.colorMapping[2].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].value = null;
                this.maps.legendSettings.title.text = 'Category';
                this.maps.refresh();
            }
            if (element === 'DesaturationColorMapping') {
                document.getElementById('text1').style.display = 'block';
                document.getElementById('input1').style.display = 'block';
                let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
                let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
                if (highlightCheckBox.checked) {
                    document.getElementById('text2').style.display = 'block';
                    document.getElementById('input2').style.display = 'block';
                    document.getElementById('text3').style.display = 'block';
                    document.getElementById('input3').style.display = 'block';
                    this.maps.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
                    this.maps.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
                } else {
                    this.maps.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
                    this.maps.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
                }
                this.maps.layers[0].shapeSettings.colorValuePath = 'inches';
                this.maps.layers[0].shapeSettings.colorMapping[0].from =  0.1;
                this.maps.layers[0].shapeSettings.colorMapping[0].to = 6;
                this.maps.layers[0].shapeSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
                this.maps.layers[0].shapeSettings.colorMapping[0].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[0].label = '0 - 6';
                this.maps.layers[0].shapeSettings.colorMapping[1].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[1].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[2].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[3].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[4].value = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].from = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].to = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].color = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].label = null;
                this.maps.layers[0].shapeSettings.colorMapping[5].value = null;
                this.maps.legendSettings.title.text = 'Inches';
                this.maps.refresh();                
            }
        }
    });
    sampleValue.appendTo('#colorMapping');
};
constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['color-mapping.json', 'usa.json'];
};
}