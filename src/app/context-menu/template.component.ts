import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel, ContextMenuModule, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Default ContextMenu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ContextMenuModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TemplateContextMenuController {
    public content: string = '';

    @ViewChild('contextmenu')
    public contextmenu: ContextMenuComponent;

    public data = [
        {
          answerType: 'Selection',
          description: 'Choose from options',
          iconCss: 'e-icons e-list-unordered',
        },
        {
          answerType: 'Yes / No',
          description: 'Select Yes or No',
          iconCss: 'e-icons e-check-box',
        },
        {
          answerType: 'Text',
          description: 'Type own answer',
          iconCss: 'e-icons e-caption',
          items: [
            {
              answerType: 'Single line',
              description: 'Type answer in a single line',
              iconCss: 'e-icons e-text-form',
            },
            {
              answerType: 'Multiple line',
              description: 'Type answer in multiple line',
              iconCss: 'e-icons e-text-wrap',
            },
          ],
        },
        {
          answerType: 'None',
          description: 'No answer required',
          iconCss: 'e-icons e-mouse-pointer',
        },
    ];

    // Event triggers once the context menu rendering is completed.
    onCreated(): void {
        if (Browser.isDevice) {
            this.content = 'Touch hold to open the Context Menu and select the answer type';
            this.contextmenu.animationSettings.effect = 'ZoomIn';
        } else {
            this.content = 'Right click/Touch hold to open the Context Menu and select the answer type';
            this.contextmenu.animationSettings.effect = 'SlideDown';
        }
    }

    addTemplateClass(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.element.classList.contains('e-ul')) {
          args.element.classList.add('e-contextMenu-template');
        }
      }
}