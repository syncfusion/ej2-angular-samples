import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule, UserModel } from '@syncfusion/ej2-angular-blockeditor';
import blockData from './blockData.json';

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorOverviewComponent {
    public blockDataOverview: BlockModel[] = blockData.blockDataOverview as BlockModel[];
    public users: BlockModel[] = blockData.users as BlockModel[];
    public customToolbarItems: string[] = [ 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Uppercase', 'Lowercase', 'Subscript', 'Superscript', 'Color', 'Backgroundcolor' ];
    public inlineToolbar = {
        items: this.customToolbarItems,
    }
}