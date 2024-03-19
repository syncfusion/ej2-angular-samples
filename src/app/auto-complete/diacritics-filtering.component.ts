/**
 * AutoComplete Diacritics Filtering Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'diacritics-filtering.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, AutoCompleteModule, SBDescriptionComponent]
})
export class DiacriticsFilteringAutoCompleteComponent {
    // create local data
    public data: string[] = [
        'Águilas',
        'Ajedrez',
        'Ala Delta',
        'Álbumes de Música',
        'Alusivos',
        'Análisis de Escritura a Mano',
        'Dyarbakır',
        'Derepazarı ',
        'Gülümsemek ',
        'Teşekkürler',
        'Güle güle.',
        'Gülhatmi',
        'Gülünç'
    ];
}