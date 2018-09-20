/**
 * ComboBox Cascading Sample
 */
import { Component, ViewChild } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'cascading.html',
    styleUrls: ['combo-box.css']
})

export class CascadingComboBoxComponent {
    //define the country ComboBox data
    public country: { [key: string]: Object }[] = [
        { CountryName: 'Australia', CountryId: '2' },
        { CountryName: 'United States', CountryId: '1' }
    ];
    //define the state ComboBox data
    public state: { [key: string]: Object }[] = [
        { StateName: 'New York', CountryId: '1', StateId: '101' },
        { StateName: 'Queensland', CountryId: '2', StateId: '104' },
        { StateName: 'Tasmania ', CountryId: '2', StateId: '105' },
        { StateName: 'Victoria', CountryId: '2', StateId: '106' },
        { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
        { StateName: 'Washington', CountryId: '1', StateId: '103' }
    ];
    //define the city ComboBox data
    public cities: { [key: string]: Object }[] = [
        { CityName: 'Aberdeen', StateId: '103', CityId: 207 },
        { CityName: 'Alexandria', StateId: '102', CityId: 204 },
        { CityName: 'Albany', StateId: '101', CityId: 201 },
        { CityName: 'Beacon ', StateId: '101', CityId: 202 },
        { CityName: 'Brisbane ', StateId: '104', CityId: 211 },
        { CityName: 'Cairns', StateId: '104', CityId: 212 },
        { CityName: 'Colville ', StateId: '103', CityId: 208 },
        { CityName: 'Devonport', StateId: '105', CityId: 215 },
        { CityName: 'Emporia', StateId: '102', CityId: 206 },
        { CityName: 'Geelong', StateId: '106', CityId: 218 },
        { CityName: 'Hampton ', StateId: '102', CityId: 205 },
        { CityName: 'Healesville ', StateId: '106', CityId: 217 },
        { CityName: 'Hobart', StateId: '105', CityId: 213 },
        { CityName: 'Launceston ', StateId: '105', CityId: 214 },
        { CityName: 'Lockport', StateId: '101', CityId: 203 },
        { CityName: 'Melbourne', StateId: '106', CityId: 216 },
        { CityName: 'Pasco', StateId: '103', CityId: 209 },
        { CityName: 'Townsville', StateId: '104', CityId: 210 }
    ];
    // maps the country columns to fields property
    public countryFields: Object = { value: 'CountryId', text: 'CountryName' };
    // maps the state columns to fields property
    public stateFields: Object = { value: 'StateId', text: 'StateName' };
    // maps the city columns to fields property
    public cityFields: Object = { text: 'CityName', value: 'CityId' };
    // set the placeholder to ComboBox input element
    public countryWaterMark: string = 'Select a country';
    public stateWaterMark: string = 'Select a state';
    public cityWaterMark: string = 'Select a city';
    @ViewChild('countryList')
    // country ComboBox instance
    public countryObj: ComboBoxComponent;
    @ViewChild('stateList')
    // state ComboBox instance
    public stateObj: ComboBoxComponent;
    @ViewChild('cityList')
    // city ComboBox instance
    public cityObj: ComboBoxComponent;
    public onChange1(): void {
        if (this.countryObj.value === null) {
            // disable the state ComboBox
            this.stateObj.enabled = false;
            // disable the city ComboBox
            this.cityObj.enabled = false;
            // clear the existing selection
            this.stateObj.value = null;
            // clear the existing selection
            this.cityObj.value = null;
        } else {
            this.stateObj.enabled = true;
            // query the data source based on country ComboBox selected value
            let tempQuery: Query = new Query().where('CountryId', 'equal', this.countryObj.value);
            this.stateObj.query = tempQuery;
            // clear the existing selection
            this.stateObj.value = null;
            // clear the existing selection
            this.cityObj.value = null;
            // disable the city ComboBox
            this.cityObj.enabled = false;
        }
        // bind the property change to state ComboBox
        this.stateObj.dataBind();
        // bind the property change to city ComboBox
        this.cityObj.dataBind();
    }
    public onChange2(): void {
        if (this.stateObj.value === null) {
            // disable the city ComboBox
            this.cityObj.enabled = false;
            // clear the existing selection
            this.cityObj.value = null;
        } else {
            // enable the city ComboBox
            this.cityObj.enabled = true;
            // query the data source based on state ComboBox selected value
            let tempQuery: Query = new Query().where('StateId', 'equal', this.stateObj.value);
            this.cityObj.query = tempQuery;
            // clear the existing selection
            this.cityObj.value = null;
        }
        // bind the property change to city ComboBox
        this.cityObj.dataBind();
    }
}