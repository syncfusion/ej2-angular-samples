import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { ListViewModule } from '@syncfusion/ej2-ng-lists';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';

import {SBDescriptionComponent} from './dp.component';
@NgModule({
    imports: [
        ButtonModule,
        ListViewModule,
        DropDownListModule
    ],
     declarations: [
        SBDescriptionComponent
    ],
    exports: [
        ButtonModule,
        ListViewModule,
        DropDownListModule,
        SBDescriptionComponent
    ]
})
export class SharedModule { }
