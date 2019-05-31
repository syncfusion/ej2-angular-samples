import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultFileController } from './default.component';
import { OverViewController } from './overview.component';
import { CustomThumnailController } from './custom.component';
import { CommonModule } from '@angular/common';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { ContextMenuModule ,ToolbarModule  } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule   } from '@syncfusion/ej2-angular-buttons';

export const fileManagerAppRoutes: Object[] = [
    { path: ':theme/file-manager/overview', component: OverViewController, name: 'Overview', category: 'File Manager', description: 'The FileManager component is used to explore a file system through a web application, similar to the windows explorer for windows.' },
    { path: ':theme/file-manager/custom', component: CustomThumnailController, name: 'Custom Thumbnails', category: 'File Manager', description: 'The FileManager component is used to explore a file system through a web application, similar to the windows explorer for windows.' },
    { path: ':theme/file-manager/default', component: DefaultFileController, name: 'API', category: 'File Manager', description: 'The FileManager component is used to explore a file system through a web application, similar to the windows explorer for windows.' }
];

export const fileRouter: ModuleWithProviders = RouterModule.forChild(fileManagerAppRoutes);

@NgModule({
    imports: [fileRouter, FileManagerAllModule, CheckBoxModule, ButtonModule, CommonModule, ContextMenuModule, ToolbarModule],
    declarations: [
        DefaultFileController,
        OverViewController,
        CustomThumnailController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileSampleModule { }