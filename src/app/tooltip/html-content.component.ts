/**
 * Tooltip default sample
 */

import { Component, ViewChild, ViewChildren } from '@angular/core';
import { TooltipComponent, Position, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'html-content.html',
    styleUrls: ['html-content.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, TooltipModule, ButtonModule, SBDescriptionComponent]
})
export class HtmlContentComponent {
    @ViewChild('tooltip')
    public control: TooltipComponent;

    public created() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
    }

    public onClick(args: any) {
        if (args) {
          const parentNode = args.target.parentNode;
          const grandParentNode = parentNode?.parentNode;
          if (grandParentNode && !grandParentNode.classList.contains('e-tooltip')) {
              if (this.control && document.getElementsByClassName('e-tooltip-wrap').length > 0) {
                  this.control.close();
              }
          }
      }
    }

    public onScroll() {
        if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
            this.control.close();
        }
    }
}
