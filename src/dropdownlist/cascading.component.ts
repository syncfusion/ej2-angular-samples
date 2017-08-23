import { Component, ViewChild } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'cascading.html',
    styleUrls: ['dropdownlist.css']
})

export class CascadingDropDownListComponent {
    public country: { [key: string]: Object }[] = [
        { countryName: 'United States', countryId: '1' },
        { countryName: 'Australia', countryId: '2' }
    ];
    public state: { [key: string]: Object }[] = [
        { stateName: 'New York', countryId: '1', stateId: '101' },
        { stateName: 'Virginia ', countryId: '1', stateId: '102' },
        { stateName: 'Washington', countryId: '1', stateId: '103' },
        { stateName: 'Queensland', countryId: '2', stateId: '104' },
        { stateName: 'Tasmania ', countryId: '2', stateId: '105' },
        { stateName: 'Victoria', countryId: '2', stateId: '106' }
    ];
    public cities: { [key: string]: Object }[] = [
        { cityName: 'Albany', stateId: '101', cityId: 201 },
        { cityName: 'Beacon ', stateId: '101', cityId: 202 },
        { cityName: 'Lockport', stateId: '101', cityId: 203 },
        { cityName: 'Alexandria', stateId: '102', cityId: 204 },
        { cityName: 'Hampton ', stateId: '102', cityId: 205 },
        { cityName: 'Emporia', stateId: '102', cityId: 206 },
        { cityName: 'Aberdeen', stateId: '103', cityId: 207 },
        { cityName: 'Colville ', stateId: '103', cityId: 208 },
        { cityName: 'Pasco', stateId: '103', cityId: 209 },
        { cityName: 'Townsville', stateId: '104', cityId: 210 },
        { cityName: 'Brisbane ', stateId: '104', cityId: 211 },
        { cityName: 'Cairns', stateId: '104', cityId: 212 },
        { cityName: 'Hobart', stateId: '105', cityId: 213 },
        { cityName: 'Launceston ', stateId: '105', cityId: 214 },
        { cityName: 'Devonport', stateId: '105', cityId: 215 },
        { cityName: 'Melbourne', stateId: '106', cityId: 216 },
        { cityName: 'Healesville ', stateId: '106', cityId: 217 },
        { cityName: 'Geelong', stateId: '106', cityId: 218 }
    ];
    public countryFields: Object = { value: 'countryId', text: 'countryName' };
    public stateFields: Object = { value: 'stateId', text: 'stateName' };
    public cityFields: Object = { text: 'cityName', value: 'cityId' };
    public countryWaterMark: string = 'Select a country';
    public stateWaterMark: string = 'Select a state';
    public cityWaterMark: string = 'Select a city';
    @ViewChild('countryList')
    public countryObj: DropDownListComponent;
    @ViewChild('stateList')
    public stateObj: DropDownListComponent;
    @ViewChild('cityList')
    public cityObj: DropDownListComponent;
    public onChange1(): void {
        this.stateObj.enabled = true;
        let tempQuery: Query = new Query().where('countryId', 'equal', this.countryObj.value);
        this.stateObj.query = tempQuery;
        this.stateObj.text = null;
        this.stateObj.dataBind();
        this.cityObj.text = null;
        this.cityObj.enabled = false;
        this.cityObj.dataBind();
    }
    public onChange2(): void {
        this.cityObj.enabled = true;
        let tempQuery1: Query = new Query().where('stateId', 'equal', this.stateObj.value);
        this.cityObj.query = tempQuery1;
        this.cityObj.text = null;
        this.cityObj.dataBind();
    }
}