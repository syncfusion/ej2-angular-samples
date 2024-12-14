import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RibbonDefaultComponent } from './default.component';
import { RibbonSimplifiedComponent } from './simplified.component';
import { RibbonResizeComponent } from './resize.component';

import { RibbonBackstageComponent } from './backstage.component';
import { RibbonContextualTabComponent } from './contextual.component';
import { RibbonKeyTipComponent } from './keytip.component';
import { RibbonGalleryComponent } from './gallery.component';

export const ribbonAppRoutes: Object[] = [
  { path: ':theme/ribbon/default', component: RibbonDefaultComponent, name: 'Default Functionalities', description: 'This sample demonstrates the default functionalities of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/simplified', component: RibbonSimplifiedComponent, name: 'Simplified Mode', description: 'This sample demonstrates the simplified mode of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/backstage', component: RibbonBackstageComponent, name: 'Backstage', description: 'This sample demonstrates the backstage functionalities of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/contextual', component: RibbonContextualTabComponent, name: 'Contextual Tabs', description: 'This sample demonstrates the contextual tab functionality of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/resize', component: RibbonResizeComponent, name: 'Ribbon Resizing', description: 'This sample demonstrates the resize functionalities of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/keytip', component: RibbonKeyTipComponent, name: 'Ribbon KeyTips', description: 'This sample demonstrates the keytip functionalities of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' },
  { path: ':theme/ribbon/gallery', component: RibbonGalleryComponent, name: 'Ribbon Gallery', description: 'This sample demonstrates the gallery feature of the Syncfusion<sup>®</sup> Angular Ribbon component.', category: 'Ribbon' }
];

export const RibbonSampleModule: ModuleWithProviders<any> = RouterModule.forChild(ribbonAppRoutes);
