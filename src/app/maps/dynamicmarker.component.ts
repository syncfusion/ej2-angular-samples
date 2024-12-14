/**
 * Dynamic Marker Sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { Maps, Marker, Zoom, ILoadEventArgs, MapsTheme, NavigationLine, MarkerSettingsModel, MarkerSettings, MarkerType, MapsModule } from '@syncfusion/ej2-angular-maps';
import { ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Marker, NavigationLine, Zoom);
// custom code start
//tslint:disable:max-func-body-length
//tslint:disable;
/* tslint:disable:no-string-literal */
// custom code end


@Component({
    selector: 'control-content',
    templateUrl: 'dynamicmarker.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, CheckBoxModule, DropDownListModule, TextBoxModule, FormsModule, ButtonModule, SBDescriptionComponent]
})
export class MapsDynamicMarkerComponent {
    public markerCheckedState: boolean = true;
    public lineCheckedState: boolean = false;
    public connectLineCheckedState: boolean = false;
    public navigationLines: Object[] = [];
    public latitude: number[] = [];
    public longitude: number[] = [];
    public lineWidth: number = 1;
    public disableLineWidthTextBox: boolean = true;
    public disableConnectLineCheckbox: boolean = true;
    public disableButton: boolean = true;
    public disableShapeBox: boolean = false;
    public markerShape: string = "Image";

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
        enable: true
    };

    public layers: object[] = [{
        urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png'
    }];


    markerChangeHandler = (args: CheckBoxChangeEvents) => {
        this.markerCheckedState = args.checked;
        if (args.checked) {
            this.disableShapeBox = false;
        } else {
            this.disableShapeBox = true;
        }
    };
    lineChangeHandler = (args: CheckBoxChangeEvents) => {
        this.lineCheckedState = args.checked;
        if (args.checked) {
            this.disableConnectLineCheckbox = this.disableLineWidthTextBox = !args.checked;
        }
        else {
            this.disableConnectLineCheckbox = this.disableLineWidthTextBox = !args.checked;
            this.connectLineCheckedState = args.checked;
        }
    }
    connectionLineChangeHandler = (args: CheckBoxChangeEvents) => {
        this.connectLineCheckedState = args.checked;
        if (!args.checked) {
            this.emptySavedLinePositions();
        }

    }
    clearItems = () => {
        this.maps.layers[0].markerSettings = [];
        this.maps.layers[0].navigationLineSettings = [];
        this.navigationLines = [];
        this.emptySavedLinePositions();
        this.disableButton = true;
    }

    public mapClicked = (args: any) => {
        if (this.markerCheckedState) {
            this.addMarker(args);
        }
        if (this.lineCheckedState && !this.connectLineCheckedState) {
            this.addLine(args, this.lineWidth);
        }
        if (this.connectLineCheckedState) {
            this.addLine(args, this.lineWidth, true);
        }
        if (this.markerCheckedState || this.lineCheckedState || this.connectLineCheckedState) {
            this.maps.refresh();
            if (this.disableButton && (this.maps.layers[0].markerSettings.length ||
            this.maps.layers[0].navigationLineSettings.length)) {
                this.disableButton = false;
            }
        }
    }

    public emptySavedLinePositions: any = () => {
        this.latitude = [];
        this.longitude = [];
    };
    public addMarker: any = (args: any) => {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            let layerIndex: number = 0;
            let geo = this.maps.getTileGeoLocation(args.layerX, args.layerY);
            args['latitude'] = geo['latitude'];
            args['longitude'] = geo['longitude'];
            let marker: MarkerSettingsModel[];
            let dynamicMarker: MarkerSettingsModel[] = this.maps.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(this.maps, 'markerSettings', marker));
            let markerIndex: number = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = (this.markerShape !== 'Image') ? this.markerShape as MarkerType : 'Image';
            dynamicMarker[markerIndex].height = (this.markerShape !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].width = (this.markerShape !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = (this.markerShape !== 'Image') ? '' : 'https://ej2.syncfusion.com/angular/demos/assets/maps/images/ballon.png';
        }
    };
    public addLine: any = (lineArgs: any, lineWidth: number, connectiveLine?: boolean) => {
        let geo = this.maps.getTileGeoLocation(lineArgs.layerX, lineArgs.layerY);
        lineArgs['latitude'] = geo['latitude'];
        lineArgs['longitude'] = geo['longitude'];
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            this.latitude.push(lineArgs.latitude);
            this.longitude.push(lineArgs.longitude);
        }
        if (this.latitude.length >= 2) {
            this.navigationLines.push({
                'visible': true,
                'latitude': [this.latitude[(this.latitude.length - 2)], this.latitude[(this.latitude.length - 1)]],
                'longitude': [this.longitude[(this.longitude.length - 2)], this.longitude[(this.longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            this.maps.layers[0].navigationLineSettings = this.navigationLines;
            if (!connectiveLine) {
                this.emptySavedLinePositions();
            }
        }
    }
    public markerShapeData: string[] = ['Image', 'Circle', 'Diamond', 'Star', 'Triangle'];
}


