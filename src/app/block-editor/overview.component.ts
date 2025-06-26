import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';
import { blockDataOverview } from './blockData'

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.component.css'],   
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorOverviewComponent {
    public blockDataOverview: BlockModel[] = blockDataOverview;
}