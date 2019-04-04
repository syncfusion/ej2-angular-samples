/**
 * MultiSelect Diacritics Filtering Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'diacritics-filtering.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DiacriticsFilteringMultiSelectComponent {
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