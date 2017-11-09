import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns/src';
import { TimePickerComponent } from '@syncfusion/ej2-ng-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'globalization.html',
    styleUrls: ['timepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GlobalizationComponent {
    @ViewChild('ejTimePicker') ejTimePicker: TimePickerComponent;
    public date: Object = new Date();
    public value: string = 'de';
    public locale: string = 'de';
    @ViewChild('sample')
    public listObj: DropDownListComponent;
    public cultureData: string[] = ['ar', 'de', 'en', 'vi', 'zh'];
    ngOnInit(): void {
        /*loads the localization text*/
        L10n.load({
            'de': {
                'timepicker': { placeholder: 'Wählen Sie Zeit' }
            },
            'zh': {
                'timepicker': { placeholder: '選擇時間' }
            },
            'en': {
                'timepicker': { placeholder: 'Select Time' }
            },
            'vi': {
                'timepicker': { placeholder: 'Chọn thời gian' }
            },
            'ar': {
                'timepicker': { placeholder: 'حدد الوقت' }
            }
        });
        /*  loadCldr method to load the culture specific JSON file.*/
        loadCldr(
            require('../common/cldr-data/supplemental/numberingSystems.json'),
            require('../common/cldr-data/main/zh/ca-gregorian.json'),
            require('../common/cldr-data/main/zh/numbers.json'),
            require('../common/cldr-data/main/de/ca-gregorian.json'),
            require('../common/cldr-data/main/de/numbers.json'),
            require('../common/cldr-data/main/vi/ca-gregorian.json'),
            require('../common/cldr-data/main/vi/numbers.json'),
            require('../common/cldr-data/main/ar/ca-gregorian.json'),
            require('../common/cldr-data/main/ar/numbers.json'),
        );
    }
    changeLocale() {
	/*Apply selected locale to the component*/
        let culture: string = this.listObj.text;
        this.locale = culture;
        this.ejTimePicker.enableRtl = culture === 'ar' ? true : false;
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['timepicker-style.css'];
    }
}