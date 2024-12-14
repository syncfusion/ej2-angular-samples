import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { DefaultFileController } from './default.component';
import { OverViewController } from './overview.component';
import { CustomThumnailController } from './custom.component';
import { DragAndDropController } from './drag-drop.component';
import { DirectoryUploadController } from './directory-upload.component';
import { VirtualizationController } from './virtualization.component';
import { FileUploadController } from './file-upload.component';
import { AccessControlController } from './access-control.component';
import { AzureController } from './azure-service.component';
import { SQLController } from './sql-server-provider.component';
import { AmazonS3Controller } from './amazon-s3-file-provider.component';
import { FlatDataController } from './flat-data.component';
import { NodeJSController } from './nodejs-file-provider.component';
import { CommonModule } from '@angular/common';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { ContextMenuModule ,ToolbarModule  } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule   } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { FirebaseController } from './firebase.component';
import { FTPController } from './ftp-file-provider.component';
import { IBMCOSController } from './ibm-cos-node-file-provider.component';

export const fileManagerAppRoutes: Object[] = [
    { path: ':theme/file-manager/overview', component: OverViewController, name: 'Overview', order: '01', category: 'File Manager', description: 'Angular FileManager component with full view of the File Manager like a windows explorer User Interface.' },
    { path: ':theme/file-manager/flat-data', component: FlatDataController, name: 'Flat Data', order: '01', category: 'File Manager', description: 'Angular FileManager component with how to render the File Manager with the flat data source.'},
    { path: ':theme/file-manager/custom', component: CustomThumnailController, name: 'Custom Thumbnails', order: '01', category: 'File Manager', description: 'Angular FileManager component with how to use the custom thumbnails for the files and folders.' },
    { path: ':theme/file-manager/default', component: DefaultFileController, name: 'API', order: '01', category: 'File Manager', description: 'Angular FileManager component with how to render the File Manager without the navigation pane and enable or disable toolbar dynamically.' },
    { path: ':theme/file-manager/drag-drop', component: DragAndDropController, name: 'Drag and Drop', order: '01', category: 'File Manager', description: 'Angular FileManager component with drag and drop feature to drag and drop the file.' },
    { path: ':theme/file-manager/directory-upload', component: DirectoryUploadController, name: 'Directory upload', order: '01', category: 'File Manager', description: 'Angular FileManager component with folder (directory) upload feature by using custom toolbar item.' },
    { path: ':theme/file-manager/virtualization', component: VirtualizationController, name: 'Virtualization', order: '01', category: 'File Manager', description: 'Angular FileManager component with how to enable the virtual scrolling feature.' },
    { path: ':theme/file-manager/file-upload', component: FileUploadController, name: 'File Upload', order: '02', category: 'Use Case', description: 'Angular FileManager component with how to render the File Manager component inside the Dialog component.' },
    { path: ':theme/file-manager/access-control', component: AccessControlController, name: 'Access Control', order: '02', category: 'Use Case', description: 'Angular FileManager component with how to restrict the file operations in the File Manager component.' },
    { path: ':theme/file-manager/azure-service', component: AzureController, name: 'Azure Blob Provider', order: '03', category: 'Cloud Service Providers', description: 'Angular FileManager component with how to configure and use the azure service.' },
    { path: ':theme/file-manager/nodejs-file-provider', component: NodeJSController, name: 'NodeJS File Provider', order: '03', category: 'Cloud Service Providers', description: 'Angular FileManager component with how to configure and use the nodejs server database service.' },
    { path: ':theme/file-manager/amazon-s3-file-provider', component: AmazonS3Controller, name: 'Amazon S3 File Provider', order: '03', category: 'Cloud Service Providers', description: 'Angular FileManager component with how to configure and use the Amazon S3 file provider service.' },
    { path: ':theme/file-manager/firebase', component: FirebaseController, name: 'Firebase Realtime File Provider', order: '03', category: 'Cloud Service Providers', description: 'Angular FileManager component with how to configure and use the firebase realtime cloud storage database file provider service.' },
    { path: ':theme/file-manager/ibm-cos-node-file-provider', component: IBMCOSController, name: 'IBM Cloud File Provider', order: '03', category: 'Cloud Service Providers', description: 'Angular FileManager component with how to configure and use the IBM Cloud Object Storage file provider service.' }
];

export const FileSampleModule: ModuleWithProviders<any> = RouterModule.forChild(fileManagerAppRoutes);


