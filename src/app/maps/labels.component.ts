/**
 * Maps data label sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MapsTheme, Maps, MapsTooltip, DataLabel, ILoadEventArgs, SmartLabelMode, IntersectAction, MapsModule } from '@syncfusion/ej2-angular-maps'; 
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { FormsModule } from '@angular/forms';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(MapsTooltip, DataLabel);
declare var require: any;
let usMap: object[] = require('./usa.json');
@Component({
    selector: 'control-content',
    templateUrl: 'labels.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, FormsModule, SBDescriptionComponent]
})
export class MapsLabelComponent {
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
    public zoomSettings: object = {
        enable: false
    };
    
    public layers: object[] = [
        { 
            shapeData:  usMap,
            shapePropertyPath:'iso_3166_2',
            dataLabelSettings: {
                visible: true,
                labelPath: 'name',
                smartLabelMode: 'Trim'
            },
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
        width: '100%',
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
            width: '100%',
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
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'usa.json'];
    };
    // custom code end

}