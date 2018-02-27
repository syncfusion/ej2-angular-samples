/**
 * MultiSelect Diacritics Filtering Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'diacriticsfiltering.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DiacriticsFilteringMultiSelectComponent {
    // create local data
    public data: string[] = [
        'Aeróbics',
        'Aeróbics en Agua',
        'Aerografía',
        'Aeromodelaje',
        'Águilas',
        'Ajedrez',
        'Ala Delta',
        'Álbumes de Música',
        'Alusivos',
        'Análisis de Escritura a Mano'];
}