import { Component, ViewChild, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
/**
 * Create wizard using Tab
 */
// tslint:disable:max-line-length
@Component({
    selector: 'control-content',
    templateUrl: 'wizard.html',
    encapsulation: ViewEncapsulation.None
})

export class WizardTabComponent implements OnInit {
    @ViewChild('tab') tab: TabComponent;
    @ViewChild('pass_name1') input1: ElementRef;
    @ViewChild('pass_name2') input2: ElementRef;
    @ViewChild('pass_name3') input3: ElementRef;
    @ViewChild('alertDialog') alertDlg: DialogComponent;
    @ViewChild('date') journeyDate: DatePickerComponent;
    @ViewChild('quota') ticketType: DropDownListComponent;
    @ViewChild('endPoint') endPoint: DropDownListComponent;
    @ViewChild('startPoint') startPoint: DropDownListComponent;
    @ViewChild('availableTrain') availTrainGrid: GridComponent;
    @ViewChild('pass_age1') passage1: NumericTextBoxComponent;
    @ViewChild('ticketDetailGrid') ticketDetailGrid: GridComponent;
    @ViewChild('pass_gender1') passgender1: DropDownListComponent;
    @ViewChild('pass_gender2') passgender2: DropDownListComponent;
    @ViewChild('pass_gender3') passgender3: DropDownListComponent;
    @ViewChild('pass_berth1') passBerth1: DropDownListComponent;
    @ViewChild('pass_berth2') passBerth2: DropDownListComponent;
    @ViewChild('pass_berth3') passBerth3: DropDownListComponent;

    public fields: Object = {};
    public quotas: Object[] = [];
    public gender: Object[] = [];
    public berths: Object[] = [];
    public today: Date = new Date();
    public cities: any;
    public locations: any;
    public headerText: Object[] = [];
    public dlgButtons: Object[] = [];
    public selectedTrain: any;
    public autoCompleteFields: Object = {};
    public dlgTarget: HTMLElement = document.querySelector('.sb-content-section.e-tab > .e-content');
    public dateMin: Date;
    public dateMax: Date;

    public ngOnInit(): void {
        document.body.style.visibility = 'hidden';
        this.dateMin = new Date(this.today.getTime());
        this.dateMax = new Date(this.today.getTime() + 60 * 24 * 60 * 60 * 1000);
        this.headerText = [
            { 'text': 'New Booking' },
            { 'text': 'Train List' },
            { 'text': 'Add Passenger' },
            { 'text': 'Make Payment' }];

        this.quotas = [
            { id: '1', text: 'Business Class' },
            { id: '2', text: 'Economy Class' },
            { id: '4', text: 'Common Class' }
        ];

        this.gender = [
            { id: '1', text: 'Male' },
            { id: '2', text: 'Female' }
        ];

        this.berths = [
            { id: '1', text: 'Upper' },
            { id: '2', text: 'Lower' },
            { id: '3', text: 'Middle' },
            { id: '4', text: 'Window' },
            { id: '5', text: 'Aisle' }
        ];
        this.cities = [
            { name: 'Chicago', fare: 300 },
            { name: 'San Francisco', fare: 125 },
            { name: 'Los Angeles', fare: 175 },
            { name: 'Seattle', fare: 250 },
            { name: 'Florida', fare: 150 }
        ];

        this.fields = { id: 'id', text: 'text', value: 'text' };
        this.autoCompleteFields = { text: 'name', value: 'name' };

        this.dlgButtons = [{
            buttonModel: { content: 'Ok', isPrimary: true },
            click: (() => {
                this.alertDlg.hide();
                this.tab.enableTab(0, true);
                this.tab.enableTab(1, false);
                this.tab.enableTab(2, false);
                this.tab.enableTab(3, false);
                this.tab.select(0);
            })
        }];
    }

    public ngAfterViewInit(): void {
        document.body.style.visibility = 'visible';
    }

    public showDate(): void {
        this.journeyDate.show();
    }

    public trainSelected(args: RowSelectEventArgs): void {
        this.selectedTrain = args.data;
    }

    public tabSelected(e: SelectEventArgs): void {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }

    public dlgCreated(): void {
        this.alertDlg.hide();
    }

    public btnClicked(e: any): void {
        switch (e.target.id) {
            case 'searchNext':
                /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
                if (!isNOU(this.startPoint.value) && !isNOU(this.endPoint.value) &&
                    !isNOU(this.ticketType.value) && !isNOU(this.journeyDate.value)) {
                    if (!isNOU(this.startPoint.value) && this.startPoint.value == this.endPoint.value) {
                        document.getElementById('err1').innerText = '* Arrival point cannot be same as Departure';
                    } else {
                        this.tab.enableTab(0, false);
                        this.tab.enableTab(1, true);
                        this.filterTrains(e);
                        this.tab.select(1);
                        document.getElementById('err1').innerText = '';
                        document.getElementById('err2').innerText = '';
                    }
                } else {
                    document.getElementById('err1').innerText = '* Please fill all the details before proceeding';
                }
                break;
            case 'bookTickets':
                /* Based on the selected station generate Grid content to display trains available */
                if (this.availTrainGrid.getSelectedRecords() === undefined || this.availTrainGrid.getSelectedRecords().length === 0) {
                    document.getElementById('err2').innerText = '* Select your convenient train';
                } else {
                    this.tab.enableTab(2, true);
                    this.tab.select(2);
                    this.tab.enableTab(1, false);
                    document.getElementById('err2').innerText = '';
                }
                break;
            case 'confirmTickets':
                /* Get the Passenger details and validate the fields must not be left empty */
                if (this.input1.nativeElement.value === '' || isNOU(this.passgender1.value) || isNOU(this.passage1.value)) {
                    document.getElementById('err3').innerText = '* Please enter passenger details';
                } else {
                    this.tab.enableTab(3, true);
                    this.tab.select(3);
                    this.tab.enableTab(2, false);
                    document.getElementById('err3').innerText = '';
                    this.finalizeDetails(e);
                }
                break;
            case 'makePayment':
                this.alertDlg.show();
                break;
            case 'goToSearch':
                /* Go back to change class, date or boarding places */
                this.selectedTrain = [];
                this.tab.enableTab(0, true);
                this.tab.select(0);
                this.tab.enableTab(1, false);
                break;
            case 'goBackToBook':
                /* Change the preferred train chosen already */
                this.tab.enableTab(1, true);
                this.tab.select(1);
                this.tab.enableTab(2, false);
                break;
            case 'goBackDetails':
                /* Update passenger detail before confirming the payment */
                this.tab.enableTab(2, true);
                this.tab.select(2);
                this.tab.enableTab(3, false);
                break;
        }
    }
    public filterTrains(args: any): void {
        /* Generating trains based on source and destination chosen */
        let result: Object[] = [];
        let fromCity: string = <string>this.startPoint.value;
        let toCity: string = <string>this.endPoint.value;
        let count: number = Math.floor((Math.random() * 3) + 2);

        for (let i: number = 0; i < count; i++) {
            let details = <Details>{};
            details.TrainNo = Math.floor((Math.random() * 20) + 19000);
            details.Name = 'Train ' + i;
            details.Departure = fromCity;
            details.Arrival = toCity;
            details.Availability = Math.floor((Math.random() * 20) + 20);
            result.push(details);
        }
        this.availTrainGrid.dataSource = result;
    }

    public finalizeDetails(args: any): void {
        /* Get the passenger details and update table with name and other details for confirmation */
        let reserved: Object[] = [];
        let passCount: any = 0;
        for (let i: number = 1; i <= 3; i++) {
            if (this.input1.nativeElement.value !== '') {
                let details = <Details>{};
                let gender: any = (i === 1) ? this.passgender1.value : (i === 2) ?
                    this.passgender2.value : this.passgender3.value;
                let berth: any = (i === 1) ? this.passBerth1.value : (i === 2) ?
                    this.passBerth2.value : this.passBerth3.value;
                details.TrainNo = this.selectedTrain.TrainNo.toString();
                details.PassName = (i === 1) ? this.input1.nativeElement.value : (i === 2) ?
                    this.input2.nativeElement.value : this.input3.nativeElement.value;
                details.Gender = (gender === '') ? 'Male' : gender;
                details.Berth = (berth === '') ? 'Any' : berth;
                if (details.PassName !== '') { reserved.push(details); }
                passCount++;
            }
            let calcFare: any = 0;
            for (let i: number = 0; i < this.cities; i++) {
                if (this.startPoint.value === this.cities[i].name) { calcFare = calcFare + this.cities[i].fare; }
                if (this.endPoint.value === this.cities[i].name) { calcFare = calcFare + this.cities[i].fare; }
            }
            let displayAmt: any = document.getElementById('amount');
            if (this.ticketType.value === 'Economy Class') {
                displayAmt.innerText = 'Total payable amount: $' + passCount * (300 + calcFare)
            } else if (this.ticketType.value === 'Business Class') {
                displayAmt.innerText = 'Total payable amount: $' + passCount * (500 + calcFare)
            } else if (this.ticketType.value === 'Common Class') {
                displayAmt.innerText = 'Total payable amount: $' + passCount * (150 + calcFare)
            }
        }
        this.ticketDetailGrid.dataSource = reserved;
    }
}
interface Details {
    TrainNo: number;
    Name: string;
    Departure: string;
    Arrival: string;
    Availability: number;
    PassName: string;
    Gender: any;
    Berth: string;
    SeatNo: number;
}
// tslint:enable:max-line-length