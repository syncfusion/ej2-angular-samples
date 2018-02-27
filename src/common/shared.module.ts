import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { ListViewModule } from '@syncfusion/ej2-ng-lists';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';
import { TreeViewModule, TabModule } from '@syncfusion/ej2-ng-navigations';


import { SBDescriptionComponent } from './dp.component';
import { SBActionDescriptionComponent } from './adp.component';
@NgModule({
    imports: [
        ButtonModule,
        ListViewModule,
        DropDownListModule,
        TreeViewModule,
        TabModule,
        

    ],
     declarations: [
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ],
    exports: [
        ButtonModule,
        TreeViewModule,
        ListViewModule,
        DropDownListModule,
        TabModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class SharedModule { }