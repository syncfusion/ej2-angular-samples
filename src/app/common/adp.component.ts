import { Component, ElementRef } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
@Component({
    selector: '[id=action-description]',
    template: '<div class="sb-action-description-body"><ng-content></ng-content></div>'
})
export class SBActionDescriptionComponent { }
