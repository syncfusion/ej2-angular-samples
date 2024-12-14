import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'list-view.html',
    styleUrls: ['list-view.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ListViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ListviewController {
    // Datasource for listview, badge field is the class data for Badges
    public dataSource: { [key: string]: Object }[] = [
        { "id": "p_01", "text": "Primary", "messages": "3 New", "badge": "e-badge e-badge-primary", "icons": "primary", "type": "Primary" },
        { "id": "p_02", "text": "Social", "messages": "27 New", "badge": "e-badge e-badge-secondary", "icons": "social", "type": "Primary" },
        { "id": "p_03", "text": "Promotions", "messages": "7 New", "badge": "e-badge e-badge-success", "icons": "promotion", "type": "Primary" },
        { "id": "p_04", "text": "Updates", "messages": "13 New", "badge": "e-badge e-badge-info", "icons": "updates", "type": "Primary" },
        { "id": "p_05", "text": "Starred", "messages": "", "badge": "", "icons": "starred", "type": "All Labels" },
        { "id": "p_06", "text": "Important", "messages": "2 New", "badge": "e-badge e-badge-danger", "icons": "important", "type": "All Labels" },
        { "id": "p_07", "text": "Sent", "messages": "", "badge": "", "icons": "sent", "type": "All Labels" },
        { "id": "p_08", "text": "Outbox", "messages": "", "badge": "", "icons": "outbox", "type": "All Labels" },
        { "id": "p_09", "text": "Drafts", "messages": "7 New", "badge": "e-badge e-badge-warning", "icons": "draft", "type": "All Labels" }
    ];

    // Map fields
    public fields: object = { groupBy: 'type' };

    public onActionComplete() {
        let list: HTMLElement = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0] as HTMLElement;
        list.style.display = 'none';
    }
}
