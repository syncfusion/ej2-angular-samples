import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    templateUrl: 'default.html',
    
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class DefaultPagerComponent {
}