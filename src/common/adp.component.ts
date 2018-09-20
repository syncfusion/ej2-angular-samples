import { Component, ElementRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
    selector: '[id=action-description]',
    template: '<div class="sb-action-description-body"><ng-content></ng-content></div>'
})
export class SBActionDescriptionComponent { }
