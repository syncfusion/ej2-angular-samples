import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-ng-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'globalization.html',
    styleUrls: ['datepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GlobalizationComponent {
    @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent;
    public rtl: boolean = true;
    public date: Object = new Date();
    locale: string = 'de';
    ngOnInit(): void {
        L10n.load({
            'de': {
                'datepicker': {
                    placeholder: 'Wählen Sie ein Datum'
                }
            },
            'en': {
                'datepicker': {
                    placeholder: 'Choose a date'
                }
            },
            'ar': {
                'datepicker': {
                    placeholder: 'اختر تاريخا'
                }
            }
        });

        loadCldr(
            require('../common/cldr-data/supplemental/numberingSystems.json'),
            require('../common/cldr-data/main/de/ca-gregorian.json'),
            require('../common/cldr-data/main/de/numbers.json'),
            require('../common/cldr-data/main/de/timeZoneNames.json'),
            require('../common/cldr-data/main/ar/ca-gregorian.json'),
            require('../common/cldr-data/main/ar/numbers.json'),
            require('../common/cldr-data/main/ar/timeZoneNames.json')
        );
    }
    changeLocale() {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        this.ejDatePicker.locale = culture;
        this.ejDatePicker.locale === 'ar' ? this.ejDatePicker.enableRtl = true : this.ejDatePicker.enableRtl = false;
        this.ejDatePicker.dataBind();

    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['datepicker-style.css'];
    }
}