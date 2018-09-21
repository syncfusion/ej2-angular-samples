/**
 * DropDownList Diacritics Filtering Sample
 */
import { Component } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'diacritics-filtering.html'
})
export class DiacriticsFilteringDropDownListComponent {
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