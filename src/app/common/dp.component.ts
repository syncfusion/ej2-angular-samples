import { Component, ElementRef } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
@Component({
    selector: '[id=description]',
    template: '<div class="sb-description-body"><ng-content></ng-content></div>'
})
export class SBDescriptionComponent { }
