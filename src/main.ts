import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app.module.ngfactory';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);