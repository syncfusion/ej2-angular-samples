import { Component, ViewChild } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-ng-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'internationalization.html',
})
export class InternationalizationController {
    @ViewChild('numeric')
    public numeric: NumericTextBoxComponent;
    @ViewChild('percentage')
    public percentage: NumericTextBoxComponent;
    @ViewChild('currencyTextBox')
    public currencyTextBox: NumericTextBoxComponent;    
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
                    incrementTitle: 'Increment value', decrementTitle: 'Decrement value'
                }
            },
            'de': {
                'numerictextbox': {
                    incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert'
                }
            },
            'zh': {
                'numerictextbox': {
                    incrementTitle: '增值', decrementTitle: '遞減值'
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
            this.numeric.placeholder = '输入值';
            this.currencyTextBox.placeholder = '输入货币';
            this.percentage.placeholder = '输入百分比';
        } else if (culture === 'de') {
            this.currency = 'EUR';
            this.numeric.placeholder = 'Geben Sie den Wert ein';
            this.currencyTextBox.placeholder = 'Geben Sie die Währung ein';
            this.percentage.placeholder = 'Geben Sie den Prozentsatz ein';
        } else {
            this.currency = 'USD';
            this.numeric.placeholder = 'Enter the value';
            this.currencyTextBox.placeholder = 'Enter the currency';
            this.percentage.placeholder = 'Enter the percentage';
        }
    }
    constructor() { }
}