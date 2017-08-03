import { Component } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'internationalization.html',
})
export class InternationalizationController {
    locale: string = 'de';
    currency: string = 'EUR';
    numericValue: number = 10;
    percentValue: number = 0.5;
    currencyValue: number = 100;
    step: number = 0.01;
    min: number = 0;
    max: number = 1;
    ngOnInit(): void {
         L10n.load({
            'en': {
                'numerictextbox': {
                    incrementTitle: 'Increment value', decrementTitle: 'Decrement value',
                    placeholder: 'Enter the value'
                }
            },
            'de': {
                'numerictextbox': {
                    incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert',
                    placeholder: 'Geben Sie den Wert ein'
                }
            },
            'zh': {
                'numerictextbox': {
                    incrementTitle: '增值', decrementTitle: '遞減值',
                    placeholder: '輸入值'
                }
            }
        });
         loadCldr(
            require('../common/cldr-data/main/de/numbers.json'),
            require('../common/cldr-data/main/de/currencies.json'),
            require('../common/cldr-data/main/zh/numbers.json'),
            require('../common/cldr-data/main/zh/currencies.json'),
            require('../common/cldr-data/supplemental/numberingSystems.json'),
            require('../common/cldr-data/supplemental/currencyData.json')
        );
    }
    changeLocale() {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        this.locale = culture;
        if (culture === 'zh') {
            this.currency = 'CNY';
        } else if (culture === 'de') {
            this.currency = 'EUR';
        } else {
            this.currency = 'USD';
        }
    }
    constructor() { }
}