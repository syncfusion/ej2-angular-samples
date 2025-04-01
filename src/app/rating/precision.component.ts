import { Component, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Precision sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'precision.html',
    styleUrls: ['precision.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RatingModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PrecisionRatingComponent implements AfterViewInit {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['precision.css'];
    }
  ngAfterViewInit() {
        const rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', this.hideTooltipOnScroll);
    }
    }

    hideTooltipOnScroll(): void {
        const tooltipElement: HTMLElement | null = document.querySelector('.e-rating-tooltip');
        if (tooltipElement && Browser.isDevice) {
            tooltipElement.style.display = 'none';
        }
    }
}
