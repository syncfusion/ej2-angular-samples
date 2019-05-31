/**
 * Maps data label sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MapsTheme, Maps, MapsTooltip, DataLabel, ILoadEventArgs, SmartLabelMode, IntersectAction } from '@syncfusion/ej2-angular-maps'; 
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(MapsTooltip, DataLabel);
declare var require: any;
let usMap: object[] = require('./usa.json');
@Component({
    selector: 'control-content',
    templateUrl: 'labels.html',  
    encapsulation: ViewEncapsulation.None
})
export class MapsLabelComponent {
    @ViewChild('maps')
    public maps: Maps;
    // custom code start
    public load = (args: ILoadEventArgs) => { 
        let theme: string = location.hash.split('/')[1]; 
        theme = theme ? theme : 'Material'; 
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public zoomSettings: object = {
        enable: false
    };
    
    public layers: object[] = [
        {
            dataLabelSettings: {
                visible: true,
                labelPath: 'name',
                smartLabelMode: 'Trim'
            },
            shapeData:  usMap,
            shapeSettings: {
                autofill: true
            },
            tooltipSettings: {
                visible: true,
                valuePath: 'name'
            },
        }
    ];
    
    ngAfterViewInit(){
        let smartlabelmode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select smartlabel mode',
        width: 120,
            change: () => {
                let mode: string = <string>smartlabelmode.value.toString();                
                switch(mode){
                    case 'none':
                        mode = 'None';
                        break;
                    case 'trim':
                        mode = 'Trim';
                        break;
                    case 'hide':
                        mode = 'Hide';
                        break;
                }
                
                this.maps.layers[0].dataLabelSettings.smartLabelMode = <SmartLabelMode>mode;
                this.maps.refresh();
            }
        });
        smartlabelmode.appendTo('#smartlabelmode');  
        
        let intersectaction: DropDownList = new DropDownList({
            index: 0,
            placeholder: 'Select intersect action',
            width: 120,
            change: () => {
                let mode: string = <string>intersectaction.value.toString();
                switch(mode){
                    case 'none':
                        mode = 'None';
                        break;
                    case 'trim':
                        mode = 'Trim';
                        break;
                    case 'hide':
                        mode = 'Hide';
                        break;
                }
                this.maps.layers[0].dataLabelSettings.intersectionAction = <IntersectAction>mode;
                this.maps.refresh();
            }
        });
        intersectaction.appendTo('#intersectaction');
        document.getElementById('select').onchange = () => { 
            let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
            this.maps.layers[0].dataLabelSettings.visible = element.checked;
            this.maps.refresh();
        }
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'usa.json'];
    };

}