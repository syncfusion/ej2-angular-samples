import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChipList } from '@syncfusion/ej2-buttons';
/**
 * API chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None
})

export class ApiChipsComponent {
    @ViewChild('chip') chip: ChipList;
    public ddlData = [{
        "id": "1",
        "text": "Default"
    },
    {
        "id": "2",
        "text": "Primary"
    },
    {
        "id": "3",
        "text": "Success"
    },
    {
        "id": "4",
        "text": "Danger"
    },
    {
        "id": "5",
        "text": "Warning"
    },
    {
        "id": "6",
        "text": "Info"
    }
    ];
    public avatarData = [{
        "id": "1",
        "text": "None"
    },
    {
        "id": "2",
        "text": "Icon"
    },
    {
        "id": "3",
        "text": "Image"
    },
    {
        "id": "4",
        "text": "Letter"
    }
    ];
    outlineCss = '';
    colorCss = '';
    // checkbox change handler for chip leading icon
    iconHandler(e: any): void {
        this.chip.leadingIconCss = e.checked ? 'janet' : '';
    }
    // drop-down list change handler for chip color
    colorChange(e: any) {
        this.chip.cssClass = `e-${e.toLowerCase()} ${this.outlineCss.trim()}`;
        this.colorCss = `e-${e.toLowerCase()}`;
    }
    // checkbox change handler for chip outline
    variantHandler(e: any): void {
        this.outlineCss = e.checked ? 'e-outline' : '';
        this.chip.cssClass = `${this.colorCss} ${this.outlineCss}`;
    }
    // drop-down list change handler for chip avatar
    avatarHandler(e: any): void {
        this.chip.avatarIconCss = (e.toLowerCase() === 'icon') ? 'e-icon' : (e.toLowerCase() === 'image') ? 'janet' : '';
        this.chip.avatarText = (e.toLowerCase() === 'letter' ? 'JL' : '');
    }
    // checkbox change handler for chip trailing icon
    deleteIconHandler(e: any): void {
        this.chip.trailingIconCss = e.checked ? 'e-dlt-btn' : '';
    }
}
