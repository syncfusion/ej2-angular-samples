import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChipList } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ChipListModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
/**
 * API chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'chips-api.html',
    styleUrls: ['chips-api.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChipListModule, DropDownListModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ApiChipsComponent {
    @ViewChild('chip') chip: ChipList;
    public ddlData: Object[] = [
        { id: '1', text: 'Default' },
        { id: '2', text: 'Primary' },
        { id: '3', text: 'Success' },
        { id: '4', text: 'Danger' },
        { id: '5', text: 'Warning' },
        { id: '6', text: 'Info' },
      ];
    public avatarData: Object[] =  [
        { id: '1', text: 'None' },
        { id: '2', text: 'Icon' },
        { id: '3', text: 'Image' },
        { id: '4', text: 'Letter' },
      ];  
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
