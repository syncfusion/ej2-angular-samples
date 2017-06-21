import { Component, ElementRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
    selector: '[id=description]',
    template: '<div class="description-header">Description</div><div class="sb-description-body"><ng-content></ng-content></div>'
})
export class SBDescriptionComponent { }