import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-ng-calendars';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'globalization.html',
    styleUrls: ['daterangepicker-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GlobalizationComponent {
    @ViewChild('ejDateRangePicker') ejDateRangePicker: DateRangePickerComponent;    
    public date: Object = new Date();
    locale: string = 'de';
    ngOnInit(): void {
        L10n.load({
            'de': {
                'daterangepicker': {
                    placeholder: 'Einen Bereich auswählen',
                    startLabel: 'Anfangsdatum',
                    endLabel: 'Enddatum',
                    applyText: 'Sich bewerben',
                    cancelText: 'Stornieren',
                    selectedDays: 'Ausgewählte Tage',
                    days: 'Tage',
                    customRange: 'benutzerdefinierten Bereich'
                }
            },
            'en': {
                'daterangepicker': {
                    placeholder: 'Select a range ',
                    startLabel: 'Start Date',
                    endLabel: 'End Date',
                    applyText: 'Apply',
                    cancelText: 'Cancel',
                    selectedDays: 'Selected Days',
                    days: 'Days',
                    customRange: 'Custom Range'
                }
            },
            'ar': {
                'daterangepicker': {
                    placeholder: 'حدد نطاقا',
                    startLabel: 'تاريخ البدء',
                    endLabel: 'تاريخ الانتهاء',
                    applyText: 'تطبيق',
                    cancelText: 'إلغاء',
                    selectedDays: 'الأيام المحددة',
                    days: 'أيام',
                    customRange: 'نطاق مخصص'
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
            require('../common/cldr-data/main/ar/timeZoneNames.json'),
        );
    }
    changeLocale() {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        this.ejDateRangePicker.locale = culture;
        this.ejDateRangePicker.locale === 'ar' ? this.ejDateRangePicker.enableRtl = true : this.ejDateRangePicker.enableRtl = false;
        this.ejDateRangePicker.dataBind();

    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['daterangepicker-style.css'];
    }
}