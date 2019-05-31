import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import * as data from './data.json';
import { ChipList } from '@syncfusion/ej2-buttons';
/**
 * API chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'chips-api.html',
    styleUrls: ['chips-api.css'],
    encapsulation: ViewEncapsulation.None
})

export class ApiChipsComponent {
    @ViewChild('chip') chip: ChipList;
    public ddlData = (data as any).ddlData;
    public avatarData = (data as any).avatarData;
    outlineCss = '';
    colorCss = '';
    iconHandler(e): void {
        this.chip.leadingIconCss = e.checked ? 'janet' : '';
    }
    colorChange(e) {
        this.chip.cssClass = `e-${e.toLowerCase()} ${this.outlineCss.trim()}`;
        this.colorCss = `e-${e.toLowerCase()}`;
    }

    variantHandler(e): void {
        this.outlineCss = e.checked ? 'e-outline' : '';
        this.chip.cssClass = `${this.colorCss} ${this.outlineCss}`;
    }
    avatarHandler(e): void {
        this.chip.avatarIconCss = (e.toLowerCase() === 'icon') ? 'e-icon' : (e.toLowerCase() === 'image') ? 'janet' : '';
        this.chip.avatarText = (e.toLowerCase() === 'letter' ? 'JL' : '');
    }
    deleteIconHandler(e): void {
        this.chip.trailingIconCss = e.checked ? 'e-dlt-btn' : '';
    }
}
