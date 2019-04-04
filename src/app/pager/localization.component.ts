import { Component, OnInit, ViewChild } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { PagerComponent } from '@syncfusion/ej2-angular-grids';
L10n.load({
    'de-DE': {
        'pager': {
            'currentPageInfo': '{0} von {1} Seiten ',
            'totalItemsInfo': '({0} Beiträge)',
            'firstPageTooltip': 'Zur ersten Seite',
            'lastPageTooltip': 'Zur letzten Seite',
            'nextPageTooltip': 'Zur nächsten Seite',
            'previousPageTooltip': 'Zurück zur letzten Seite',
            'nextPagerTooltip': 'Zurück zur letzten Seite',
            'previousPagerTooltip': 'Zum vorherigen Pager'
        }
    },
    'es-ES': {
        'pager': {
            'currentPageInfo': '{0} de {1} páginas ',
            'totalItemsInfo': '({0} artículos)',
            'firstPageTooltip': 'Ir a la primera página',
            'lastPageTooltip': 'Ir a la última página',
            'nextPageTooltip': 'Ir a la página siguiente',
            'previousPageTooltip': 'Ir a la página anterior',
            'nextPagerTooltip': 'Ir al siguiente Pager',
            'previousPagerTooltip': 'Ir a Pager anterior'
        }
    }
});
@Component({
    templateUrl: 'localization.html'
})
export class LocalizationComponent implements OnInit {
    public locale: string;
    @ViewChild('pager')
    public pager: PagerComponent;
    ngOnInit(): void {
        this.locale = 'en-US';
    }
    onchange(): void {
        this.pager.locale = (<HTMLSelectElement>document.querySelector('#ddl')).value;
    }
}
