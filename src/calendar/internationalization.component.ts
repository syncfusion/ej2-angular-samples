import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'internationalization.html',
    styleUrls: ['calendar-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class InternationalizationComponent {
    public date: Object = new Date();
    locale: string = 'de';
    ngOnInit(): void {
        loadCldr(
            require('../common/cldr-data/supplemental/numberingSystems.json'),
            require('../common/cldr-data/main/de/ca-gregorian.json'),
            require('../common/cldr-data/main/de/numbers.json'),
            require('../common/cldr-data/main/de/timeZoneNames.json')
        );
    }
    changeLocale() {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        this.locale = culture;
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['calendar-style.css'];
    }
    onValueChange(args: any): void {
        (<HTMLInputElement>document.getElementById('selected')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
}