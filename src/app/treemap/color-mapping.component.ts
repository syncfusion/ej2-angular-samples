/**
 * color-mapping
 */
// custom code start
//tslint:disable
// custom code end
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { TreeMap, TreeMapTooltip, LayoutMode, TreeMapAjax, ILoadEventArgs, TreeMapTheme } from '@syncfusion/ej2-angular-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import{ color } from './color'
TreeMap.Inject(TreeMapTooltip);

@Component({
    selector: 'control-content',
    templateUrl: 'color-mapping.html',
    encapsulation: ViewEncapsulation.None
})
export class TreemapcolorMappingComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        // let dropdownValue: HTMLInputElement = document.getElementById('colorMapping') as HTMLInputElement;
        // let opacityCheck: HTMLInputElement = document.getElementById('opacity') as HTMLInputElement;
        // if(dropdownValue.value === 'DesaturationColorMapping'){
        //     document.getElementById('hideOne').style.visibility = 'visible';
        //     if(opacityCheck.checked){
        //         document.getElementById('hideTwo').style.visibility = 'visible';
        //         document.getElementById('hideThree').style.visibility = 'visible';
        //     } else{
        //         document.getElementById('hideTwo').style.visibility = 'hidden';
        //         document.getElementById('hideThree').style.visibility = 'hidden';
        //     }
        // } else{
        //     document.getElementById('hideOne').style.visibility = 'hidden';                
        //     document.getElementById('hideTwo').style.visibility = 'hidden';
        //     document.getElementById('hideThree').style.visibility = 'hidden';
        // }
    }
    // custom code end
        public titleSettings: object = {
            text: 'Top 10 largest islands in the World',
            textStyle: { size: '15px' }
        };
        dataSource: any = color;
        weightValuePath: string = 'Area';
        public tooltipSettings: object = {
            visible: true,
            format: 'Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}',
            opacity: 0.8
        };
        public legendSettings: object = {
            visible: true,
            position: 'Bottom',
            mode: 'Interactive',
            height: '10',
            title: {
                text: 'Area'
            },
        };
        rangeColorValuePath: string = 'Area';
        public leafItemSettings: object = {
            labelPath: 'Name',
            border: { color: 'white', width: 0.5 },
            colorMapping: [
                { from: 100000, to: 250000, label: '0.1M - 0.25M', color: '#547C84' },
                { from: 250000, to: 550000, label: '0.25M - 0.55M', color: '#37AFAB' },
                { from: 550000, to: 750000, label: '0.55M - 0.75M', color: '#A4D6AD' },
                { from: 750000, to: 2250000, label: '0.75M - 2M', color: '#DEEBAE' },
                { to: null, from: null,  color: 'null' },
                { to: null, from: null,  color: 'null' },
            ]
        };
        ngAfterViewInit(): void {
            let opacity: EmitType<CheckBoxChangeEvents>;
            let highlightCheckBox: CheckBox = new CheckBox(
            {
                change: opacity, checked: false
            },
            '#opacity');
        document.getElementById('minopacity').onpointermove = document.getElementById('minopacity').ontouchmove =
        document.getElementById('minopacity').onchange = () => {
            if (highlightCheckBox.checked) {
            let slider: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
            let minOpacity: number = parseFloat(slider.value);
            this.treemap.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            this.treemap.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            this.treemap.refresh();
            }
    };
    document.getElementById('maxopacity').onpointermove = document.getElementById('maxopacity').ontouchmove =
    document.getElementById('maxopacity').onchange = () => {
        if (highlightCheckBox.checked) {
        let slider: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
        let maxOpacity: number = parseFloat(slider.value);
        this.treemap.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
        this.treemap.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
        this.treemap.refresh();
        }
    };
    highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
        let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
        let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
        if (e.checked) {
            document.getElementById('text2').style.display = 'block';
            document.getElementById('input2').style.display = 'block';
            document.getElementById('text3').style.display = 'block';
            document.getElementById('input3').style.display = 'block';
            this.treemap.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
            this.treemap.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
            this.treemap.leafItemSettings.colorMapping[1].minOpacity = parseFloat(minOpacity.value);
            this.treemap.leafItemSettings.colorMapping[1].maxOpacity = parseFloat(maxOpacity.value);            
        } else {
            document.getElementById('text2').style.display = 'none';
            document.getElementById('input2').style.display = 'none';
            document.getElementById('text3').style.display = 'none';
            document.getElementById('input3').style.display = 'none';
            this.treemap.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemap.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemap.leafItemSettings.colorMapping[1].maxOpacity = null;            
        }
        this.treemap.refresh();
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
                this.treemap.rangeColorValuePath = 'Area';
                this.treemap.leafItemSettings.colorMapping[1].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[1].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[2].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[2].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[3].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[3].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[4].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[4].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[5].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[5].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[0].from = 100000;
                this.treemap.leafItemSettings.colorMapping[0].to = 250000;
                this.treemap.leafItemSettings.colorMapping[0].value = null;
                this.treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[1].value = null;
                this.treemap.leafItemSettings.colorMapping[2].value = null;
                this.treemap.leafItemSettings.colorMapping[0].label = '0.1M - 0.25M';
                this.treemap.leafItemSettings.colorMapping[0].color = '#547C84';
                this.treemap.leafItemSettings.colorMapping[1].from = 250000;
                this.treemap.leafItemSettings.colorMapping[1].to = 500000;
                this.treemap.leafItemSettings.colorMapping[1].label = '0.25M - 0.50M';
                this.treemap.leafItemSettings.colorMapping[1].color = '#37AFAB';
                this.treemap.leafItemSettings.colorMapping[2].from = 500000;
                this.treemap.leafItemSettings.colorMapping[2].to = 750000;
                this.treemap.leafItemSettings.colorMapping[2].label = '0.5M - 0.75M';
                this.treemap.leafItemSettings.colorMapping[2].color = '#A4D6AD';
                this.treemap.leafItemSettings.colorMapping[2].value = null;
                this.treemap.leafItemSettings.colorMapping[3].from = 750000;
                this.treemap.leafItemSettings.colorMapping[3].to = 2200000;
                this.treemap.leafItemSettings.colorMapping[3].label = '0.75M - 2M';
                this.treemap.leafItemSettings.colorMapping[3].color = '#DEEBAE';
                this.treemap.leafItemSettings.colorMapping[4].from = null;
                this.treemap.leafItemSettings.colorMapping[3].value = null;
                this.treemap.leafItemSettings.colorMapping[4].to = null;
                this.treemap.leafItemSettings.colorMapping[4].label = null;
                this.treemap.leafItemSettings.colorMapping[4].value = null;
                this.treemap.leafItemSettings.colorMapping[4].color = null;
                this.treemap.leafItemSettings.colorMapping[5].to = null;
                this.treemap.leafItemSettings.colorMapping[5].label = null;
                this.treemap.leafItemSettings.colorMapping[5].value = null;
                this.treemap.leafItemSettings.colorMapping[5].color = null;
                this.treemap.leafItemSettings.colorMapping[5].from = null;
                this.treemap.legendSettings.title.text = 'Area';
                this.treemap.refresh();
            } else if (element === 'EqualColorMapping') {
                document.getElementById('text1').style.display = 'none';
                document.getElementById('input1').style.display = 'none';
                document.getElementById('text2').style.display = 'none';
                document.getElementById('input2').style.display = 'none';
                document.getElementById('text3').style.display = 'none';
                document.getElementById('input3').style.display = 'none';            
                this.treemap.rangeColorValuePath = null;
                this.treemap.leafItemSettings.colorMapping[0].from = null;
                this.treemap.leafItemSettings.colorMapping[0].to = null;
                this.treemap.leafItemSettings.colorMapping[0].label = null;
                this.treemap.leafItemSettings.colorMapping[1].label = null;
                this.treemap.leafItemSettings.colorMapping[2].label = null;
                this.treemap.leafItemSettings.colorMapping[3].label = null;
                this.treemap.leafItemSettings.colorMapping[4].label = null;
                this.treemap.leafItemSettings.colorMapping[0].value = 'North America';
                this.treemap.leafItemSettings.colorMapping[0].color = '#DEEBAE';
                this.treemap.leafItemSettings.colorMapping[1].from = null;
                this.treemap.leafItemSettings.colorMapping[1].to = null;
                this.treemap.leafItemSettings.colorMapping[1].value = 'Oceania';
                this.treemap.leafItemSettings.colorMapping[1].color = '#A4D6AD';
                this.treemap.leafItemSettings.colorMapping[2].from = null;
                this.treemap.leafItemSettings.colorMapping[2].to = null;
                this.treemap.leafItemSettings.colorMapping[2].value = 'Asia';
                this.treemap.leafItemSettings.colorMapping[2].color = '#37AFAB';
                this.treemap.leafItemSettings.colorMapping[3].from = null;
                this.treemap.leafItemSettings.colorMapping[3].to = null;
                this.treemap.leafItemSettings.colorMapping[3].value = 'Africa';
                this.treemap.leafItemSettings.colorMapping[3].color = '#547C84';
                this.treemap.leafItemSettings.colorMapping[4].from = null;
                this.treemap.leafItemSettings.colorMapping[4].to = null;
                this.treemap.leafItemSettings.colorMapping[4].value = 'Europe';
                this.treemap.leafItemSettings.colorMapping[4].color = '#CEBF93';
                this.treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[1].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[1].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[2].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[2].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[3].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[3].maxOpacity = null;
                this.treemap.leafItemSettings.colorMapping[4].minOpacity = null;
                this.treemap.leafItemSettings.colorMapping[4].maxOpacity = null;
                this.treemap.equalColorValuePath = 'Location';
                this.treemap.legendSettings.title.text = 'Continent';
                this.treemap.refresh();
            }else if (element === 'DesaturationColorMapping') {
                document.getElementById('text1').style.display = 'block';
                document.getElementById('input1').style.display = 'block';               
                this.treemap.rangeColorValuePath = 'Area';
                this.treemap.equalColorValuePath = null;
                let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
                let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
                this.treemap.leafItemSettings.colorMapping[2].from = null;
                this.treemap.leafItemSettings.colorMapping[2].to = null;
                this.treemap.leafItemSettings.colorMapping[1].from = null;
                this.treemap.leafItemSettings.colorMapping[1].to = null;
                this.treemap.leafItemSettings.colorMapping[1].label = null;
                this.treemap.leafItemSettings.colorMapping[3].from = null;
                this.treemap.leafItemSettings.colorMapping[3].to = null;
                this.treemap.leafItemSettings.colorMapping[0].from = 100000;
                this.treemap.leafItemSettings.colorMapping[0].to = 2230800;
                this.treemap.leafItemSettings.colorMapping[0].label = '0.1M - 2M';
                this.treemap.leafItemSettings.colorMapping[0].value = null;
                this.treemap.leafItemSettings.colorMapping[1].value = null;
                this.treemap.leafItemSettings.colorMapping[2].value = null;
                this.treemap.leafItemSettings.colorMapping[3].value = null;
                this.treemap.leafItemSettings.colorMapping[2].color = null;
                this.treemap.leafItemSettings.colorMapping[1].color = null;
                this.treemap.leafItemSettings.colorMapping[3].color = null;
                this.treemap.leafItemSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
                if (highlightCheckBox.checked) {
                    document.getElementById('text2').style.display = 'block';
                    document.getElementById('input2').style.display = 'block';
                    document.getElementById('text3').style.display = 'block';
                    document.getElementById('input3').style.display = 'block';
                    this.treemap.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
                    this.treemap.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
                } else {
                    this.treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                    this.treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                }
                this.treemap.legendSettings.title.text = 'Area';
                this.treemap.refresh();
            }
        }
    });
    sampleValue.appendTo('#colorMapping');
            }
            constructor(@Inject('sourceFiles') private sourceFiles: any) {
                sourceFiles.files = ['color.ts' ];
            }
    };